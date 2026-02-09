import { CodeHighlightAdapterProvider } from '@mantine/code-highlight';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Shell } from './components/shell';
import { FormActionsDemo } from './demo/actions/form-actions';
import { ActivityDemoPanel } from './demo/components/activity';
import { ContextWithoutProviderDemoPanel } from './demo/context/context-without-provider';
import { UseContextDemo } from './demo/hooks/use-context';
import { UseDeferredValueDemoPanel } from './demo/hooks/use-deferred-value';
import { UseEffectEventDemoPanel } from './demo/hooks/use-effect-event';
import { UseOptimisticDemo } from './demo/hooks/use-optimistic';
import { UsePromiseDemo } from './demo/hooks/use-promise';
import { DocumentMetadataDemo } from './demo/metadata/document-metadata';
import { RefAsPropsDemo } from './demo/refs/ref-as-prop';
import { RefCallbackCleanupDemoPanel } from './demo/refs/ref-callback-cleanup';
import { shikiAdapter } from './lib/shiki-adapter';
import { theme } from './theme';

import './App.css';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantinex/demo/styles.css';

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

            <UseDeferredValueDemoPanel />

            <UseEffectEventDemoPanel />

            <FormActionsDemo />

            <RefAsPropsDemo />

            <RefCallbackCleanupDemoPanel />

            <ActivityDemoPanel />

            <ContextWithoutProviderDemoPanel />

            <DocumentMetadataDemo />
          </Shell>
        </CodeHighlightAdapterProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
