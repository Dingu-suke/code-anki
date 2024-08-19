class DecksController < ApplicationController
  before_action :set_deck, only: %i[ show edit update destroy ]
  before_action :authenticate, except: %i[ index deck_cards ]

  # GET /decks or /decks.json
  def index
    @q = Deck.ransack(params[:q])
    @all_decks = @q.result(distinct: true)#.includes(:user)
    @cards = Card.all
  end

  # GET /decks/1 or /decks/1.json
  def show
    @deck = Deck.all
  end

  # GET /decks/new
  def new
    @deck = Deck.new
    @decks = Deck.all
  end

  # GET /decks/1/edit
  def edit
    @deck = current_user.decks.find(params[:id])
    @deck.tag_names = @deck.tags.map(&:name).join(',')
  end

  # POST /decks or /decks.json
  def create
    @deck = current_user.decks.build(deck_params)

    respond_to do |format|
      if @deck.save
      else
      end
    end
  end

  # PATCH/PUT /decks/1 or /decks/1.json
  def update
    @deck = current_user.decks.find(params[:id])
    if @deck.update(deck_params)
      redirect_to your_decks_path, success: "保存成功"
    else
      flash.now[:danger] = "保存失敗"
      render :edit
    end
  end

  # DELETE /decks/1 or /decks/1.json
  def destroy
    @deck.destroy!
    redirect_to your_decks_path, success: "デッキを削除しました", status: :see_other
  end

  def your_decks
    @your_decks = Deck.where(user_id: current_user.id).includes(:user).order("created_at DESC")
    @your_cards = Card.where(user_id: current_user.id).includes(:user).order("created_at DESC")
    respond_to do |format|
      format.html
      format.json {
        render json: @your_decks.as_json(
        include: { cards: { only: [:id, :title, :body, :language, :remarks]} }
        )
      }
    end
  end

  def deck_cards
    @deck = Deck.find(params[:id])
    @cards = @deck.cards
    respond_to do |format|
    format.html
    format.json { render json: { deck: @deck, cards: @cards } }
    end
  end

  def destroy_your_deck
    @deck = Deck.find(params[:id])
    @deck.deck_cards.destroy_all
    @deck.deck_tags.destroy_all
    @deck.destroy!
    redirect_to your_decks_path, success: "デッキを削除しました", status: :see_other
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deck
      @deck = Deck.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def deck_params
      params.require(:deck).permit(:name, :tag_names, card_ids:[])
    end
end
