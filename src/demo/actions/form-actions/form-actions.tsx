import { useActionState } from 'react';

import { Alert, Card, Code, Loader, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { Demo } from '@mantinex/demo';
import { AlertCircle, CheckCircle2Icon } from 'lucide-react';

import { login } from '../../../api/auth/auth.api';
import type { LoginResponse } from '../../../api/auth/auth.types';
import { DemoPanel } from '../../../components/demo/demo.panel';
import { SubmitButton } from './form-actions.submit-button';

interface FormState {
  error?: string;
  success?: boolean;
  data?: LoginResponse;
}

const loginAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  try {
    await new Promise(res => {
      setTimeout(res, 2000);
    });

    const response = await login({ username, password, expiresInMins: 30 });

    return { success: true, data: response };
  } catch (error) {
    return { error: (error as Error).message || 'Login failed. Please try again.' };
  }
};

const LoginForm = ({ defaultUsername, defaultPassword }: { defaultUsername: string; defaultPassword: string }) => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(loginAction, {});

  const showError = Boolean(state.error) && !isPending;
  const showSuccess = Boolean(state.success && state.data) && !isPending;

  return (
    <Card
      withBorder
      padding='lg'
    >
      <form action={formAction}>
        <Stack gap='md'>
          <Text
            fw={600}
            size='lg'
          >
            Sign in to your account
          </Text>

          <TextInput
            required
            defaultValue={defaultUsername}
            label='Username'
            name='username'
            placeholder='Enter username'
          />

          <PasswordInput
            required
            defaultValue={defaultPassword}
            label='Password'
            name='password'
            placeholder='Enter password'
          />

          <SubmitButton />

          {showError ? (
            <Alert
              color='red'
              icon={<AlertCircle size={18} />}
              title='Error'
            >
              {state.error}
            </Alert>
          ) : null}

          {showSuccess ? (
            <Alert
              color='green'
              icon={<CheckCircle2Icon size={18} />}
              title='Success'
            >
              <Stack gap='xs'>
                <Text size='sm'>Welcome back, {state.data?.username}!</Text>
                <Text
                  c='dimmed'
                  size='xs'
                >
                  Token: {state.data?.accessToken.substring(0, 20)}...
                </Text>
              </Stack>
            </Alert>
          ) : null}

          {isPending ? (
            <Alert
              color='blue'
              icon={<Loader size='xs' />}
              title='Submitting...'
            />
          ) : null}
        </Stack>
      </form>
    </Card>
  );
};

export const FormActionsDemo = () => {
  return (
    <DemoPanel
      title='Form Actions'
      value='form-actions'
      description={
        <>
          Demonstration of React 19&apos;s <Code>useActionState()</Code> hook for form handling and{' '}
          <Code>useFormStatus()</Code> for submit button state. No <Code>onSubmit</Code> handlers needed!
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: LoginForm,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: actionCode, fileName: 'login-action.tsx', language: 'tsx' },
            { code: submitButtonCode, fileName: 'submit-button.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'select',
              prop: 'defaultUsername',
              initialValue: 'emilys',
              libraryValue: 'emilys',
              data: [
                { value: 'emilys', label: 'emilys' },
                { value: 'michaelw', label: 'michaelw' },
              ],
            },
            {
              type: 'select',
              prop: 'defaultPassword',
              initialValue: 'emilyspass',
              libraryValue: 'emilyspass',
              data: [
                { value: 'emilyspass', label: 'emilyspass' },
                { value: 'michaelwpass', label: 'michaelwpass' },
              ],
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `import { useActionState } from 'react';

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    {}
  );

  return (
    <form action={formAction}>
      <input name="username" defaultValue={{props}}.defaultUsername />
      <input name="password" defaultValue={{props}}.defaultPassword />
      <SubmitButton />

      {state.error && <Alert color="red">{state.error}</Alert>}
      {state.success && <Alert color="green">Success!</Alert>}
    </form>
  );
};
`;

const actionCode = `interface FormState {
  error?: string;
  success?: boolean;
  data?: LoginResponse;
}

const loginAction = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  try {
    await delay(2000); // Simulate network delay

    const response = await login({ username, password });

    return { success: true, data: response };
  } catch (error) {
    return { error: 'Login failed. Please try again.' };
  }
};
`;

const submitButtonCode = `import { useFormStatus } from 'react';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
};

// Key benefits:
// - No manual loading state management
// - Button automatically knows form status
// - Works with any form action
// - Progressively enhanced forms
`;
