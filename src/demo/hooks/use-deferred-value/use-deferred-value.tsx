import { useDeferredValue, useMemo, useState, useTransition } from 'react';

import { Badge, Card, Code, Group, Stack, Text, TextInput } from '@mantine/core';
import { Demo } from '@mantinex/demo';
import { Search } from 'lucide-react';

import { DemoPanel, InfoCard } from '../../../components/demo';

// Generate a large list of items to make filtering expensive
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}`,
    category: ['Electronics', 'Books', 'Clothing', 'Food', 'Toys'][i % 5],
    tags: [`tag-${i % 10}`, `feature-${i % 7}`, `type-${i % 5}`],
  }));

const ITEMS = generateItems(5000);

// Simulate expensive filtering
const filterItems = (items: typeof ITEMS, query: string) => {
  if (!query) return items;

  // Make filtering intentionally slow to demonstrate the benefit
  const start = performance.now();
  const filtered = items.filter(
    item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.includes(query.toLowerCase())),
  );

  // Simulate additional processing time
  while (performance.now() - start < 100) {
    // Busy wait to simulate expensive computation
  }

  return filtered;
};

const FilteredList = ({ query, useInitialValue }: { query: string; useInitialValue: boolean }) => {
  // React 19: useDeferredValue with initialValue parameter
  const deferredQuery = useDeferredValue(query, useInitialValue ? 'Loading...' : undefined);

  const filteredItems = useMemo(() => filterItems(ITEMS, deferredQuery), [deferredQuery]);

  const isStale = query !== deferredQuery;

  return (
    <Stack gap='sm'>
      <Group
        gap='sm'
        justify='space-between'
      >
        <Text
          fw={600}
          size='sm'
        >
          Results
        </Text>
        <Group gap='xs'>
          <Badge
            color={isStale ? 'orange' : 'green'}
            variant='light'
          >
            {isStale ? 'Updating...' : 'Up to date'}
          </Badge>
          <Badge
            color='blue'
            variant='dot'
          >
            {filteredItems.length} items
          </Badge>
        </Group>
      </Group>

      <Stack
        gap='xs'
        style={{
          maxHeight: 300,
          overflowY: 'auto',
          opacity: isStale ? 0.6 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {deferredQuery === 'Loading...' ? (
          <Card
            withBorder
            padding='md'
          >
            <Text
              c='dimmed'
              ta='center'
            >
              Loading initial results...
            </Text>
          </Card>
        ) : filteredItems.length === 0 ? (
          <Card
            withBorder
            padding='md'
          >
            <Text
              c='dimmed'
              ta='center'
            >
              No items match your search
            </Text>
          </Card>
        ) : (
          filteredItems.slice(0, 20).map(item => (
            <Card
              key={item.id}
              withBorder
              padding='sm'
              radius='md'
            >
              <Group
                gap='sm'
                justify='space-between'
              >
                <div>
                  <Text
                    fw={500}
                    size='sm'
                  >
                    {item.name}
                  </Text>
                  <Text
                    c='dimmed'
                    size='xs'
                  >
                    {item.description}
                  </Text>
                </div>
                <Badge
                  size='sm'
                  variant='light'
                >
                  {item.category}
                </Badge>
              </Group>
            </Card>
          ))
        )}
        {filteredItems.length > 20 ? (
          <Text
            c='dimmed'
            size='xs'
            ta='center'
          >
            ... and {filteredItems.length - 20} more items
          </Text>
        ) : null}
      </Stack>
    </Stack>
  );
};

const UseDeferredValueDemo = ({ itemCount, useInitialValue }: { itemCount: number; useInitialValue: boolean }) => {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <Stack
      gap='md'
      w={600}
    >
      <TextInput
        leftSection={<Search size={16} />}
        placeholder='Search items...'
        rightSection={
          isPending ? (
            <Badge
              color='blue'
              size='sm'
              variant='dot'
            >
              Searching...
            </Badge>
          ) : null
        }
        onChange={e => {
          handleSearch(e.target.value);
        }}
      />

      <FilteredList
        query={query}
        useInitialValue={useInitialValue}
      />

      <InfoCard
        title='React 19 Feature'
        type='warning'
      >
        <Text
          mb='xs'
          size='xs'
        >
          <Code fz='xs'>useDeferredValue</Code> now accepts an optional initial value. Try toggling the "Use Initial
          Value" control and refresh the page to see the difference:
        </Text>
        <Text size='xs'>
          • <strong>With initial value:</strong> Shows "Loading..." immediately on first render
          <br />• <strong>Without initial value:</strong> Shows stale content during updates
        </Text>
      </InfoCard>

      <InfoCard
        title='Performance Tip'
        type='performance'
      >
        This demo filters through {itemCount.toLocaleString()} items with simulated expensive computation. Notice how
        the search input stays responsive even during filtering, thanks to <Code fz='xs'>useDeferredValue</Code> and{' '}
        <Code fz='xs'>startTransition</Code>!
      </InfoCard>
    </Stack>
  );
};

export const UseDeferredValueDemoPanel = () => {
  return (
    <DemoPanel
      docsLink='https://react.dev/reference/react/useDeferredValue'
      docsTitle='useDeferredValue – React'
      title='useDeferredValue()'
      value='use-deferred-value'
      description={
        <>
          React 19 enhanced <Code>useDeferredValue()</Code> with an optional initial value parameter. This keeps the UI
          responsive during expensive renders by deferring updates while maintaining input responsiveness.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: UseDeferredValueDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: hookCode, fileName: 'deferred-search.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'number',
              prop: 'itemCount',
              initialValue: 5000,
              libraryValue: 5000,
              min: 1000,
              max: 10000,
              step: 1000,
            },
            {
              type: 'boolean',
              prop: 'useInitialValue',
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
import { UseDeferredValueDemo } from './use-deferred-value';

const Demo = () => {
  return <UseDeferredValueDemo{{props}} />;
};
`;

const hookCode = `
import { useDeferredValue, useMemo, useState, useTransition } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

const SearchableList = ({ items }: { items: Item[] }) => {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  // React 19: useDeferredValue with initial value
  const deferredQuery = useDeferredValue(query, 'Loading...');

  const filteredItems = useMemo(
    () => expensiveFilter(items, deferredQuery),
    [items, deferredQuery]
  );

  const handleSearch = (value: string) => {
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <div>
      <input
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {deferredQuery === 'Loading...' ? (
        <div>Loading initial results...</div>
      ) : (
        <Results items={filteredItems} />
      )}
    </div>
  );
};
`;

const comparisonCode = `
import { useDeferredValue, useState } from 'react';

// ❌ React 18 - no initial value
const React18Way = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // On first render, deferredQuery is empty string
  // Can't distinguish between "loading" and "no query"

  return <Results query={deferredQuery} />;
};

// ✅ React 19 - with initial value
const React19Way = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query, 'Loading...');

  // On first render, deferredQuery is 'Loading...'
  // Can show proper loading state immediately!

  if (deferredQuery === 'Loading...') {
    return <div>Preparing search...</div>;
  }

  return <Results query={deferredQuery} />;
};

// 🎯 Benefits of initial value:
// 1. Better UX - show loading state immediately
// 2. Clearer code - explicit loading states
// 3. No flash of empty content
`;
