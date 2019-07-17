json.(recipe, :title, :description, :created_at, :updated_at)
json.favorited signed_in? ? current_user.favorited?(recipe) : false
json.favorites_count recipe.favorites_count || 0