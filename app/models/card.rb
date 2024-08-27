class Card < ApplicationRecord
  belongs_to :user
  has_many :deck_cards
  has_many :decks, through: :deck_cards
  
  before_validation :set_default_remarks, on: :create

  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true, length: { maximum: 65_535 }
  
  def set_default_remarks
    self.remarks = 'なし' if body.blank?
  end
end
