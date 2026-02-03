# React 19 Demo - Copilot Instructions

## Project Overview

This is a **React 19 demonstration project** showcasing new React features including `use()` hook and `useOptimistic()`. Built with Vite (using Rolldown), TypeScript, Mantine UI, TanStack Query, and Tailwind CSS.

### Tech Stack

- **Build Tool**: Vite with Rolldown (`rolldown-vite@7.3.1`) - faster alternative to default Vite
- **React**: v19.2.4 with **React Compiler** enabled via `babel-plugin-react-compiler`
- **UI Framework**: Mantine v8 (primary) + Tailwind CSS v4 (utility classes)
- **Icons**: Lucide React - always use `lucide-react` for icons (not Tabler or other icon libraries)
- **Package Manager**: pnpm (v10.28.2+)

## Critical Build & Development

### Commands

```bash
pnpm dev          # Start development server with HMR
pnpm build        # Type-check with tsc -b, then build
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### React Compiler Notice

React Compiler is **enabled** in [vite.config.ts](vite.config.ts#L6-L9) which impacts build performance but enables automatic optimizations. All components automatically benefit from memoization.

## Code Organization Patterns

### API Layer Structure (`src/api/`)

Follow domain-based organization:

```
api/
  constants.ts           # API_URL, Resource paths, QueryKey, CookieKey
  fetch.ts              # Centralized fetcher with auth injection
  {domain}/
    {domain}.api.ts     # Raw API calls
    {domain}.queries.ts # TanStack Query hooks (useQuery)
    {domain}.mutations.ts # TanStack Query hooks (useMutation)
    {domain}.types.ts   # TypeScript types
```

**Example**: See [src/api/user/user.queries.ts](src/api/user/user.queries.ts) and [src/api/auth/auth.api.ts](src/api/auth/auth.api.ts)

### Fetcher Pattern

Use the centralized `fetcher` from [src/api/fetch.ts](src/api/fetch.ts):

- Automatically prepends `API_URL` to relative URLs
- Injects `Authorization` header from cookie storage
- Sets `Content-Type: application/json`
- Extracts error messages from response

```typescript
import { fetcher } from '../fetch';
export const getUser = () => fetcher<User>('/users/1');
```

### TanStack Query Integration

- Query keys defined in [src/api/constants.ts](src/api/constants.ts#L11-L14) as `QueryKey` object
- Hooks live in `*.queries.ts` files per domain
- Follow pattern: `useGetUser()`, `useGetUsers()`

### Demo Components Pattern (`src/demo/`)

Demo showcase components organized by feature:

```typescript
// Structure: src/demo/{feature-category}/{specific-demo}/
export const FeatureDemo = () => (
  <DemoPanel title={<Code>hookName()</Code>} value="unique-id">
    {/* Demo content */}
  </DemoPanel>
);
```

**Example**: [src/demo/hooks/use/use.demo.tsx](src/demo/hooks/use/use.demo.tsx) demonstrates React 19's `use()` hook with Suspense

### Shell Layout (`src/components/shell/`)

- [shell.tsx](src/components/shell/shell.tsx): Main AppShell with header + navbar using Mantine
- Uses **vertical Tabs** for navigation between demos
- Responsive navbar with burger menu via `useDisclosure` hook

## Styling Approach

### UI Development Reference

**For any UI-related work**, reference [mantine.llm.txt](mantine.llm.txt) for comprehensive Mantine component documentation, including:

- Component APIs, props, and usage patterns
- Mantine hooks (`useDisclosure`, `useMediaQuery`, etc.)
- Theming, styling approaches, and customization
- Form handling with `@mantine/form`

### Dual Styling System

1. **Mantine Components**: Primary UI framework
   - Custom theme in [src/theme.ts](src/theme.ts)
   - Use Mantine's built-in props: `mb`, `fz`, `fw`, etc.
2. **Tailwind CSS**: Utility classes for layout/spacing
   - Integrated via `@tailwindcss/vite` plugin
   - Use `cn()` helper from [src/lib/utils.ts](src/lib/utils.ts) for conditional classes

### CSS Modules

Use `.module.css` for component-specific styles:

```tsx
import classNames from './demo.tab.module.css';
<Component classNames={classNames} />;
```

**Example**: [src/components/demo/demo.tab.module.css](src/components/demo/demo.tab.module.css)

## Code Quality & Linting

### ESLint Configuration

- Uses `@jabworks/eslint-plugin` with React preset
- **Key overrides** in [eslint.config.js](eslint.config.js#L18-L23):
  - `import/no-default-export`: OFF for `App.tsx` and `vite.config.ts` only
  - `unicorn/filename-case`: OFF for same files
- **Default behavior**: Named exports preferred, kebab-case filenames

### Prettier & Stylelint

- Prettier: `@jabworks/prettier-config` - no customization
- Stylelint: `@jabworks/stylelint-config` with `import-notation: null` override

## File Naming Conventions

- **Components**: `component-name.tsx` (kebab-case)
- **Types**: `domain.types.ts`
- **API**: `domain.api.ts`, `domain.queries.ts`
- **Exceptions**: `App.tsx`, `vite.config.ts` (default exports allowed)

## React 19 Features Usage

### React 19 Documentation Reference

**For React 19 features, APIs, and patterns**, consult the official React documentation and blog:

- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19) - Overview of all new features
- [React Reference Docs](https://react.dev/reference/react) - API documentation for hooks and components
- [React Blog](https://react.dev/blog) - In-depth articles on new features and best practices

This project demonstrates React 19 capabilities; always verify feature usage against official docs.

### `use()` Hook

For unwrapping promises in components (replaces some `useEffect` patterns):

```tsx
const getUserPromise = getUser();
const UsePromiseContent = () => {
  const data = use(getUserPromise); // Suspends until resolved
  return <div>{data.firstName}</div>;
};
```

Wrap in `<Suspense>` boundary. **Example**: [src/demo/hooks/use/use.demo.tsx](src/demo/hooks/use/use.demo.tsx)

### `useOptimistic()` Hook

For optimistic UI updates before server confirmation. **Example**: [src/demo/hooks/use-optimistic/use-optimistic.tsx](src/demo/hooks/use-optimistic/use-optimistic.tsx)

## Integration Points

- **External API**: DummyJSON (`https://dummyjson.com`) via [constants.ts](src/api/constants.ts#L1)
  - Use DummyJSON endpoints for all demo API calls (users, products, recipes, auth, etc.)
  - Available resources documented at [https://dummyjson.com/docs](https://dummyjson.com/docs)
  - No authentication required for most endpoints; auth endpoints return mock tokens
- **Cookie Storage**: Browser CookieStore API for access tokens
- **Mantine Provider**: Wraps entire app in [App.tsx](src/App.tsx#L11) with custom theme

## Common Gotchas

1. **Default exports**: Only allowed in `App.tsx` and `vite.config.ts` - use named exports elsewhere
2. **Vite override**: Project uses `rolldown-vite` instead of standard Vite (see package.json overrides)
3. **React Compiler**: Auto-memoizes components - avoid manual `useMemo`/`useCallback` unless profiling shows need
4. **Mantine + Tailwind**: Prefer Mantine props for component styling, Tailwind for layout containers
