import { Suspense } from 'react';

import { Code } from '@mantine/core';

import { getTodos } from '../../../api/todos/todos.api';
import { DemoPanel } from '../../../components/demo/demo.panel';
import { UseOptimisticContent } from './use-optimistic.content';
import { UseOptimisticSkeleton } from './use-optimistic.skeleton';

export const UseOptimisticDemo = () => {
  const todosPromise = getTodos({ limit: 5 });

  return (
    <DemoPanel
      title='useOptimistic()'
      value='use-optimistic'
      description={
        <>
          Demonstration of <Code>useOptimistic()</Code> for instant UI updates combined with <Code>use()</Code> for data
          fetching. Uses DummyJSON todos API.
        </>
      }
    >
      <Suspense fallback={<UseOptimisticSkeleton />}>
        <UseOptimisticContent todosPromise={todosPromise} />
      </Suspense>
    </DemoPanel>
  );
};
