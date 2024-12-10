class DecksController < ApplicationController
  before_action :set_deck, only: %i[ show edit destroy ]
  before_action :set_your_deck, only: %i[ update update_card_position ]
  before_action :authenticate, except: %i[ index deck_cards ]

  # GET /decks or /decks.json
  def index
    @decks = Deck.includes(:cards, :deck_cards).all
    respond_to do |format|
      format.html
      format.json { 
        render json: @decks.as_json(
          include: {
            cards: { only: [:id, :title, :body, :language, :answer, :remarks] },
            deck_cards: { only: [:card_id, :position] }
          }
        )
      }
    end
  end

  # GET /decks/new
  def new
    @deck = Deck.new
  end

  # GET /decks/1/edit
  def edit
    @deck = current_user.decks.find(params[:id])
    @deck.tag_names = @deck.tags.map(&:name).join(',')
  end
  
  def create # post
    @deck = current_user.decks.build(deck_params)
    
    if @deck.save
      render json: @deck, status: :created
    else
      Rails.logger.debug "デッキ保存エラー: #{params.errors.full_messages}"
      render json: @deck.errors, status: :unprocessable_entity
    end
  end

  def update # patch
    if @deck.update(deck_params)
      render json: @deck
    else
      render json: @deck.errors, status: :unprocessable_entity
    end
  end

  def update_card_position # patch
    @deck.deck_cards.destroy_all
    
    params[:deck][:deck_cards].each do |card_data|
      @deck.deck_cards.create!(
        card_id: card_data[:card_id],
        position: card_data[:position]
      )
    end

    # deck_cardsの情報も含めてJSON化
    render json: @deck.as_json(
      include: {
        cards: { only: [:id, :title, :body, :language, :answer, :remarks] },
        deck_cards: { only: [:card_id, :position] }
      }
    )
  end

  # DELETE /decks/1 or /decks/1.json
  def destroy
    @deck = Deck.find(params[:id])
    if @deck.destroy
      head :no_content
    else
      render json: {error: 'デッキの削除に失敗しました'}, status: unprocessable_entity
    end
  end

  # 使用ユーザーのみのデッキ一覧
  def your_decks
    @your_decks = current_user.decks.includes(:user, :deck_cards, :cards).all.order(created_at: :desc)
    
    respond_to do |format|
      format.html
      format.json {
        render json: @your_decks.as_json(
          include: {
            cards: { only: [:id, :title, :body, :language, :answer, :remarks] },
            deck_cards: { only: [:card_id, :position] }
          }
        )
      }
    end
  end

  def deck_cards
    @deck = Deck.includes(:user, :deck_cards, :cards).find(params[:id]) 
    @cards = @deck.cards
    respond_to do |format|
    format.html
    format.json {
        render json: @decks.as_json(
          include: {
            cards: { only: [:id, :title, :body, :language, :answer, :remarks] },
            deck_cards: { only: [:card_id, :position] }
          }
        )
      }
    end
  end

  def destroy_your_deck
    @deck = current_user.decks.find(params[:id])
    if @deck.destroy
      head :no_content
    else
      render json: { errors: @deck.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_deck
      @deck = Deck.find(params[:id])
    end

    def set_your_deck
      @deck = current_user.decks.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def deck_params
      p "params"
      pp params
      params.require(:deck).permit(
        :name,
        :tag_names,
        :language,
        :category,
        :status,
        deck_cards: [:card_id, :position]
        )
    end
end
