---
phase: 01-foundation-design-system-core-pii-engine
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.app.json
  - vite.config.ts
  - index.html
  - src/main.tsx
  - src/index.css
  - src/engine/types.ts
  - src/engine/luhn.ts
  - src/engine/detectors.ts
  - src/engine/redactor.ts
  - src/engine/index.ts
  - src/engine/engine.test.ts
autonomous: true
requirements: [DSGN-01, DSGN-02, DSGN-03, DSGN-04, PII-01, PII-02, PII-04]

must_haves:
  truths:
    - "Application builds and renders with Deep Black × Electric Blue tokens and self-hosted Barlow Condensed, Inter, and JetBrains Mono fonts (zero Google Fonts CDN)"
    - "PII detection engine accurately detects Email, Phone, IPv4, Indian PAN, Aadhaar, and Luhn-validated Credit Card candidates with exact character offsets"
    - "Redaction engine supports Full Mask, Partial Mask, and Consistent Pseudonymization in temporary memory with deterministic overlap handling"
    - "All unit tests pass using synthetic data only"
  artifacts:
    - path: "src/index.css"
      provides: "Tailwind CSS v4 + Deep Black × Electric Blue design tokens, typography scale, and reduced-motion rules"
    - path: "src/engine/types.ts"
      provides: "UI-independent types for PII categories, matches, redaction modes, and pseudonymization state"
    - path: "src/engine/detectors.ts"
      provides: "Deterministic detectors for all 6 mandatory PII categories + overlap resolution"
    - path: "src/engine/redactor.ts"
      provides: "Full Mask, Partial Mask, and Consistent Pseudonymization redaction functions"
    - path: "src/engine/engine.test.ts"
      provides: "Vitest unit tests for all 6 categories, Luhn validation, overlaps, repeated entities, and redaction modes"
  key_links:
    - from: "src/engine/detectors.ts"
      to: "src/engine/luhn.ts"
      via: "Luhn checksum validation for credit card candidates"
      pattern: "isValidLuhn"
    - from: "src/engine/redactor.ts"
      to: "src/engine/types.ts"
      via: "Uses PIIMatch offsets and RedactionMode"
      pattern: "RedactionMode"
---

<objective>
Establish the PIIShield Deep Black × Electric Blue design system with self-hosted fonts and build the UI-independent PII detection and redaction engine with comprehensive synthetic-data unit tests.

Purpose: Provide the visual foundation and core deterministic privacy engine required by all downstream phases.
Output: Configured Tailwind CSS + Fontsource design system, pure TypeScript `src/engine/` module, and passing Vitest suite.
</objective>

<execution_context>
@.agent/get-shit-done/workflows/execute-phase.md
@.agent/get-shit-done/templates/plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/phases/01-foundation-design-system-core-pii-engine/01-CONTEXT.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install dependencies and configure Tailwind CSS, self-hosted fonts, and TypeScript strictness</name>
  <files>package.json, tsconfig.app.json, vite.config.ts, index.html, src/main.tsx, src/index.css</files>
  <action>
    1. Install `tailwindcss`, `@tailwindcss/vite`, `@fontsource/barlow-condensed`, `@fontsource/inter`, `@fontsource/jetbrains-mono`, and `vitest` (devDependency).
    2. Add `"test": "vitest run"` script to `package.json`.
    3. Enable `"strict": true` in `tsconfig.app.json`.
    4. Register `tailwindcss()` in `vite.config.ts`.
    5. Update `index.html` title to `PIIShield — Detect. Redact. Protect.` with dark background meta/body class.
    6. Import `@fontsource/barlow-condensed/700.css`, `@fontsource/inter/400.css`, `@fontsource/inter/500.css`, `@fontsource/inter/600.css`, and `@fontsource/jetbrains-mono/400.css` in `src/main.tsx`.
    7. Replace `src/index.css` with Tailwind v4 `@import "tailwindcss";`, `@theme` tokens (Deep Black `#06070A`, Charcoal `#0F1117`, Electric Blue `#2563EB`, Icy Blue `#7DD3FC`, subtle grey borders `#232733`), typography variables, `:focus-visible` styles, and `@media (prefers-reduced-motion: reduce)` rules.
  </action>
  <verify>
    <automated>npm run build && npm run lint</automated>
  </verify>
  <done>Build and lint pass with zero errors; self-hosted fonts and design tokens are bundled with zero external CDN links.</done>
</task>

<task type="auto">
  <name>Task 2: Build UI-independent PII detection & redaction engine</name>
  <files>src/engine/types.ts, src/engine/luhn.ts, src/engine/detectors.ts, src/engine/redactor.ts, src/engine/index.ts</files>
  <action>
    1. Create `src/engine/types.ts` defining `PIICategory` (`'EMAIL' | 'PHONE' | 'IPV4' | 'PAN' | 'AADHAAR' | 'CREDIT_CARD'`), `PIIMatch` (id, category, value, start, end, method, validationStatus, certainty), `RedactionMode` (`'full' | 'partial' | 'pseudonym'`), and `PseudonymSession`.
    2. Create `src/engine/luhn.ts` implementing `isValidLuhn(digits: string): boolean` for credit card validation.
    3. Create `src/engine/detectors.ts` implementing `detectPII(text: string): PIIMatch[]` for all 6 mandatory categories (Email, Phone, IPv4 with 0–255 octet checks, Indian PAN, Aadhaar formats, Luhn-validated Credit Card candidates), preserving exact `start`/`end` character indices and resolving overlapping matches deterministically.
    4. Create `src/engine/redactor.ts` implementing `redactText(text: string, matches: PIIMatch[], mode: RedactionMode, session?: PseudonymSession)` supporting Full Mask (`[REDACTED]`), Partial Mask, and Consistent Pseudonymization (`EMAIL_01`, `PHONE_01`, etc.) in temporary in-memory `Map`s.
    5. Export public engine API from `src/engine/index.ts` with zero React/DOM dependencies.
  </action>
  <verify>
    <automated>npm run build && npm run lint</automated>
  </verify>
  <done>Pure TypeScript engine compiles cleanly under `strict: true` with zero UI imports.</done>
</task>

<task type="auto">
  <name>Task 3: Add synthetic-data unit tests for detection, Luhn, overlaps, and redaction</name>
  <files>src/engine/engine.test.ts</files>
  <action>
    1. Write Vitest unit tests in `src/engine/engine.test.ts` using synthetic test data only.
    2. Cover all 6 mandatory PII categories, formatting variations, invalid formats / false positives (e.g., invalid IPv4 octets `999.1.1.1`, non-Luhn card numbers), repeated entities, overlapping matches, character offset accuracy, and all 3 redaction modes (`full`, `partial`, `pseudonym` consistency).
  </action>
  <verify>
    <automated>npm test</automated>
  </verify>
  <done>`npm test` passes 100% of test cases.</done>
</task>

</tasks>

<verification>
- `npm run lint` passes with zero warnings/errors.
- `npm run build` succeeds cleanly.
- `npm test` passes all synthetic-data unit tests in `src/engine/engine.test.ts`.
</verification>

<success_criteria>
- Design system tokens and self-hosted fonts configured with zero Google Fonts CDN requests.
- `src/engine/` is 100% UI-independent and covers all 6 mandatory PII categories + 3 redaction modes.
- All unit tests pass.
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-design-system-core-pii-engine/01-01-SUMMARY.md`
</output>

