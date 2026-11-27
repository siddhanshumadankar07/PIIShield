import type { ReactNode } from 'react'
import type { PIICategory, ValidationStatus } from '../../engine/types.ts'

export interface CategoryBadgeProps {
  category: PIICategory
}

const CATEGORY_LABELS: Record<PIICategory, { short: string; name: string }> = {
  EMAIL: { short: 'EML', name: 'Email' },
  PHONE: { short: 'PHN', name: 'Phone' },
  IPV4: { short: 'IP4', name: 'IPv4' },
  PAN: { short: 'PAN', name: 'PAN' },
  AADHAAR: { short: 'ADH', name: 'Aadhaar' },
  CREDIT_CARD: { short: 'CRD', name: 'Card' },
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const info = CATEGORY_LABELS[category]
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-electric/40 bg-electric/10 px-2 py-0.5 font-mono text-xs text-icy">
      <span className="font-bold underline decoration-icy/60 underline-offset-2">
        [{info.short}]
      </span>
      <span>{info.name}</span>
    </span>
  )
}

export interface StatusBadgeProps {
  status: 'accepted' | 'rejected' | 'pending'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    accepted: 'border-success/40 bg-success/10 text-success',
    rejected: 'border-border-subtle bg-surface text-muted',
    pending: 'border-warning/40 bg-warning/10 text-warning',
  }
  const labels = {
    accepted: 'Accepted',
    rejected: 'Rejected',
    pending: 'Pending Review',
  }

  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export interface ValidationBadgeProps {
  status: ValidationStatus
}

export function ValidationBadge({ status }: ValidationBadgeProps) {
  const labels: Record<ValidationStatus, string> = {
    luhn_verified: 'Luhn Verified',
    valid_format: 'Format Valid',
    pattern_match: 'Pattern Match',
  }
  return (
    <span className="inline-flex items-center rounded border border-border-subtle bg-surface px-2 py-0.5 font-mono text-xs text-muted">
      {labels[status]}
    </span>
  )
}

export interface CountBadgeProps {
  label: string
  count: number
}

export function CountBadge({ label, count }: CountBadgeProps) {
  return (
    <span
      aria-label={`${label}: ${count}`}
      className="inline-flex items-center gap-1.5 rounded border border-border-subtle bg-surface px-2.5 py-1 font-mono text-xs text-ink"
    >
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-icy">{count}</span>
    </span>
  )
}

export interface DataTableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

export interface DataTableProps<T> {
  caption: string
  columns: DataTableColumn<T>[]
  rows: T[]
  getRowKey: (row: T) => string
  emptyMessage?: string
}

export function DataTable<T>({
  caption,
  columns,
  rows,
  getRowKey,
  emptyMessage = 'No records to display.',
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-subtle bg-charcoal">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-border-subtle bg-surface font-mono text-xs uppercase tracking-wider text-muted">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-4 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-xs text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)} className="hover:bg-surface/60">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-ink">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

