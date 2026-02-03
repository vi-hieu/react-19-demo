import { plugin as jabworksPlugin } from '@jabworks/eslint-plugin';
import { defineConfig } from 'eslint/config';

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ])

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
