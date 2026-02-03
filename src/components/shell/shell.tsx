import { Tabs, Text } from '@mantine/core';

import { ShellNavbar } from './shell.navbar';

export const Shell = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className='flex min-h-screen flex-col pt-15'>
      <header className='fixed top-0 z-100 flex h-15 w-full items-center border-b px-4'>
        <div className='container'>
          <Text
            fw={600}
            fz='h2'
          >
            React 19 Demo
          </Text>
        </div>
      </header>

      <Tabs
        className='container flex'
        defaultValue='use-promise'
        keepMounted={false}
        orientation='vertical'
        variant='pills'
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
