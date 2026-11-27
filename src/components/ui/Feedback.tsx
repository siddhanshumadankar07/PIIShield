import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Button } from './Button.tsx'

export interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previousActive = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousActive?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg border border-border-subtle bg-charcoal shadow-xl outline-none"
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2 id="modal-title" className="text-base font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded p-1 font-mono text-xs text-muted hover:bg-surface hover:text-ink cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4 text-sm text-muted">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-border-subtle px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  )
}

export interface AlertBannerProps {
  variant: 'info' | 'warning' | 'success' | 'error'
  title: string
  description?: string
  onDismiss?: () => void
}

export function AlertBanner({ variant, title, description, onDismiss }: AlertBannerProps) {
  const styles = {
    info: 'border-border-subtle bg-surface text-icy',
    warning: 'border-icy/40 bg-elevated text-icy',
    success: 'border-success/40 bg-success/10 text-success',
    error: 'border-danger/40 bg-danger/10 text-danger',
  }
  const labels = {
    info: '[INFO]',
    warning: '[WARN]',
    success: '[OK]',
    error: '[ERR]',
  }

  return (
    <div
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      className={`flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm ${styles[variant]}`}
    >
      <div>
        <p className="font-medium">
          <span className="mr-2 font-mono text-xs font-bold">{labels[variant]}</span>
          {title}
        </p>
        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={onDismiss}
          className="font-mono text-xs opacity-70 hover:opacity-100 cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded border border-border-subtle bg-elevated px-2.5 py-1 font-mono text-xs text-ink group-hover:block group-focus-within:block"
      >
        {content}
      </span>
    </span>
  )
}

