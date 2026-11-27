# Codebase Concerns

**Analysis Date:** 2026-11-27

## Tech Debt

**Unmodified Starter Template Scaffolding:**
- Issue: The codebase currently consists solely of the default Vite + React + TypeScript starter app (`piishield` in `package.json` and `index.html`), with template counter UI, Vite/React links, and starter graphics
- Files: `src/App.tsx`, `src/App.css`, `src/index.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`, `README.md`
- Impact: No domain functionality for PII Shield exists yet; starter assets and styles will need to be replaced or cleaned up
- Fix approach: Replace `src/App.tsx` and template assets with actual application architecture during initial implementation phases

## Known Bugs

**None observed in starter template:**
- No runtime bugs identified in the minimal starter code (`src/main.tsx`, `src/App.tsx`), though build/lint have not been executed as part of this static mapping

## Security Considerations

**Type-Aware ESLint Rules Disabled by Default:**
- Risk: `eslint.config.js` uses `tseslint.configs.recommended` without type-checked rules (`recommendedTypeChecked` / `strictTypeChecked`), which leaves unsafe `any` flows and unhandled promises unchecked by ESLint (as noted in `README.md:14-45`)
- Files: `eslint.config.js`
- Current mitigation: `tsconfig.app.json` enforces `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `erasableSyntaxOnly` (note: `strict: true` is not explicitly enabled in `tsconfig.app.json`)
- Recommendations: Enable `"strict": true` in `tsconfig.app.json` and consider type-aware ESLint rules before implementing PII detection/redaction logic

**Missing `"strict": true` in TypeScript Configuration:**
- Risk: `tsconfig.app.json` does not set `"strict": true` (no `strictNullChecks` or `noImplicitAny`), increasing risk of null-reference or untyped data bugs when handling sensitive inputs
- Files: `tsconfig.app.json`, `tsconfig.node.json`
- Current mitigation: Basic TypeScript checks and `noUnusedLocals` / `noUnusedParameters`
- Recommendations: Enable `"strict": true` in `tsconfig.app.json` before building core modules

## Performance Bottlenecks

- Not applicable at current template stage (no heavy computation, bundle dependencies, or network calls exist yet)

## Fragile Areas

**Non-null DOM Assertion at Mount:**
- Files: `src/main.tsx:6`
- Why fragile: `document.getElementById('root')!` assumes `#root` is always present in `index.html`; if missing, React throws an uncaught runtime error
- Safe modification: Keep `#root` in `index.html` or guard `rootElement` before calling `createRoot`

## Scaling Limits

- Not applicable at current starter stage

## Dependencies at Risk

**Cutting-Edge / Very Recent Major Versions:**
- `typescript` `~6.0.3`, `vite` `^8.4.0`, `eslint` `^10.15.0`, `react` `^19.3.1` in `package.json`: Newer major releases may have ecosystem plugin compatibility gaps if adding third-party Vite/ESLint/testing plugins later
- Impact: Some third-party libraries or test plugins may declare peer dependencies expecting older major versions
- Migration plan: Verify peer-dependency compatibility when adding testing (`vitest`), UI, or PII/NLP libraries

## Missing Critical Features

**Domain Implementation:**
- Problem: None of PII Shield's core capabilities (PII detection, redaction, scanning, UI workflows) exist yet
- Blocks: End-user functionality

**Automated Testing Infrastructure:**
- Problem: No unit, component, or E2E test runner is installed or configured (`package.json`)
- Blocks: Automated regression verification for PII detection rules and UI behavior

## Test Coverage Gaps

**Entire Application Untested:**
- What's not tested: All source files (`src/main.tsx`, `src/App.tsx`) and any upcoming domain logic have 0% automated test coverage
- Files: `src/main.tsx`, `src/App.tsx`
- Risk: Regressions in future PII detection/redaction rules or UI state cannot be caught automatically
- Priority: High

---

*Concerns audit: 2026-11-27*
