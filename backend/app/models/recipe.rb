class Recipe < ApplicationRecord
  has_many :favorites, dependent: :destroy

  scope :favorited_by, -> (user) { joins(:favorites).where(favorites: { user: user }) }
end
