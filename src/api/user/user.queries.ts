import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '../constants';
import { getUser, getUsers } from './user.api';
import type { FilterUsersParams, GetUsersPayload } from './user.types';

export const useGetUser = (id: number) =>
  useQuery({
    queryFn: () => getUser(id),
    queryKey: [QueryKey.User, id],
  });

export const useGetUsers = (options?: GetUsersPayload, filter?: string | FilterUsersParams) =>
  useQuery({
    queryFn: () => getUsers(options, filter),
    queryKey: [QueryKey.Users, options, filter],
  });
