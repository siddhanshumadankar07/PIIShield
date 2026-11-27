<!-- GSD:project-start source:PROJECT.md -->
## Project

**PIIShield**

PIIShield ("Detect. Redact. Protect.") is a local-first privacy intelligence platform built with React, TypeScript, Vite, and Tailwind CSS that helps individuals and organizations detect, review, redact, and protect sensitive information before sharing documents. It combines deterministic client-side PII detection, human-reviewed sanitization, privacy analysis, a 15-minute Privacy Lock session lifecycle, and downloadable Audit Passports within an editorial Deep Black × Electric Blue visual identity.

**Core Value:** Accurate, transparent, 100% local PII detection with human-in-the-loop review and reliable redaction before any document leaves the user's device.

### Constraints

- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS; self-hosted fonts only (no Google Fonts CDN).
- **Privacy**: 100% client-side processing; no backend uploads, no `localStorage`/`sessionStorage`/`IndexedDB` for sensitive data, no sensitive console logs.
- **Performance**: Lighthouse Performance >= 90, LCP < 2.5s, hero visual < 300 KB, Web Workers for large scans, no 3D assets loaded on scanner route.
- **Accessibility**: WCAG 2.2 AA; PII highlights must not rely on color alone.
- **Delivery**: Strict phase-gated delivery (Phase 0 Audit/Planning -> Phase 1 Design System -> Phase 2 Shared Components -> Phase 3 Scanner -> Phase 4 Dashboard/Analytics -> Phase 5 Landing Page -> Phase 6 Final Verification) with explicit review gates.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript `~6.0.3` - Application source code (`src/main.tsx`, `src/App.tsx`), build config (`vite.config.ts`), and TypeScript project references (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)
- CSS (with CSS Nesting and custom properties) - Component and global styles (`src/App.css`, `src/index.css`)
- HTML5 - Single-page entry document (`index.html`)
- JavaScript (ESM) - ESLint flat configuration (`eslint.config.js`)
## Runtime
- Browser (DOM + ES2023 target, configured in `tsconfig.app.json`)
- Node.js `v24.19.0` - Local development tooling, build, and linting (`tsconfig.node.json` targets `ES2023` with `nodenext` module resolution)
- npm `11.17.0`
- Lockfile: present (`package-lock.json`)
## Frameworks
- React `^19.3.1` (`react`, `react-dom`) - UI rendering with `StrictMode` and `createRoot` in `src/main.tsx`
- Not detected — no test runner or assertion library is installed in `package.json`
- Vite `^8.4.0` - Dev server, HMR, and production bundler (`vite.config.ts`)
- `@vitejs/plugin-react` `^6.3.0` - React fast refresh and JSX transform plugin registered in `vite.config.ts`
## Key Dependencies
- `react` `^19.3.1` - Component model and hooks (`useState` in `src/App.tsx`)
- `react-dom` `^19.3.1` - Browser DOM mounting (`createRoot` in `src/main.tsx`)
- `eslint` `^10.15.0` with `@eslint/js` `^10.0.1` and `typescript-eslint` `^8.73.0` - Static linting across `**/*.{ts,tsx}` (`eslint.config.js`)
- `eslint-plugin-react-hooks` `^7.1.1` and `eslint-plugin-react-refresh` `^0.5.8` - React Hooks rules and Vite fast-refresh safety checks (`eslint.config.js`)
- `@types/react` `^19.3.0`, `@types/react-dom` `^19.3.0`, `@types/node` `^26.6.6`, `globals` `^17.14.0` - Type definitions and browser global definitions
## Configuration
- No `.env*` files detected in the repository root
- No runtime environment variables are referenced in `src/` or `vite.config.ts`
- `package.json` scripts:
- `tsconfig.json` delegates via project references to `tsconfig.app.json` (`src/`) and `tsconfig.node.json` (`vite.config.ts`)
- `tsconfig.app.json` enables `noEmit: true`, `verbatimModuleSyntax: true`, `erasableSyntaxOnly: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, and `noFallthroughCasesInSwitch: true`
- `vite.config.ts` uses default Vite config with `react()` plugin only
## Platform Requirements
- Node.js and npm capable of running Vite `^8.4.0` and TypeScript `~6.0.3`
- Modern browser supporting ES2023, CSS nesting, and `100svh`
- Static web hosting for the Vite `dist/` bundle (`npm run build` outputs static HTML/CSS/JS assets)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- PascalCase for React component files and paired stylesheets: `src/App.tsx`, `src/App.css`
- Lowercase for entry points and global stylesheets: `src/main.tsx`, `src/index.css`
- Standard lowercase dot-separated names for root configs: `vite.config.ts`, `eslint.config.js`, `tsconfig.app.json`
- PascalCase for React function components: `function App()` in `src/App.tsx`
- camelCase for hooks/state setters and standard functions: `useState`, `setCount`
- camelCase for local variables and imported asset identifiers: `heroImg`, `reactLogo`, `viteLogo`, `count`
- kebab-case for CSS custom properties and IDs/classes: `--text-h`, `--accent-bg`, `#next-steps`, `.button-icon`
- Not yet established in source files; TypeScript strict/lint options are enforced via `tsconfig.app.json` and `typescript-eslint`
## Code Style
- No dedicated formatter config (e.g., `.prettierrc`, `biome.json`) is present
- Observed style in `src/App.tsx`, `src/main.tsx`, `src/App.css`, `src/index.css`: 2-space indentation, single quotes in JS/TS (`'react'`, `'./App.css'`), and omitted trailing semicolons in TS/TSX files
- ESLint flat config in `eslint.config.js` targeting `**/*.{ts,tsx}` (ignoring `dist`)
- Extends:
- Browser globals enabled via `globals.browser`
- TypeScript compiler flags in `tsconfig.app.json` enforce:
## Import Organization
- None configured — relative imports (`./App.tsx`, `./assets/hero.png`) are used; `src/main.tsx:4` uses explicit `.tsx` extension (`import App from './App.tsx'`)
## Error Handling
- No runtime error handling patterns are established yet in `src/`
- Build-time checks run via `npm run build` (`tsc -b && vite build`) and `npm run lint` (`eslint .`)
## Logging
- Not established in codebase
## Comments
- Minimal comments observed (only section comments in `tsconfig.app.json` and `vite.config.ts`)
- None present in current source files
## Function Design
## Module Design
- Default export used for root component (`export default App` in `src/App.tsx:122`) and configs (`vite.config.ts`, `eslint.config.js`)
- None used
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
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
- Pure client-side React rendering mounted onto `#root` in `src/main.tsx`
- Zero routing, global store, or backend layer currently implemented
- CSS custom properties in `src/index.css` paired with component-scoped selectors and native CSS nesting in `src/App.css`
## Layers
- Purpose: Bootstraps browser document and module execution
- Location: `index.html`, `src/main.tsx`
- Contains: HTML mount node and React `createRoot` call
- Depends on: `react-dom/client`, `src/index.css`, `src/App.tsx`
- Used by: Browser runtime
- Purpose: Renders UI markup and manages local view state
- Location: `src/App.tsx`, `src/App.css`, `src/index.css`
- Contains: Functional React component `App`, CSS tokens, and static asset imports
- Depends on: `react` (`useState`), `src/assets/*`, `public/icons.svg`
- Used by: `src/main.tsx`
## Data Flow
### Primary Render & Interaction Path
- Local component state only (`useState` in `src/App.tsx`); no context providers, URL state, or external stores exist
## Key Abstractions
- Purpose: Centralizes colors, shadows, font families, and dark-mode overrides
- Examples: `src/index.css:1-51`
- Pattern: CSS variables (`--text`, `--text-h`, `--bg`, `--border`, `--accent`, etc.) consumed across `src/index.css` and `src/App.css`
## Entry Points
- Location: `index.html` -> `src/main.tsx`
- Triggers: Initial page load
- Responsibilities: Mounts React root into `#root`
- Location: `vite.config.ts`
- Triggers: `npm run dev`, `npm run build`, `npm run preview`
- Responsibilities: Configures Vite with `@vitejs/plugin-react`
## Architectural Constraints
- **Browser-only execution:** `tsconfig.app.json` includes `DOM` and `ES2023` libs with `vite/client` types; no Node/server runtime code exists in `src/`
- **Erasable TypeScript syntax:** `tsconfig.app.json` sets `erasableSyntaxOnly: true` and `verbatimModuleSyntax: true`, disallowing TypeScript `enum` or parameter properties and requiring `import type` for type-only imports
- **Non-null root assumption:** `src/main.tsx:6` uses `document.getElementById('root')!` assuming `#root` exists in `index.html`
## Anti-Patterns
### Mixing Starter Template Demo Assets with Product Code
## Error Handling
- No custom error classes or fallback UI components exist
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
