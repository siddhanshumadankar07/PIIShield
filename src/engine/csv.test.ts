import { describe, expect, it } from 'vitest'
import { parseCSV, sanitizeCSV } from './csv.ts'
import { createPseudonymSession } from './redactor.ts'

describe('CSV Processing Engine (Synthetic Data)', () => {
  it('preserves headers, quoted fields, and semicolon delimiters', () => {
    const csv = 'name;email;notes\n"Mercer, Alex";alex.mercer@example.org;"VIP; internal"'
    const parsed = parseCSV(csv)
    expect(parsed.delimiter).toBe(';')
    expect(parsed.headers).toEqual(['name', 'email', 'notes'])
    expect(parsed.rows[0]).toEqual(['Mercer, Alex', 'alex.mercer@example.org', 'VIP; internal'])

    const res = sanitizeCSV(csv, 'full', createPseudonymSession())
    expect(res.sensitiveColumns).toEqual([1])
    expect(res.totalRedacted).toBe(1)
    expect(res.sanitizedCSV).toContain('Mercer, Alex;[REDACTED];"VIP; internal"')
  })

  it('neutralizes CSV formula injection prefixes on export', () => {
    const csv = 'user,note\nalpha,=1+1\nbeta,@SUM(A1:A2)'
    const res = sanitizeCSV(csv, 'full', createPseudonymSession())
    expect(res.sanitizedCSV).toContain("alpha,'=1+1")
    expect(res.sanitizedCSV).toContain("beta,'@SUM(A1:A2)")
  })
})
