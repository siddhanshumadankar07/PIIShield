import { isValidLuhn } from './luhn.ts'
import type { PIICategory, PIIMatch } from './types.ts'

const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g
const IPV4_RE = /\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b/g
const PAN_RE = /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g
const AADHAAR_RE = /\b[2-9][0-9]{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b/g
const PHONE_RE = /(?:\+91[\s-]?|0)?[6-9]\d{9}\b|\+\d{1,3}[\s-]?(?:\(\d{2,4}\)|\d{2,4})[\s-]?\d{3,4}[\s-]?\d{4}\b/g
const CARD_RE = /\b(?:\d[ -]*?){13,19}\b/g

function collectRegexMatches(
  text: string,
  regex: RegExp,
  category: PIICategory,
  method: string,
  validationStatus: PIIMatch['validationStatus'],
  certainty: PIIMatch['certainty'],
  predicate?: (value: string) => boolean,
): PIIMatch[] {
  const results: PIIMatch[] = []
  regex.lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const value = match[0]
    if (predicate && !predicate(value)) {
      continue
    }
    const start = match.index
    const end = start + value.length
    results.push({
      id: `${category}_${start}_${end}`,
      category,
      value,
      start,
      end,
      method,
      validationStatus,
      certainty,
      accepted: true,
    })
  }
  return results
}

/**
 * Resolves overlapping matches deterministically:
 * earlier start wins; on tie, longer match wins.
 */
export function resolveOverlaps(matches: PIIMatch[]): PIIMatch[] {
  const sorted = [...matches].sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start
    return (b.end - b.start) - (a.end - a.start)
  })

  const resolved: PIIMatch[] = []
  let lastEnd = -1

  for (const m of sorted) {
    if (m.start >= lastEnd) {
      resolved.push(m)
      lastEnd = m.end
    }
  }
  return resolved
}

export function detectPII(text: string): PIIMatch[] {
  if (!text) return []

  const candidates: PIIMatch[] = [
    ...collectRegexMatches(text, EMAIL_RE, 'EMAIL', 'regex_rfc_email', 'valid_format', 'high'),
    ...collectRegexMatches(text, PAN_RE, 'PAN', 'regex_indian_pan', 'valid_format', 'high'),
    ...collectRegexMatches(
      text,
      CARD_RE,
      'CREDIT_CARD',
      'regex_card_luhn',
      'luhn_verified',
      'high',
      (val) => isValidLuhn(val),
    ),
    ...collectRegexMatches(text, IPV4_RE, 'IPV4', 'regex_ipv4_octet', 'valid_format', 'high'),
    ...collectRegexMatches(text, AADHAAR_RE, 'AADHAAR', 'regex_aadhaar_12d', 'pattern_match', 'medium'),
    ...collectRegexMatches(text, PHONE_RE, 'PHONE', 'regex_phone_intl', 'pattern_match', 'medium'),
  ]

  return resolveOverlaps(candidates)
}

