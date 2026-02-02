import { Suspense, use } from 'react';

import { Code } from '@mantine/core';

import { getUser } from '../../../api/user/user.api';
import { DemoPanel } from '../../../components/demo/demo.panel';

const getUserPromise = getUser();

export const UseDemoContent = () => {
  const data = use(getUserPromise);

  return (
    <div>
      {data.firstName} {data.lastName}
    </div>
  );
};

export const UseDemo = () => {
  return (
    <DemoPanel
      title={<Code fz='inherit'>use()</Code>}
      value='use'
    >
      <Suspense fallback={<div>Loading...</div>}>
        <UseDemoContent />
      </Suspense>
    </DemoPanel>
  );
};
