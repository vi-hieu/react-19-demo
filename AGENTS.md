# AI Agent Guide

## Big picture
- Entry `src/main.tsx` mounts `App`, which wraps the UI in `MantineProvider` (`src/theme.ts`) and the layout in `src/components/shell`.
- Navigation is Mantine `Tabs`: `ShellNavbar` defines the vertical tab list, and each demo renders a matching `Tabs.Panel` via `DemoPanel` (`src/components/demo/demo.panel.tsx`).

## Add a new demo
1) Create `src/demo/<topic>/<topic>.tsx` exporting a component.
2) Wrap content in `DemoPanel` and set `value` to match the tab value.
3) Add the tab item in `src/components/shell/shell.navbar.tsx`.
4) Render the demo component in `src/App.tsx` under `Shell`.

## Data & API
- All network calls go through `src/api/fetch.ts`, which prefixes `API_URL` (`src/api/constants.ts`), sends JSON, and attaches `CookieKey.AccessToken` from `cookieStore`.
- React Query hooks live next to API modules (example `src/api/user/user.queries.ts`) and use `QueryKey` constants for cache keys.

## Styling
- Mantine is the primary UI system; its global styles are imported in `src/App.tsx`.
- For any UI-related work, reference `mantine.llm.txt` for Mantine-specific guidance.
- Tailwind v4 is integrated via `@tailwindcss/vite`; CSS ordering is controlled in `src/App.css` with `@layer` and `@import 'tailwindcss'` plus `@mantine/core/styles.layer.css`.
- Component-specific styles use CSS modules (example `src/components/demo/demo.tab.module.css`); use `cn` from `src/lib/utils.ts` to merge classes when needed.
- Mantine PostCSS setup and breakpoint vars are in `postcss.config.mjs`.

## Tooling & workflows
- Vite runs as `rolldown-vite` and enables the React Compiler in `vite.config.ts`.
- Scripts: `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm lint`.
