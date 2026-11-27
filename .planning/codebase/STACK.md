# Technology Stack

**Analysis Date:** 2026-11-27

## Languages

**Primary:**
- TypeScript `~6.0.3` - Application source code (`src/main.tsx`, `src/App.tsx`), build config (`vite.config.ts`), and TypeScript project references (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)

**Secondary:**
- CSS (with CSS Nesting and custom properties) - Component and global styles (`src/App.css`, `src/index.css`)
- HTML5 - Single-page entry document (`index.html`)
- JavaScript (ESM) - ESLint flat configuration (`eslint.config.js`)

## Runtime

**Environment:**
- Browser (DOM + ES2023 target, configured in `tsconfig.app.json`)
- Node.js `v24.19.0` - Local development tooling, build, and linting (`tsconfig.node.json` targets `ES2023` with `nodenext` module resolution)

**Package Manager:**
- npm `11.17.0`
- Lockfile: present (`package-lock.json`)

## Frameworks

**Core:**
- React `^19.3.1` (`react`, `react-dom`) - UI rendering with `StrictMode` and `createRoot` in `src/main.tsx`

**Testing:**
- Not detected — no test runner or assertion library is installed in `package.json`

**Build/Dev:**
- Vite `^8.4.0` - Dev server, HMR, and production bundler (`vite.config.ts`)
- `@vitejs/plugin-react` `^6.3.0` - React fast refresh and JSX transform plugin registered in `vite.config.ts`

## Key Dependencies

**Critical:**
- `react` `^19.3.1` - Component model and hooks (`useState` in `src/App.tsx`)
- `react-dom` `^19.3.1` - Browser DOM mounting (`createRoot` in `src/main.tsx`)

**Infrastructure:**
- `eslint` `^10.15.0` with `@eslint/js` `^10.0.1` and `typescript-eslint` `^8.73.0` - Static linting across `**/*.{ts,tsx}` (`eslint.config.js`)
- `eslint-plugin-react-hooks` `^7.1.1` and `eslint-plugin-react-refresh` `^0.5.8` - React Hooks rules and Vite fast-refresh safety checks (`eslint.config.js`)
- `@types/react` `^19.3.0`, `@types/react-dom` `^19.3.0`, `@types/node` `^26.6.6`, `globals` `^17.14.0` - Type definitions and browser global definitions

## Configuration

**Environment:**
- No `.env*` files detected in the repository root
- No runtime environment variables are referenced in `src/` or `vite.config.ts`

**Build:**
- `package.json` scripts:
  - `npm run dev` — starts `vite` dev server
  - `npm run build` — runs `tsc -b && vite build`
  - `npm run lint` — runs `eslint .`
  - `npm run preview` — runs `vite preview`
- `tsconfig.json` delegates via project references to `tsconfig.app.json` (`src/`) and `tsconfig.node.json` (`vite.config.ts`)
- `tsconfig.app.json` enables `noEmit: true`, `verbatimModuleSyntax: true`, `erasableSyntaxOnly: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, and `noFallthroughCasesInSwitch: true`
- `vite.config.ts` uses default Vite config with `react()` plugin only

## Platform Requirements

**Development:**
- Node.js and npm capable of running Vite `^8.4.0` and TypeScript `~6.0.3`
- Modern browser supporting ES2023, CSS nesting, and `100svh`

**Production:**
- Static web hosting for the Vite `dist/` bundle (`npm run build` outputs static HTML/CSS/JS assets)

---

*Stack analysis: 2026-11-27*

