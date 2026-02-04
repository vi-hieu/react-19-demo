import { useSuspenseQuery } from '@tanstack/react-query';

import { QueryKey } from '../constants';
import { getTodos } from './todos.api';
import type { GetTodosOptions } from './todos.types';

export const useGetTodos = (options?: GetTodosOptions) =>
  useSuspenseQuery({
    queryFn: () => getTodos(options),
    queryKey: [QueryKey.Todos, options],
  });
