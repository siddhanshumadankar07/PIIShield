import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  AlertBanner,
  Button,
  CategoryBadge,
  CountBadge,
  DataTable,
  DocumentPanel,
  Navbar,
  PrivacyLockBar,
  Select,
  Switch,
  TextInput,
} from './index.ts'

describe('Phase 2 Shared UI Components', () => {
  it('renders Button variants, loading state, and handles clicks', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Scan Now</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Scan Now' }))
    expect(onClick).toHaveBeenCalledTimes(1)

    render(<Button loading>Processing</Button>)
    expect(screen.getByRole('button', { name: 'Processing' })).toBeDisabled()
  })

  it('renders Navbar with active indicator and mobile menu toggle', () => {
    const onNavigate = vi.fn()
    render(
      <Navbar
        items={[
          { id: 'scanner', label: 'Scanner' },
          { id: 'dashboard', label: 'Command Center' },
        ]}
        activeId="scanner"
        onNavigate={onNavigate}
      />,
    )

    const activeBtn = screen.getByRole('button', { name: 'Scanner' })
    expect(activeBtn).toHaveAttribute('aria-current', 'page')

    const toggle = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(toggle)
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
  })

  it('renders accessible form controls with validation errors', () => {
    const onSwitch = vi.fn()
    render(
      <>
        <TextInput label="Rule Name" error="Rule name is required" />
        <Select
          label="Redaction Mode"
          options={[{ value: 'full', label: 'Full Mask' }]}
        />
        <Switch label="Enable Rule" checked={false} onChange={onSwitch} />
      </>,
    )

    const input = screen.getByLabelText('Rule Name')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Rule name is required')

    fireEvent.click(screen.getByRole('switch', { name: 'Enable Rule' }))
    expect(onSwitch).toHaveBeenCalledWith(true)
  })

  it('renders DocumentPanel, DataTable, CategoryBadge, and CountBadge', () => {
    render(
      <>
        <DocumentPanel title="Original Document" badge={<CountBadge label="Matches" count={2} />} />
        <CategoryBadge category="EMAIL" />
        <DataTable
          caption="Detections"
          columns={[{ key: 'val', header: 'Value', render: (r: { id: string; val: string }) => r.val }]}
          rows={[{ id: '1', val: 'test@example.org' }]}
          getRowKey={(r) => r.id}
        />
      </>,
    )

    expect(screen.getByText('No document loaded')).toBeInTheDocument()
    expect(screen.getByText('[EML]')).toBeInTheDocument()
    expect(screen.getByText('test@example.org')).toBeInTheDocument()
  })

  it('renders PrivacyLockBar countdown, warning, and Clear All confirmation dialog', () => {
    const onClearAll = vi.fn()
    const now = 1_000_000
    const deadline = now + 45_000 // 45s remaining -> warning state

    render(<PrivacyLockBar deadlineMs={deadline} nowMs={now} onClearAll={onClearAll} />)

    expect(screen.getByText('Expiring Soon')).toBeInTheDocument()
    expect(screen.getByText('00:45')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Clear All' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const confirmButtons = screen.getAllByRole('button', { name: 'Clear All' })
    fireEvent.click(confirmButtons[confirmButtons.length - 1])
    expect(onClearAll).toHaveBeenCalledTimes(1)
  })

  it('renders AlertBanner with accessible role', () => {
    render(<AlertBanner variant="warning" title="Session expiring soon" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Session expiring soon')
  })
})

