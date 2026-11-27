import { useMemo, useState } from 'react'
import {
  buildAuditPassportJSON,
  buildAuditPassportReport,
  calculateExposureAssessment,
} from '../../engine/analytics.ts'
import type { SessionActivityEntry } from '../../engine/analytics.ts'
import { evaluateSession } from '../../engine/session.ts'
import type { PIICategory, PIIMatch, RedactionMode } from '../../engine/types.ts'
import {
  AlertBanner,
  Button,
  CategoryBadge,
  CountBadge,
  DataTable,
  PrivacyLockBar,
} from '../ui/index.ts'

const ALL_CATEGORIES: PIICategory[] = [
  'EMAIL',
  'PHONE',
  'IPV4',
  'PAN',
  'AADHAAR',
  'CREDIT_CARD',
]

export interface PrivacyCommandCenterProps {
  matches: PIIMatch[]
  redactionMode: RedactionMode
  scanCount: number
  activityHistory: SessionActivityEntry[]
  deadlineMs: number
  nowMs: number
  onExtendSession: () => void
  onClearAll: () => void
}

export function PrivacyCommandCenter({
  matches,
  redactionMode,
  scanCount,
  activityHistory,
  deadlineMs,
  nowMs,
  onExtendSession,
  onClearAll,
}: PrivacyCommandCenterProps) {
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null)
  const session = evaluateSession(deadlineMs, nowMs)
  const assessment = useMemo(() => calculateExposureAssessment(matches), [matches])

  const categoryCounts = useMemo(() => {
    const counts = new Map<PIICategory, number>()
    for (const cat of ALL_CATEGORIES) counts.set(cat, 0)
    for (const m of matches) {
      counts.set(m.category, (counts.get(m.category) ?? 0) + 1)
    }
    return counts
  }, [matches])

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setDownloadFeedback(`Downloaded ${filename} (metadata only).`)
  }

  const handleDownloadJSON = () => {
    const data = buildAuditPassportJSON({
      generatedAtIso: new Date().toISOString(),
      sessionStatus: session.status,
      redactionMode,
      matches,
      scanCount,
    })
    downloadFile(
      JSON.stringify(data, null, 2),
      'piishield-audit-passport.json',
      'application/json;charset=utf-8',
    )
  }

  const handleDownloadReport = () => {
    const report = buildAuditPassportReport({
      generatedAtIso: new Date().toISOString(),
      sessionStatus: session.status,
      redactionMode,
      matches,
      scanCount,
    })
    downloadFile(report, 'piishield-privacy-report.txt', 'text/plain;charset=utf-8')
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <PrivacyLockBar
        deadlineMs={deadlineMs}
        nowMs={nowMs}
        onExtend={onExtendSession}
        onClearAll={onClearAll}
      />

      {downloadFeedback && (
        <AlertBanner
          variant="success"
          title={downloadFeedback}
          onDismiss={() => setDownloadFeedback(null)}
        />
      )}

      <section aria-label="Session Overview" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              Governance &amp; Audit Passport
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
              Privacy Command Center
            </h1>
            <p className="mt-1 text-xs text-muted">
              Metadata-only session telemetry. Cleared automatically on Privacy Lock expiry.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleDownloadReport}>
              Download Privacy Report
            </Button>
            <Button variant="primary" size="sm" onClick={handleDownloadJSON}>
              Download Audit JSON
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-lg border border-border-subtle bg-charcoal p-4">
            <p className="font-mono text-xs text-muted">Session Scans</p>
            <p className="mt-1 font-display text-2xl text-ink">{scanCount}</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-charcoal p-4">
            <p className="font-mono text-xs text-muted">Total Detected</p>
            <p className="mt-1 font-display text-2xl text-icy">{assessment.totalDetections}</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-charcoal p-4">
            <p className="font-mono text-xs text-muted">Accepted</p>
            <p className="mt-1 font-display text-2xl text-success">{assessment.acceptedCount}</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-charcoal p-4">
            <p className="font-mono text-xs text-muted">Rejected</p>
            <p className="mt-1 font-display text-2xl text-warning">{assessment.rejectedCount}</p>
          </div>
          <div className="rounded-lg border border-border-subtle bg-charcoal p-4">
            <p className="font-mono text-xs text-muted">Exposure Level</p>
            <p className="mt-1 font-display text-2xl uppercase text-ink">{assessment.level}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          aria-label="Category Distribution"
          className="rounded-lg border border-border-subtle bg-charcoal p-5"
        >
          <h2 className="text-base font-semibold text-ink">Category Distribution</h2>
          <div className="mt-4 flex flex-col gap-3">
            {ALL_CATEGORIES.map((cat) => {
              const count = categoryCounts.get(cat) ?? 0
              const pct =
                assessment.totalDetections > 0
                  ? Math.round((count / assessment.totalDetections) * 100)
                  : 0
              return (
                <div key={cat} className="flex items-center justify-between gap-3">
                  <CategoryBadge category={cat} />
                  <div className="flex flex-1 items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full bg-electric"
                        style={{ width: `${pct}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <CountBadge label={cat} count={count} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section
          aria-label="Privacy Analysis"
          className="rounded-lg border border-border-subtle bg-charcoal p-5"
        >
          <h2 className="text-base font-semibold text-ink">Privacy Analysis</h2>
          <p className="mt-2 text-xs text-muted">{assessment.methodology}</p>
          <div className="mt-4 rounded border border-border-subtle bg-surface p-3 font-mono text-xs text-ink">
            Coverage: {assessment.coveragePercent}% ({assessment.acceptedCount}/
            {assessment.totalDetections} accepted for redaction)
          </div>
          <h3 className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
            Remaining Limitations
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted">
            {assessment.limitations.map((lim) => (
              <li key={lim}>{lim}</li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-label="Recent Session Activity" className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-ink">
          Recent Session Activity (Metadata Only)
        </h2>
        <DataTable
          caption="Metadata-only recent session activity"
          getRowKey={(row) => row.id}
          rows={activityHistory}
          emptyMessage="No scans recorded in this session yet."
          columns={[
            {
              key: 'time',
              header: 'Time',
              render: (r) => <span className="font-mono text-xs text-muted">{r.timestampIso}</span>,
            },
            {
              key: 'count',
              header: 'Detections',
              render: (r) => <span className="font-mono text-xs text-ink">{r.detectionCount}</span>,
            },
            {
              key: 'categories',
              header: 'Categories',
              render: (r) => (
                <span className="font-mono text-xs text-icy">
                  {r.categories.length > 0 ? r.categories.join(', ') : 'None'}
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (r) => <span className="font-mono text-xs text-ink">{r.status}</span>,
            },
          ]}
        />
      </section>
    </main>
  )
}

