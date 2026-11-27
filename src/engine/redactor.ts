import type { PIICategory, PIIMatch, PseudonymSession, RedactionMode, RedactionResult } from './types.ts'

export function createPseudonymSession(): PseudonymSession {
  return {
    mappings: new Map<string, string>(),
    counters: new Map<PIICategory, number>(),
  }
}

function maskPartial(value: string, category: PIICategory): string {
  switch (category) {
    case 'EMAIL': {
      const atIdx = value.indexOf('@')
      if (atIdx <= 1) return `***${value.slice(atIdx)}`
      return `${value[0]}***${value.slice(atIdx)}`
    }
    case 'PAN':
      return `${value.slice(0, 2)}***${value.slice(-2)}`
    case 'CREDIT_CARD': {
      const digits = value.replace(/\D/g, '')
      const last4 = digits.slice(-4)
      return `****-****-****-${last4}`
    }
    case 'AADHAAR': {
      const digits = value.replace(/\D/g, '')
      return `XXXX-XXXX-${digits.slice(-4)}`
    }
    case 'PHONE': {
      const digits = value.replace(/\D/g, '')
      return `${'*'.repeat(Math.max(4, digits.length - 4))}${digits.slice(-4)}`
    }
    case 'IPV4': {
      const parts = value.split('.')
      return `${parts[0]}.${parts[1]}.*.*`
    }
  }
}

function getPseudonym(
  value: string,
  category: PIICategory,
  session: PseudonymSession,
): string {
  const key = `${category}:${value}`
  const existing = session.mappings.get(key)
  if (existing) return existing

  const nextNum = (session.counters.get(category) ?? 0) + 1
  session.counters.set(category, nextNum)
  const token = `${category}_${String(nextNum).padStart(2, '0')}`
  session.mappings.set(key, token)
  return token
}

export function redactText(
  text: string,
  matches: PIIMatch[],
  mode: RedactionMode,
  session: PseudonymSession = createPseudonymSession(),
): RedactionResult {
  const sorted = [...matches].sort((a, b) => a.start - b.start)
  let result = ''
  let cursor = 0
  let redactedCount = 0
  let skippedCount = 0

  for (const match of sorted) {
    if (!match.accepted) {
      skippedCount++
      continue
    }
    if (match.start < cursor) {
      continue
    }

    result += text.slice(cursor, match.start)

    let replacement = '[REDACTED]'
    if (mode === 'partial') {
      replacement = maskPartial(match.value, match.category)
    } else if (mode === 'pseudonym') {
      replacement = getPseudonym(match.value, match.category, session)
    }

    result += replacement
    cursor = match.end
    redactedCount++
  }

  result += text.slice(cursor)

  return {
    sanitizedText: result,
    redactedCount,
    skippedCount,
  }
}

