import { Button } from '../ui/index.ts'
import { SpartanWarrior } from '../ui/SpartanWarrior.tsx'

export interface LandingPageProps {
  onOpenScanner: () => void
}

export function LandingPage({ onOpenScanner }: LandingPageProps) {
  return (
    <div className="bg-void text-ink">
      {/* Section 1: Hero */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden border-b border-border-subtle bg-electric-atmosphere"
      >
        <div aria-hidden="true" className="bg-tech-grid pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric">
              PIIShield — Privacy Intelligence Platform
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-6xl">
              Detect. Redact. <span className="text-electric">Protect.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Your information deserves protection before it gets shared. Detect, review, and
              redact sensitive identifiers 100% locally in your browser before exporting logs,
              tickets, CSVs, or documents.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="primary" size="lg" onClick={onOpenScanner}>
                Open Scanner
              </Button>
              <a
                href="#features"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border-subtle bg-surface px-6 text-sm font-medium text-ink no-underline transition-colors hover:bg-elevated"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="h-[320px] w-[240px] sm:h-[400px] sm:w-[300px]">
              <SpartanWarrior className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Problem */}
      <section
        aria-label="The Problem"
        className="mx-auto max-w-7xl border-b border-border-subtle px-5 py-16 sm:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">01 / The Problem</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
              Sensitive data leaks in everyday workflows
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-wider text-icy">
                Debugging Logs &amp; Support Tickets
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Stack traces and customer transcripts routinely contain emails, phone numbers, and
                IPv4 addresses.
              </p>
            </div>
            <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-wider text-icy">
                CSV Datasets &amp; AI Prompts
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Analysts and teams share spreadsheets or paste records into external AI tools
                without reviewing embedded PAN, Aadhaar, or card numbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section
        id="features"
        aria-label="How It Works"
        className="mx-auto max-w-7xl border-b border-border-subtle px-5 py-16 sm:px-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">02 / How It Works</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
          Three deterministic stages
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
            <span className="font-mono text-xs tracking-wider text-electric">Stage 01</span>
            <h3 className="mt-2 font-display text-lg font-medium text-ink">
              Detect Sensitive Information
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Paste text or drop TXT/CSV files. The local engine scans for 6 mandatory PII
              categories with exact character offsets.
            </p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
            <span className="font-mono text-xs tracking-wider text-electric">Stage 02</span>
            <h3 className="mt-2 font-display text-lg font-medium text-ink">Review &amp; Sanitize</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Inspect matches in Privacy X-Ray, accept or reject individual detections, and choose
              Full Mask, Partial Mask, or Pseudonymization.
            </p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
            <span className="font-mono text-xs tracking-wider text-electric">Stage 03</span>
            <h3 className="mt-2 font-display text-lg font-medium text-ink">
              Export Protected Content
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Copy or download sanitized TXT/CSV alongside a metadata-only Audit Passport report.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Privacy Intelligence */}
      <section
        aria-label="Privacy Intelligence"
        className="mx-auto max-w-7xl border-b border-border-subtle px-5 py-16 sm:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              03 / Privacy Intelligence
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
              Six categories &amp; three redaction modes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Detects Email, Phone, IPv4, Indian PAN, Aadhaar formats, and Luhn-validated Credit
              Card candidates. Redact with Full Mask, Partial Mask, or Consistent Pseudonymization.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            {['EMAIL', 'PHONE', 'IPV4', 'PAN', 'AADHAAR', 'CREDIT_CARD'].map((cat) => (
              <div
                key={cat}
                className="flex items-center justify-between rounded-md border border-border-subtle bg-surface px-4 py-3 text-icy"
              >
                <span>{cat}</span>
                <span className="text-subtle">LOCAL</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 & 6: Privacy by Design + 15-Minute Privacy Lock + Audit Passport */}
      <section
        aria-label="Privacy Architecture"
        className="mx-auto max-w-7xl border-b border-border-subtle px-5 py-16 sm:px-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              04 / Privacy by Design
            </p>
            <h3 className="mt-2 font-display text-xl font-medium text-ink">
              100% Client-Side Processing
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Zero backend uploads, zero external AI calls, and zero sensitive data in
              localStorage, sessionStorage, or IndexedDB.
            </p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              05 / 15-Minute Privacy Lock &amp; Audit Passport
            </p>
            <h3 className="mt-2 font-display text-xl font-medium text-ink">
              Automatic Expiry &amp; Metadata-Only Reports
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Every session enforces an absolute 15-minute deadline that clears in-memory
              references on expiry, while Audit Passports export metadata only.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Closing CTA & Footer */}
      <section aria-label="Get Started" className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Ready to sanitize before you share?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          Open the local scanner workspace and inspect your documents with full human control.
        </p>
        <div className="mt-6 flex justify-center">
          <Button variant="primary" size="lg" onClick={onOpenScanner}>
            Open Scanner
          </Button>
        </div>
      </section>

      <footer className="border-t border-border-subtle bg-charcoal px-4 py-6 text-center font-mono text-xs text-subtle">
        PIIShield — Detect. Redact. Protect. · 100% Client-Side Privacy Intelligence
      </footer>
    </div>
  )
}
