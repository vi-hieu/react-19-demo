import { CodeHighlightAdapterProvider } from '@mantine/code-highlight';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Shell } from './components/shell';
import { FormActionsDemo } from './demo/actions/form-actions';
import { UseContextDemo } from './demo/hooks/use-context';
import { UseOptimisticDemo } from './demo/hooks/use-optimistic';
import { UsePromiseDemo } from './demo/hooks/use-promise';
import { RefAsPropsDemo } from './demo/refs/ref-as-prop';
import { shikiAdapter } from './lib/shiki-adapter';
import { theme } from './theme';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantinex/demo/styles.css';
import './App.css';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <CodeHighlightAdapterProvider adapter={shikiAdapter}>
          <Shell>
            <UsePromiseDemo />

            <UseContextDemo />

            <UseOptimisticDemo />

            <FormActionsDemo />

            <RefAsPropsDemo />
          </Shell>
        </CodeHighlightAdapterProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
