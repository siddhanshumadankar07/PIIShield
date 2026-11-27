<!-- refreshed: 2026-11-27 -->
# Architecture

**Analysis Date:** 2026-11-27

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                   Browser HTML Entry                        │
│                      `index.html`                           │
└──────────────────────────────┬──────────────────────────────┘
                               │ loads module script
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    React Mount Layer                        │
│                      `src/main.tsx`                         │
│        imports `src/index.css` + mounts `<App />`           │
└──────────────────────────────┬──────────────────────────────┘
                               │ renders
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Root Application Component                  │
│                      `src/App.tsx`                          │
│     imports `src/App.css` + `src/assets/*` + `public/*`     │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| HTML Shell | Defines document `<head>`, `#root` mount container, and loads `src/main.tsx` | `index.html` |
| Application Bootstrap | Imports global CSS and mounts `<App />` inside React `StrictMode` | `src/main.tsx` |
| Root UI Component | Renders starter landing page and manages local `count` state via `useState` | `src/App.tsx` |
| Global Theme & Layout CSS | Defines CSS custom properties (light/dark via `prefers-color-scheme`), typography, and `#root` layout | `src/index.css` |
| Component Styles | Styles `.hero`, `.counter`, `#center`, `#next-steps`, `.ticks`, and responsive media queries | `src/App.css` |

## Pattern Overview

**Overall:** Minimal client-side Single-Page Application (SPA) starter generated from the Vite React + TypeScript template.

**Key Characteristics:**
- Pure client-side React rendering mounted onto `#root` in `src/main.tsx`
- Zero routing, global store, or backend layer currently implemented
- CSS custom properties in `src/index.css` paired with component-scoped selectors and native CSS nesting in `src/App.css`

## Layers

**Entry / Shell Layer:**
- Purpose: Bootstraps browser document and module execution
- Location: `index.html`, `src/main.tsx`
- Contains: HTML mount node and React `createRoot` call
- Depends on: `react-dom/client`, `src/index.css`, `src/App.tsx`
- Used by: Browser runtime

**Presentation Layer:**
- Purpose: Renders UI markup and manages local view state
- Location: `src/App.tsx`, `src/App.css`, `src/index.css`
- Contains: Functional React component `App`, CSS tokens, and static asset imports
- Depends on: `react` (`useState`), `src/assets/*`, `public/icons.svg`
- Used by: `src/main.tsx`

## Data Flow

### Primary Render & Interaction Path

1. Browser loads `index.html` and executes `<script type="module" src="/src/main.tsx">` (`index.html:11`)
2. `src/main.tsx` loads global styles (`src/index.css`) and calls `createRoot(document.getElementById('root')!).render(...)` (`src/main.tsx:6-10`)
3. `App` initializes `count` state to `0` (`src/App.tsx:8`) and updates DOM on button click via `setCount((count) => count + 1)` (`src/App.tsx:27`)

**State Management:**
- Local component state only (`useState` in `src/App.tsx`); no context providers, URL state, or external stores exist

## Key Abstractions

**Design Tokens (`:root` custom properties):**
- Purpose: Centralizes colors, shadows, font families, and dark-mode overrides
- Examples: `src/index.css:1-51`
- Pattern: CSS variables (`--text`, `--text-h`, `--bg`, `--border`, `--accent`, etc.) consumed across `src/index.css` and `src/App.css`

## Entry Points

**Browser SPA Entry:**
- Location: `index.html` -> `src/main.tsx`
- Triggers: Initial page load
- Responsibilities: Mounts React root into `#root`

**Vite Build/Dev Config Entry:**
- Location: `vite.config.ts`
- Triggers: `npm run dev`, `npm run build`, `npm run preview`
- Responsibilities: Configures Vite with `@vitejs/plugin-react`

## Architectural Constraints

- **Browser-only execution:** `tsconfig.app.json` includes `DOM` and `ES2023` libs with `vite/client` types; no Node/server runtime code exists in `src/`
- **Erasable TypeScript syntax:** `tsconfig.app.json` sets `erasableSyntaxOnly: true` and `verbatimModuleSyntax: true`, disallowing TypeScript `enum` or parameter properties and requiring `import type` for type-only imports
- **Non-null root assumption:** `src/main.tsx:6` uses `document.getElementById('root')!` assuming `#root` exists in `index.html`

## Anti-Patterns

### Mixing Starter Template Demo Assets with Product Code

**What happens:** `src/App.tsx` currently contains Vite/React demo markup, links, and `public/icons.svg` sprite references alongside the `piishield` title in `index.html`.
**Why it's wrong:** Leaving template scaffolding mixed into production components obscures application structure and bundles unused template assets.
**Do this instead:** Replace `src/App.tsx`, `src/App.css`, and template assets (`src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`) when building application features.

## Error Handling

**Strategy:** None implemented yet (no error boundaries, async calls, or try/catch blocks in `src/`).

**Patterns:**
- No custom error classes or fallback UI components exist

## Cross-Cutting Concerns

**Logging:** None implemented
**Validation:** None implemented (static type-checking via `tsc -b` and linting via `eslint .` only)
**Authentication:** None implemented

---

*Architecture analysis: 2026-11-27*
