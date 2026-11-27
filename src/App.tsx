import { useState } from 'react'
import { ScannerWorkspace } from './components/scanner/ScannerWorkspace.tsx'
import { Navbar } from './components/ui/index.ts'

export function App() {
  const [activeRoute, setActiveRoute] = useState('scanner')

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
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl uppercase tracking-wide text-ink">
            Privacy Command Center
          </h1>
          <p className="mt-2 text-sm text-muted">
            Scheduled for Phase 4 implementation.
          </p>
        </main>
      )}
    </div>
  )
}

export default App
