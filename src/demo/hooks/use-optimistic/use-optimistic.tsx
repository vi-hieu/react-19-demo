import { useOptimistic, useState, useTransition } from 'react';

import { ActionIcon, Badge, Card, Code, Group, Stack, Text, TextInput } from '@mantine/core';
import { Demo } from '@mantinex/demo';
import { Check, Plus, Trash2, X } from 'lucide-react';

import type { Todo as ApiTodo } from '../../../api/todos/todos.types';
import { DemoPanel } from '../../../components/demo/demo.panel';

interface Todo extends ApiTodo {
  isPending?: boolean;
}

type OptimisticAction =
  | { type: 'add'; todo: string; tempId: number }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number };

const INITIAL_TODOS: Todo[] = [
  { id: 1, todo: 'Learn React 19', completed: true, userId: 1 },
  { id: 2, todo: 'Try useOptimistic hook', completed: false, userId: 1 },
  { id: 3, todo: 'Build awesome UIs', completed: false, userId: 1 },
];

// Simulate API delay
const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const OptimisticTodoList = ({ apiDelay, enableErrors }: { apiDelay: number; enableErrors: boolean }) => {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;

    const tempId = Math.floor(Math.random() * -1000000);
    const text = newTodoText;

    setNewTodoText('');

    startTransition(async () => {
      // Optimistic update happens immediately
      setOptimisticTodos({ type: 'add', todo: text, tempId });
      setError(null);

      try {
        // Simulate API call with delay
        await delay(apiDelay);

        // Simulate controlled failures based on enableErrors
        if (enableErrors) {
          throw new Error('Failed to add todo');
        }

        // Actual state update after "API" completes
        const newId = Math.max(...todos.map(t => t.id), 0) + 1;

        setTodos(prev => [...prev, { id: newId, todo: text, completed: false, userId: 1 }]);
      } catch (err) {
        // Error handling: optimistic update automatically reverts when transition completes
        // because we don't update the real state
        setError((err as Error).message);
        console.error('Failed to add todo:', err);
      }
    });
  };

  const handleToggleTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) return;

    startTransition(async () => {
      setOptimisticTodos({ type: 'toggle', id });
      setError(null);

      try {
        // Simulate API call with delay
        await delay(apiDelay);

        // Simulate controlled failures based on enableErrors
        if (enableErrors) {
          throw new Error('Failed to toggle todo');
        }

        setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
      } catch (err) {
        // Optimistic update reverts automatically
        setError((err as Error).message);
        console.error('Failed to toggle todo:', err);
      }
    });
  };

  const handleDeleteTodo = (id: number) => {
    startTransition(async () => {
      setOptimisticTodos({ type: 'delete', id });
      setError(null);

      try {
        // Simulate API call with delay
        await delay(apiDelay);

        // Simulate controlled failures based on enableErrors
        if (enableErrors) {
          throw new Error('Failed to delete todo');
        }

        setTodos(prev => prev.filter(t => t.id !== id));
      } catch (err) {
        // Optimistic update reverts: deleted todo reappears
        setError((err as Error).message);
        console.error('Failed to delete todo:', err);
      }
    });
  };

  return (
    <Stack
      gap='md'
      w={400}
    >
      {error ? (
        <Card
          withBorder
          bg='red.0'
          c='red.9'
          padding='sm'
          radius='md'
        >
          <Group gap='xs'>
            <X size={16} />
            <Text size='sm'>{error}</Text>
          </Group>
        </Card>
      ) : null}

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

export const UseOptimisticDemo = () => {
  return (
    <DemoPanel
      docsLink='https://react.dev/reference/react/useOptimistic'
      docsTitle='useOptimistic – React'
      title='useOptimistic()'
      value='use-optimistic'
      description={
        <>
          Demonstration of <Code>useOptimistic()</Code> for instant UI updates while async operations complete.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: OptimisticTodoList,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: hookCode, fileName: 'use-optimistic-todos.tsx', language: 'tsx' },
            { code: reducerCode, fileName: 'optimistic-reducer.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'number',
              prop: 'apiDelay',
              initialValue: 1500,
              libraryValue: 1500,
              min: 500,
              max: 3000,
              step: 500,
            },
            {
              type: 'boolean',
              prop: 'enableErrors',
              initialValue: false,
              libraryValue: false,
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `import { useState, useTransition } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    optimisticReducer
  );
  const [isPending, startTransition] = useTransition();

  const handleAddTodo = (text: string) => {
    startTransition(async () => {
      // Optimistic update happens immediately
      setOptimisticTodos({ type: 'add', todo: text, tempId: -1 });

      // API call (with{{props}}.apiDelay delay)
      await addTodoAPI(text);

      // Actual state update after API completes
      setTodos(prev => [...prev, newTodo]);
    });
  };

  return <TodoList todos={optimisticTodos} />;
};`;

const hookCode = `import { useOptimistic } from 'react';

type OptimisticAction =
  | { type: 'add'; todo: string; tempId: number }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number };

const [optimisticTodos, setOptimisticTodos] = useOptimistic(
  todos,
  (state: Todo[], action: OptimisticAction) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          { id: action.tempId, todo: action.todo, isPending: true }
        ];

      case 'toggle':
        return state.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed, isPending: true }
            : todo
        );

      case 'delete':
        return state.filter(todo => todo.id !== action.id);

      default:
        return state;
    }
  }
);`;

const reducerCode = `// The optimistic reducer shows instant UI feedback
// Then the actual state updates after the API responds

// 1️⃣ User clicks "Add Todo"
setOptimisticTodos({ type: 'add', todo: 'New task', tempId: -1 });
// ✅ UI shows new todo immediately (with isPending: true)

// 2️⃣ API call happens in background
await delay(1500);

// 3️⃣ Real state updates with actual ID from server
setTodos(prev => [...prev, { id: 123, todo: 'New task' }]);
// ✅ UI replaces optimistic todo with real one

// Benefits:
// - Instant feedback (no loading spinner)
// - Smooth UX even with slow APIs
// - Automatic rollback on errors`;
