import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LandingPage } from './LandingPage.tsx'

describe('Phase 5 LandingPage', () => {
  it('renders editorial sections and triggers Open Scanner CTA', () => {
    const onOpenScanner = vi.fn()
    render(<LandingPage onOpenScanner={onOpenScanner} />)

    expect(screen.getByText(/DETECT\./)).toBeInTheDocument()
    expect(screen.getByText('Three deterministic stages')).toBeInTheDocument()
    expect(screen.getByText('100% Client-Side Processing')).toBeInTheDocument()

    const ctas = screen.getAllByRole('button', { name: 'Open Scanner' })
    fireEvent.click(ctas[0])
    expect(onOpenScanner).toHaveBeenCalledTimes(1)
  })
})

