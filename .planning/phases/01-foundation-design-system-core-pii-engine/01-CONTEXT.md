# Phase 1: Foundation, Design System & Core PII Engine — Context

**Gathered:** 2026-11-27
**Status:** Ready for planning (autonomous discussion complete)

<domain>
## Phase Boundary

Phase 1 establishes:
1. The Deep Black × Electric Blue × Icy Blue design system with self-hosted fonts (`@fontsource/barlow-condensed`, `@fontsource/inter`, `@fontsource/jetbrains-mono`), Tailwind CSS v4, CSS custom properties, layout primitives, and WCAG 2.2 AA accessibility defaults (`prefers-reduced-motion`, focus-visible rings).
2. A UI-independent TypeScript PII detection & redaction engine (`src/engine/`) covering all 6 mandatory categories (Email, Phone, IPv4, Indian PAN, Aadhaar formats, Credit Card with Luhn validation), overlap resolution, character-offset preservation, and 3 redaction modes (Full Mask, Partial Mask, Consistent Pseudonymization in temporary memory).
3. Automated unit testing via Vitest using synthetic data only.

</domain>

<decisions>
## Implementation Decisions

### Existing Codebase Audit & Protection
- **Inspected files**: `package.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `eslint.config.js`.
- **Findings**: Repository is a clean Vite `^8.4.0` + React `^19.3.1` + TypeScript `~6.0.3` starter template. No existing PII detection, redaction, session-expiry, routing, or test files exist yet.
- **Protected files**: `tsconfig.json`, `tsconfig.node.json`, `eslint.config.js`, `src/main.tsx` (mount behavior preserved). `tsconfig.app.json` will enable `"strict": true` for type-safe PII handling.

### Design System & Typography
- **Styling**: Install `tailwindcss` and `@tailwindcss/vite` (native Vite 8 plugin) alongside CSS custom properties in `src/index.css` for Deep Black (`#06070A`), Charcoal (`#0F1117`), Electric Blue (`#2563EB`), Icy Blue (`#7DD3FC`), and subtle grey borders (`#232733`).
- **Fonts**: Self-hosted via `@fontsource/barlow-condensed`, `@fontsource/inter`, and `@fontsource/jetbrains-mono` imported in `src/main.tsx`. Zero Google Fonts CDN requests.
- **Accessibility**: Explicit `:focus-visible` outlines, `prefers-reduced-motion` media query, and semantic landmarks.

### UI-Independent PII Engine (`src/engine/`)
- **Separation**: Pure TypeScript modules in `src/engine/` with zero React/DOM imports.
- **6 Mandatory Categories**:
  1. `EMAIL`: Standard RFC-like email pattern.
  2. `PHONE`: International & Indian phone formats (`+91`, `10-digit` mobile, dashed/spaced/parenthesized), avoiding false positives on plain numbers/dates.
  3. `IPV4`: Dotted-quad `0.0.0.0`–`255.255.255.255` with octet range validation (`0–255`).
  4. `PAN`: Indian PAN `[A-Z]{5}[0-9]{4}[A-Z]` (case-insensitive option or uppercase standard, 4th char entity type awareness).
  5. `AADHAAR`: 12-digit Indian Aadhaar format (`XXXX XXXX XXXX` or `XXXX-XXXX-XXXX` or 12 contiguous digits with context/word-boundary guards), without claiming authenticity.
  6. `CREDIT_CARD`: 13–19 digit candidates (spaces/hyphens allowed) validated with Luhn checksum.
- **Overlap & Position Handling**: Sort matches by `start` ascending, then longer `length` descending; resolve overlaps deterministically so non-overlapping spans preserve exact original character indices.
- **Redaction Modes**:
  - `full`: `[REDACTED]`
  - `partial`: Category-aware partial masking (e.g., `j***@example.com`, `******3210`, `****-****-****-1234`, `AB***1234F`)
  - `pseudonym`: Session-scoped deterministic placeholders (`EMAIL_01`, `PHONE_01`, `PAN_01`, etc.) stored in an in-memory `Map` only.

### Testing
- **Runner**: Install `vitest` (compatible with Vite 8) and add `"test": "vitest run"` to `package.json`.
- **Synthetic Data Only**: All test fixtures use clearly synthetic/dummy values.

</decisions>

