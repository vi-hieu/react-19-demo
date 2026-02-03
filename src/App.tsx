import { MantineProvider } from '@mantine/core';

import { Shell } from './components/shell';
import { UseDemo } from './demo/hooks/use';
import { UseOptimisticDemo } from './demo/hooks/use-optimistic';
import { theme } from './theme';

import '@mantine/core/styles.css';
import './App.css';

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Shell>
        <UseDemo />
        <UseOptimisticDemo />
      </Shell>
    </MantineProvider>
  );
};

export default App;
