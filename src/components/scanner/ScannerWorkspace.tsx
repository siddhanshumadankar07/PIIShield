import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  createPseudonymSession,
  createSessionDeadline,
  detectPII,
  evaluateSession,
  redactText,
  sanitizeCSV,
} from '../../engine/index.ts'
import type { PIICategory, PIIMatch, RedactionMode } from '../../engine/types.ts'
import {
  AlertBanner,
  Button,
  CategoryBadge,
  CountBadge,
  DataTable,
  DocumentPanel,
  FileUpload,
  PrivacyLockBar,
  Select,
  StatusBadge,
  Textarea,
  ValidationBadge,
} from '../ui/index.ts'
import { PrivacyXRay } from './PrivacyXRay.tsx'

const SYNTHETIC_SAMPLE = [
  'Support Ticket #4092 — Synthetic Test Record',
  'Customer: alex.mercer@example.org',
  'Backup Contact: +91 9876543210 | Secondary: alex.mercer@example.org',
  'Client IP: 192.168.1.42',
  'Tax ID (PAN): ABCDE1234F',
  'Aadhaar Ref: 2345 6789 0123',
  'Card Candidate: 4532 0151 1283 0366',
].join('\n')

export interface ScannerWorkspaceProps {
  onScanRecorded?: (detected: PIIMatch[], mode: RedactionMode) => void
  onMatchesUpdated?: (matches: PIIMatch[]) => void
  onModeUpdated?: (mode: RedactionMode) => void
  onClearSession?: () => void
}

