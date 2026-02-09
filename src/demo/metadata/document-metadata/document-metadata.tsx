import { Badge, Card, Code, Group, Stack, Text, Title } from '@mantine/core';
import { Demo } from '@mantinex/demo';

import { DemoPanel, InfoCard } from '../../../components/demo';

const MetadataDemo = ({
  pageTitle,
  description,
  themeColor,
}: {
  pageTitle: string;
  description: string;
  themeColor: string;
}) => {
  return (
    <Stack gap='md'>
      <title>{pageTitle}</title>
      <meta
        content={description}
        name='description'
      />
      <meta
        content={themeColor}
        name='theme-color'
      />

      <Card
        withBorder
        padding='lg'
        style={{ backgroundColor: `${themeColor}10` }}
      >
        <Stack gap='md'>
          <div>
            <Title order={4}>Current Page Metadata</Title>
            <Text
              c='dimmed'
              size='sm'
            >
              Check your browser tab and view source to see the changes!
            </Text>
          </div>

          <Stack gap='xs'>
            <Group gap='xs'>
              <Badge
                color='blue'
                variant='light'
              >
                Title
              </Badge>
              <Text size='sm'>{pageTitle}</Text>
            </Group>

            <Group gap='xs'>
              <Badge
                color='green'
                variant='light'
              >
                Description
              </Badge>
              <Text size='sm'>{description}</Text>
            </Group>

            <Group gap='xs'>
              <Badge
                color='grape'
                variant='light'
              >
                Theme Color
              </Badge>
              <Text size='sm'>{themeColor}</Text>
            </Group>
          </Stack>

          <InfoCard
            title='Key Feature'
            type='feature'
          >
            These <Code fz='xs'>{'<title>'}</Code> and <Code fz='xs'>{'<meta>'}</Code> components work anywhere in your
            component tree - no need to manually update document.head or use helmet!
          </InfoCard>
        </Stack>
      </Card>
    </Stack>
  );
};

export const DocumentMetadataDemo = () => {
  return (
    <DemoPanel
      docsLink='https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags'
      docsTitle='React 19 – React Blog'
      title='Document Metadata'
      value='document-metadata'
      description={
        <>
          React 19 supports rendering <Code>{'<title>'}</Code>, <Code>{'<meta>'}</Code>, and <Code>{'<link>'}</Code>{' '}
          tags directly in components. They automatically hoist to the document <Code>{'<head>'}</Code>.
        </>
      }
    >
      <Demo
        data={{
          type: 'configurator',
          component: MetadataDemo,
          centered: true,
          code: [
            { code: usageCode, fileName: 'demo.tsx', language: 'tsx' },
            { code: componentCode, fileName: 'page-component.tsx', language: 'tsx' },
            { code: comparisonCode, fileName: 'comparison.tsx', language: 'tsx' },
          ],
          controls: [
            {
              type: 'string',
              prop: 'pageTitle',
              initialValue: 'React 19 Demo - Document Metadata',
              libraryValue: 'React 19 Demo - Document Metadata',
            },
            {
              type: 'string',
              prop: 'description',
              initialValue: 'Exploring React 19 built-in document metadata components',
              libraryValue: 'Exploring React 19 built-in document metadata components',
            },
            {
              type: 'color',
              prop: 'themeColor',
              initialValue: '#228be6',
              libraryValue: '#228be6',
            },
          ],
        }}
      />
    </DemoPanel>
  );
};

const usageCode = `const PageComponent = ({ title, description }: Props) => {
  return (
    <div>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#228be6" />

      <h1>Welcome to {title}</h1>
      <p>{description}</p>
    </div>
  );
};`;

const componentCode = `// React 19: Metadata components work anywhere!
const BlogPost = ({ post }: Props) => {
  return (
    <article>
      {/* These automatically hoist to <head> */}
      <title>{post.title} - My Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:image" content={post.coverImage} />
      <link rel="canonical" href={\`https://blog.com/\${post.slug}\`} />

      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
};

// Nested components can override parent metadata
const NestedPage = () => {
  return (
    <div>
      <title>Nested Page</title> {/* Overrides parent title */}
      <Content />
    </div>
  );
};`;

const comparisonCode = `// ❌ React 18: Required react-helmet or manual DOM manipulation
import { Helmet } from 'react-helmet';

const OldWay = ({ title }: Props) => {
  useEffect(() => {
    document.title = title; // Manual update
  }, [title]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="..." />
    </Helmet>
  );
};

// ✅ React 19: Built-in, works anywhere
const NewWay = ({ title }: Props) => {
  return (
    <div>
      <title>{title}</title>
      <meta name="description" content="..." />
      <h1>Content</h1>
    </div>
  );
};`;
