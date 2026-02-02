import { AppShell, type AppShellMainProps, Burger, Code, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { DemoTab } from '../demo/demo.tab';

export const Shell = ({ children, ...props }: AppShellMainProps) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      padding='md'
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger
          hiddenFrom='sm'
          opened={opened}
          size='sm'
          onClick={toggle}
        />

        <div>React 19 Demo</div>
      </AppShell.Header>

      <Tabs
        defaultValue='use'
        orientation='vertical'
      >
        <AppShell.Navbar>
          <Tabs.List>
            <DemoTab value='use'>
              <Code>use()</Code>
            </DemoTab>
            <DemoTab value='use-optimistic'>
              <Code>useOptimistic()</Code>
            </DemoTab>
          </Tabs.List>
        </AppShell.Navbar>

        <AppShell.Main {...props}>{children}</AppShell.Main>
      </Tabs>
    </AppShell>
  );
};
