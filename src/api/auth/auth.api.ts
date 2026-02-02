import { Resource } from '../constants';
import { fetcher } from '../fetch';
import type { User } from '../user/user.types';
import type { LoginPayload, LoginResponse } from './auth.types';

export const login = async (payload: LoginPayload) =>
  fetcher<LoginResponse>(`${Resource.Auth}/login`, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

export const getCurrentUser = async () => fetcher<User>(`${Resource.Auth}/me`);
