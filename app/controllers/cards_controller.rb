class CardsController < ApplicationController
  before_action :authenticate
  before_action :set_card, only: [:show, :edit, :update, :destroy_your_card]
  before_action :authorize_user!, only: [:show, :edit, :update, :destroy_your_card]

  def new
    @card = Card.new()
    @card.body = "```ruby\n#ここにコメントアウトで問題文を書く\n#ここにコードを書く\n```"
    @card.answer = "```ruby\n#解答コード\n```"
  end

  def index
    # @drafts = Card.includes(:user)
    # @borads = @q.result(distinct: true).includes(:user).order(created_at: :desc).page(params[:page])
    @cards = Card.all
    render json: @items
  end

  def show
  end

  def edit
  end

  def create
    @card = current_user.cards.build(cards_params)
    if @card.save
      # redirect_to your_cards_path, success: "保存成功"
      render json: @card, status: :created
    else
      flash.now[:danger] = "保存失敗"
      # render :new, status: :unprocessable_entity
      render json: @card.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @card = current_user.cards.find(params[:id])
    if @card.update(cards_params)
      redirect_to your_cards_path, success: "保存成功"
    else
      flash.now[:danger] = "保存失敗"
      render :edit, status: :unprocessable_entity
    end
  end
  
  # def destroy
  #   @card.destroy!
  #   redirect_to your_cards_path, success: "カードを削除しました", status: :see_other
  # end
  
  def your_cards 
    @your_cards = Card.where(user_id: current_user.id).includes(:user).order("created_at DESC")
  end
  
  def destroy_your_card
    @card.deck_cards.destroy_all
    @card.destroy!
    redirect_to your_cards_path, success: "カードを削除しました", status: :see_other
  end

  private


  def authorize_user!
    unless @card.user_id == current_user.id
      respond_to do |format|
        format.html { redirect_to root_path, alert: "あなたはこの操作を行う権限がありません。" }
        format.js { render 'shared/unauthorized', status: :forbidden }
      end
    end
  end

  def cards_params
    params.require(:card).permit(:title, :body, :answer, :remarks, :language)
  end
  
end
