class DeckTag < ApplicationRecord
  belongs_to :deck
  belongs_to :tag
  validates :deck_id, uniqueness: { scope: :tag_id }
end