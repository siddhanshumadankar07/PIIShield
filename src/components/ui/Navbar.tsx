import { useState } from 'react'

export interface NavItem {
  id: string
  label: string
  href?: string
}

export interface NavbarProps {
  items: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  rightSlot?: React.ReactNode
}

export function Navbar({ items, activeId, onNavigate, rightSlot }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-void/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              onNavigate(items[0]?.id ?? 'home')
            }}
            className="flex items-center gap-2.5 text-ink no-underline"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded border border-electric/60 bg-electric/15 font-mono text-xs font-bold text-icy">
              PS
            </span>
            <span className="font-display text-xl tracking-wider uppercase">
              PIIShield
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden md:flex md:items-center md:gap-1">
            {items.map((item) => {
              const isActive = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => onNavigate(item.id)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-electric/15 text-icy border border-electric/40'
                      : 'text-muted hover:text-ink hover:bg-surface border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {rightSlot}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle bg-charcoal text-ink md:hidden cursor-pointer"
          >
            <span className="font-mono text-xs">{mobileOpen ? '✕' : '≡'}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="border-t border-border-subtle bg-charcoal px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileOpen(false)
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium cursor-pointer ${
                    isActive
                      ? 'bg-electric/15 text-icy border border-electric/40'
                      : 'text-muted hover:text-ink hover:bg-surface border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}

