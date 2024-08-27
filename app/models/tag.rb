class Tag < ApplicationRecord
  has_many :deck_tags, dependent: :destroy
  has_many :decks, through: :deck_tags
end
