export const API_KEY_HEADER = 'X-API-Key';

export const TOKEN_COOKIE = 'token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

export function getApiKey(): string | undefined {
  return process.env.API_KEY;
}

export function getBaseUrl(): string | undefined {
  return process.env.BASE_URL;
}
