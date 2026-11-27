import type { SessionStatus } from './session.ts'
import type { PIICategory, RedactionMode } from './types.ts'

export interface ShieldAISummary {
  scanCount: number
  totalDetected: number
  acceptedCount: number
  rejectedCount: number
  redactionMode: RedactionMode
  sessionStatus: SessionStatus
  categoryCounts: Record<PIICategory, number>
}

export const SUGGESTED_QUESTIONS = [
  'What is PII?',
  'Summarize my last scan.',
  'Which redaction mode should I use?',
  'Why was this credit card number rejected?',
  'What is my current privacy risk?',
  'How can I improve my document privacy?',
] as const

const CATEGORY_DISPLAY: Record<PIICategory, string> = {
  EMAIL: 'email(s)',
  PHONE: 'phone number(s)',
  IPV4: 'IPv4 address(es)',
  PAN: 'PAN(s)',
  AADHAAR: 'Aadhaar number(s)',
  CREDIT_CARD: 'credit card(s)',
}

const MODE_DISPLAY: Record<RedactionMode, string> = {
  full: 'Full Mask',
  partial: 'Partial Mask',
  pseudonym: 'consistent pseudonymization',
}

export function generateShieldAIResponse(
  question: string,
  summary: ShieldAISummary,
): string {
  const q = question.toLowerCase().trim()

  if (q.includes('what is pii') || q.includes('personally identifiable')) {
    return 'PII (Personally Identifiable Information) is data that can identify a specific individual, such as email addresses, phone numbers, IPv4 addresses, Indian PAN numbers, Aadhaar numbers, or credit card numbers. PIIShield detects these locally before you share documents.'
  }

  if (
    q.includes('summary') ||
    q.includes('summarize') ||
    q.includes('last scan') ||
    q.includes('latest scan') ||
    q.includes('what information') ||
    q.includes('did my scan detect') ||
    q.includes('scan result')
  ) {
    if (summary.scanCount === 0 && summary.totalDetected === 0) {
      return 'No scan is available yet. Open Scanner, load a sample or enter text, and run a scan first.'
    }
    const activeCats = Object.entries(summary.categoryCounts)
      .filter(([, count]) => count > 0)
      .map(([cat, count]) => `${count} ${CATEGORY_DISPLAY[cat as PIICategory]}`)
      .join(', ')
    const breakdown = activeCats ? `: ${activeCats}` : ''
    return `Your latest scan detected ${summary.totalDetected} entities${breakdown}. ${summary.acceptedCount} of ${summary.totalDetected} were redacted using ${MODE_DISPLAY[summary.redactionMode]}.`
  }

  if (q.includes('how many') && q.includes('redacted')) {
    if (summary.scanCount === 0 && summary.totalDetected === 0) {
      return 'No scan is available yet. Open Scanner, load a sample or enter text, and run a scan first.'
    }
    return `${summary.acceptedCount} of ${summary.totalDetected} detected entities were redacted (${summary.rejectedCount} rejected) using ${MODE_DISPLAY[summary.redactionMode]}.`
  }

  if ((q.includes('which') || q.includes('most')) && q.includes('category')) {
    if (summary.scanCount === 0 && summary.totalDetected === 0) {
      return 'No scan is available yet. Open Scanner, load a sample or enter text, and run a scan first.'
    }
    const sorted = Object.entries(summary.categoryCounts)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
    if (sorted.length === 0) {
      return 'No PII categories were detected in the current scan.'
    }
    const [topCat, topCount] = sorted[0]
    return `The most frequently detected PII category is ${topCat} with ${topCount} match(es).`
  }

  if (q.includes('redaction mode') || q.includes('which mode') || q.includes('pseudonym')) {
    return `You are currently using "${summary.redactionMode}" mode. Use Full Mask ([REDACTED]) for maximum concealment, Partial Mask to preserve limited context (e.g., last 4 digits), or Consistent Pseudonymization (EMAIL_01, PHONE_01) when you need to track repeated entities across logs without exposing raw values.`
  }

  if (q.includes('credit card') || q.includes('luhn') || q.includes('rejected')) {
    return 'Credit card candidates must pass the Luhn checksum algorithm to reduce false positives on random 13–19 digit numbers. Note that Luhn validation checks mathematical structure only and does not prove a card belongs to a real account.'
  }

  if (q.includes('risk') || q.includes('exposure')) {
    if (summary.scanCount === 0 && summary.totalDetected === 0) {
      return 'No scan is available yet. Open Scanner, load a sample or enter text, and run a scan first.'
    }
    const coverage =
      summary.totalDetected === 0
        ? 100
        : Math.round((summary.acceptedCount / summary.totalDetected) * 100)
    return `Your current redaction coverage is ${coverage}% (${summary.acceptedCount}/${summary.totalDetected} entities accepted). Risk increases when detected entities are rejected and left unredacted. Automated detection cannot guarantee complete anonymity.`
  }

  if (q.includes('improve') || q.includes('how can i') || q.includes('step')) {
    return '1. Load your document in Scanner. 2. Review every match in Privacy X-Ray and accept all sensitive entities. 3. Choose Full Mask or Pseudonymization. 4. Export the sanitized file and Audit Passport, then click Clear All when finished.'
  }

  return 'I am Shield AI, a deterministic local privacy assistant. Ask me about PII categories, your current scan summary, redaction modes, Luhn validation, or how to use PIIShield.'
}
