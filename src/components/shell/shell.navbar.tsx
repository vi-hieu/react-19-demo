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
  { value: 'use-deferred-value', label: 'useDeferredValue()' },
  { value: 'use-effect-event', label: 'useEffectEvent()' },
  { value: 'form-actions', label: 'Form Actions' },
  { value: 'ref-as-prop', label: 'ref as a prop' },
  { value: 'ref-callback-cleanup', label: 'Ref Callback Cleanup' },
  { value: 'activity-component', label: '<Activity> Component' },
  { value: 'context-without-provider', label: 'Context without Provider' },
  { value: 'document-metadata', label: 'Document Metadata' },
];

export const ShellNavbar = () => {
  return (
    <aside className='sticky top-15 z-100 h-[calc(100vh-3.75rem)] w-54 border-r'>
      <ScrollArea component='nav'>
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
    </aside>
  );
};
