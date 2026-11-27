import { describe, expect, it } from 'vitest'
import { detectPII } from './detectors.ts'
import { createPseudonymSession, redactText } from './redactor.ts'
import { sanitizeCSV } from './csv.ts'

describe('Engine Performance Benchmarks', () => {
  it('scans and redacts a 60KB+ synthetic text dataset in under 250ms with full accuracy', () => {
    const block =
      'Ticket #1042 | user.alpha@example.org | +91 9876543210 | 192.168.10.25 | ABCDE1234F | 2345 6789 0123 | 4532 0151 1283 0366\n'
    const repeats = 500
    const largeText = block.repeat(repeats)
    expect(largeText.length).toBeGreaterThan(60_000)

    const t0 = performance.now()
    const matches = detectPII(largeText)
    const redacted = redactText(largeText, matches, 'pseudonym', createPseudonymSession())
    const elapsedMs = performance.now() - t0

    expect(matches.length).toBe(6 * repeats)
    expect(redacted.redactedCount).toBe(6 * repeats)
    expect(elapsedMs).toBeLessThan(250)
  })

  it('sanitizes a 500-row synthetic CSV dataset in under 300ms while preserving structure', () => {
    const header = 'id,email,phone,note'
    const row = '1,analyst@example.org,+91 9876543210,routine check'
    const csv = [header, ...Array.from({ length: 500 }, () => row)].join('\n')

    const t0 = performance.now()
    const result = sanitizeCSV(csv, 'full')
    const elapsedMs = performance.now() - t0

    expect(result.parsed.rows.length).toBe(500)
    expect(result.totalRedacted).toBe(1000)
    expect(elapsedMs).toBeLessThan(300)
  })
})
