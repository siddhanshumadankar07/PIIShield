import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LaunchScreen } from './LaunchScreen.tsx'

describe('LaunchScreen', () => {
  it('displays exact personalized heading, tagline, description, and triggers Enter PIIShield', () => {
    const onEnter = vi.fn()
    render(<LaunchScreen onEnter={onEnter} />)

    expect(screen.getByText("Welcome to Siddhanshu's PIIShield")).toBeInTheDocument()
    expect(screen.getByText('Your Data. Your Privacy. Your Control.')).toBeInTheDocument()
    expect(screen.getByText('DETECT. REDACT. PROTECT.')).toBeInTheDocument()
    expect(
      screen.getByText(/Take control of your digital privacy\./),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Enter PIIShield →' }))
    expect(onEnter).toHaveBeenCalledTimes(1)
  })
})
