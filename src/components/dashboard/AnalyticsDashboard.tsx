import type { SessionActivityEntry } from '../../engine/analytics.ts'
import { calculateExposureAssessment } from '../../engine/analytics.ts'
import type { PIICategory, PIIMatch, RedactionMode } from '../../engine/types.ts'
import { CategoryBadge, CountBadge } from '../ui/index.ts'

export interface AnalyticsDashboardProps {
  scanCount: number
  matches: PIIMatch[]
  redactionMode: RedactionMode
  activityHistory: SessionActivityEntry[]
}

const CATEGORIES: PIICategory[] = ['EMAIL', 'PHONE', 'IPV4', 'PAN', 'AADHAAR', 'CREDIT_CARD']

export function AnalyticsDashboard({
  scanCount,
  matches,
  redactionMode,
  activityHistory,
}: AnalyticsDashboardProps) {
  const assessment = calculateExposureAssessment(matches)

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 outline-none sm:px-6 lg:px-8">
      <div className="border-b border-border-subtle pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
          Session Telemetry
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
          Session Analytics Dashboard
        </h1>
        <p className="mt-1 text-xs text-muted">
          Session-only statistics calculated from your current local scans.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border-subtle bg-surface p-5 shadow-sm">
          <p className="font-mono text-xs text-muted">Documents Scanned</p>
          <p className="mt-2 font-display text-3xl font-semibold text-ink">{scanCount}</p>
        </div>
        <div className="rounded-lg border border-border-subtle bg-surface p-5 shadow-sm">
          <p className="font-mono text-xs text-muted">Entities Detected</p>
          <p className="mt-2 font-display text-3xl font-semibold text-icy">{assessment.totalDetections}</p>
        </div>
        <div className="rounded-lg border border-border-subtle bg-surface p-5 shadow-sm">
          <p className="font-mono text-xs text-muted">Entities Redacted</p>
          <p className="mt-2 font-display text-3xl font-semibold text-success">{assessment.acceptedCount}</p>
        </div>
        <div className="rounded-lg border border-border-subtle bg-surface p-5 shadow-sm">
          <p className="font-mono text-xs text-muted">Active Mode</p>
          <p className="mt-2 font-mono text-lg uppercase text-icy">{redactionMode}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border-subtle bg-charcoal p-5">
          <h2 className="text-base font-semibold text-ink">Category Breakdown</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            {CATEGORIES.map((cat) => {
              const count = matches.filter((m) => m.category === cat).length
              return (
                <div key={cat} className="flex items-center justify-between">
                  <CategoryBadge category={cat} />
                  <CountBadge label={cat} count={count} />
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-lg border border-border-subtle bg-charcoal p-5">
          <h2 className="text-base font-semibold text-ink">Session Detection Trend</h2>
          {activityHistory.length === 0 ? (
            <p className="mt-4 text-xs text-muted">No scans recorded in this session yet.</p>
          ) : (
            <ul className="mt-4 space-y-2 font-mono text-xs text-muted">
              {activityHistory.map((entry, idx) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between rounded border border-border-subtle bg-surface px-3 py-2"
                >
                  <span>Scan #{idx + 1}</span>
                  <span className="text-icy">{entry.detectionCount} detected</span>
                  <span>{entry.mode}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
