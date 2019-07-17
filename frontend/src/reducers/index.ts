import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, AUTH_ACTIONS,
  RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE, RECIPE_ACTIONS
} from '../actions'
import { Auth, Recipes } from '../types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state: Auth = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action: AUTH_ACTIONS) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

function recipes(state: Recipes = {
  isFetching: false,
  recipes: [],
}, action: RECIPE_ACTIONS) {
  switch (action.type) {
    case RECIPES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIPES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        recipes: action.response,
      })
    case RECIPES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

export default combineReducers({
  auth,
  recipes
});