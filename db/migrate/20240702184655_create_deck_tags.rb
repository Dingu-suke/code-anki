class CreateDeckTags < ActiveRecord::Migration[7.1]
  def change
    create_table :deck_tags do |t|
      t.references :deck, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.timestamps
    end
    add_index :deck_tags, [:deck_id, :tag_id], unique: true
  end
end
