import { Activity, useState } from 'react';

import {
  Badge,
  Button,
  Card,
  Code,
  Group,
  NumberInput,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { Demo } from '@mantinex/demo';
import { Clock, FileText, Settings } from 'lucide-react';

import { DemoPanel, InfoCard, StatusCard } from '../../../components/demo';

// Example: Counter component that maintains state
const CounterTab = ({ label }: { label: string }) => {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);

  return (
    <Card
      withBorder
      padding='lg'
    >
      <Stack gap='md'>
        <Group gap='sm'>
          <Clock size={20} />
          <Title order={4}>{label}</Title>
        </Group>

        <Text size='sm'>
          This tab maintains its state even when hidden. Try switching tabs and coming back - your count will be
          preserved!
        </Text>

        <Group gap='md'>
          <NumberInput
            label='Counter'
            value={count}
            onChange={val => {
              setCount(Number(val));
            }}
          />
          <div style={{ flex: 1 }}>
            <Text
              c='dimmed'
              mb={4}
              size='xs'
            >
              Quick actions
            </Text>
            <Group gap='xs'>
              <Button
                size='xs'
                onClick={() => {
                  setCount(c => c + 1);
                  setClicks(c => c + 1);
                }}
              >
                +1
              </Button>
              <Button
                size='xs'
                variant='light'
                onClick={() => {
                  setCount(c => c - 1);
                  setClicks(c => c + 1);
                }}
              >
                -1
              </Button>
              <Button
                color='red'
                size='xs'
                variant='subtle'
                onClick={() => {
                  setCount(0);
                  setClicks(c => c + 1);
                }}
              >
                Reset
              </Button>
            </Group>
          </div>
        </Group>

        <Badge
          color='blue'
          variant='dot'
        >
          Total interactions: {clicks}
        </Badge>
      </Stack>
    </Card>
  );
};

