import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App.tsx'

describe('App Session Analytics & Shield AI Integration', () => {
  it('updates Dashboard and Shield AI after a scan and preserves stats across navigation without duplicating counts', () => {
    render(<App />)

    // Enter from personalized LaunchScreen
    expect(screen.getByText("Welcome to Siddhanshu's PIIShield")).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Enter PIIShield →' }))

    // Navigate to Scanner
    fireEvent.click(screen.getByRole('button', { name: 'Scanner' }))
    fireEvent.click(screen.getByRole('button', { name: 'Load Synthetic Sample' }))

    // Navigate to Dashboard
    fireEvent.click(screen.getByRole('button', { name: 'Dashboard' }))
    expect(screen.getByText('Session Analytics Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Scan #1')).toBeInTheDocument()
    expect(screen.getByLabelText('EMAIL: 2')).toBeInTheDocument()

    // Navigate to Shield AI and ask for scan summary
    fireEvent.click(screen.getByRole('button', { name: 'Shield AI' }))
    const input = screen.getByLabelText('Ask Shield AI')
    fireEvent.change(input, { target: { value: 'summary of my last scan' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(screen.getByText(/Your latest scan detected 7 entities/)).toBeInTheDocument()

    // Navigate back to Dashboard and verify scanCount was not duplicated
    fireEvent.click(screen.getByRole('button', { name: 'Dashboard' }))
    expect(screen.getAllByText(/Scan #/).length).toBe(1)
  })
})
