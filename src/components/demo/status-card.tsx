import { Card, Code, Text } from '@mantine/core';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface StatusCardProps {
  isActive: boolean;
  activeTitle: string;
  inactiveTitle: string;
  activeContent: ReactNode;
  inactiveContent: ReactNode;
  className?: string;
}

export const StatusCard = ({
  isActive,
  activeTitle,
  inactiveTitle,
  activeContent,
  inactiveContent,
  className,
}: StatusCardProps) => {
  return (
    <Card
      withBorder
      bg={isActive ? 'green.0' : 'orange.0'}
      padding='md'
      className={className}
    >
      <Text
        fw={600}
        mb='xs'
        size='sm'
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        {isActive ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
        {isActive ? activeTitle : inactiveTitle}
      </Text>
      <Text size='xs'>{isActive ? activeContent : inactiveContent}</Text>
    </Card>
  );
};
