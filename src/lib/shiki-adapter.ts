import { createShikiAdapter } from '@mantine/code-highlight';

const loadShiki = async () => {
  const { createHighlighter } = await import('shiki');

  const shiki = await createHighlighter({
    langs: ['tsx', 'css', 'html', 'bash', 'json', 'ts'],
    themes: ['one-dark-pro'],
  });

  return shiki;
};

export const shikiAdapter = createShikiAdapter(loadShiki);
