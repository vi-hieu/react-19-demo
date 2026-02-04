import { useActionState } from 'react';

import { Alert, Card, Code, Loader, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { AlertCircle, CheckCircle2Icon } from 'lucide-react';

import { login } from '../../../api/auth/auth.api';
import type { LoginResponse } from '../../../api/auth/auth.types';
import { DemoControls } from '../../../components/demo/demo.controls';
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

export const FormActionsDemo = () => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(loginAction, {});

  const showError = Boolean(state.error) && !isPending;
  const showSuccess = Boolean(state.success && state.data) && !isPending;

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
      <Stack gap='lg'>
        <DemoControls
          description={
            <>
              💡 Try logging in with <Code fz='xs'>emilys</Code> / <Code fz='xs'>emilyspass</Code> or{' '}
              <Code fz='xs'>michaelw</Code> / <Code fz='xs'>michaelwpass</Code>
            </>
          }
        >
          <Text
            c='dimmed'
            size='sm'
          >
            Form state is managed by <Code fz='xs'>useActionState</Code>, and the submit button automatically shows
            pending state via <Code fz='xs'>useFormStatus</Code>.
          </Text>
        </DemoControls>

        <Card
          withBorder
          className='max-w-md'
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
                defaultValue='emilys'
                label='Username'
                name='username'
                placeholder='Enter username'
              />

              <PasswordInput
                required
                defaultValue='emilyspass'
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
                    <Text
                      c='dimmed'
                      size='xs'
                    >
                      Refresh: {state.data?.refreshToken.substring(0, 20)}...
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
      </Stack>
    </DemoPanel>
  );
};
