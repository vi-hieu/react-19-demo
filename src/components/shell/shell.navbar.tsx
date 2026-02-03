import { ScrollArea, Tabs } from '@mantine/core';

import { DemoTab } from '../demo/demo.tab';

interface NavbarItem {
  value: string;
  label: React.ReactNode;
}

const items: NavbarItem[] = [
  { value: 'use-promise', label: 'use(promise)' },
  { value: 'use-context', label: 'use(Context)' },
  { value: 'use-optimistic', label: 'useOptimistic()' },
];

export const ShellNavbar = () => {
  return (
    <aside className='sticky top-15 z-100 h-[calc(100vh-3.75rem)] w-60 border-r'>
      <ScrollArea component='nav'>
        <Tabs.List
          h='100%'
          pr={12}
          py={12}
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
    </aside>
  );
};
