import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { ShieldAI } from './components/assistant/ShieldAI.tsx'
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard.tsx'
import { PrivacyCommandCenter } from './components/dashboard/PrivacyCommandCenter.tsx'
import { LaunchScreen } from './components/launch/LaunchScreen.tsx'
import { ScannerWorkspace } from './components/scanner/ScannerWorkspace.tsx'
import { Navbar } from './components/ui/index.ts'
import type { SessionActivityEntry } from './engine/analytics.ts'
import { createSessionDeadline, evaluateSession } from './engine/session.ts'
import type { ShieldAISummary } from './engine/shieldAi.ts'
import type { PIICategory, PIIMatch, RedactionMode } from './engine/types.ts'

const LandingPage = lazy(() =>
  import('./components/landing/LandingPage.tsx').then((m) => ({ default: m.LandingPage })),
)

export function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [activeRoute, setActiveRoute] = useState('landing')
  const [matches, setMatches] = useState<PIIMatch[]>([])
  const [redactionMode, setRedactionMode] = useState<RedactionMode>('full')
  const [scanCount, setScanCount] = useState(0)
  const [activityHistory, setActivityHistory] = useState<SessionActivityEntry[]>([])
  const [deadlineMs, setDeadlineMs] = useState<number>(() => createSessionDeadline())
  const [nowMs, setNowMs] = useState<number>(() => Date.now())

  const clearSessionAnalytics = useCallback(() => {
    setMatches([])
    setScanCount(0)
    setActivityHistory([])
  }, [])

  const handleScanRecorded = useCallback((detected: PIIMatch[], mode: RedactionMode) => {
    const categories = Array.from(new Set(detected.map((m) => m.category)))
    const redactedCount = detected.filter((m) => m.accepted).length
    setScanCount((prev) => {
      const next = prev + 1
      setActivityHistory((hist) => [
        {
          id: `scan-${next}`,
          timestampIso: new Date().toISOString(),
          detectionCount: detected.length,
          redactedCount,
          categories,
          mode,
          status: redactedCount === detected.length ? 'sanitized' : 'pending_review',
        },
        ...hist,
      ])
      return next
    })
  }, [])

  useEffect(() => {
    const checkExpiry = () => {
      const current = Date.now()
      setNowMs(current)
      if (evaluateSession(deadlineMs, current).status === 'expired') {
        clearSessionAnalytics()
      }
    }
    const interval = window.setInterval(checkExpiry, 1000)
    return () => window.clearInterval(interval)
  }, [deadlineMs, clearSessionAnalytics])

  const shieldSummary: ShieldAISummary = useMemo(() => {
    const categoryCounts: Record<PIICategory, number> = {
      EMAIL: 0,
      PHONE: 0,
      IPV4: 0,
      PAN: 0,
      AADHAAR: 0,
      CREDIT_CARD: 0,
    }
    let acceptedCount = 0
    for (const m of matches) {
      categoryCounts[m.category]++
      if (m.accepted) acceptedCount++
    }
    return {
      scanCount,
      totalDetected: matches.length,
      acceptedCount,
      rejectedCount: matches.length - acceptedCount,
      redactionMode,
      sessionStatus: evaluateSession(deadlineMs, nowMs).status,
      categoryCounts,
    }
  }, [matches, scanCount, redactionMode, deadlineMs, nowMs])

  if (!hasEntered) {
    return (
      <LaunchScreen
        onEnter={() => {
          setHasEntered(true)
          setActiveRoute('landing')
        }}
      />
    )
  }

  return (
    <div id="top" className="min-h-screen bg-void text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-icy focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
      >
        Skip to main content
      </a>
      <Navbar
        items={[
          { id: 'landing', label: 'Overview' },
          { id: 'scanner', label: 'Scanner' },
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'shield-ai', label: 'Shield AI' },
          { id: 'command-center', label: 'Command Center' },
        ]}
        activeId={activeRoute}
        onNavigate={setActiveRoute}
      />

      {activeRoute === 'landing' && (
        <Suspense fallback={<div className="p-8 font-mono text-xs text-muted">Loading...</div>}>
          <LandingPage onOpenScanner={() => setActiveRoute('scanner')} />
        </Suspense>
      )}
      {activeRoute === 'scanner' && (
        <ScannerWorkspace
          onScanRecorded={handleScanRecorded}
          onMatchesUpdated={setMatches}
          onModeUpdated={setRedactionMode}
          onClearSession={clearSessionAnalytics}
        />
      )}
      {activeRoute === 'dashboard' && (
        <AnalyticsDashboard
          scanCount={scanCount}
          matches={matches}
          redactionMode={redactionMode}
          activityHistory={activityHistory}
        />
      )}
      {activeRoute === 'shield-ai' && <ShieldAI summary={shieldSummary} />}
      {activeRoute === 'command-center' && (
        <PrivacyCommandCenter
          matches={matches}
          redactionMode={redactionMode}
          scanCount={scanCount}
          activityHistory={activityHistory}
          deadlineMs={deadlineMs}
          nowMs={nowMs}
          onExtendSession={() => setDeadlineMs(createSessionDeadline())}
          onClearAll={clearSessionAnalytics}
        />
      )}
    </div>
  )
}

export default App
