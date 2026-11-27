import { describe, expect, it } from 'vitest'
import {
  createPseudonymSession,
  detectPII,
  evaluateSession,
  formatCountdown,
  isValidLuhn,
  redactText,
} from './index.ts'

describe('PIIShield Core Engine (Synthetic Data)', () => {
  it('detects all 6 mandatory PII categories with exact character positions', () => {
    const sample =
      'Email: alex.mercer@example.org | Phone: +91 9876543210 | IP: 192.168.1.42 | PAN: ABCDE1234F | Aadhaar: 2345 6789 0123 | Card: 4532 0151 1283 0366'
    const matches = detectPII(sample)
    const categories = matches.map((m) => m.category)

    expect(categories).toContain('EMAIL')
    expect(categories).toContain('PHONE')
    expect(categories).toContain('IPV4')
    expect(categories).toContain('PAN')
    expect(categories).toContain('AADHAAR')
    expect(categories).toContain('CREDIT_CARD')

    for (const m of matches) {
      expect(sample.slice(m.start, m.end)).toBe(m.value)
    }
  })

  it('rejects invalid IPv4 octets and non-Luhn credit card candidates', () => {
    const sample = 'Bad IP: 999.168.1.1 | Bad Card: 4532 0151 1283 0367'
    const matches = detectPII(sample)
    expect(matches.some((m) => m.category === 'IPV4')).toBe(false)
    expect(matches.some((m) => m.category === 'CREDIT_CARD')).toBe(false)
    expect(isValidLuhn('4532015112830366')).toBe(true)
    expect(isValidLuhn('4532015112830367')).toBe(false)
  })

  it('supports full, partial, and consistent pseudonymization redaction modes', () => {
    const sample = 'Contact alex.mercer@example.org or alex.mercer@example.org'
    const matches = detectPII(sample)

    const full = redactText(sample, matches, 'full')
    expect(full.sanitizedText).toBe('Contact [REDACTED] or [REDACTED]')
    expect(full.redactedCount).toBe(2)

    const partial = redactText(sample, matches, 'partial')
    expect(partial.sanitizedText).toBe('Contact a***@example.org or a***@example.org')

    const session = createPseudonymSession()
    const pseudo = redactText(sample, matches, 'pseudonym', session)
    expect(pseudo.sanitizedText).toBe('Contact EMAIL_01 or EMAIL_01')
  })

  it('skips rejected matches during redaction', () => {
    const sample = 'Email: alex.mercer@example.org'
    const matches = detectPII(sample).map((m) => ({ ...m, accepted: false }))
    const res = redactText(sample, matches, 'full')
    expect(res.sanitizedText).toBe(sample)
    expect(res.skippedCount).toBe(1)
  })

  it('evaluates 15-minute Privacy Lock session states and formatting', () => {
    const now = 1_000_000
    const deadline = now + 15 * 60 * 1000
    expect(evaluateSession(deadline, now).status).toBe('active')
    expect(formatCountdown(900_000)).toBe('15:00')
    expect(evaluateSession(deadline, deadline - 30_000).status).toBe('warning')
    expect(evaluateSession(deadline, deadline + 1).status).toBe('expired')
  })
})

