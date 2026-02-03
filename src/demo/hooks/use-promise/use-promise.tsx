import { Suspense, useState } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { Alert, Button, Code, NumberInput, Stack } from '@mantine/core';

import { getUser } from '../../../api/user/user.api';
import { DemoControls } from '../../../components/demo/demo.controls';
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

export const UsePromise = () => {
  const [resetKey, setResetKey] = useState(0);
  const [id, setId] = useState<string | number>(1);

  const _id = typeof id === 'number' ? id : parseInt(id, 10);

  const userPromise = getUser(_id);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

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
      <Stack gap='lg'>
        <DemoControls>
          <NumberInput
            label='User ID'
            value={id}
            w={120}
            onChange={setId}
          />
        </DemoControls>

        <ErrorBoundary
          FallbackComponent={UsePromiseErrorFallback}
          resetKeys={[resetKey]}
          onReset={handleReset}
        >
          <Suspense fallback={<UsePromiseSkeleton />}>
            <UsePromiseContent userPromise={userPromise} />
          </Suspense>
        </ErrorBoundary>
      </Stack>
    </DemoPanel>
  );
};
