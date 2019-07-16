import { connect } from 'react-redux'

import App from '../components/App';
import { Store } from '../types';

function mapStateToProps(state: Store) {
  const { auth: { isAuthenticated, errorMessage } } = state

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);
