class CreateCards < ActiveRecord::Migration[7.1]
  def change
    create_table :cards do |t|
      t.text :body, null: false
      t.string :title, null: false
      t.references :user, foreign_key: true
      t.text :remarks
      t.text :answer, null: false

      t.timestamps
    end
  end
end
