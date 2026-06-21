import { cookies } from 'next/headers';
import {
  REFRESH_TOKEN_COOKIE,
  TOKEN_COOKIE,
} from '@/lib/api-config';

type AuthTokenResponse =
  | string
  | {
      access_token?: string;
      refresh_token?: string;
    };

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function setAuthCookies(data: AuthTokenResponse) {
  const cookieStore = await cookies();
  const accessToken = typeof data === 'string' ? data : data.access_token;
  const refreshToken = typeof data === 'object' ? data.refresh_token : undefined;

  if (accessToken) {
    cookieStore.set(TOKEN_COOKIE, accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  if (refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export function isAuthPath(path: string[]): boolean {
  const normalizedPath = path.join('/').replace(/\/$/, '');
  return (
    normalizedPath === 'api/v1/login' ||
    normalizedPath === 'api/v1/token' ||
    normalizedPath === 'v1/login' ||
    normalizedPath === 'v1/token'
  );
}
