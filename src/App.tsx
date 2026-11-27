import { useCallback, useEffect, useState } from 'react'
import { PrivacyCommandCenter } from './components/dashboard/PrivacyCommandCenter.tsx'
import { ScannerWorkspace } from './components/scanner/ScannerWorkspace.tsx'
import { Navbar } from './components/ui/index.ts'
import type { SessionActivityEntry } from './engine/analytics.ts'
import { createSessionDeadline, evaluateSession } from './engine/session.ts'
import type { PIIMatch, RedactionMode } from './engine/types.ts'

export function App() {
  const [activeRoute, setActiveRoute] = useState('scanner')
  const [matches, setMatches] = useState<PIIMatch[]>([])
  const [redactionMode] = useState<RedactionMode>('full')
  const [scanCount, setScanCount] = useState(0)
  const [activityHistory, setActivityHistory] = useState<SessionActivityEntry[]>([])
  const [deadlineMs, setDeadlineMs] = useState<number>(() => createSessionDeadline())
  const [nowMs, setNowMs] = useState<number>(() => Date.now())

  const clearSessionAnalytics = useCallback(() => {
    setMatches([])
    setScanCount(0)
    setActivityHistory([])
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

  return (
    <div id="top" className="min-h-screen bg-void text-ink">
      <Navbar
        items={[
          { id: 'scanner', label: 'Scanner' },
          { id: 'dashboard', label: 'Command Center' },
        ]}
        activeId={activeRoute}
        onNavigate={setActiveRoute}
      />

      {activeRoute === 'scanner' ? (
        <ScannerWorkspace />
      ) : (
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
