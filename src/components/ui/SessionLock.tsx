import { useState } from 'react'
import { evaluateSession, formatCountdown } from '../../engine/session.ts'
import { Button } from './Button.tsx'
import { ConfirmDialog } from './Feedback.tsx'

export interface PrivacyLockBarProps {
  deadlineMs: number
  nowMs?: number
  onExtend?: () => void
  onClearAll: () => void
}

export function PrivacyLockBar({
  deadlineMs,
  nowMs,
  onExtend,
  onClearAll,
}: PrivacyLockBarProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const session = evaluateSession(deadlineMs, nowMs)
  const formatted = formatCountdown(session.remainingMs)

  const statusStyles = {
    active: 'border-border-subtle bg-elevated text-icy',
    warning: 'border-icy/50 bg-elevated text-icy',
    expired: 'border-danger/50 bg-danger/15 text-danger',
  }

  const statusLabels = {
    active: 'Privacy Lock Active',
    warning: 'Expiring Soon',
    expired: 'Session Expired',
  }

  return (
    <>
      <div
        role="region"
        aria-label="15-Minute Privacy Lock"
        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border-subtle bg-charcoal px-4 py-2.5"
      >
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs ${statusStyles[session.status]}`}
          >
            {statusLabels[session.status]}
          </span>
          <span
            aria-label={`Session time remaining ${formatted}`}
            className="font-mono text-sm font-semibold text-ink"
          >
            {formatted}
          </span>
          {session.status === 'warning' && (
            <span role="alert" className="text-xs text-warning">
              Less than 1 minute remaining before automatic memory clear.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onExtend && session.status !== 'expired' && (
            <Button variant="secondary" size="sm" onClick={onExtend}>
              Extend 15m
            </Button>
          )}
          <Button variant="danger" size="sm" onClick={() => setConfirmOpen(true)}>
            Clear All
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Clear All Session Data"
        message="This will immediately clear all pasted text, uploaded content, detections, sanitized output, and temporary pseudonym mappings from memory."
        confirmLabel="Clear All"
        danger
        onConfirm={() => {
          setConfirmOpen(false)
          onClearAll()
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}

