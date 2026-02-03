import { Tabs, type TabsPanelProps, Text, Title } from '@mantine/core';

interface DemoPanelProps extends Omit<TabsPanelProps, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const DemoPanel = ({ title, description, children, ...props }: DemoPanelProps) => {
  return (
    <Tabs.Panel {...props}>
      <Title
        mb={20}
        order={1}
      >
        {title}
      </Title>

      <Text
        c='dimmed'
        mb={20}
      >
        {description}
      </Text>
      {children}
    </Tabs.Panel>
  );
};
