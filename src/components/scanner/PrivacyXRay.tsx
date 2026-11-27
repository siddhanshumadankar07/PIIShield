import type { PIICategory, PIIMatch } from '../../engine/types.ts'

const SHORT_TAGS: Record<PIICategory, string> = {
  EMAIL: 'EML',
  PHONE: 'PHN',
  IPV4: 'IP4',
  PAN: 'PAN',
  AADHAAR: 'ADH',
  CREDIT_CARD: 'CRD',
}

export interface PrivacyXRayProps {
  text: string
  matches: PIIMatch[]
}

export function PrivacyXRay({ text, matches }: PrivacyXRayProps) {
  if (!text) return null

  const sorted = [...matches].sort((a, b) => a.start - b.start)
  const segments: React.ReactNode[] = []
  let cursor = 0

  for (const match of sorted) {
    if (match.start < cursor) continue
    if (match.start > cursor) {
      segments.push(
        <span key={`txt-${cursor}`}>{text.slice(cursor, match.start)}</span>,
      )
    }

    const tag = SHORT_TAGS[match.category]
    segments.push(
      <mark
        key={match.id}
        aria-label={`${match.category} detected: ${match.accepted ? 'accepted for redaction' : 'rejected'}`}
        className={`inline rounded px-1 py-0.5 font-mono text-xs underline decoration-2 underline-offset-2 ${
          match.accepted
            ? 'bg-electric/20 text-icy decoration-icy'
            : 'bg-surface text-muted line-through decoration-muted'
        }`}
      >
        <span className="mr-1 font-bold">[{tag}]</span>
        {match.value}
      </mark>,
    )
    cursor = match.end
  }

  if (cursor < text.length) {
    segments.push(<span key={`txt-${cursor}`}>{text.slice(cursor)}</span>)
  }

  return (
    <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-ink">
      {segments}
    </pre>
  )
}
