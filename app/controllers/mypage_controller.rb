class MypageController < ApplicationController
  before_action :authenticate
  
  def show
    @your_decks = current_user.decks.includes(:user).order(created_at: :desc)
    @your_cards = current_user.cards.includes(:user).order(created_at: :desc)
    respond_to do |format|
      format.html
      format.json {
        render json: @your_decks.as_json(
        include: { cards: { only: [:id, :title, :body, :language, :answer, :remarks]} }
        )
      }
    end
  end
end