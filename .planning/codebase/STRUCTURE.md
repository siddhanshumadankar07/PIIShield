# Codebase Structure

**Analysis Date:** 2026-11-27

## Directory Layout

```text
PIISHIELD/
├── .agent/                 # Local GSD skills, workflows, and agent definitions
├── public/                 # Unprocessed static assets served from `/`
│   ├── favicon.svg         # Browser favicon referenced by `index.html`
│   └── icons.svg           # SVG sprite sheet referenced via `<use href="/icons.svg#...">`
├── src/                    # Application TypeScript and CSS source files
│   ├── assets/             # Bundled media assets imported by Vite modules
│   │   ├── hero.png        # Template hero graphic
│   │   ├── react.svg       # Template React logo
│   │   └── vite.svg        # Template Vite logo
│   ├── App.css             # Component-specific styles for `src/App.tsx`
│   ├── App.tsx             # Root React application component
│   ├── index.css           # Global CSS variables, resets, and base typography
│   └── main.tsx            # Application entry point mounting `<App />`
├── .gitignore              # Git ignore rules (`node_modules`, `dist`, `*.local`, IDE files)
├── eslint.config.js        # ESLint flat config for `**/*.{ts,tsx}`
├── index.html              # HTML entry shell with `#root` mount node
├── package.json            # Package manifest (`piishield`) and npm scripts
├── package-lock.json       # Locked npm dependency tree
├── README.md               # Starter React + TypeScript + Vite template notes
├── tsconfig.json           # Root TypeScript solution config (references app + node)
├── tsconfig.app.json       # TypeScript config for `src/`
├── tsconfig.node.json      # TypeScript config for `vite.config.ts`
└── vite.config.ts          # Vite bundler and React plugin configuration
```

## Directory Purposes

**`src/`:**
- Purpose: Primary application source directory (`include: ["src"]` in `tsconfig.app.json`)
- Contains: React TSX entry/components, CSS stylesheets, and imported assets
- Key files: `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/App.css`

**`src/assets/`:**
- Purpose: Static images bundled and hashed by Vite when imported in TypeScript/TSX
- Contains: PNG and SVG graphics (`hero.png`, `react.svg`, `vite.svg`)
- Key files: `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`

**`public/`:**
- Purpose: Static assets copied directly to build output root and served at `/`
- Contains: `favicon.svg` and `icons.svg`
- Key files: `public/favicon.svg`, `public/icons.svg`

## Key File Locations

**Entry Points:**
- `index.html`: HTML document root and module script loader
- `src/main.tsx`: React DOM mount entry point
- `src/App.tsx`: Root React component

**Configuration:**
- `package.json`: Project scripts (`dev`, `build`, `lint`, `preview`) and dependencies
- `vite.config.ts`: Vite build and dev server config
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript compiler settings
- `eslint.config.js`: ESLint flat configuration

**Core Logic:**
- `src/App.tsx`: Currently holds only starter template UI and counter state

**Testing:**
- Not present — no test directories or `*.test.*` / `*.spec.*` files exist

## Naming Conventions

**Files:**
- React components: PascalCase `.tsx` (`src/App.tsx`) paired with matching `.css` (`src/App.css`)
- Entry/utility modules & configs: lowercase/camelCase (`src/main.tsx`, `src/index.css`, `vite.config.ts`, `eslint.config.js`)

**Directories:**
- Lowercase (`src/`, `src/assets/`, `public/`)

## Where to Add New Code

**New Feature:**
- Feature modules/components: `src/components/` or `src/features/<feature>/` (create directories under `src/` as features are added, since `tsconfig.app.json` includes all of `src/`)
- Tests: Co-located `*.test.ts` / `*.test.tsx` alongside source modules (once a test runner such as Vitest is configured)

**New Component/Module:**
- Implementation: `src/components/<ComponentName>.tsx` (plus optional `<ComponentName>.css`)

**Utilities:**
- Shared helpers & domain logic: `src/lib/` or `src/utils/` (e.g., `src/utils/*.ts`)

## Special Directories

**`node_modules/`:**
- Purpose: Installed npm dependencies and TypeScript incremental build cache (`node_modules/.tmp/`)
- Generated: Yes (`npm install`, `tsc -b`)
- Committed: No (excluded in `.gitignore`)

**`dist/`:**
- Purpose: Production Vite bundle output (`npm run build`)
- Generated: Yes
- Committed: No (excluded in `.gitignore` and ignored in `eslint.config.js`)

**`.agent/`:**
- Purpose: GSD workflow tooling, skills, and agent definitions
- Generated: Yes (GSD installation)
- Committed: Tracked locally unless ignored

---

*Structure analysis: 2026-11-27*

