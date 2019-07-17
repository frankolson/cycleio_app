class RecipesController < ApplicationController
  # GET /recipes
  def index
    @recipes = Recipe.all
    render json: @recipes
  end

  # GET /recipes/1
  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end
end
