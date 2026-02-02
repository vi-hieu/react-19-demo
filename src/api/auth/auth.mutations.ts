import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { login } from './auth.api';
import type { LoginPayload, LoginResponse } from './auth.types';

type UseLoginOptions = Omit<UseMutationOptions<LoginResponse, Error, LoginPayload>, 'mutationFn'>;

export const useLogin = (options?: UseLoginOptions) =>
  useMutation({
    mutationFn: login,
    ...options,
  });
