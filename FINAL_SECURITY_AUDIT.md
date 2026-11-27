# PIIShield — Final Security Audit Report

## 1. Scope & Threat Model
- **Architecture**: 100% client-side React + TypeScript + Vite SPA. Zero backend APIs, zero external AI services, zero telemetry/analytics scripts.
- **Assets Protected**: Raw document text, uploaded `.txt`/`.csv` files, detected PII values (Email, Phone, IPv4, PAN, Aadhaar, Credit Card), and temporary pseudonym mappings.

## 2. Security Controls Verified
1. **Zero Network Egress for PII**: Verified in `src/engine/privacy-audit.test.ts` and code inspection (`fetch`, `XMLHttpRequest`, `WebSocket`, `localStorage`, `sessionStorage`, `indexedDB` are unused across `src/`).
2. **Shield AI Isolation (`src/engine/shieldAi.ts`)**: Deterministic local assistant receives only aggregate counts (`ShieldAISummary`), never raw text or matched PII strings.
3. **CSV Formula Injection Neutralization (`src/engine/csv.ts`)**: Hardened `FORMULA_PREFIX_RE = /^\s*[=+\-@\t\r]/` to neutralize both direct (`=1+1`, `@SUM(...)`) and leading-whitespace (` =CMD()`) spreadsheet formula payloads on export.
4. **File Upload Guardrails (`src/components/scanner/ScannerWorkspace.tsx`)**: Enforces `.txt`/`.csv` extension validation and a 5 MB client-side file size limit, with automated tests in `ScannerWorkspace.test.tsx`.
5. **15-Minute Privacy Lock (`src/engine/session.ts`, `src/components/ui/SessionLock.tsx`)**: Absolute deadline rechecked via interval, `visibilitychange`, and `focus`, clearing in-memory state on expiry.
6. **Dependency Audit**: `npm audit` executed — **0 vulnerabilities** across 246 packages.
7. **Security Headers (`public/_headers`)**: Configured CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS for static hosting.

## 3. Known Limitations & Residual Risks
- Client-side browser memory cannot prevent a compromised local browser extension or OS-level malware from reading DOM/RAM while a session is active.
- Regex-based PII detection (e.g., Aadhaar 12-digit patterns) may still produce occasional false positives on non-PII numeric sequences, which is mitigated via human-in-the-loop Accept/Reject review.
