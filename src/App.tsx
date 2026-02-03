import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Shell } from './components/shell';
import { UseContextDemo } from './demo/hooks/use-context';
import { UseOptimisticDemo } from './demo/hooks/use-optimistic';
import { UsePromise } from './demo/hooks/use-promise';
import { theme } from './theme';

import '@mantine/core/styles.css';
import './App.css';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Shell>
          <UsePromise />

          <UseContextDemo />

          <UseOptimisticDemo />
        </Shell>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
