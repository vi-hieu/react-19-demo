import { useFormStatus } from 'react-dom';

import { Button } from '@mantine/core';
import { LogIn } from 'lucide-react';

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      fullWidth
      leftSection={<LogIn size={18} />}
      loading={pending}
      type='submit'
    >
      {pending ? `Signing in...` : 'Sign in'}
    </Button>
  );
};