export function ScannerWorkspace({
  onScanRecorded,
  onMatchesUpdated,
  onModeUpdated,
  onClearSession,
}: ScannerWorkspaceProps = {}) {
  const [inputText, setInputText] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [isCSV, setIsCSV] = useState(false)
  const [matches, setMatches] = useState<PIIMatch[]>([])
  const [redactionMode, setRedactionMode] = useState<RedactionMode>('full')
  const [deadlineMs, setDeadlineMs] = useState<number>(() => createSessionDeadline())
  const [nowMs, setNowMs] = useState<number>(() => Date.now())
  const [feedback, setFeedback] = useState<{ variant: 'success' | 'info' | 'warning'; title: string } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const originalScrollRef = useRef<HTMLDivElement>(null)
  const sanitizedScrollRef = useRef<HTMLDivElement>(null)
  const isSyncingScroll = useRef(false)
  const [pseudonymSession, setPseudonymSession] = useState(() => createPseudonymSession())

  const clearAllSessionData = useCallback(() => {
    setInputText('')
    setFileName(null)
    setIsCSV(false)
    setMatches([])
    setPseudonymSession(createPseudonymSession())
    onClearSession?.()
    setFeedback({ variant: 'info', title: 'All temporary session data cleared from memory.' })
  }, [onClearSession])

  // Recheck absolute deadline on interval, visibilitychange, and focus
  useEffect(() => {
    const checkExpiry = () => {
      const current = Date.now()
      setNowMs(current)
      const state = evaluateSession(deadlineMs, current)
      if (state.status === 'expired') {
        clearAllSessionData()
      }
    }

    const interval = window.setInterval(checkExpiry, 1000)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') checkExpiry()
    }
    window.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', checkExpiry)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('focus', checkExpiry)
    }
  }, [deadlineMs, clearAllSessionData])

  const runScan = useCallback((text: string, csvMode = false) => {
    const current = Date.now()
    if (evaluateSession(deadlineMs, current).status === 'expired') {
      setDeadlineMs(createSessionDeadline(current))
    }
    setInputText(text)
    setIsCSV(csvMode)
    const detected = detectPII(text)
    setMatches(detected)
    onMatchesUpdated?.(detected)
    if (text.trim().length > 0) {
      onScanRecorded?.(detected, redactionMode)
    }
  }, [deadlineMs, onMatchesUpdated, onScanRecorded, redactionMode])

  const handleFile = async (file: File) => {
    const lower = file.name.toLowerCase()
    if (!lower.endsWith('.txt') && !lower.endsWith('.csv')) {
      setFeedback({ variant: 'warning', title: 'Only .txt and .csv files are supported.' })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setFeedback({ variant: 'warning', title: 'File exceeds the 5 MB client-side safety limit.' })
      return
    }
    const content = await file.text()
    const csvDetected = lower.endsWith('.csv')
    setFileName(file.name)
    runScan(content, csvDetected)
  }

  const redactionResult = useMemo(() => {
    if (!inputText) {
      return { sanitizedText: '', redactedCount: 0, skippedCount: 0 }
    }
    if (isCSV) {
      const csvRes = sanitizeCSV(inputText, redactionMode, pseudonymSession)
      return {
        sanitizedText: csvRes.sanitizedCSV,
        redactedCount: csvRes.totalRedacted,
        skippedCount: matches.filter((m) => !m.accepted).length,
      }
    }
    return redactText(inputText, matches, redactionMode, pseudonymSession)
  }, [inputText, isCSV, matches, redactionMode, pseudonymSession])

  const categoryCounts = useMemo(() => {
    const counts = new Map<PIICategory, number>()
    for (const m of matches) {
      counts.set(m.category, (counts.get(m.category) ?? 0) + 1)
    }
    return counts
  }, [matches])

  const syncScroll = (source: 'original' | 'sanitized') => {
    if (isSyncingScroll.current) return
    const from = source === 'original' ? originalScrollRef.current : sanitizedScrollRef.current
    const to = source === 'original' ? sanitizedScrollRef.current : originalScrollRef.current
    if (!from || !to) return

    isSyncingScroll.current = true
    to.scrollTop = from.scrollTop
    to.scrollLeft = from.scrollLeft
    requestAnimationFrame(() => {
      isSyncingScroll.current = false
    })
  }

  const handleCopy = async () => {
    if (!redactionResult.sanitizedText) return
    try {
      await navigator.clipboard.writeText(redactionResult.sanitizedText)
      setFeedback({ variant: 'success', title: 'Sanitized output copied to clipboard.' })
    } catch {
      setFeedback({ variant: 'warning', title: 'Clipboard access unavailable. Please download the file instead.' })
    }
  }

  const handleDownload = (ext: 'txt' | 'csv') => {
    if (!redactionResult.sanitizedText) return
    const mime = ext === 'csv' ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8'
    const blob = new Blob([redactionResult.sanitizedText], { type: mime })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `piishield-sanitized.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setFeedback({ variant: 'success', title: `Downloaded piishield-sanitized.${ext}` })
  }

  const toggleMatch = (id: string) => {
    setMatches((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, accepted: !m.accepted } : m))
      onMatchesUpdated?.(next)
      return next
    })
  }

  const setAllMatches = (accepted: boolean) => {
    setMatches((prev) => {
      const next = prev.map((m) => ({ ...m, accepted }))
      onMatchesUpdated?.(next)
      return next
    })
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <PrivacyLockBar
        deadlineMs={deadlineMs}
        nowMs={nowMs}
        onExtend={() => setDeadlineMs(createSessionDeadline())}
        onClearAll={clearAllSessionData}
      />

      {feedback && (
        <AlertBanner
          variant={feedback.variant}
          title={feedback.title}
          onDismiss={() => setFeedback(null)}
        />
      )}

      <section
        aria-label="Document Input"
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) void handleFile(file)
        }}
        className={`rounded-lg border p-5 transition-colors shadow-sm ${
          isDragging ? 'border-icy bg-elevated' : 'border-border-subtle bg-charcoal'
        }`}
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              Local Sanitization Workspace
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
              Scanner Workspace
            </h1>
            <p className="mt-1 text-xs text-muted">
              100% local processing. No uploads, no persistent storage.
              {fileName ? ` Loaded: ${fileName}` : ''}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setFileName('synthetic-sample.txt')
                runScan(SYNTHETIC_SAMPLE, false)
              }}
            >
              Load Synthetic Sample
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              onClick={clearAllSessionData}
              disabled={!inputText}
            >
              Clear Input
            </Button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Textarea
              label="Paste or type text to scan"
              placeholder="Paste logs, support tickets, or text here..."
              value={inputText}
              onChange={(e) => runScan(e.target.value, isCSV)}
              rows={7}
            />
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-md border border-border-subtle bg-surface p-4 lg:col-span-5">
            <FileUpload
              label="Upload TXT or CSV"
              accept=".txt,.csv"
              hint="Drag and drop supported"
              onFilesSelected={(files) => {
                const file = files[0]
                if (file) void handleFile(file)
              }}
            />
            <Select
              label="Redaction Mode"
              value={redactionMode}
              onChange={(e) => {
                const nextMode = e.target.value as RedactionMode
                setRedactionMode(nextMode)
                onModeUpdated?.(nextMode)
              }}
              options={[
                { value: 'full', label: 'Full Mask ([REDACTED])' },
                { value: 'partial', label: 'Partial Mask' },
                { value: 'pseudonym', label: 'Consistent Pseudonymization' },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-label="Detection Summary" className="flex flex-wrap items-center gap-2">
        <CountBadge label="Total Detections" count={matches.length} />
        <CountBadge label="Redacted" count={redactionResult.redactedCount} />
        <CountBadge label="Skipped" count={redactionResult.skippedCount} />
        {Array.from(categoryCounts.entries()).map(([cat, count]) => (
          <CountBadge key={cat} label={cat} count={count} />
        ))}
      </section>

      <section aria-label="Before and After Comparison" className="grid gap-4 lg:grid-cols-2">
        <DocumentPanel
          title="Original Document (Privacy X-Ray)"
          variant="original"
          badge={<CountBadge label="Matches" count={matches.length} />}
        >
          {inputText ? (
            <div
              ref={originalScrollRef}
              onScroll={() => syncScroll('original')}
              className="max-h-80 overflow-auto"
            >
              <PrivacyXRay text={inputText} matches={matches} />
            </div>
          ) : null}
        </DocumentPanel>

        <DocumentPanel
          title="Sanitized Output"
          variant="sanitized"
          badge={<CountBadge label="Redacted" count={redactionResult.redactedCount} />}
          actions={
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void handleCopy()}
                disabled={!redactionResult.sanitizedText}
              >
                Copy
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownload(isCSV ? 'csv' : 'txt')}
                disabled={!redactionResult.sanitizedText}
              >
                Download {isCSV ? 'CSV' : 'TXT'}
              </Button>
            </div>
          }
        >
          {redactionResult.sanitizedText ? (
            <div
              ref={sanitizedScrollRef}
              onScroll={() => syncScroll('sanitized')}
              className="max-h-80 overflow-auto"
            >
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-ink">
                {redactionResult.sanitizedText}
              </pre>
            </div>
          ) : null}
        </DocumentPanel>
      </section>

      <section aria-label="Human Detection Review" className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-ink">
            Detection Review
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setAllMatches(true)}
              disabled={matches.length === 0}
            >
              Select All
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => setAllMatches(false)}
              disabled={matches.length === 0}
            >
              Deselect All
            </Button>
          </div>
        </div>

        <DataTable
          caption="Detected PII entities for human review"
          getRowKey={(m) => m.id}
          rows={matches}
          emptyMessage="No PII detected yet. Paste text or load the synthetic sample."
          columns={[
            {
              key: 'category',
              header: 'Category',
              render: (m) => <CategoryBadge category={m.category} />,
            },
            {
              key: 'value',
              header: 'Detected Value',
              render: (m) => <code className="font-mono text-xs text-ink">{m.value}</code>,
            },
            {
              key: 'location',
              header: 'Location',
              render: (m) => (
                <span className="font-mono text-xs text-muted">
                  {m.start}–{m.end}
                </span>
              ),
            },
            {
              key: 'validation',
              header: 'Validation',
              render: (m) => <ValidationBadge status={m.validationStatus} />,
            },
            {
              key: 'status',
              header: 'Status',
              render: (m) => <StatusBadge status={m.accepted ? 'accepted' : 'rejected'} />,
            },
            {
              key: 'action',
              header: 'Review',
              render: (m) => (
                <Button
                  variant={m.accepted ? 'tertiary' : 'secondary'}
                  size="sm"
                  onClick={() => toggleMatch(m.id)}
                >
                  {m.accepted ? 'Reject' : 'Accept'}
                </Button>
              ),
            },
          ]}
        />
      </section>
    </main>
  )
}
