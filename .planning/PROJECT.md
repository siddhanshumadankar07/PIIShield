# PIIShield

## What This Is

PIIShield ("Detect. Redact. Protect.") is a local-first privacy intelligence platform built with React, TypeScript, Vite, and Tailwind CSS that helps individuals and organizations detect, review, redact, and protect sensitive information before sharing documents. It combines deterministic client-side PII detection, human-reviewed sanitization, privacy analysis, a 15-minute Privacy Lock session lifecycle, and downloadable Audit Passports within an editorial Deep Black × Electric Blue visual identity.

## Core Value

Accurate, transparent, 100% local PII detection with human-in-the-loop review and reliable redaction before any document leaves the user's device.

## Requirements

### Validated

- ✓ Vite + React + TypeScript application shell and build pipeline (`npm run dev`, `npm run build`, `npm run lint`) — existing

### Active

- [ ] **Design System & Typography**: Deep Black × Electric Blue × Icy Blue palette, self-hosted fonts (Barlow Condensed/Anton, Inter, JetBrains Mono via Fontsource or local files — no Google Fonts CDN), Tailwind CSS tokens, WCAG 2.2 AA contrast, reduced-motion support
- [ ] **Core PII Detection Engine (UI-independent)**: Detect Email, Phone, IPv4, Indian PAN, Aadhaar formats, and Credit Card candidates (with Luhn validation); handle formatting variations, repeated entities, overlapping matches, and character positions
- [ ] **Human Review & Confidence**: Per-match review (detected value, category, location, method, validation status, heuristic certainty) with accept/reject/select-all/deselect-all controls; rejected matches are never redacted
- [ ] **Redaction Modes & Custom Rules**: Full Mask (`[REDACTED]`), Partial Mask, and Consistent Pseudonymization (`EMAIL_01`, `PHONE_01`, `PAN_01`) in temporary memory; local custom regex/keyword rules with ReDoS safety validation
- [ ] **Scanner Workspace**: Paste text, TXT/CSV upload, drag-and-drop, synthetic sample data; Privacy X-Ray (non-color-only indicators); synchronized before/after comparison; CSV header/delimiter/quote preservation and column-level review; copy & download
- [ ] **Privacy Command Center & Analysis**: Session totals, category distribution, scan count, metadata-only recent activity (no original content), transparent exposure-level scoring methodology
- [ ] **15-Minute Privacy Lock**: Absolute-deadline countdown, 1-minute warning, optional explicit extension, manual Clear All, automatic expiry clearing all in-memory references and object URLs, rechecked on tab focus/resume/new scan
- [ ] **Local Privacy Architecture & Audit Passport**: Zero backend uploads, zero persistent storage (`localStorage`/`sessionStorage`/`IndexedDB`), technical privacy info panel, downloadable sanitized document, privacy report, and JSON audit summary (no original values)
- [ ] **Editorial Landing Page**: 7-section editorial landing page (Hero with lightweight pre-rendered 3D visual under 300 KB, The Problem, How It Works, Privacy Intelligence, Privacy by Design, 15-Minute Privacy Lock, Closing CTA); scanner route must never load landing 3D assets
- [ ] **Quality, Performance & Accessibility**: Comprehensive unit/integration/privacy/a11y tests with synthetic data only; Lighthouse Performance >= 90, LCP < 2.5s, WCAG 2.2 AA, responsive across desktop/laptop/tablet/mobile

### Out of Scope

- Reversible mapping export — deferred to a separately approved future feature with explicit consent/warnings
- JSON/log-file, DOCX, and PDF support — future extension, do not delay MVP
- Batch scanning and ZIP exports — future extension
- Offline PWA and browser extension — future extension
- Advanced quasi-identifier analysis and additional country-specific detectors — future extension
- Keyboard command palette and light theme — future extension
- Three.js / React Three Fiber — excluded unless explicitly approved later; use lightweight pre-rendered 3D WebP/video
- User accounts, registration, backend document uploads, or external AI processing — violates local-first privacy architecture

## Context

- **Current Codebase**: Fresh Vite `^8.4.0` + React `^19.3.1` + TypeScript `~6.0.3` starter template (`src/App.tsx`, `src/main.tsx`, `index.html`) mapped in `.planning/codebase/`.
- **Primary Use Cases**: Developers sharing debugging logs, support teams sharing tickets, analysts sharing CSVs, students sharing project docs, businesses sharing employee/customer docs, individuals preparing prompts for external AI tools.
- **Visual Direction**: Inspired by editorial dark compositions (Deep Black, Charcoal, Electric Blue, Icy Blue), avoiding generic purple AI gradients, emoji icons, excessive glassmorphism, and identical card grids.

## Constraints

- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS; self-hosted fonts only (no Google Fonts CDN).
- **Privacy**: 100% client-side processing; no backend uploads, no `localStorage`/`sessionStorage`/`IndexedDB` for sensitive data, no sensitive console logs.
- **Performance**: Lighthouse Performance >= 90, LCP < 2.5s, hero visual < 300 KB, Web Workers for large scans, no 3D assets loaded on scanner route.
- **Accessibility**: WCAG 2.2 AA; PII highlights must not rely on color alone.
- **Delivery**: Strict phase-gated delivery (Phase 0 Audit/Planning -> Phase 1 Design System -> Phase 2 Shared Components -> Phase 3 Scanner -> Phase 4 Dashboard/Analytics -> Phase 5 Landing Page -> Phase 6 Final Verification) with explicit review gates.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Local-only processing with 15-min absolute-deadline Privacy Lock | Eliminates server trust surface and ensures temporary memory cleanup | — Pending |
| Lightweight pre-rendered 3D hero asset (no Three.js/R3F) | Meets <300 KB and <2.5s LCP targets without heavy runtime bundle | — Pending |
| Self-hosted fonts (Fontsource/local) | Avoids external CDN requests and supports privacy-first architecture | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-11-27 after initialization*

