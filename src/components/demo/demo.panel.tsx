import { Tabs, type TabsPanelProps, Title } from '@mantine/core';

interface DemoPanelProps extends Omit<TabsPanelProps, 'title'> {
  title: React.ReactNode;
}

export const DemoPanel = ({ title, children, ...props }: DemoPanelProps) => {
  return (
    <Tabs.Panel {...props}>
      <Title
        mb={20}
        order={1}
      >
        {title}
      </Title>
      {children}
    </Tabs.Panel>
  );
};
