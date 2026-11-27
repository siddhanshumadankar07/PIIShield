# External Integrations

**Analysis Date:** 2026-11-27

## APIs & External Services

**Not detected:**
- No backend APIs, SDKs, or external service clients are installed or imported in `package.json` or `src/`
- `src/App.tsx` currently contains static external documentation/community hyperlinks (`https://vite.dev/`, `https://react.dev/`, `https://github.com/vitejs/vite`, `https://chat.vite.dev/`, `https://x.com/vite_js`, `https://bsky.app/profile/vite.dev`) from the starter template

## Data Storage

**Databases:**
- Not detected — no database client or ORM is configured

**File Storage:**
- Static local assets only: `public/favicon.svg`, `public/icons.svg`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`

**Caching:**
- None configured at application level

## Authentication & Identity

**Auth Provider:**
- None configured — no authentication libraries, session handling, or identity providers exist in the codebase

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- None configured (standard browser console only)

## CI/CD & Deployment

**Hosting:**
- Not configured (standard static Vite build targeting `dist/` per `.gitignore` and `eslint.config.js`)

**CI Pipeline:**
- None detected (no `.github/workflows/` or CI config files present)

## Environment Configuration

**Required env vars:**
- None required

**Secrets location:**
- Not applicable (`*.local` is ignored in `.gitignore`)

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-11-27*
