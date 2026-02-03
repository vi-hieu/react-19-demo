import { createContext, use, useState } from 'react';

import { Badge, Button, Card, Code, Group, Stack, Text, Title } from '@mantine/core';

import { DemoControls } from '../../../components/demo/demo.controls';
import { DemoPanel } from '../../../components/demo/demo.panel';

interface ThemeContextValue {
  primary: string;
  secondary: string;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const UserCard = ({ userId, showTheme }: { userId: number; showTheme: boolean }) => {
  if (userId <= 0) {
    return (
      <Card
        withBorder
        padding='md'
        radius='md'
      >
        <Text c='dimmed'>No user selected</Text>
      </Card>
    );
  }

  const theme = showTheme ? use(ThemeContext) : null;

  return (
    <Card
      withBorder
      padding='md'
      radius='md'
      style={{
        borderColor: theme?.primary,
        backgroundColor: theme?.mode === 'dark' ? '#1a1a1a' : undefined,
      }}
    >
      <Stack gap='sm'>
        <Title
          c={theme?.mode === 'dark' ? 'white' : undefined}
          order={4}
        >
          User #{userId}
        </Title>
        {theme ? (
          <Group gap='xs'>
            <Badge
              color='blue'
              variant='light'
            >
              Theme: {theme.mode}
            </Badge>
            <Badge
              style={{ backgroundColor: theme.primary, color: 'white' }}
              variant='light'
            >
              Primary
            </Badge>
            <Badge
              style={{ backgroundColor: theme.secondary, color: 'white' }}
              variant='light'
            >
              Secondary
            </Badge>
          </Group>
        ) : null}
        {!theme && (
          <Text
            c='dimmed'
            size='sm'
          >
            Theme disabled
          </Text>
        )}
      </Stack>
    </Card>
  );
};

const UserList = ({ userIds, showTheme }: { userIds: number[]; showTheme: boolean }) => {
  return (
    <Stack gap='md'>
      {userIds.map(userId => {
        return (
          <UserCard
            key={userId}
            showTheme={showTheme}
            userId={userId}
          />
        );
      })}
    </Stack>
  );
};

export const UseContextDemo = () => {
  const [showTheme, setShowTheme] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const themeValue: ThemeContextValue = {
    primary: themeMode === 'light' ? '#228be6' : '#1c7ed6',
    secondary: themeMode === 'light' ? '#fa5252' : '#c92a2a',
    mode: themeMode,
  };

  return (
    <DemoPanel
      title='use(Context)'
      value='use-context'
      description={
        <>
          Demonstration of the <Code>use()</Code> hook for reading Context values conditionally, which is not possible
          with <Code>useContext()</Code>.
        </>
      }
    >
      <Stack gap='lg'>
        <DemoControls
          description={
            <>
              💡 <Code>use()</Code> is called conditionally based on <Code>showTheme</Code> state, which would violate
              Rules of Hooks with <Code>useContext()</Code>
            </>
          }
        >
          <Group gap='md'>
            <Button
              size='sm'
              variant={showTheme ? 'filled' : 'light'}
              onClick={() => {
                setShowTheme(!showTheme);
              }}
            >
              {showTheme ? 'Disable' : 'Enable'} Theme Context
            </Button>
            <Button
              disabled={!showTheme}
              size='sm'
              variant='outline'
              onClick={() => {
                setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
              }}
            >
              Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </Group>
        </DemoControls>

        <ThemeContext.Provider value={themeValue}>
          <UserList
            showTheme={showTheme}
            userIds={[1, 2, 3]}
          />
        </ThemeContext.Provider>
      </Stack>
    </DemoPanel>
  );
};
