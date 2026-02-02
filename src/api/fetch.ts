import { API_URL, CookieKey } from './constants';

export const fetcher = async <T>(input: string | URL | Request, init?: RequestInit) => {
  const url = typeof input === 'string' && !input.startsWith('http') ? `${API_URL}${input}` : input;

  const accessToken = (await cookieStore.get(CookieKey.AccessToken))?.value;

  const headers = new Headers(init?.headers);

  headers.set('Content-Type', 'application/json');

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const _init: RequestInit = {
    ...init,
    headers,
  };

  const response = await fetch(url, _init);

  if (!response.ok) {
    const errorResponse = (await response.json()) as { message: string };

    throw new Error(errorResponse.message || 'Network response was not ok');
  }

  return response.json() as Promise<T>;
};
