# PIIShield — Production Deployment Checklist

1. **Build**: Run `npm run build` and deploy `dist/` to static HTTPS hosting (Cloudflare Pages, Netlify, or Vercel).
2. **Security Headers**: Verify `public/_headers` is served (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy`, `Strict-Transport-Security`).
3. **Zero-Network Check**: Open DevTools Network tab on the deployed URL, run a scan with synthetic data, and confirm zero outbound requests carry document text or PII.
4. **Lighthouse**: Run Lighthouse on the deployed Overview and Scanner routes to confirm Performance >= 90 and LCP < 2.5s.
