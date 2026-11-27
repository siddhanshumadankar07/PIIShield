export type PIICategory =
  | 'EMAIL'
  | 'PHONE'
  | 'IPV4'
  | 'PAN'
  | 'AADHAAR'
  | 'CREDIT_CARD'

export type RedactionMode = 'full' | 'partial' | 'pseudonym'

export type ValidationStatus = 'valid_format' | 'luhn_verified' | 'pattern_match'

export type CertaintyLevel = 'high' | 'medium' | 'low'

export interface PIIMatch {
  id: string
  category: PIICategory
  value: string
  start: number
  end: number
  method: string
  validationStatus: ValidationStatus
  certainty: CertaintyLevel
  accepted: boolean
}

export interface PseudonymSession {
  mappings: Map<string, string>
  counters: Map<PIICategory, number>
}

export interface RedactionResult {
  sanitizedText: string
  redactedCount: number
  skippedCount: number
}

