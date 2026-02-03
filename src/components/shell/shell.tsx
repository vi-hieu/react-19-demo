import { AppShell, type AppShellMainProps, Burger, Tabs, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { ShellNavbar } from './shell.navbar';

export const Shell = ({ children, ...props }: AppShellMainProps) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      padding='md'
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header className='flex items-center px-4'>
        <Burger
          hiddenFrom='sm'
          opened={opened}
          size='sm'
          onClick={toggle}
        />

        <Text
          fw={600}
          fz='h2'
        >
          React 19 Demo
        </Text>
      </AppShell.Header>

      <Tabs
        defaultValue='use'
        orientation='vertical'
        variant='pills'
      >
        <ShellNavbar />

        <AppShell.Main {...props}>{children}</AppShell.Main>
      </Tabs>
    </AppShell>
  );
};
