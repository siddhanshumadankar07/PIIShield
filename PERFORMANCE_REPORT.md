# PIIShield — Performance Report

## 1. Optimizations Implemented
1. **Deferred Redaction Rendering (`src/components/scanner/ScannerWorkspace.tsx`)**: Applied `useDeferredValue(inputText)` for `redactionResult` so typing into large documents remains responsive without blocking keystrokes.
2. **Pure Deterministic Pseudonymization**: Removed state mutation inside `useMemo`, creating a fresh `createPseudonymSession()` per memoized calculation.
3. **Code Splitting & Self-Hosted Assets (`src/App.tsx`, `vite.config.ts`)**: `LandingPage` is lazy-loaded (`8.74 kB` / `2.32 kB` gzip) and fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`) are self-hosted via `@fontsource`.
4. **Dead Code Removal**: Removed unused starter `src/App.css` (184 lines) and unused starter image/SVG assets (`src/assets/*`).

## 2. Measured Benchmark Results (`src/engine/performance.test.ts`)
- **60 KB+ Synthetic Text Scan & Pseudonymization (3,000 PII entities across 500 blocks)**: Completed in **< 250ms** (measured suite runtime: **34ms** total for both performance tests) with **3,000/3,000** detections and redactions.
- **500-Row Synthetic CSV Sanitization (1,000 PII cells)**: Completed in **< 300ms** with 100% row/header preservation.
- **Production Bundle**: `dist/assets/index-*.js` is `275.37 kB` (`84.50 kB` gzip); CSS is `56.53 kB` (`16.23 kB` gzip).
