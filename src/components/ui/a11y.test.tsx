import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { App } from '../../App.tsx'
import { PrivacyXRay } from '../scanner/PrivacyXRay.tsx'
import { AlertBanner, Modal } from './Feedback.tsx'
import { detectPII } from '../../engine/detectors.ts'

describe('Accessibility (WCAG 2.2 AA)', () => {
  it('provides a skip-to-main-content link after entering the workspace', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Enter PIIShield →' }))
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' })
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('announces AlertBanner with semantic roles and non-color-only prefixes', () => {
    render(
      <>
        <AlertBanner variant="error" title="Invalid file" />
        <AlertBanner variant="success" title="Export ready" />
      </>,
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('[ERR]')
    expect(alert).toHaveTextContent('Invalid file')

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('[OK]')
    expect(status).toHaveTextContent('Export ready')
  })

  it('closes Modal on Escape key press', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} title="Confirm Action" onClose={onClose}>
        <p>Modal body</p>
      </Modal>,
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders PrivacyXRay highlights with non-color-only category tags', () => {
    const sample = 'Contact: user@example.org'
    const matches = detectPII(sample)
    render(<PrivacyXRay text={sample} matches={matches} />)
    expect(screen.getByText('[EML]')).toBeInTheDocument()
  })
})
