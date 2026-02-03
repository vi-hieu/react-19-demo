import { plugin as jabworksPlugin } from '@jabworks/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    plugins: {
      '@jabworks/eslint-plugin': jabworksPlugin,
    },
  },
  ...jabworksPlugin.configs.react,
  {
    files: ['**/*/App.tsx', 'vite.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      'unicorn/filename-case': 'off',
    },
  },
]);
