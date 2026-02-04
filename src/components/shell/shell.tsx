import { Group, Tabs, Text } from '@mantine/core';
import { useQueryState } from 'nuqs';

import ReactLogo from '../../assets/react.svg';
import { ShellNavbar } from './shell.navbar';

export const Shell = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const [tab, setTab] = useQueryState('tabs', { defaultValue: 'use-promise', clearOnDefault: false });

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-100 flex h-15 w-full items-center border-b bg-white px-4'>
        <Group
          className='container'
          gap='sm'
        >
          <img
            alt='React Logo'
            className='h-10 w-10'
            src={ReactLogo}
          />
          <Text
            fw={600}
            fz='h2'
          >
            React 19 Demo
          </Text>
        </Group>
      </header>

      <Tabs
        className='container flex'
        defaultValue='use-promise'
        keepMounted={false}
        orientation='vertical'
        value={tab}
        variant='pills'
        onChange={value => void setTab(value)}
      >
        <ShellNavbar />

        <main
          className='flex-1 px-12 py-8'
          {...props}
        >
          {children}
        </main>
      </Tabs>
    </div>
  );
};
