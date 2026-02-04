import { useOptimistic, useState, useTransition } from 'react';

import { ActionIcon, Badge, Card, Code, Group, Stack, Text, TextInput } from '@mantine/core';
import { Check, Plus, Trash2, X } from 'lucide-react';

import type { Todo as ApiTodo } from '../../../api/todos/todos.types';
import { DemoControls } from '../../../components/demo/demo.controls';
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

export const UseOptimisticDemo = () => {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

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

      try {
        // Simulate API call with delay
        await delay(1500);

        // Actual state update after "API" completes
        const newId = Math.max(...todos.map(t => t.id), 0) + 1;

        setTodos(prev => [...prev, { id: newId, todo: text, completed: false, userId: 1 }]);
      } catch {
        // Handle error - would need to revert optimistic update
      }
    });
  };

  const handleToggleTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) return;

    startTransition(async () => {
      setOptimisticTodos({ type: 'toggle', id });

      try {
        // Simulate API call with delay
        await delay(1200);

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
        // Simulate API call with delay
        await delay(1000);

        setTodos(prev => prev.filter(t => t.id !== id));
      } catch {
        // Handle error - would need to restore the todo
      }
    });
  };

  return (
    <DemoPanel
      title='useOptimistic()'
      value='use-optimistic'
      description={
        <>
          Demonstration of <Code>useOptimistic()</Code> for instant UI updates with simulated async operations (1-1.5s
          delays).
        </>
      }
    >
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
    </DemoPanel>
  );
};
