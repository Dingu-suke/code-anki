class AddPositionToDeckCards < ActiveRecord::Migration[7.1]
  def up
    add_column :deck_cards, :position, :integer
    
    Deck.find_each do |deck|
      deck.deck_cards.where(position: nil).each_with_index do |deck_card, index|
        last_position = deck.deck_cards.where.not(position: nil).maximum(:position) || 0
        deck_card.update_column(:position, last_position + index + 1)
      end
    end
    add_index :deck_cards, [:deck_id, :position], unique: true
    change_column_null :deck_cards, :position, false
  end

  # def down
  #   remove_index :deck_cards, :position if index_exists?(:deck_cards, :position)
  #   remove_column :deck_cards, :position if column_exists?(:deck_cards, :position)
  # end
end
