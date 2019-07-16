import React from 'react';

import Navbar from '../Navbar'
import Recipes from '../Recipes'
import './App.css';

interface AppProps {
  dispatch: any;
  isAuthenticated: boolean;
  errorMessage?: string;
}

const App: React.FC<AppProps> = ({ dispatch, isAuthenticated, errorMessage }) => {
  return (
    <div className="App">
      <Navbar
        isAuthenticated={isAuthenticated}
        errorMessage={errorMessage}
        dispatch={dispatch}
      />
      <Recipes />
    </div>
  );
}

export default App;
