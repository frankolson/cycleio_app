import { Creds, User, Recipe } from "../types";
import { CALL_API } from '../middleware/api'

// Constants and constant types
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export type LOGIN_REQUEST = typeof LOGIN_REQUEST;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export type LOGOUT_REQUEST = typeof LOGOUT_REQUEST;

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export type LOGOUT_SUCCESS = typeof LOGOUT_SUCCESS;

export const RECIPES_REQUEST = 'RECIPES_REQUEST'
export type RECIPES_REQUEST = typeof RECIPES_REQUEST;

export const RECIPES_SUCCESS = 'RECIPES_SUCCESS'
export type RECIPES_SUCCESS = typeof RECIPES_SUCCESS;

export const RECIPES_FAILURE = 'RECIPES_FAILURE'
export type RECIPES_FAILURE = typeof RECIPES_FAILURE;

// Action interfaces
export interface RequestLogin {
  type: LOGIN_REQUEST;
  isFetching: boolean;
  isAuthenticated: boolean;
  creds: Creds;
}

export interface ReceiveLogin {
  type: LOGIN_SUCCESS;
  isFetching: boolean;
  isAuthenticated: boolean;
  id_token: string;
}

export interface LoginError {
  type: LOGIN_FAILURE;
  isFetching: boolean;
  isAuthenticated: boolean;
  message: string;
}

export interface RequestLogout {
  type: LOGOUT_REQUEST;
  isFetching: boolean;
  isAuthenticated: boolean;
}

export interface ReceiveLogout {
  type: LOGOUT_SUCCESS;
  isFetching: boolean;
  isAuthenticated: boolean;
}

export interface RequestRecipes {
  type: RECIPES_REQUEST;
  isFetching: boolean;
}

export interface ReceiveRecipes {
  type: RECIPES_SUCCESS;
  isFetching: boolean;
  response: Recipe[];
}

export interface RecipesError {
  type: RECIPES_FAILURE;
  isFetching: boolean;
  message: string;
}

export type AUTH_ACTIONS = RequestLogin | ReceiveLogin | LoginError | RequestLogout | ReceiveLogout;
export type RECIPE_ACTIONS = RequestRecipes | ReceiveRecipes | RecipesError;


// Action creators
function requestLogin(creds: Creds): RequestLogin {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user: User): ReceiveLogin {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message: string): LoginError {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout(): RequestLogout {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout(): ReceiveLogout {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function fetchRecipes(isAuthenticated: boolean) {
  return {
    [CALL_API]: {
      endpoint: 'recipes',
      types: [RECIPES_REQUEST, RECIPES_SUCCESS, RECIPES_FAILURE],
      authenticated: isAuthenticated,
    }
  }
}

// Login function
export function loginUser(creds: Creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `user[email]=${creds.email}&user[password]=${creds.password}`
  }

  return (dispatch: any) => {
    dispatch(requestLogin(creds));

    return fetch('http://localhost:8000/login', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.message))
        } else {
          localStorage.setItem('id_token', response.headers.get('Authorization') || '')

          dispatch(receiveLogin(user))
        }
      }).catch((err: any) => console.log("Error: ", err))
  }
}

// Logout function
export function logoutUser() {
  return (dispatch: any) => {
    dispatch(requestLogout())

    localStorage.removeItem('id_token')

    dispatch(receiveLogout())
  }
}