class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :provider, null: false
      t.string :uid,      null: false
      t.string :name,     null: false
      t.string :image_url, null: false
      t.timestamps
    end
  end
end
