class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist

  has_many :favorites, dependent: :destroy

  def favorite(recipe)
    favorites.find_or_create_by(recipe: recipe)
  end

  def unfavorite(recipe)
    favorites.where(recipe: recipe).destroy_all

    recipe.reload
  end

  def favorited?(recipe)
    favorites.find_by(recipe_id: recipe.id).present?
  end
end
