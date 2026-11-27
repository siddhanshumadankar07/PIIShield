# Requirements: PIIShield

**Defined:** 2026-11-27
**Core Value:** Accurate, transparent, 100% local PII detection with human-in-the-loop review and reliable redaction before any document leaves the user's device.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Design System & Visual Identity

- [ ] **DSGN-01**: User experiences a Deep Black × Electric Blue × Icy Blue dark editorial palette with subtle grey borders and no generic purple AI gradients or emoji icons
- [ ] **DSGN-02**: Application uses self-hosted fonts only (Barlow Condensed or Anton for display, Inter for body, JetBrains Mono for technical labels) with zero Google Fonts CDN requests
- [ ] **DSGN-03**: Layout primitives, spacing, typography scale, and responsive rules support desktop, laptop, tablet, and mobile viewports
- [ ] **DSGN-04**: All UI components meet WCAG 2.2 AA contrast, keyboard navigation, visible focus states, semantic HTML, and `prefers-reduced-motion` support

### Core PII Detection & Redaction Engine

- [ ] **PII-01**: Engine detects Email addresses, Phone numbers, IPv4 addresses, Indian PAN numbers, Aadhaar number formats, and Credit Card candidates (passing Luhn validation) independently of UI code
- [ ] **PII-02**: Engine handles formatting variations, repeated entities, overlapping matches, and preserves original character positions without claiming format validation proves authenticity
- [ ] **PII-03**: User can review each detected match (value, category, location, detection method, validation status, heuristic certainty) and accept, reject, select all, or deselect all; rejected matches are never redacted
- [ ] **PII-04**: User can redact using Full Mask (`[REDACTED]`), Partial Mask, or Consistent Pseudonymization (`EMAIL_01`, `PHONE_01`, `PAN_01`) stored in temporary memory only
- [ ] **PII-05**: User can define local custom detection rules (name, pattern/keyword, enable/disable, sample test, ReDoS-safe validation)

### Scanner Workspace

- [ ] **SCAN-01**: User can input content via pasted text, TXT upload, CSV upload, drag-and-drop, or synthetic sample data
- [ ] **SCAN-02**: Privacy X-Ray highlights detected PII in the original document using accessible non-color-only indicators (labels, underlines)
- [ ] **SCAN-03**: Before-and-after comparison displays original and sanitized documents with highlighted changes, synchronized scrolling, detection counts, and redaction summary
- [ ] **SCAN-04**: CSV processing preserves headers, rows, quoted fields, and delimiters, supports sensitive-column identification and column-level review, and exports valid sanitized CSV
- [ ] **SCAN-05**: User can copy sanitized output or download sanitized TXT/CSV without freezing the UI on large inputs (using Web Workers where necessary)

### Privacy Command Center & Analysis

- [ ] **DASH-01**: Dashboard displays total detections, category distribution, current session status, session countdown, scan count, and metadata-only recent activity (no original content)
- [ ] **DASH-02**: Privacy Analysis displays transparent exposure-level assessment (detected categories, totals, accepted/rejected counts, sanitization status, manual review items, remaining limitations, and scoring methodology)
- [ ] **DASH-03**: Audit Passport provides downloadable sanitized document, privacy report, and JSON audit summary containing metadata only (never original sensitive values)

### 15-Minute Privacy Lock & Local Architecture

- [ ] **PRIV-01**: Every scanning session enforces a 15-minute absolute-deadline countdown with 1-minute warning, optional explicit extension, and manual Clear All
- [ ] **PRIV-02**: Session expiry clears all in-memory references (original text, uploaded content, detections, sanitized output, pseudonymization mappings, temporary analytics, object URLs) and rechecks on tab focus, resume, or new scan
- [ ] **PRIV-03**: All processing is 100% local with zero backend uploads, zero external AI calls, zero `localStorage`/`sessionStorage`/`IndexedDB` usage for sensitive data, and a technical privacy verification panel

### Editorial Landing Page

- [ ] **LAND-01**: Landing page presents 7 editorial sections: Hero (oversized PIISHIELD typography, "DETECT. REDACT. PROTECT.", Start Scanning & Learn More actions), The Problem, How It Works, Privacy Intelligence, Privacy by Design, 15-Minute Privacy Lock, and Closing CTA
- [ ] **LAND-02**: Hero uses a lightweight pre-rendered 3D visual (< 300 KB WebP/video) with static fallback, reduced-motion support, and zero 3D assets loaded on the scanner route
- [ ] **LAND-03**: Landing page achieves Lighthouse Performance >= 90 and LCP < 2.5s on the agreed test environment

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Extended Formats & Workflows

- **EXT-01**: JSON and log-file support
- **EXT-02**: DOCX and PDF support
- **EXT-03**: Batch scanning and ZIP exports
- **EXT-04**: Reversible mapping export (requires explicit consent and strong security warnings)

### Platform & Intelligence

- **PLAT-01**: Offline-capable PWA and browser extension
- **PLAT-02**: Advanced quasi-identifier analysis and additional country-specific detectors
- **PLAT-03**: Keyboard command palette and light theme

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend document uploads / external AI | Violates 100% local-first privacy architecture |
| User accounts / registration | Unnecessary friction and data collection |
| Three.js / React Three Fiber | Heavy runtime bundle; pre-rendered 3D WebP/video meets <300 KB and <2.5s LCP targets |
| Persistent storage of sensitive data | Violates zero-persistence Privacy Lock guarantee |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Pending | Pending |
| DSGN-02 | Pending | Pending |
| DSGN-03 | Pending | Pending |
| DSGN-04 | Pending | Pending |
| PII-01 | Pending | Pending |
| PII-02 | Pending | Pending |
| PII-03 | Pending | Pending |
| PII-04 | Pending | Pending |
| PII-05 | Pending | Pending |
| SCAN-01 | Pending | Pending |
| SCAN-02 | Pending | Pending |
| SCAN-03 | Pending | Pending |
| SCAN-04 | Pending | Pending |
| SCAN-05 | Pending | Pending |
| DASH-01 | Pending | Pending |
| DASH-02 | Pending | Pending |
| DASH-03 | Pending | Pending |
| PRIV-01 | Pending | Pending |
| PRIV-02 | Pending | Pending |
| PRIV-03 | Pending | Pending |
| LAND-01 | Pending | Pending |
| LAND-02 | Pending | Pending |
| LAND-03 | Pending | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 0
- Unmapped: 23

---
*Requirements defined: 2026-11-27*
*Last updated: 2026-11-27 after initial definition*
