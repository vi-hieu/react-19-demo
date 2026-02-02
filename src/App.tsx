import { MantineProvider } from '@mantine/core';

import { Shell } from './components/shell';
import { UseDemo } from './demo/hooks/use';
import { UseOptimisticDemo } from './demo/hooks/use-optimistic';

import '@mantine/core/styles.css';
import './App.css';

const App = () => {
  return (
    <MantineProvider>
      <Shell>
        <UseDemo />
        <UseOptimisticDemo />
      </Shell>
    </MantineProvider>
  );
};

export default App;
