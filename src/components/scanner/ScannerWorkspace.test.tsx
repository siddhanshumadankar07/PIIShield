import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ScannerWorkspace } from './ScannerWorkspace.tsx'

describe('Phase 3 ScannerWorkspace', () => {
  it('loads synthetic sample, detects all 6 categories, and previews redaction', () => {
    render(<ScannerWorkspace />)

    fireEvent.click(screen.getByRole('button', { name: 'Load Synthetic Sample' }))

    expect(screen.getAllByText('[EML]').length).toBeGreaterThan(0)
    expect(screen.getAllByText('[PHN]').length).toBeGreaterThan(0)
    expect(screen.getAllByText('[IP4]').length).toBeGreaterThan(0)
    expect(screen.getAllByText('[PAN]').length).toBeGreaterThan(0)
    expect(screen.getAllByText('[ADH]').length).toBeGreaterThan(0)
    expect(screen.getAllByText('[CRD]').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/\[REDACTED\]/).length).toBeGreaterThan(0)
  })

  it('supports Deselect All and individual Reject/Accept controls', () => {
    render(<ScannerWorkspace />)
    fireEvent.click(screen.getByRole('button', { name: 'Load Synthetic Sample' }))

    fireEvent.click(screen.getByRole('button', { name: 'Deselect All' }))
    expect(screen.getAllByLabelText('Redacted: 0').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button', { name: 'Select All' }))
    expect(screen.getAllByLabelText('Redacted: 7').length).toBeGreaterThan(0)
  })

  it('switches to Consistent Pseudonymization mode', () => {
    render(<ScannerWorkspace />)
    fireEvent.click(screen.getByRole('button', { name: 'Load Synthetic Sample' }))

    const select = screen.getByLabelText('Redaction Mode')
    fireEvent.change(select, { target: { value: 'pseudonym' } })
    expect(screen.getAllByText(/EMAIL_01/).length).toBeGreaterThan(0)
  })

  it('copies sanitized output to clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    render(<ScannerWorkspace />)
    fireEvent.click(screen.getByRole('button', { name: 'Load Synthetic Sample' }))
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))

    expect(writeText).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('Sanitized output copied to clipboard.')).toBeInTheDocument()
  })
})
