import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function collectSourceFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...collectSourceFiles(full))
    } else if (/\.(ts|tsx|css|html)$/.test(entry) && !entry.endsWith('.test.ts') && !entry.endsWith('.test.tsx')) {
      files.push(full)
    }
  }
  return files
}

describe('Phase 6 Privacy & Isolation Audit', () => {
  it('contains zero network upload, persistent storage, or external font CDN calls in src/', () => {
    const files = collectSourceFiles(join(process.cwd(), 'src'))
    const forbidden = [
      'localStorage.',
      'sessionStorage.',
      'indexedDB.',
      'sendBeacon(',
      'new XMLHttpRequest',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
    ]

    for (const file of files) {
      const content = readFileSync(file, 'utf-8')
      for (const token of forbidden) {
        expect(content, `${file} must not reference ${token}`).not.toContain(token)
      }
    }
  })
})
