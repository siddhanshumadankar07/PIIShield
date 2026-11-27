import { detectPII } from './detectors.ts'
import { createPseudonymSession, redactText } from './redactor.ts'
import type { PIIMatch, PseudonymSession, RedactionMode } from './types.ts'

export interface ParsedCSV {
  delimiter: string
  headers: string[]
  rows: string[][]
}

export function detectDelimiter(firstLine: string): string {
  const candidates = [',', ';', '\t']
  let best = ','
  let bestCount = -1
  for (const delim of candidates) {
    const count = firstLine.split(delim).length - 1
    if (count > bestCount) {
      bestCount = count
      best = delim
    }
  }
  return best
}

function parseCSVLine(line: string, delimiter: string): string[] {
  const cells: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === delimiter && !inQuotes) {
      cells.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  cells.push(current)
  return cells
}

export function parseCSV(text: string): ParsedCSV {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const lines = normalized.split('\n').filter((l) => l.length > 0)
  if (lines.length === 0) {
    return { delimiter: ',', headers: [], rows: [] }
  }

  const delimiter = detectDelimiter(lines[0])
  const headers = parseCSVLine(lines[0], delimiter)
  const rows = lines.slice(1).map((line) => parseCSVLine(line, delimiter))

  return { delimiter, headers, rows }
}

const FORMULA_PREFIX_RE = /^[=+\-@\t\r]/

function escapeCSVCell(cell: string, delimiter: string): string {
  const safeCell = FORMULA_PREFIX_RE.test(cell) ? `'${cell}` : cell
  if (safeCell.includes('"') || safeCell.includes(delimiter) || safeCell.includes('\n')) {
    return `"${safeCell.replace(/"/g, '""')}"`
  }
  return safeCell
}

export function serializeCSV(
  headers: string[],
  rows: string[][],
  delimiter: string,
): string {
  const allRows = [headers, ...rows]
  return allRows
    .map((row) => row.map((cell) => escapeCSVCell(cell, delimiter)).join(delimiter))
    .join('\n')
}

export interface CSVSanitizationResult {
  sanitizedCSV: string
  parsed: ParsedCSV
  sensitiveColumns: number[]
  totalRedacted: number
}

export function sanitizeCSV(
  text: string,
  mode: RedactionMode,
  session: PseudonymSession = createPseudonymSession(),
  enabledColumns?: Set<number>,
): CSVSanitizationResult {
  const parsed = parseCSV(text)
  const sensitiveSet = new Set<number>()
  let totalRedacted = 0

  const sanitizedRows = parsed.rows.map((row) =>
    row.map((cell, colIdx) => {
      if (enabledColumns && !enabledColumns.has(colIdx)) {
        return cell
      }
      const matches: PIIMatch[] = detectPII(cell)
      if (matches.length > 0) {
        sensitiveSet.add(colIdx)
        const res = redactText(cell, matches, mode, session)
        totalRedacted += res.redactedCount
        return res.sanitizedText
      }
      return cell
    }),
  )

  return {
    sanitizedCSV: serializeCSV(parsed.headers, sanitizedRows, parsed.delimiter),
    parsed,
    sensitiveColumns: Array.from(sensitiveSet).sort((a, b) => a - b),
    totalRedacted,
  }
}

