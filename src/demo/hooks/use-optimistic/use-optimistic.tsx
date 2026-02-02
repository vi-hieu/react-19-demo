import { useOptimistic } from 'react';

import { Button, Code } from '@mantine/core';

import { DemoPanel } from '../../../components/demo/demo.panel';

export const UseOptimisticDemo = () => {
  const [users, setUsers] = useOptimistic([]);

  return (
    <DemoPanel
      title={<Code fz='inherit'>useOptimistic()</Code>}
      value='use-optimistic'
    >
      <div>Number of users: {users.length}</div>
      <Button
        onClick={() => {
          setUsers([]);
        }}
      >
        Add User
      </Button>
    </DemoPanel>
  );
};
