import { useState } from 'react';

import { Badge, Card, Code, Group, Stack, Text, Title } from '@mantine/core';
import { Demo } from '@mantinex/demo';
import { Eye, EyeOff } from 'lucide-react';

import { DemoPanel, InfoCard } from '../../../components/demo';

const ObservedCard = ({ threshold }: { threshold: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entryCount, setEntryCount] = useState(0);

  // React 19: Ref callbacks can return cleanup functions!
  const observerRef = (element: HTMLDivElement | null) => {
    if (element) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            setIsVisible(entry.isIntersecting);
            setEntryCount(prev => prev + 1);
          });
        },
        { threshold },
      );

      observer.observe(element);

      // Return cleanup function - called when element is removed or ref changes
      return () => {
        observer.disconnect();
        console.log('🧹 Cleanup: IntersectionObserver disconnected');
      };
    }
  };

  return (
    <Card
      ref={observerRef}
      withBorder
      padding='lg'
      radius='md'
      style={{
        borderColor: isVisible ? '#40c057' : '#868e96',
        borderWidth: 2,
        transition: 'all 0.3s ease',
      }}
    >
      <Stack gap='md'>
        <Group gap='sm'>
          {isVisible ? (
            <Eye
              color='#40c057'
              size={24}
            />
          ) : (
            <EyeOff
              color='#868e96'
              size={24}
            />
          )}
          <Title
            c={isVisible ? 'green' : 'dimmed'}
            order={4}
          >
            {isVisible ? 'Visible' : 'Not Visible'}
          </Title>
        </Group>

        <Text size='sm'>
          This card uses an IntersectionObserver to detect when it's in the viewport. The observer is automatically
          cleaned up when the component unmounts or the ref changes.
        </Text>

        <Group gap='xs'>
          <Badge
            color={isVisible ? 'green' : 'gray'}
            variant='light'
          >
            Status: {isVisible ? 'In viewport' : 'Out of viewport'}
          </Badge>
          <Badge
            color='blue'
            variant='dot'
          >
            Intersections: {entryCount}
          </Badge>
        </Group>

        <Card
          withBorder
          bg='blue.0'
          padding='sm'
        >
          <Text
            fw={600}
            mb='xs'
            size='xs'
          >
            🎯 Threshold: {(threshold * 100).toFixed(0)}%
          </Text>
          <Text size='xs'>
            Scroll the page up and down to see the visibility change. The IntersectionObserver cleans up automatically
            thanks to the ref callback return value.
          </Text>
        </Card>
      </Stack>
    </Card>
  );
};

const ResizeObservedCard = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [resizeCount, setResizeCount] = useState(0);

  // React 19: Another example with ResizeObserver
  const resizeRef = (element: HTMLDivElement | null) => {
    if (element) {
      const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const { width, height } = entry.contentRect;
          setSize({ width: Math.round(width), height: Math.round(height) });
          setResizeCount(prev => prev + 1);
        });
      });

      observer.observe(element);

      // Cleanup function automatically called
      return () => {
        observer.disconnect();
        console.log('🧹 Cleanup: ResizeObserver disconnected');
      };
    }
  };

  return (
    <Card
      ref={resizeRef}
      withBorder
      padding='lg'
      radius='md'
      style={{
        borderColor: '#228be6',
        borderWidth: 2,
        minHeight: 120,
      }}
    >
      <Stack gap='sm'>
        <Title
          c='blue'
          order={4}
        >
          Resize Observer
        </Title>
        <Text size='sm'>This card tracks its own size using ResizeObserver. Try resizing your browser window!</Text>
        <Group gap='xs'>
          <Badge
            color='blue'
            variant='light'
          >
            Width: {size.width}px
          </Badge>
          <Badge
            color='cyan'
            variant='light'
          >
            Height: {size.height}px
          </Badge>
          <Badge
            color='grape'
            variant='dot'
          >
            Resizes: {resizeCount}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
};

const RefCallbackCleanupDemo = ({ threshold }: { threshold: number }) => {
  return (
    <Stack gap='lg'>
      <ObservedCard threshold={threshold} />

      <ResizeObservedCard />

      <InfoCard
        title="What's New in React 19"
        type='warning'
      >
        Ref callbacks can now return cleanup functions, eliminating the need for separate <Code fz='xs'>useEffect</Code>{' '}
        hooks to manage observer lifecycles. The cleanup function is called automatically when the element is removed or
        the ref changes.
      </InfoCard>
    </Stack>
  );
};

export const RefCallbackCleanupDemoPanel = () => {
  return (
    <DemoPanel
      docsLink='https://react.dev/blog/2024/12/05/react-19#cleanup-functions-for-refs'
      docsTitle='React 19 – React Blog'
      title='Ref Callback Cleanup'
      value='ref-callback-cleanup'
      description={
        <>
          React 19 allows ref callbacks to return cleanup functions, making it easy to set up and tear down observers,
          event listeners, and other resources without needing <Code>useEffect</Code>.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: RefCallbackCleanupDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: observerCode, fileName: 'intersection-observer.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'number',
              prop: 'threshold',
              initialValue: 0.5,
              libraryValue: 0.5,
              min: 0,
              max: 1,
              step: 0.1,
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `
import { RefCallbackCleanupDemo } from './ref-callback-cleanup';

const Demo = () => {
  return <RefCallbackCleanupDemo{{props}} />;
};
`;

const observerCode = `
import { useState } from 'react';

const ObservedElement = () => {
  const [isVisible, setIsVisible] = useState(false);

  // React 19: Ref callback with cleanup function
  const observerRef = (element: HTMLDivElement | null) => {
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      });

      observer.observe(element);

      // Return cleanup function - called when element unmounts
      return () => {
        observer.disconnect();
        console.log('Observer cleaned up');
      };
    }
  };

  return (
    <div ref={observerRef}>
      {isVisible ? 'Visible' : 'Not visible'}
    </div>
  );
};
`;

const comparisonCode = `
// ❌ Old way - separate useEffect for cleanup
const OldWay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={ref}>Content</div>;
};

// ✅ New way in React 19 - cleanup in ref callback
const NewWay = () => {
  const [isVisible, setIsVisible] = useState(false);

  const observerRef = (element: HTMLDivElement | null) => {
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        setIsVisible(entries[0].isIntersecting);
      });
      observer.observe(element);

      // Return cleanup function
      return () => observer.disconnect();
    }
  };

  return <div ref={observerRef}>Content</div>;
};
`;
