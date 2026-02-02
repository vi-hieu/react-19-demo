import { Code, Tabs, type TabsTabProps } from '@mantine/core';

export const DemoTab = ({ children, ...props }: TabsTabProps) => {
  return (
    <Tabs.Tab {...props}>
      <Code fz='inherit'>{children}</Code>
    </Tabs.Tab>
  );
};
