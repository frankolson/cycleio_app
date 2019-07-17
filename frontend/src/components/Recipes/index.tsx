import React,  { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { Recipe } from '../../types';
import { fetchRecipes } from '../../actions';

interface RecipesProps {
  dispatch: any;
  recipes: Recipe[];
  isAuthenticated: boolean;
}

class Recipes extends Component<RecipesProps, {}> {
  componentWillMount() {
    this.props.dispatch(fetchRecipes(this.props.isAuthenticated));
  }

  render() {
    return (
      <div className="row">
        {this.props.recipes.map((recipe: Recipe) => (
          <div className="col-sm-6 col-lg-4">
            <div className="card card-body mb-2">
              <h2>{recipe.title}</h2>
              <small>Favorites: {recipe.favorites_count || 0}</small>

              {recipe.favorited && (
                <Fragment>
                  <br />
                  <small><em>You have favorited this.</em></small>
                </Fragment>
              )}

              <div className="mt-4">
                {ReactHtmlParser(recipe.description)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Recipes;
