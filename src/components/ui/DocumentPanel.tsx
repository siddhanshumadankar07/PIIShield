import type { ReactNode } from 'react'

export interface DocumentToolbarProps {
  title: string
  badge?: ReactNode
  actions?: ReactNode
}

export function DocumentToolbar({ title, badge, actions }: DocumentToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
          {title}
        </h3>
        {badge}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export interface DocumentPanelProps {
  title: string
  variant?: 'original' | 'sanitized'
  badge?: ReactNode
  actions?: ReactNode
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  children?: ReactNode
}

export function DocumentPanel({
  title,
  variant = 'original',
  badge,
  actions,
  loading = false,
  emptyTitle = 'No document loaded',
  emptyDescription = 'Paste text or upload a TXT/CSV file to begin local analysis.',
  children,
}: DocumentPanelProps) {
  const accentBorder =
    variant === 'sanitized' ? 'border-electric/40' : 'border-border-subtle'

  return (
    <section
      aria-label={title}
      className={`flex flex-col overflow-hidden rounded-lg border bg-charcoal ${accentBorder}`}
    >
      <DocumentToolbar title={title} badge={badge} actions={actions} />
      <div className="min-h-56 flex-1 p-4">
        {loading ? (
          <div role="status" aria-live="polite" className="flex h-48 items-center justify-center">
            <span className="font-mono text-xs text-icy">Processing locally...</span>
          </div>
        ) : children ? (
          children
        ) : (
          <div className="flex h-48 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-ink">{emptyTitle}</p>
            <p className="mt-1 max-w-sm text-xs text-muted">{emptyDescription}</p>
          </div>
        )}
      </div>
    </section>
  )
}

