import { type ReactNode } from 'react';

import { Card, Stack, Text } from '@mantine/core';

interface DemoControlsProps {
  children: ReactNode;
  description?: ReactNode;
}

export const DemoControls = ({ children, description }: DemoControlsProps) => {
  return (
    <Card
      withBorder
      bg='gray.0'
      padding='md'
      radius='md'
    >
      <Stack gap='md'>
        <Text
          fw={600}
          size='sm'
        >
          Controls
        </Text>
        {children}
        {description ? (
          <Text
            c='dimmed'
            size='xs'
          >
            {description}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
};
