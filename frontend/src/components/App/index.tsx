import React, { Fragment } from 'react';

import Navbar from '../Navbar'
import Recipes from '../Recipes'
import { Recipe } from '../../types';

interface AppProps {
  dispatch: any;
  isAuthenticated: boolean;
  errorMessage?: string;
  recipes: Recipe[];
}

const App: React.FC<AppProps> = ({ dispatch, isAuthenticated, errorMessage, recipes }) => {
  return (
    <Fragment>
      <Navbar
        isAuthenticated={isAuthenticated}
        errorMessage={errorMessage}
        dispatch={dispatch}
      />

      <div className="container p-2">
        <Recipes
          recipes={recipes}
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </Fragment>
  );
}

export default App;
