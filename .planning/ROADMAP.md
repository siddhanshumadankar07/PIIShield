# Roadmap: PIIShield

**Created:** 2026-11-27
**Mode:** Vertical MVP (`mvp`)
**Granularity:** Standard (6 phases)

## Phases

- [x] **Phase 1: Foundation, Design System & Core PII Engine** — Tailwind CSS + self-hosted typography + Deep Black × Electric Blue tokens + UI-independent PII detection & redaction engine
- [x] **Phase 2: Scanner Workspace & Privacy X-Ray** — Text/TXT/drag-drop input, human review controls, Privacy X-Ray, synchronized before/after comparison, and 15-minute Privacy Lock
- [x] **Phase 3: CSV Processing, Custom Rules & Web Worker Scaling** — Quoted/delimiter-preserving CSV pipeline, column-level review, ReDoS-safe custom rules, and non-blocking large-file scans
- [x] **Phase 4: Privacy Command Center & Audit Passport** — Session dashboard, metadata-only activity history, transparent exposure analysis, and downloadable Audit Passport
- [x] **Phase 5: Editorial Landing Page & 3D Hero** — 7-section editorial landing page with <300 KB pre-rendered 3D visual, isolated from scanner route
- [x] **Phase 6: Final Verification & Quality Gates** — End-to-end functional, privacy/storage/network isolation, WCAG 2.2 AA accessibility, and Lighthouse >= 90 performance verification

## Phase Details

### Phase 1: Foundation, Design System & Core PII Engine
**Goal:** Establish the Deep Black × Electric Blue design system with self-hosted fonts and build the UI-independent PII detection and redaction engine with unit tests.
**Mode:** mvp
**Requirements:** [DSGN-01, DSGN-02, DSGN-03, DSGN-04, PII-01, PII-02, PII-04]
**Success Criteria:**
1. Application renders with Deep Black × Electric Blue tokens, self-hosted Barlow Condensed/Anton, Inter, and JetBrains Mono fonts (zero Google Fonts CDN requests), and WCAG 2.2 AA contrast.
2. Core detection engine accurately detects Email, Phone, IPv4, Indian PAN, Aadhaar formats, and Luhn-validated Credit Card candidates with exact character positions and overlap handling.
3. Redaction engine supports Full Mask (`[REDACTED]`), Partial Mask, and Consistent Pseudonymization (`EMAIL_01`, `PHONE_01`, `PAN_01`) in temporary memory, verified by unit tests with synthetic data.

### Phase 2: Scanner Workspace & Privacy X-Ray
**Goal:** Deliver the end-to-end interactive scanner workspace with human-in-the-loop match review, accessible Privacy X-Ray, before/after comparison, and the 15-minute Privacy Lock.
**Mode:** mvp
**UI hint:** yes
**Requirements:** [PII-03, SCAN-01, SCAN-02, SCAN-03, PRIV-01, PRIV-02, PRIV-03]
**Success Criteria:**
1. User can paste text, upload TXT files, drag-and-drop, or load synthetic sample data, and review every detected match with accept/reject/select-all/deselect-all controls.
2. Privacy X-Ray highlights detected PII using non-color-only indicators (labels/underlines), and before/after comparison provides synchronized scrolling and redaction summaries.
3. 15-minute Privacy Lock enforces an absolute-deadline countdown, 1-minute warning, explicit extension, manual Clear All, and clears all in-memory references and object URLs on expiry or tab resume.

### Phase 3: CSV Processing, Custom Rules & Web Worker Scaling
**Goal:** Extend the scanner to support delimiter/quote-preserving CSV workflows, ReDoS-safe custom detection rules, and Web Worker offloading for large inputs.
**Mode:** mvp
**UI hint:** yes
**Requirements:** [PII-05, SCAN-04, SCAN-05]
**Success Criteria:**
1. CSV uploads preserve headers, rows, quoted fields, and delimiters, identify sensitive columns for column-level review, and export valid sanitized CSV.
2. User can create, test, toggle, and validate local custom regex/keyword rules with ReDoS protection.
3. Large text/CSV scans run without freezing the UI (using Web Workers where necessary), and copy/download actions work reliably.

### Phase 4: Privacy Command Center & Audit Passport
**Goal:** Provide session-level visibility, transparent exposure-level privacy analysis, and downloadable Audit Passports without ever storing or exporting original sensitive values.
**Mode:** mvp
**UI hint:** yes
**Requirements:** [DASH-01, DASH-02, DASH-03]
**Success Criteria:**
1. Privacy Command Center displays total detections, category distribution, session status/countdown, scan count, and metadata-only recent activity.
2. Privacy Analysis explains exposure-level scoring methodology, accepted/rejected counts, manual review items, and remaining limitations without claiming guaranteed anonymity.
3. Audit Passport downloads sanitized documents, privacy reports, and JSON audit summaries containing metadata only (never original sensitive values).

### Phase 5: Editorial Landing Page & 3D Hero
**Goal:** Build the 7-section editorial landing page with a lightweight pre-rendered 3D hero visual (<300 KB) completely isolated from the scanner route.
**Mode:** mvp
**UI hint:** yes
**Requirements:** [LAND-01, LAND-02, LAND-03]
**Success Criteria:**
1. Landing page presents all 7 editorial sections (Hero, The Problem, How It Works, Privacy Intelligence, Privacy by Design, 15-Minute Privacy Lock, Closing CTA) with clear navigation into the scanner.
2. Hero displays a pre-rendered 3D visual (<300 KB) with static fallback and reduced-motion support, and the scanner route never loads landing 3D assets.
3. Landing page achieves Lighthouse Performance >= 90 and LCP < 2.5s on the agreed test environment.

### Phase 6: Final Verification & Quality Gates
**Goal:** Verify all functional, privacy/network/storage isolation, WCAG 2.2 AA accessibility, responsive, and performance requirements across the complete application.
**Mode:** mvp
**Requirements:** []
**Success Criteria:**
1. All automated tests (detection, Luhn, overlaps, redaction modes, CSV, custom rules, session expiry, tab-resume, zero-network, zero-persistent-storage) pass using synthetic data only.
2. WCAG 2.2 AA keyboard navigation, focus states, screen-reader labels, and non-color-only PII indicators are verified across desktop, laptop, tablet, and mobile.
3. Lighthouse Performance >= 90 and LCP < 2.5s are measured and confirmed.

---
*Roadmap created: 2026-11-27*

