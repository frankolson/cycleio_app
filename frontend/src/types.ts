export interface Auth {
  isFetching: boolean;
  isAuthenticated: boolean;
  errorMessage?: string;
  user?: Creds;
}

export interface Recipes {
  isFetching: boolean;
  errorMessage?: string;
  recipes: Recipe[];
}

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

export interface Recipe {
  title: string;
  description: string;
  favorited: boolean;
  favorites_count: number;
}