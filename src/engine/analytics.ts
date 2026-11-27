import type { SessionStatus } from './session.ts'
import type { PIICategory, PIIMatch, RedactionMode } from './types.ts'

export interface SessionActivityEntry {
  id: string
  timestampIso: string
  detectionCount: number
  redactedCount: number
  categories: PIICategory[]
  mode: RedactionMode
  status: 'sanitized' | 'pending_review'
}

export interface ExposureAssessment {
  level: 'none' | 'low' | 'moderate' | 'high'
  totalDetections: number
  acceptedCount: number
  rejectedCount: number
  coveragePercent: number
  methodology: string
  limitations: string[]
}

export function calculateExposureAssessment(matches: PIIMatch[]): ExposureAssessment {
  const totalDetections = matches.length
  const acceptedCount = matches.filter((m) => m.accepted).length
  const rejectedCount = totalDetections - acceptedCount
  const coveragePercent =
    totalDetections === 0 ? 100 : Math.round((acceptedCount / totalDetections) * 100)

  let level: ExposureAssessment['level'] = 'none'
  if (totalDetections > 0) {
    if (rejectedCount === 0) {
      level = 'low'
    } else if (coveragePercent >= 50) {
      level = 'moderate'
    } else {
      level = 'high'
    }
  }

  return {
    level,
    totalDetections,
    acceptedCount,
    rejectedCount,
    coveragePercent,
    methodology:
      'Exposure level reflects the ratio of accepted (to-be-redacted) detections versus rejected detections in the current local scan. It is a deterministic heuristic, not a guarantee of anonymity.',
    limitations: [
      'Pattern-based detection cannot identify unstructured context or quasi-identifiers.',
      'Format/Luhn validation checks structure only and does not prove real-world identity.',
      'Rejected matches remain unredacted in the output by user choice.',
    ],
  }
}

export interface AuditPassportInput {
  generatedAtIso: string
  sessionStatus: SessionStatus
  redactionMode: RedactionMode
  matches: PIIMatch[]
  scanCount: number
}

export interface AuditPassportJSON {
  schema: 'piishield.audit.v1'
  generatedAt: string
  sessionStatus: SessionStatus
  scanCount: number
  redactionMode: RedactionMode
  totals: {
    detected: number
    accepted: number
    rejected: number
  }
  categoryBreakdown: Record<PIICategory, number>
  note: string
}

export function buildAuditPassportJSON(input: AuditPassportInput): AuditPassportJSON {
  const breakdown: Record<PIICategory, number> = {
    EMAIL: 0,
    PHONE: 0,
    IPV4: 0,
    PAN: 0,
    AADHAAR: 0,
    CREDIT_CARD: 0,
  }

  let accepted = 0
  for (const m of input.matches) {
    breakdown[m.category]++
    if (m.accepted) accepted++
  }

  return {
    schema: 'piishield.audit.v1',
    generatedAt: input.generatedAtIso,
    sessionStatus: input.sessionStatus,
    scanCount: input.scanCount,
    redactionMode: input.redactionMode,
    totals: {
      detected: input.matches.length,
      accepted,
      rejected: input.matches.length - accepted,
    },
    categoryBreakdown: breakdown,
    note: 'Metadata-only audit summary. No original sensitive values or reversible mappings are included.',
  }
}

export function buildAuditPassportReport(input: AuditPassportInput): string {
  const json = buildAuditPassportJSON(input)
  const lines = [
    'PIISHIELD — PRIVACY AUDIT PASSPORT',
    `Generated: ${json.generatedAt}`,
    `Session Status: ${json.sessionStatus.toUpperCase()}`,
    `Session Scans: ${json.scanCount}`,
    `Selected Redaction Mode: ${json.redactionMode}`,
    '',
    'DETECTION SUMMARY',
    `Total Detected: ${json.totals.detected}`,
    `Accepted (Redacted): ${json.totals.accepted}`,
    `Rejected (Kept): ${json.totals.rejected}`,
    '',
    'CATEGORY BREAKDOWN',
    ...Object.entries(json.categoryBreakdown).map(([cat, count]) => `- ${cat}: ${count}`),
    '',
    'LIMITATIONS',
    '- Automated pattern matching does not guarantee complete anonymity.',
    '- Original sensitive values and reversible mappings are excluded.',
  ]
  return lines.join('\n')
}

