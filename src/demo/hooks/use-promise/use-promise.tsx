import { Suspense, useState } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { Alert, Button, Code, Stack } from '@mantine/core';
import { Demo } from '@mantinex/demo';

import { getUser } from '../../../api/user/user.api';
import { DemoPanel } from '../../../components/demo/demo.panel';
import { UsePromiseContent } from './use-promise.content';
import { UsePromiseSkeleton } from './use-promise.skeleton';

const UsePromiseErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Alert
    color='red'
    title='Error loading user data'
    variant='light'
  >
    <Stack gap='sm'>
      <div>{(error as Error | undefined)?.message ?? 'An error occurred while fetching data'}</div>
      <Button
        color='red'
        size='sm'
        variant='light'
        onClick={resetErrorBoundary}
      >
        Try Again
      </Button>
    </Stack>
  </Alert>
);

export const UsePromise = ({ id }: { id: number }) => {
  const [resetKey, setResetKey] = useState(0);

  const userPromise = getUser(id);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <ErrorBoundary
      FallbackComponent={UsePromiseErrorFallback}
      resetKeys={[resetKey]}
      onReset={handleReset}
    >
      <Suspense fallback={<UsePromiseSkeleton />}>
        <UsePromiseContent userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  );
};

export const UsePromiseDemo = () => {
  return (
    <DemoPanel
      title='use(promise)'
      value='use-promise'
      description={
        <>
          Demonstration of the <Code>use()</Code> hook for unwrapping promises. Shows all three promise states: pending
          (Suspense), fulfilled (data display), and rejected (Error Boundary).
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: UsePromise,
          centered: true,
          code: [
            { code: usageCode, fileName: 'Demo.tsx', language: 'tsx' },
            { code: userPromiseCode, fileName: 'use-promise.tsx', language: 'tsx' },
            { code: userPromiseContentCode, fileName: 'use-promise.content.tsx', language: 'tsx' },
          ],
          dimmed: true,
          controls: [
            {
              type: 'number',
              prop: 'id',
              initialValue: 1,
              libraryValue: 1,
              max: 10,
              min: 1,
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `
import { UsePromise } from './use-promise';

const Demo = () => {
 return <UserPromise{{props}} />;
}
`;

const userPromiseCode = `
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const UserPromise = ({ id }: { id: number }) => {
  const userPromise = getUser(id)

  return (
    <ErrorBoundary FallbackComponent={/* Error Fallback Component */}>
      <Suspense fallback={<p>>Loading user data...</p>}>
        <UsePromiseContent userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
`;

const userPromiseContentCode = `
import { use } from 'react';

export const UsePromiseContent = ({ userPromise }: {
  userPromise: Promise<User>;
}) => {
  const data = use(userPromise);

  return (/* JSX to display user data */);
}
`;
