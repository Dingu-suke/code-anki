class AddColumnsToDeck < ActiveRecord::Migration[7.1]
  def change
    add_column :decks, :language, :string
    add_column :decks, :category, :string
    add_column :decks, :status, :string, default: 'private', null: false
  end
end
