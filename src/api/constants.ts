export const API_URL = 'https://dummyjson.com';

export const Resource = {
  Auth: '/auth',
  Products: '/products',
  Recipes: '/recipes',
  Users: '/users',
} as const;

export const QueryKey = {
  User: 'user',
  Users: 'users',
} as const;

export const CookieKey = {
  AccessToken: 'access-token',
} as const;
