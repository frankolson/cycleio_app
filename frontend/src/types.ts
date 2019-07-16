export interface Auth {
  isFetching: boolean;
  isAuthenticated: boolean;
  errorMessage?: string;
  user?: Creds;
}

export interface Recipes {}

export interface Store {
  auth: Auth;
  recipes: Recipes;
}

export interface User {
  id_token: string;
}

export interface Creds {
  email: string;
  password: string;
}