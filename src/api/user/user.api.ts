import { Resource } from '../constants';
import { fetcher } from '../fetch';
import type { User } from './user.types';

export const getUser = async () => fetcher<User>(`${Resource.Users}/1`);
