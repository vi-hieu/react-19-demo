import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '../constants';
import { getUser, getUsers } from './user.api';

export const useGetUser = () =>
  useQuery({
    queryFn: () => getUser(),
    queryKey: [QueryKey.User],
  });

export const useGetUsers = () =>
  useQuery({
    queryFn: () => getUsers(),
    queryKey: [QueryKey.Users],
  });
