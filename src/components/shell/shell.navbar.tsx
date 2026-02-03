import { AppShell, ScrollArea, Tabs } from '@mantine/core';

import { DemoTab } from '../demo/demo.tab';

interface NavbarItem {
  value: string;
  label: React.ReactNode;
}

const items: NavbarItem[] = [
  { value: 'use', label: 'use' },
  { value: 'use-optimistic', label: 'useOptimistic' },
];

export const ShellNavbar = () => {
  return (
    <AppShell.Navbar>
      <ScrollArea>
        <Tabs.List
          h='100%'
          p={12}
        >
          {items.map(item => (
            <DemoTab
              key={item.value}
              value={item.value}
            >
              {item.label}
            </DemoTab>
          ))}
        </Tabs.List>
      </ScrollArea>
    </AppShell.Navbar>
  );
};
