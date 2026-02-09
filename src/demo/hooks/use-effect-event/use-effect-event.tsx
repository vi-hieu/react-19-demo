import { useEffect, useEffectEvent, useState } from 'react';

import { Badge, Card, Code, Group, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import { Demo } from '@mantinex/demo';
import { Radio, WifiOff } from 'lucide-react';

import { DemoPanel, InfoCard, StatusCard } from '../../../components/demo';

// Simulate a chat connection
class ChatConnection {
  roomId: string;
  onMessage: (msg: string) => void;
  interval: ReturnType<typeof setInterval> | null = null;

  constructor(roomId: string, onMessage: (msg: string) => void) {
    this.roomId = roomId;
    this.onMessage = onMessage;
  }

  connect() {
    console.log(`📡 Connecting to room: ${this.roomId}`);

    // Simulate receiving messages
    const messages = [
      'Welcome to the chat!',
      'How are you today?',
      'This is a test message',
      'React 19.2 is awesome!',
      'useEffectEvent is super useful',
    ];

    let index = 0;

    this.interval = setInterval(() => {
      if (index < messages.length) {
        this.onMessage(messages[index]);
        index++;
      }
    }, 3000);
  }

  disconnect() {
    console.log(`🔌 Disconnecting from room: ${this.roomId}`);

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Component using useEffectEvent
const ChatRoom = ({
  roomId,
  theme,
  notifications,
}: {
  roomId: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}) => {
  const [messages, setMessages] = useState<{ text: string; theme: string; time: string }[]>([]);
  const [connectionCount, setConnectionCount] = useState(0);

  // useEffectEvent: Extract non-reactive logic from effects
  // theme and notifications can be accessed but won't cause reconnection
  const onMessage = useEffectEvent((message: string) => {
    const timestamp = new Date().toLocaleTimeString();

    console.log(`📨 Message received in ${theme} theme:`, message);

    setMessages(prev => [
      ...prev,
      {
        text: message,
        theme,
        time: timestamp,
      },
    ]);

    if (notifications) {
      console.log('🔔 Notification sent');
    }
  });

  useEffect(() => {
    // Only reconnect when roomId changes, NOT when theme or notifications change!
    setConnectionCount(c => c + 1);

    const connection = new ChatConnection(roomId, onMessage);

    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId]); // theme and notifications NOT in dependencies!

  return (
    <Card
      withBorder
      padding='lg'
    >
      <Stack gap='md'>
        <Group
          gap='sm'
          justify='space-between'
        >
          <Group gap='sm'>
            <Radio
              color={theme === 'dark' ? '#4dabf7' : '#228be6'}
              size={20}
            />
            <Title order={4}>Room: {roomId}</Title>
          </Group>
          <Badge
            color='green'
            variant='dot'
          >
            Connected
          </Badge>
        </Group>

        <Group gap='xs'>
          <Badge
            color='blue'
            variant='light'
          >
            Theme: {theme}
          </Badge>
          <Badge
            color={notifications ? 'green' : 'gray'}
            variant='light'
          >
            Notifications: {notifications ? 'ON' : 'OFF'}
          </Badge>
          <Badge
            color='orange'
            variant='dot'
          >
            Connections: {connectionCount}
          </Badge>
        </Group>

        <Stack
          gap='xs'
          style={{
            maxHeight: 200,
            overflowY: 'auto',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
            padding: 12,
            borderRadius: 8,
          }}
        >
          {messages.length === 0 ? (
            <Text
              c='dimmed'
              size='sm'
              ta='center'
            >
              Waiting for messages...
            </Text>
          ) : (
            messages.map((msg, idx) => (
              <Card
                key={idx}
                withBorder
                bg={msg.theme === 'dark' ? 'dark.6' : 'white'}
                padding='xs'
              >
                <Text
                  c={msg.theme === 'dark' ? 'white' : 'dark'}
                  size='sm'
                >
                  {msg.text}
                </Text>
                <Text
                  c='dimmed'
                  size='xs'
                >
                  {msg.time} • {msg.theme} theme
                </Text>
              </Card>
            ))
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

// Component WITHOUT useEffectEvent (for comparison)
const ChatRoomOldWay = ({
  roomId,
  theme,
  notifications,
}: {
  roomId: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}) => {
  const [messages, setMessages] = useState<{ text: string; theme: string; time: string }[]>([]);
  const [connectionCount, setConnectionCount] = useState(0);

  useEffect(() => {
    // PROBLEM: Effect runs whenever theme or notifications change
    // This causes unnecessary reconnections!
    setConnectionCount(c => c + 1);

    const connection = new ChatConnection(roomId, message => {
      const timestamp = new Date().toLocaleTimeString();

      console.log(`📨 [OLD WAY] Message in ${theme} theme:`, message);

      setMessages(prev => [
        ...prev,
        {
          text: message,
          theme,
          time: timestamp,
        },
      ]);

      if (notifications) {
        console.log('🔔 [OLD WAY] Notification sent');
      }
    });

    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId, theme, notifications]); // All dependencies cause reconnection

  return (
    <Card
      withBorder
      padding='lg'
    >
      <Stack gap='md'>
        <Group
          gap='sm'
          justify='space-between'
        >
          <Group gap='sm'>
            <WifiOff
              color='#fa5252'
              size={20}
            />
            <Title order={4}>Room: {roomId} (Old Way)</Title>
          </Group>
          <Badge
            color='red'
            variant='dot'
          >
            Reconnects Often
          </Badge>
        </Group>

        <Group gap='xs'>
          <Badge
            color='blue'
            variant='light'
          >
            Theme: {theme}
          </Badge>
          <Badge
            color={notifications ? 'green' : 'gray'}
            variant='light'
          >
            Notifications: {notifications ? 'ON' : 'OFF'}
          </Badge>
          <Badge
            color='red'
            variant='dot'
          >
            Connections: {connectionCount}
          </Badge>
        </Group>

        <Stack
          gap='xs'
          style={{
            maxHeight: 200,
            overflowY: 'auto',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
            padding: 12,
            borderRadius: 8,
          }}
        >
          {messages.length === 0 ? (
            <Text
              c='dimmed'
              size='sm'
              ta='center'
            >
              Waiting for messages...
            </Text>
          ) : (
            messages.map((msg, idx) => (
              <Card
                key={idx}
                withBorder
                bg={msg.theme === 'dark' ? 'dark.6' : 'white'}
                padding='xs'
              >
                <Text
                  c={msg.theme === 'dark' ? 'white' : 'dark'}
                  size='sm'
                >
                  {msg.text}
                </Text>
                <Text
                  c='dimmed'
                  size='xs'
                >
                  {msg.time} • {msg.theme} theme
                </Text>
              </Card>
            ))
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

const UseEffectEventDemo = ({ useNewAPI }: { useNewAPI: boolean }) => {
  const [roomId, setRoomId] = useState('general');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);

  return (
    <Stack
      gap='md'
      w={700}
    >
      <Card
        withBorder
        padding='md'
      >
        <Stack gap='md'>
          <Text
            fw={600}
            size='sm'
          >
            Controls
          </Text>

          <div>
            <Text
              mb='xs'
              size='sm'
            >
              Room
            </Text>
            <SegmentedControl
              value={roomId}
              data={[
                { value: 'general', label: 'General' },
                { value: 'random', label: 'Random' },
                { value: 'tech', label: 'Tech' },
              ]}
              onChange={setRoomId}
            />
          </div>

          <div>
            <Text
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
              }}
            />
          </div>

          <div>
            <Text
              mb='xs'
              size='sm'
            >
              Notifications
            </Text>
            <SegmentedControl
              value={notifications ? 'on' : 'off'}
              data={[
                { value: 'on', label: 'ON' },
                { value: 'off', label: 'OFF' },
              ]}
              onChange={val => {
                setNotifications(val === 'on');
              }}
            />
          </div>
        </Stack>
      </Card>

      {useNewAPI ? (
        <ChatRoom
          notifications={notifications}
          roomId={roomId}
          theme={theme}
        />
      ) : (
        <ChatRoomOldWay
          notifications={notifications}
          roomId={roomId}
          theme={theme}
        />
      )}

      <StatusCard
        isActive={useNewAPI}
        activeTitle='Using useEffectEvent'
        inactiveTitle='Old Way (without useEffectEvent)'
        activeContent={
          <>
            With <Code fz='xs'>useEffectEvent</Code>, the chat only reconnects when the room changes. Try changing the
            theme or notifications - the connection count stays the same! The effect can access the latest values
            without re-running.
          </>
        }
        inactiveContent={
          <>
            Without <Code fz='xs'>useEffectEvent</Code>, changing theme or notifications causes the chat to disconnect
            and reconnect. Watch the connection count increase every time you change these settings!
          </>
        }
      />

      <InfoCard
        title='React 19.2 Feature'
        type='feature'
      >
        <Code fz='xs'>useEffectEvent()</Code> extracts non-reactive logic from effects. Use it when you need to access
        the latest props/state inside an effect without making the effect depend on them. Perfect for event handlers,
        logging, and analytics in effects!
      </InfoCard>
    </Stack>
  );
};

export const UseEffectEventDemoPanel = () => {
  return (
    <DemoPanel
      docsLink='https://react.dev/blog/2024/12/05/react-19'
      docsTitle='React 19 – React Blog'
      title='useEffectEvent()'
      value='use-effect-event'
      description={
        <>
          React 19.2&apos;s <Code>useEffectEvent()</Code> allows extracting non-reactive logic from effects, solving the
          common problem of needing to access latest values without re-running the effect.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: UseEffectEventDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: hookCode, fileName: 'chat-room.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'boolean',
              prop: 'useNewAPI',
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
import { UseEffectEventDemo } from './use-effect-event';

const Demo = () => {
  return <UseEffectEventDemo{{props}} />;
};
`;

const hookCode = `
import { useEffect, useEffectEvent, useState } from 'react';

interface Message {
  text: string;
  theme: string;
}

interface Props {
  roomId: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}

const ChatRoom = ({ roomId, theme, notifications }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffectEvent: Extract non-reactive logic
  // theme and notifications can be accessed without causing re-runs
  const onMessage = useEffectEvent((message: string) => {
    console.log(\`Message received in \${theme} theme:\`, message);

    setMessages(prev => [...prev, {
      text: message,
      theme: theme
    }]);

    if (notifications) {
      showNotification(message);
    }
  });

  useEffect(() => {
    // Only reconnect when roomId changes!
    const connection = createConnection(roomId, onMessage);
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId]); // theme and notifications NOT in deps!

  return <MessageList messages={messages} />;
};
`;

const comparisonCode = `
import { useEffect, useEffectEvent } from 'react';

interface Props {
  roomId: string;
  theme: 'light' | 'dark';
}

// ❌ Old way - theme changes cause reconnection
const OldWay = ({ roomId, theme }: Props) => {
  useEffect(() => {
    const connection = createConnection(roomId, (msg) => {
      // Need to use theme, so must include in dependencies
      console.log(\`Message in \${theme} theme:\`, msg);
    });

    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]); // theme change = reconnection!
};

// ✅ New way - only roomId changes cause reconnection
const NewWay = ({ roomId, theme }: Props) => {
  const onMessage = useEffectEvent((msg: string) => {
    // Can access latest theme without dependency
    console.log(\`Message in \${theme} theme:\`, msg);
  });

  useEffect(() => {
    const connection = createConnection(roomId, onMessage);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // Only roomId in deps!
};

// 🎯 Benefits of useEffectEvent:
// 1. Access latest values without effect re-runs
// 2. Cleaner than ref workarounds
// 3. Better performance - fewer effect executions
// 4. Separates reactive from non-reactive logic
`;
