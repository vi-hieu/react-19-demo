import { createContext, useContext } from 'react';

import { Badge, Card, Code, Group, Stack, Text, Title } from '@mantine/core';
import { Demo } from '@mantinex/demo';

import { DemoPanel, InfoCard } from '../../../components/demo';

interface ThemeContextValue {
  primary: string;
  secondary: string;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ThemedCard = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    return (
      <Card
        withBorder
        padding='md'
        radius='md'
      >
        <Text c='dimmed'>No theme available</Text>
      </Card>
    );
  }

  return (
    <Card
      withBorder
      padding='lg'
      radius='md'
      style={{
        borderColor: theme.primary,
        backgroundColor: theme.mode === 'dark' ? '#1a1a1a' : undefined,
      }}
    >
      <Stack gap='md'>
        <Title
          c={theme.mode === 'dark' ? 'white' : undefined}
          order={4}
        >
          Themed Content
        </Title>
        <Text
          c={theme.mode === 'dark' ? 'gray.4' : 'dimmed'}
          size='sm'
        >
          This card is styled using theme context values.
        </Text>
        <Group gap='xs'>
          <Badge
            color={theme.mode === 'dark' ? 'blue' : 'cyan'}
            variant='light'
          >
            {theme.mode} mode
          </Badge>
          <Badge
            color='grape'
            variant='dot'
          >
            Primary: {theme.primary}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
};

const ContextWithoutProviderDemo = ({ themeMode }: { themeMode: 'light' | 'dark' }) => {
  const themeValue: ThemeContextValue = {
    primary: themeMode === 'light' ? '#228be6' : '#1c7ed6',
    secondary: themeMode === 'light' ? '#fa5252' : '#c92a2a',
    mode: themeMode,
  };

  return (
    <Stack gap='md'>
      {/* React 19: Render context directly instead of Context.Provider */}
      <ThemeContext value={themeValue}>
        <ThemedCard />
      </ThemeContext>

      <InfoCard
        title={`What's New in React 19`}
        type='tip'
      >
        In React 19, you can render <Code fz='xs'>{'<ThemeContext value={...}>'}</Code> directly instead of{' '}
        <Code fz='xs'>{'<ThemeContext.Provider value={...}>'}</Code>. The old syntax still works, but the new syntax is
        more concise!
      </InfoCard>
    </Stack>
  );
};

export const ContextWithoutProviderDemoPanel = () => {
  return (
    <DemoPanel
      docsLink='https://react.dev/blog/2024/12/05/react-19#context-as-a-provider'
      docsTitle='React 19 – React Blog'
      title='Context without Provider'
      value='context-without-provider'
      description={
        <>
          React 19 allows rendering context directly: <Code>{'<Context value={...}>'}</Code> instead of{' '}
          <Code>{'<Context.Provider value={...}>'}</Code> for cleaner syntax.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: ContextWithoutProviderDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
            { code: contextCode, fileName: 'theme-context.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'segmented',
              prop: 'themeMode',
              initialValue: 'light',
              libraryValue: 'light',
              data: [
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ],
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `
import { ContextWithoutProviderDemo } from './context-without-provider';

const Demo = () => {
  return <ContextWithoutProviderDemo{{props}} />;
};
`;

const comparisonCode = `
import { createContext } from 'react';

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

// ❌ Old way (still works)
const OldWay = () => {
  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemedCard />
    </ThemeContext.Provider>
  );
};

// ✅ New way in React 19
const NewWay = () => {
  return (
    <ThemeContext value={themeValue}>
      <ThemedCard />
    </ThemeContext>
  );
}
`;

const contextCode = `
import { createContext, useContext } from 'react';

interface ThemeContextValue {
  primary: string;
  secondary: string;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ color: theme?.primary }}>
      {theme?.mode} theme active
    </div>
  );
};

// React 19: Direct rendering
const App = () => {
  const themeValue = {
    primary: '#228be6',
    secondary: '#fa5252',
    mode: 'light' as const,
  };

  return (
    <ThemeContext value={themeValue}>
      <ThemedComponent />
    </ThemeContext>
  );
}
`;
