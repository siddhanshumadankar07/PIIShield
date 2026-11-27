import { describe, expect, it } from 'vitest'
import {
  buildAuditPassportJSON,
  buildAuditPassportReport,
  calculateExposureAssessment,
} from './analytics.ts'
import { detectPII } from './detectors.ts'

describe('Phase 4 Analytics & Audit Passport (Synthetic Data)', () => {
  it('calculates transparent exposure assessment from actual matches', () => {
    const matches = detectPII('Email: alex.mercer@example.org | IP: 192.168.1.42')
    expect(calculateExposureAssessment(matches).level).toBe('low')

    const partialReject = matches.map((m, idx) => (idx === 0 ? { ...m, accepted: false } : m))
    expect(calculateExposureAssessment(partialReject).level).toBe('moderate')
    expect(calculateExposureAssessment([]).level).toBe('none')
  })

  it('builds metadata-only Audit Passport JSON and report without original sensitive values', () => {
    const secretEmail = 'alex.mercer@example.org'
    const matches = detectPII(`Contact: ${secretEmail}`)

    const json = buildAuditPassportJSON({
      generatedAtIso: '2026-11-27T11:30:00.000Z',
      sessionStatus: 'active',
      redactionMode: 'full',
      matches,
      scanCount: 1,
    })

    expect(json.totals.detected).toBe(1)
    expect(json.categoryBreakdown.EMAIL).toBe(1)
    expect(JSON.stringify(json)).not.toContain(secretEmail)

    const report = buildAuditPassportReport({
      generatedAtIso: '2026-11-27T11:30:00.000Z',
      sessionStatus: 'active',
      redactionMode: 'full',
      matches,
      scanCount: 1,
    })
    expect(report).toContain('PIISHIELD — PRIVACY AUDIT PASSPORT')
    expect(report).not.toContain(secretEmail)
  })
})

