import { createContext, use } from 'react';

import { Badge, Card, Code, Skeleton, Stack, Text, Title } from '@mantine/core';
import { Demo } from '@mantinex/demo';

import { useGetUsers } from '../../../api/user/user.queries';
import { DemoPanel } from '../../../components/demo/demo.panel';

interface ThemeContextValue {
  primary: string;
  secondary: string;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const UserCard = ({ name, email, enableTheme }: { name: string; email: string; enableTheme: boolean }) => {
  const theme = enableTheme ? use(ThemeContext) : null;

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
      <Stack gap='xs'>
        <Title
          c={theme?.mode === 'dark' ? 'white' : undefined}
          order={5}
        >
          {name}
        </Title>
        <Text
          c={theme?.mode === 'dark' ? 'gray.4' : 'dimmed'}
          size='sm'
        >
          {email}
        </Text>
        {theme ? (
          <Badge
            color={theme.mode === 'dark' ? 'blue' : 'cyan'}
            size='sm'
            variant='light'
          >
            {theme.mode} theme
          </Badge>
        ) : (
          <Text
            c='dimmed'
            size='xs'
          >
            Theme disabled
          </Text>
        )}
      </Stack>
    </Card>
  );
};

const ContextDemo = ({
  limit,
  enableTheme,
  themeMode,
}: {
  limit: number;
  enableTheme: boolean;
  themeMode: 'light' | 'dark';
}) => {
  const { data, isLoading } = useGetUsers({ limit, skip: 0 });

  const themeValue: ThemeContextValue = {
    primary: themeMode === 'light' ? '#228be6' : '#1c7ed6',
    secondary: themeMode === 'light' ? '#fa5252' : '#c92a2a',
    mode: themeMode,
  };

  if (isLoading) {
    return (
      <Stack gap='sm'>
        {Array.from({ length: limit }).map((_, idx) => (
          <Skeleton
            key={idx}
            height={100}
            radius='md'
          />
        ))}
      </Stack>
    );
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <Stack gap='sm'>
        {data?.users.map(user => (
          <UserCard
            key={user.id}
            email={user.email}
            enableTheme={enableTheme}
            name={`${user.firstName} ${user.lastName}`}
          />
        ))}
      </Stack>
    </ThemeContext.Provider>
  );
};

export const UseContextDemo = () => {
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
      <Demo
        data={{
          type: 'configurator',
          component: ContextDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: componentCode, fileName: 'user-card.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'number',
              prop: 'limit',
              initialValue: 3,
              libraryValue: 3,
              min: 1,
              max: 10,
            },
            {
              type: 'boolean',
              prop: 'enableTheme',
              initialValue: true,
              libraryValue: true,
            },
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
import { useGetUsers } from './api/user';

const Demo = () => {
  const themeValue = {
    primary: '#228be6',
    secondary: '#fa5252',
    mode: 'light',
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserList{{props}} />
    </ThemeContext.Provider>
  );
};
`;

const componentCode = `import { createContext, use } from 'react';

const ThemeContext = createContext<ThemeContextValue | null>(null);

const UserList = ({
  limit,
  enableTheme,
  themeMode,
}: {
  limit: number;
  enableTheme: boolean;
  themeMode: 'light' | 'dark';
}) => {
  const { data: users } = useGetUsers({ limit });

  return (
    <div>
      {data?.users.map(user => (
        <UserCard
          key={user.id}
          name={\`\${user.firstName} \${user.lastName}\`}
          email={user.email}
          enableTheme={enableTheme}
        />
      ))}
    </div>
  )
};


const UserCard = ({ name, email, enableTheme }: Props) => {
  /** React 19: \`use()\` can be called conditionally */
  /** This would violate Rules of Hooks with \`useContext()\` */
  const theme = enableTheme ? use(ThemeContext) : null;

  return (
    <Card style={{ borderColor: theme?.primary }}>
      <h5>{name}</h5>
      <p>{email}</p>
      {theme ? (
        <Badge>{theme.mode} theme</Badge>
      ) : (
        <span>Theme disabled</span>
      )}
    </Card>
  );
};
`;

const comparisonCode = `
/** \`useContext()\` must be called unconditionally */
const Component = ({ showTheme }) => {
  // Breaks Rules of Hooks
  const theme = showTheme ? useContext(ThemeContext) : null;

  return <div>{theme?.mode}</div>;
};

/** \`use()\` can be called conditionally */
const Component = ({ showTheme }) => {
  // Works
  const theme = showTheme ? use(ThemeContext) : null;

  return <div>{theme?.mode}</div>;
};
`;
