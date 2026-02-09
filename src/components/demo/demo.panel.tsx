import { Anchor, Divider, Group, Tabs, type TabsPanelProps, Text, Title } from '@mantine/core';
import { BookOpenTextIcon } from 'lucide-react';

interface DemoPanelProps extends TabsPanelProps {
  description?: React.ReactNode;
  docsLink?: string;
  docsTitle?: string;
}

export const DemoPanel = ({ title, description, docsLink, docsTitle, children, ...props }: DemoPanelProps) => {
  return (
    <Tabs.Panel {...props}>
      <title>{`React 19 Demo${title ? ` | ${title}` : ''}`}</title>

      <div className='px-12 py-8'>
        <Title
          fz={44}
          mb={4}
        >
          {title}
        </Title>

        <Text
          c='dimmed'
          className='*:text-base'
          fz='lg'
          mb={12}
        >
          {description}
        </Text>

        <Group>
          <Text
            c='dimmed'
            fz='sm'
          >
            Documentation:
          </Text>

          <Group gap='sm'>
            <BookOpenTextIcon className='text-base text-(--mantine-color-dimmed)' />

            <Anchor
              c='black'
              fz='sm'
              href={docsLink}
              rel='noopener noreferrer'
              target='_blank'
            >
              {docsTitle ?? 'React docs'}
            </Anchor>
          </Group>
        </Group>
      </div>

      <Divider />

      <article className='px-12 py-8'>{children}</article>
    </Tabs.Panel>
  );
};
