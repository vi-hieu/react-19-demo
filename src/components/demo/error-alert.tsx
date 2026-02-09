import { Card, Text } from '@mantine/core';
import { XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface ErrorAlertProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const ErrorAlert = ({
  title = 'Error',
  children,
  className,
}: ErrorAlertProps) => {
  return (
    <Card withBorder bg='red.0' padding='md' className={className}>
      <Text
        fw={600}
        mb='xs'
        size='sm'
        c='red.9'
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <XCircle size={16} />
        {title}
      </Text>
      <Text size='xs' c='red.9'>
        {children}
      </Text>
    </Card>
  );
};
