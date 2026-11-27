import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { detectPII } from '../../engine/detectors.ts'
import { PrivacyCommandCenter } from './PrivacyCommandCenter.tsx'

describe('Phase 4 PrivacyCommandCenter', () => {
  it('renders overview metrics, category distribution, and metadata-only activity', () => {
    const matches = detectPII('Email: alex.mercer@example.org | IP: 192.168.1.42')
    const now = 1_000_000
    const deadline = now + 15 * 60 * 1000

    render(
      <PrivacyCommandCenter
        matches={matches}
        redactionMode="full"
        scanCount={2}
        activityHistory={[
          {
            id: 'act-1',
            timestampIso: '2026-11-27T11:30:00Z',
            detectionCount: 2,
            redactedCount: 2,
            categories: ['EMAIL', 'IPV4'],
            mode: 'full',
            status: 'sanitized',
          },
        ]}
        deadlineMs={deadline}
        nowMs={now}
        onExtendSession={vi.fn()}
        onClearAll={vi.fn()}
      />,
    )

    expect(screen.getByText('Privacy Command Center')).toBeInTheDocument()
    expect(screen.getByText('15:00')).toBeInTheDocument()
    expect(screen.getByText('EMAIL, IPV4')).toBeInTheDocument()
    expect(screen.getByText(/Coverage: 100%/)).toBeInTheDocument()
  })

  it('triggers Clear All confirmation from dashboard', () => {
    const onClearAll = vi.fn()
    const now = 1_000_000

    render(
      <PrivacyCommandCenter
        matches={[]}
        redactionMode="full"
        scanCount={0}
        activityHistory={[]}
        deadlineMs={now + 600_000}
        nowMs={now}
        onExtendSession={vi.fn()}
        onClearAll={onClearAll}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Clear All' }))
    const confirmBtns = screen.getAllByRole('button', { name: 'Clear All' })
    fireEvent.click(confirmBtns[confirmBtns.length - 1])
    expect(onClearAll).toHaveBeenCalledTimes(1)
  })
})

