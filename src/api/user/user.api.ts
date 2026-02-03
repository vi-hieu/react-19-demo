import { Resource } from '../constants';
import { fetcher } from '../fetch';
import type { FilterUsersParams, User } from './user.types';

export const getUser = async () => fetcher<User>(`${Resource.Users}/1`);

export const getUsers = async () => fetcher<User[]>(Resource.Users);

export const getUsers = async (params: FilterUsersParams) => {
  const query = new URLSearchParams();

  if (params.search) {
    query.append('search', params.search.toString());
  }

  if (params.key && params.value) {
    query.append(params.key, params.value.toString());
  }

  const queryString = query.toString() ? `?${query.toString()}` : '';

  return fetcher<User[]>(`${Resource.Users}${queryString}`);
};
