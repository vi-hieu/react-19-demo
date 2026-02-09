# AI Agent Guide

## Big Picture

- **Entry**: `src/main.tsx` → `StrictMode` + `NuqsAdapter` → `App` → `QueryClientProvider` → `MantineProvider` → `Shell`
- **Navigation**: Mantine vertical `Tabs` (pills style) controlled by `?tabs=` URL param via `nuqs`. `ShellNavbar` defines nav items; each demo renders in `DemoPanel`.
- **React 19**: Project uses React 19.2.4 with **React Compiler enabled** (`babel-plugin-react-compiler`) - components auto-memoize, avoid manual `useMemo`/`useCallback`.

## Build & Development

**Commands** (must use `pnpm`, not npm/yarn):

```bash
pnpm dev      # Vite dev server (rolldown-vite fork)
pnpm build    # tsc -b && vite build
pnpm preview  # Preview production build
pnpm lint     # ESLint check
```

**Critical Dependencies**:

- Vite: `rolldown-vite@7.3.1` (faster Rolldown-based fork) via [package.json](package.json#L73-L77) override
- React: v19.2.4 with React Compiler enabled in [vite.config.ts](vite.config.ts#L8-L10)
- UI: Mantine v8 + Tailwind CSS v4
- Icons: **Lucide React only** (never Tabler)
- State: TanStack Query v5 + nuqs for URL state

## Code Style

**Naming & Exports**:

- **Files**: kebab-case (`use-promise.tsx`, `form-actions.submit-button.tsx`)
- **Components**: PascalCase (`UsePromiseDemo`, `LoginForm`)
- **Exports**: Named exports only (exceptions: `App.tsx`, `vite.config.ts` per [eslint.config.js](eslint.config.js#L18-L23))
- **Barrel exports**: Every folder has `index.ts` re-exporting main file

**Type Patterns**:

- TypeScript strict mode, explicit type imports: `import type { User }`
- Types co-located in `{domain}.types.ts` files ([user.types.ts](src/api/user/user.types.ts))
- Props interfaces: `DemoPanelProps`, `NavbarItem` (PascalCase + Props suffix)

## Architecture

**File Organization**:

```text
src/api/{domain}/          # Domain-based API modules
  {domain}.api.ts          # Raw fetch calls
  {domain}.queries.ts      # TanStack Query hooks (useGetUser)
  {domain}.types.ts        # TypeScript interfaces
src/demo/{category}/{feature}/  # Demo showcases
  index.ts                 # Barrel export
  {feature}.tsx            # Component wrapped in DemoPanel
src/components/{name}/     # Shared UI components
```

**API Layer** ([fetch.ts](src/api/fetch.ts), [constants.ts](src/api/constants.ts)):

- Centralized `fetcher<T>(input, init?)` prepends `API_URL`, injects `Authorization: Bearer {token}` from `cookieStore`
- DummyJSON API (`https://dummyjson.com`) for all endpoints: `/auth`, `/users`, `/todos`
- Query keys: `QueryKey.User`, `QueryKey.Todos` from [constants.ts](src/api/constants.ts#L11-L15)

**State Management**:

- **Server state**: TanStack Query hooks in `*.queries.ts` files
- **URL state**: `nuqs` (`useQueryState`) for tab navigation
- **Optimistic updates**: React 19 `useOptimistic()` hook
- **No Redux/Zustand**: Demos are self-contained

## Add a New Demo

1. **Create component**: `src/demo/{category}/{feature}/{feature}.tsx`

   ```tsx
   export const FeatureDemo = () => (
     <DemoPanel
       title={<Code>hookName()</Code>}
       value='unique-tab-id'
     >
       {/* Demo content */}
     </DemoPanel>
   );
   ```

2. **Add barrel export**: `src/demo/{category}/{feature}/index.ts`
3. **Register nav item**: Add to `navItems` array in [shell.navbar.tsx](src/components/shell/shell.navbar.tsx)
4. **Render panel**: Import and render component in [App.tsx](src/App.tsx) under `Shell`

## Styling

**Dual System** ([App.css](src/App.css)):

- **Mantine** (primary): Use props (`mb`, `fz`, `fw`), custom theme in [theme.ts](src/theme.ts)
- **Tailwind v4**: Layout utilities (`flex`, `min-h-screen`)
- **Layer order**: `@layer theme, base, mantine, components, utilities` - Mantine imports **after** Tailwind
- **CSS Modules**: `.module.css` for component-specific styles ([demo.tab.module.css](src/components/demo/demo.tab.module.css))
- **Utilities**: `cn()` from [lib/utils.ts](src/lib/utils.ts) for conditional classes

**Icon System**:

- Use `lucide-react` exclusively: `<BookOpenTextIcon className='text-base' />`
- Global `.lucide { width: 1em; height: 1em }` sizing in [App.css](src/App.css#L37-L40)

**UI Reference**: For Mantine components/hooks, consult [mantine.llm.txt](mantine.llm.txt)

## Security & Auth

- **Token storage**: Browser `cookieStore` API, key `CookieKey.AccessToken` ([constants.ts](src/api/constants.ts#L17-L19))
- **Auto-injection**: [fetch.ts](src/api/fetch.ts#L6-L13) reads from `cookieStore` → `Authorization` header
- **Mock API**: DummyJSON returns fake tokens; no CSRF/refresh mechanism (demo only)

## Common Gotchas

1. **Package manager**: Must use `pnpm` (Rolldown override requires it)
2. **Default exports**: Forbidden except `App.tsx` and `vite.config.ts` (ESLint enforced)
3. **React Compiler**: Auto-optimizes components - no manual memoization unless profiling shows need
4. **Tab navigation**: Requires TWO steps: add nav item to [shell.navbar.tsx](src/components/shell/shell.navbar.tsx) AND render in [App.tsx](src/App.tsx)
