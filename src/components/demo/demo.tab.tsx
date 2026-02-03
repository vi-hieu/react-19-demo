import { Tabs, type TabsTabProps } from '@mantine/core';

import classNames from './demo.tab.module.css';

export const DemoTab = ({ children, ...props }: TabsTabProps) => {
  return (
    <Tabs.Tab
      classNames={classNames}
      {...props}
    >
      {children}
    </Tabs.Tab>
  );
};
