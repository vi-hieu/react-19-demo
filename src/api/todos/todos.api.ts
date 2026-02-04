import { Resource } from '../constants';
import { fetcher } from '../fetch';
import { stringify } from '../utils';
import type { AddTodoPayload, GetTodosOptions, Todo, TodosResponse, UpdateTodoPayload } from './todos.types';

export const getTodos = async (options?: GetTodosOptions) => {
  const _options: GetTodosOptions = {
    limit: 5,
    skip: 0,
    ...options,
  };

  const params = stringify(_options);

  return fetcher<TodosResponse>(`${Resource.Todos}${params}`);
};

export const getTodo = async (id: number) => {
  return fetcher<Todo>(`${Resource.Todos}/${id.toString()}`);
};

export const addTodo = async (payload: AddTodoPayload) => {
  return fetcher<Todo>(`${Resource.Todos}/add`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const updateTodo = async (id: number, payload: UpdateTodoPayload) => {
  return fetcher<Todo>(`${Resource.Todos}/${id.toString()}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const deleteTodo = async (id: number) => {
  return fetcher<Todo>(`${Resource.Todos}/${id.toString()}`, {
    method: 'DELETE',
  });
};
