import { Button } from '../ui/index.ts'
import { SpartanWarrior } from '../ui/SpartanWarrior.tsx'

export interface LaunchScreenProps {
  onEnter: () => void
}

export function LaunchScreen({ onEnter }: LaunchScreenProps) {
  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-electric-atmosphere text-ink">
      {/* Fine graphite architectural grid */}
      <div aria-hidden="true" className="bg-tech-grid pointer-events-none absolute inset-0" />

      {/* Abstract diagonal graphite structural lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
        preserveAspectRatio="none"
      >
        <line x1="920" y1="0" x2="640" y2="900" stroke="#343A42" strokeWidth="1" />
        <line x1="1180" y1="0" x2="900" y2="900" stroke="#272C32" strokeWidth="1" />
      </svg>

      {/* Minimal top bar */}
      <header className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-border-subtle px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-border-subtle bg-surface font-mono text-[10px] font-semibold text-icy">
            PS
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink">
            PIIShield
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
          Local Privacy Engine
        </span>
      </header>

      {/* Main balanced two-column hero */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:py-16">
        <div className="animate-fade-in flex flex-col items-start lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-electric">
            DETECT. REDACT. PROTECT.
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            Welcome to Siddhanshu&apos;s PIIShield
          </h1>

          <p className="mt-5 text-lg font-medium text-icy sm:text-xl">
            Your Data. Your Privacy. Your Control.
          </p>

          <p className="mt-4 max-w-xl border-l border-border-subtle pl-4 text-sm leading-relaxed text-muted sm:text-base">
            Take control of your digital privacy. Detect sensitive information, intelligently redact
            personal data, and protect what matters — all while keeping your data on your device.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" onClick={onEnter} className="px-7">
              Enter PIIShield →
            </Button>
            <span className="font-mono text-xs text-subtle">
              100% client-side · Zero uploads
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:col-span-5 lg:justify-end">
          <div className="relative flex h-[340px] w-[260px] items-center justify-center sm:h-[460px] sm:w-[360px] lg:h-[540px] lg:w-[420px]">
            <SpartanWarrior className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* Bottom metadata bar */}
      <footer className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between border-t border-border-subtle px-5 py-3.5 font-mono text-[11px] text-subtle sm:px-8">
        <span>In-Memory Processing · Deterministic Detection</span>
        <span>15-Minute Privacy Lock</span>
      </footer>
    </main>
  )
}
