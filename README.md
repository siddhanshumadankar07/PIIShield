# PIIShield — Detect. Redact. Protect.

PIIShield is a 100% client-side Privacy Intelligence Platform built with React, TypeScript, Vite, and Tailwind CSS. It helps individuals and teams detect, review, and redact sensitive information before sharing logs, support tickets, CSV datasets, or documents.

## Key Features

- **Deterministic PII Detection (`src/engine/`)**: Detects Email, Phone, IPv4, Indian PAN, Aadhaar formats, and Luhn-validated Credit Card candidates with exact character-offset preservation and overlap resolution.
- **Human-in-the-Loop Review**: Inspect every match in **Privacy X-Ray** (accessible non-color-only indicators) and accept or reject individual detections before redaction.
- **Three Redaction Modes**: Full Mask (`[REDACTED]`), Partial Mask, and Consistent Pseudonymization (`EMAIL_01`, `PHONE_01`, `PAN_01`) stored in temporary memory only.
- **CSV & TXT Workflows**: Upload, drag-and-drop, or paste text/CSV; preserves CSV headers, quoted fields, and delimiters; copy or download sanitized output.
- **15-Minute Privacy Lock**: Absolute-deadline session countdown with 1-minute warning, explicit extension, manual Clear All, and automatic in-memory clearing on expiry or tab resume.
- **Privacy Command Center & Audit Passport**: Metadata-only session overview, category distribution, transparent exposure-level assessment, and downloadable `.txt` / `.json` Audit Passports (never containing original sensitive values).

## Tech Stack

- **Frontend**: React 19, TypeScript (`strict: true`), Vite 8, Tailwind CSS v4
- **Fonts**: Self-hosted `@fontsource/barlow-condensed`, `@fontsource/inter`, `@fontsource/jetbrains-mono`
- **Testing**: Vitest, React Testing Library, jsdom

## Setup & Commands

```bash
npm install
npm run dev      # Start local dev server
npm run build    # Type-check (tsc -b) and build production bundle
npm run lint     # Run ESLint
npm test         # Run Vitest unit & component tests
```

## Privacy Architecture & Known Limitations

- **100% Local Processing**: No backend uploads, no external AI calls, and no `localStorage`, `sessionStorage`, or `IndexedDB` usage for sensitive data.
- **Limitations**: Pattern/Luhn validation checks structure only and does not prove real-world identity or guarantee complete anonymity. Browser memory clearing releases application-held references and cannot claim forensic/physical RAM erasure.