// Example: Form that maintains input
const FormTab = ({ label }: { label: string }) => {
  const [notes, setNotes] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (value: string) => {
    setNotes(value);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
  };

  return (
    <Card
      withBorder
      padding='lg'
    >
      <Stack gap='md'>
        <Group gap='sm'>
          <FileText size={20} />
          <Title order={4}>{label}</Title>
        </Group>

        <Text size='sm'>
          Type something in the textarea below, switch tabs, and come back. Your text will still be here!
        </Text>

        <Textarea
          label='Notes'
          minRows={4}
          placeholder='Start typing...'
          value={notes}
          onChange={e => {
            handleChange(e.currentTarget.value);
          }}
        />

        <Group gap='xs'>
          <Badge
            color='green'
            variant='light'
          >
            Characters: {notes.length}
          </Badge>
          <Badge
            color='violet'
            variant='light'
          >
            Words: {wordCount}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
};

// Example: Settings that maintain state
const SettingsTab = ({ label }: { label: string }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState(14);
  const [changes, setChanges] = useState(0);

  return (
    <Card
      withBorder
      padding='lg'
    >
      <Stack gap='md'>
        <Group gap='sm'>
          <Settings size={20} />
          <Title order={4}>{label}</Title>
        </Group>

        <Text size='sm'>Configure settings and switch tabs. When you return, all your choices are preserved.</Text>

        <div>
          <Text
            fw={500}
            mb='xs'
            size='sm'
          >
            Theme
          </Text>
          <SegmentedControl
            value={theme}
            data={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
            onChange={val => {
              setTheme(val as 'light' | 'dark');
              setChanges(c => c + 1);
            }}
          />
        </div>

        <NumberInput
          label='Font Size'
          max={24}
          min={10}
          value={fontSize}
          onChange={val => {
            setFontSize(Number(val));
            setChanges(c => c + 1);
          }}
        />

        <Card
          withBorder
          bg={theme === 'dark' ? 'dark.6' : 'gray.0'}
          c={theme === 'dark' ? 'white' : 'dark'}
          padding='sm'
        >
          <Text
            size='sm'
            style={{ fontSize }}
          >
            Preview: This text uses your settings
          </Text>
        </Card>

        <Badge
          color='grape'
          variant='dot'
        >
          Settings changed: {changes} times
        </Badge>
      </Stack>
    </Card>
  );
};

const ActivityDemo = ({ preserveState }: { preserveState: boolean }) => {
  const [activeTab, setActiveTab] = useState<'counter' | 'form' | 'settings'>('counter');

  return (
    <Stack
      gap='md'
      w={600}
    >
      <SegmentedControl
        fullWidth
        value={activeTab}
        data={[
          { value: 'counter', label: 'Counter' },
          { value: 'form', label: 'Form' },
          { value: 'settings', label: 'Settings' },
        ]}
        onChange={val => {
          setActiveTab(val as typeof activeTab);
        }}
      />

      {preserveState ? (
        <>
          {/* React 19.2: Activity component preserves state when hidden */}
          <Activity mode={activeTab === 'counter' ? 'visible' : 'hidden'}>
            <CounterTab label='Counter Tab' />
          </Activity>

          <Activity mode={activeTab === 'form' ? 'visible' : 'hidden'}>
            <FormTab label='Form Tab' />
          </Activity>

          <Activity mode={activeTab === 'settings' ? 'visible' : 'hidden'}>
            <SettingsTab label='Settings Tab' />
          </Activity>
        </>
      ) : (
        <>
          {/* Old way: Conditional rendering loses state */}
          {activeTab === 'counter' && <CounterTab label='Counter Tab (No Preservation)' />}
          {activeTab === 'form' && <FormTab label='Form Tab (No Preservation)' />}
          {activeTab === 'settings' && <SettingsTab label='Settings Tab (No Preservation)' />}
        </>
      )}

      <StatusCard
        activeTitle='State Preservation: ON'
        inactiveTitle='State Preservation: OFF'
        isActive={preserveState}
        activeContent={
          <>
            Using <Code fz='xs'>{'<Activity>'}</Code> component. Hidden tabs maintain their state. Try interacting with
            different tabs - all state persists when you switch back!
          </>
        }
        inactiveContent={
          <>
            Using conditional rendering. Hidden tabs are unmounted and lose their state. Try typing something, then
            switch tabs and come back - everything resets!
          </>
        }
      />

      <InfoCard
        title='React 19.2 Feature'
        type='feature'
      >
        The <Code fz='xs'>{'<Activity>'}</Code> component manages UI visibility while preserving component state. Set{' '}
        <Code fz='xs'>mode=&quot;visible&quot;</Code> or <Code fz='xs'>mode=&quot;hidden&quot;</Code> to control
        visibility without unmounting.
      </InfoCard>
    </Stack>
  );
};

export const ActivityDemoPanel = () => {
  return (
    <DemoPanel
      docsLink='https://react.dev/blog/2024/12/05/react-19'
      docsTitle='React 19 – React Blog'
      title='<Activity> Component'
      value='activity-component'
      description={
        <>
          React 19.2&apos;s <Code>{'<Activity>'}</Code> component manages UI visibility and state preservation. Perfect
          for tabs, accordions, and modals that need to maintain state when hidden.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: ActivityDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: activityCode, fileName: 'activity-tabs.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'boolean',
              prop: 'preserveState',
              initialValue: true,
              libraryValue: true,
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `
import { ActivityDemo } from './activity';

const Demo = () => {
  return <ActivityDemo{{props}} />;
};
`;

const activityCode = `
import { Activity, useState } from 'react';

const TabPanel = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('profile')}>Profile</button>
      </nav>

      {/* Activity preserves state when hidden */}
      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <HomeTab />
      </Activity>

      <Activity mode={activeTab === 'profile' ? 'visible' : 'hidden'}>
        <ProfileTab />
      </Activity>
    </div>
  );
};

const HomeTab = () => {
  const [count, setCount] = useState(0);

  // State is preserved when hidden!
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};
`;

const comparisonCode = `
import { Activity, useState } from 'react';

// ❌ Old way - conditional rendering loses state
const OldWay = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');

  return (
    <div>
      {activeTab === 'home' && <HomeTab />}
      {activeTab === 'profile' && <ProfileTab />}
      {/* Components unmount when condition is false - state is lost! */}
    </div>
  );
};

// ✅ New way with Activity - state is preserved
const NewWay = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');

  return (
    <div>
      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <HomeTab />
      </Activity>
      <Activity mode={activeTab === 'profile' ? 'visible' : 'hidden'}>
        <ProfileTab />
      </Activity>
      {/* Components stay mounted - state is preserved! */}
    </div>
  );
};

// 🎯 Benefits of Activity:
// 1. State preservation across visibility changes
// 2. No re-initialization when showing hidden content
// 3. Better UX - users don't lose their work
// 4. Performance - no unnecessary unmount/mount cycles
`;
