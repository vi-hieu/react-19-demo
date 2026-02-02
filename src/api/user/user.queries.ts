import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '../constants';
import { getUser } from './user.api';

export const useGetUser = () =>
  useQuery({
    queryFn: () => getUser(),
    queryKey: [QueryKey.User],
  });
