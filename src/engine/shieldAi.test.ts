import { describe, expect, it } from 'vitest'
import { generateShieldAIResponse } from './shieldAi.ts'

describe('Shield AI Deterministic Local Assistant', () => {
  const sampleSummary = {
    scanCount: 1,
    totalDetected: 3,
    acceptedCount: 2,
    rejectedCount: 1,
    redactionMode: 'full' as const,
    sessionStatus: 'active' as const,
    categoryCounts: {
      EMAIL: 2,
      PHONE: 1,
      IPV4: 0,
      PAN: 0,
      AADHAAR: 0,
      CREDIT_CARD: 0,
    },
  }

  const emptySummary = {
    scanCount: 0,
    totalDetected: 0,
    acceptedCount: 0,
    rejectedCount: 0,
    redactionMode: 'full' as const,
    sessionStatus: 'active' as const,
    categoryCounts: {
      EMAIL: 0,
      PHONE: 0,
      IPV4: 0,
      PAN: 0,
      AADHAAR: 0,
      CREDIT_CARD: 0,
    },
  }

  it('summarizes the latest scan using aggregate metadata only', () => {
    const reply = generateShieldAIResponse('summary of my last scan', sampleSummary)
    expect(reply).toContain('3 entities')
    expect(reply).toContain('2 email(s), 1 phone number(s)')
    expect(reply).toContain('2 of 3 were redacted')
  })

  it('handles empty session cleanly', () => {
    const reply = generateShieldAIResponse('Summarize my last scan.', emptySummary)
    expect(reply).toBe(
      'No scan is available yet. Open Scanner, load a sample or enter text, and run a scan first.',
    )
  })

  it('answers redacted count and top category questions', () => {
    expect(generateShieldAIResponse('How many entities were redacted?', sampleSummary)).toContain(
      '2 of 3 detected entities were redacted',
    )
    expect(generateShieldAIResponse('Which PII category was detected most?', sampleSummary)).toContain(
      'EMAIL with 2 match(es)',
    )
  })
})
