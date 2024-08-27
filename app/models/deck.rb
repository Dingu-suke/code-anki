class Deck < ApplicationRecord
  belongs_to :user
  has_many :deck_cards
  has_many :cards, through: :deck_cards
  has_many :deck_tags
  has_many :tags, through: :deck_tags

  validates :name, presence: true, length: { maximum: 255 }
  validates :name, presence: true, length: { maximum: 255 }
  validate :at_least_a_cards

  attr_accessor :tag_names

  before_save :assign_tags # コールバック
  
  private

  def assign_tags
    if tag_names 
      normalized_tags = tag_names.split(',').map { |name| name.gsub(/\s+/, '') }

      new_tags = normalized_tags.map do |name|  # 既存のタグオブジェクトを取得または作成
        Tag.find_or_create_by(name:name)
      end
      
      self.tags = new_tags  # タグを比較、更新
    else
      self.tags.clear
    end
  end

  def at_least_a_cards
    if cards.size < 1
      errors.add(:cards, 'は最低1枚選択してください')
    end
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[created_at id name updated_at user_id]
  end

end
