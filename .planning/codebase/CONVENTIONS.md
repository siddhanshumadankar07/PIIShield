# Coding Conventions

**Analysis Date:** 2026-11-27

## Naming Patterns

**Files:**
- PascalCase for React component files and paired stylesheets: `src/App.tsx`, `src/App.css`
- Lowercase for entry points and global stylesheets: `src/main.tsx`, `src/index.css`
- Standard lowercase dot-separated names for root configs: `vite.config.ts`, `eslint.config.js`, `tsconfig.app.json`

**Functions:**
- PascalCase for React function components: `function App()` in `src/App.tsx`
- camelCase for hooks/state setters and standard functions: `useState`, `setCount`

**Variables:**
- camelCase for local variables and imported asset identifiers: `heroImg`, `reactLogo`, `viteLogo`, `count`
- kebab-case for CSS custom properties and IDs/classes: `--text-h`, `--accent-bg`, `#next-steps`, `.button-icon`

**Types:**
- Not yet established in source files; TypeScript strict/lint options are enforced via `tsconfig.app.json` and `typescript-eslint`

## Code Style

**Formatting:**
- No dedicated formatter config (e.g., `.prettierrc`, `biome.json`) is present
- Observed style in `src/App.tsx`, `src/main.tsx`, `src/App.css`, `src/index.css`: 2-space indentation, single quotes in JS/TS (`'react'`, `'./App.css'`), and omitted trailing semicolons in TS/TSX files

**Linting:**
- ESLint flat config in `eslint.config.js` targeting `**/*.{ts,tsx}` (ignoring `dist`)
- Extends:
  - `js.configs.recommended` (`@eslint/js`)
  - `tseslint.configs.recommended` (`typescript-eslint`)
  - `reactHooks.configs.flat.recommended` (`eslint-plugin-react-hooks`)
  - `reactRefresh.configs.vite` (`eslint-plugin-react-refresh`)
- Browser globals enabled via `globals.browser`
- TypeScript compiler flags in `tsconfig.app.json` enforce:
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `verbatimModuleSyntax: true` (must use `import type` for types)
  - `erasableSyntaxOnly: true` (avoid non-erasable TS runtime syntax like `enum`)
  - `allowImportingTsExtensions: true` (with `noEmit: true`)

## Import Organization

**Order (observed in `src/main.tsx` and `src/App.tsx`):**
1. External packages (`react`, `react-dom/client`)
2. Local assets and modules (`./assets/*`, `./App.tsx`)
3. Stylesheets last (`./index.css`, `./App.css`)

**Path Aliases:**
- None configured — relative imports (`./App.tsx`, `./assets/hero.png`) are used; `src/main.tsx:4` uses explicit `.tsx` extension (`import App from './App.tsx'`)

## Error Handling

**Patterns:**
- No runtime error handling patterns are established yet in `src/`
- Build-time checks run via `npm run build` (`tsc -b && vite build`) and `npm run lint` (`eslint .`)

## Logging

**Framework:** None configured

**Patterns:**
- Not established in codebase

## Comments

**When to Comment:**
- Minimal comments observed (only section comments in `tsconfig.app.json` and `vite.config.ts`)

**JSDoc/TSDoc:**
- None present in current source files

## Function Design

**Size:** Single small functional component (`App` in `src/App.tsx`, 122 lines total including JSX)
**Parameters:** No props defined yet
**Return Values:** JSX fragments (`<>...</>`) from React components

## Module Design

**Exports:**
- Default export used for root component (`export default App` in `src/App.tsx:122`) and configs (`vite.config.ts`, `eslint.config.js`)

**Barrel Files:**
- None used

---

*Convention analysis: 2026-11-27*
