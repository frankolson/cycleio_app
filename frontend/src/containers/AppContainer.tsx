import { connect } from 'react-redux'

import App from '../components/App';
import { Store } from '../types';

function mapStateToProps(state: Store) {
  const {
    auth: { isAuthenticated, errorMessage },
    recipes
  } = state

  return {
    isAuthenticated,
    errorMessage,
    recipes: recipes.recipes || [],
  }
}

export default connect(mapStateToProps)(App);
