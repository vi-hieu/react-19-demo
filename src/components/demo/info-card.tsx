import { Card, Code, Text } from '@mantine/core';
import { AlertCircle, Info, Lightbulb, Sparkles, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

interface InfoCardProps {
  type?: 'tip' | 'feature' | 'warning' | 'performance' | 'info';
  title: string;
  children: ReactNode;
  className?: string;
}

const iconMap = {
  tip: Lightbulb,
  feature: Sparkles,
  warning: AlertCircle,
  performance: Zap,
  info: Info,
};

const colorMap = {
  tip: 'blue.0',
  feature: 'blue.0',
  warning: 'yellow.0',
  performance: 'blue.0',
  info: 'gray.0',
};

export const InfoCard = ({ type = 'tip', title, children, className }: InfoCardProps) => {
  const Icon = iconMap[type];
  const bgColor = colorMap[type];

  return (
    <Card
      withBorder
      bg={bgColor}
      padding='md'
      className={className}
    >
      <Text
        fw={600}
        mb='xs'
        size='sm'
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <Icon size={16} />
        {title}
      </Text>
      <Text size='xs'>{children}</Text>
    </Card>
  );
};
