json.ignore_nil! false
json.extract! recipe, :title, :description, :created_at, :updated_at
json.favorites_count  recipe.favorites_count || 0
json.favorited        signed_in? ? current_user.favorited?(recipe) : false