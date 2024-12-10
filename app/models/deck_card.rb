class DeckCard < ApplicationRecord
  belongs_to :deck
  belongs_to :card
  validates :deck_id, uniqueness: { scope: :card_id }    
  validates :position, uniqueness: { scope: :deck_id }

  before_validation :set_position, on: :create

  
  private

  def set_position
    return if position.present?
    last_position = deck.deck_cards.maximum(:position) || 0
    self.position = last_position + 1
  end
end