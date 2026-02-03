import { use, useOptimistic, useState, useTransition } from 'react';

import { ActionIcon, Badge, Card, Code, Group, Stack, Text, TextInput } from '@mantine/core';
import { Check, Plus, Trash2, X } from 'lucide-react';

import { addTodo, deleteTodo, updateTodo } from '../../../api/todos/todos.api';
import type { Todo as ApiTodo, TodosResponse } from '../../../api/todos/todos.types';
import { DemoControls } from '../../../components/demo/demo.controls';

interface Todo extends ApiTodo {
  isPending?: boolean;
}

type OptimisticAction =
  | { type: 'add'; todo: string; tempId: number }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number };

interface UseOptimisticContentProps {
  todosPromise: Promise<TodosResponse>;
}

export const UseOptimisticContent = ({ todosPromise }: UseOptimisticContentProps) => {
  const data = use(todosPromise);
  const [todos, setTodos] = useState<Todo[]>(data.todos);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (state: Todo[], action: OptimisticAction) => {
    switch (action.type) {
      case 'add':
        return [...state, { id: action.tempId, todo: action.todo, completed: false, userId: 1, isPending: true }];

      case 'toggle': {
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed, isPending: true } : todo,
        );
      }

      case 'delete':
        return state.filter(todo => todo.id !== action.id);
      default:
        return state;
    }
  });

  const [isPending, startTransition] = useTransition();
  const [newTodoText, setNewTodoText] = useState('');
  const [tempId, setTempId] = useState(-1);

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;

    const currentTempId = tempId;
    const text = newTodoText;

    setNewTodoText('');
    setTempId(prev => prev - 1);

    startTransition(async () => {
      // Optimistic update happens immediately
      setOptimisticTodos({ type: 'add', todo: text, tempId: currentTempId });

      try {
        // Real API call
        const newTodo = await addTodo({ todo: text, completed: false, userId: 1 });

        // Actual state update after API completes
        setTodos(prev => [...prev, newTodo]);
      } catch {
        // Handle error - would need to revert optimistic update
        setTodos(prev => prev.filter(t => t.id !== currentTempId));
      }
    });
  };

  const handleToggleTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) return;

    startTransition(async () => {
      setOptimisticTodos({ type: 'toggle', id });

      try {
        await updateTodo(id, { completed: !todo.completed });
        setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
      } catch {
        // Handle error
      }
    });
  };

  const handleDeleteTodo = (id: number) => {
    startTransition(async () => {
      setOptimisticTodos({ type: 'delete', id });

      try {
        await deleteTodo(id);
        setTodos(prev => prev.filter(t => t.id !== id));
      } catch {
        // Handle error - would need to restore the todo
      }
    });
  };

  return (
    <Stack gap='lg'>
      <DemoControls
        description={
          <>
            💡 New todos appear instantly via <Code fz='xs'>useOptimistic</Code>, then confirm when the API responds
          </>
        }
      >
        <Group gap='sm'>
          <TextInput
            flex={1}
            placeholder='Enter a new todo...'
            value={newTodoText}
            onChange={e => {
              setNewTodoText(e.currentTarget.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddTodo();
            }}
          />
          <ActionIcon
            disabled={!newTodoText.trim() || isPending}
            size='lg'
            variant='filled'
            onClick={handleAddTodo}
          >
            <Plus size={18} />
          </ActionIcon>
        </Group>
      </DemoControls>

      <Stack gap='sm'>
        {optimisticTodos.length === 0 ? (
          <Card
            withBorder
            padding='md'
            radius='md'
          >
            <Text
              c='dimmed'
              ta='center'
            >
              No todos yet. Add one above!
            </Text>
          </Card>
        ) : null}

        {optimisticTodos.map(todo => (
          <Card
            key={todo.id}
            withBorder
            padding='md'
            radius='md'
            style={{
              opacity: todo.isPending ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <Group
              gap='md'
              justify='space-between'
            >
              <Group gap='md'>
                <ActionIcon
                  color={todo.completed ? 'green' : 'gray'}
                  size='lg'
                  variant='light'
                  onClick={() => {
                    handleToggleTodo(todo.id);
                  }}
                >
                  {todo.completed ? <Check size={18} /> : <X size={18} />}
                </ActionIcon>
                <div>
                  <Text
                    fw={500}
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.todo}
                  </Text>
                </div>
              </Group>
              <Group gap='xs'>
                {todo.isPending ? (
                  <Badge
                    color='blue'
                    size='sm'
                    variant='dot'
                  >
                    Pending...
                  </Badge>
                ) : null}
                <ActionIcon
                  color='red'
                  size='lg'
                  variant='light'
                  onClick={() => {
                    handleDeleteTodo(todo.id);
                  }}
                >
                  <Trash2 size={18} />
                </ActionIcon>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
