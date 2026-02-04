import { Resource } from '../constants';
import { fetcher } from '../fetch';
import { stringify } from '../utils';
import type { FilterUsersParams, GetUsersPayload, GetUsersResponse, User } from './user.types';

export const getUser = async (id: number) => fetcher<User>(`${Resource.Users}/${id.toString()}`);

export const getUsers = async (options?: GetUsersPayload, filter?: string | FilterUsersParams) => {
  const _options: GetUsersPayload = {
    limit: 50,
    skip: 0,
    ...options,
  };

  if (!filter) {
    const params = stringify(_options);

    return fetcher<GetUsersResponse>(`${Resource.Users}${params}`);
  }

  if (typeof filter === 'string') {
    const params = stringify({ q: filter, ..._options });

    return fetcher<GetUsersResponse>(`${Resource.Users}/search${params}`);
  }

  const params = stringify({ filter, ..._options });

  return fetcher<GetUsersResponse>(`${Resource.Users}/filter${params}`);
};
