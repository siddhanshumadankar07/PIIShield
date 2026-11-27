import { useId } from 'react'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldWrapperProps {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}

function FieldWrapper({ id, label, hint, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

export function TextInput({ label, hint, error, id: propId, className = '', ...props }: TextInputProps) {
  const generatedId = useId()
  const id = propId ?? generatedId
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={`h-10 rounded-md border bg-charcoal px-3 text-sm text-ink placeholder:text-muted/60 ${
          error ? 'border-danger' : 'border-border-subtle focus:border-electric'
        } ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
  error?: string
}

export function Textarea({ label, hint, error, id: propId, className = '', ...props }: TextareaProps) {
  const generatedId = useId()
  const id = propId ?? generatedId
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={`min-h-28 rounded-md border bg-charcoal p-3 font-mono text-sm text-ink placeholder:text-muted/60 ${
          error ? 'border-danger' : 'border-border-subtle focus:border-electric'
        } ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  hint?: string
  error?: string
}

export function Select({ label, options, hint, error, id: propId, className = '', ...props }: SelectProps) {
  const generatedId = useId()
  const id = propId ?? generatedId
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={`h-10 rounded-md border bg-charcoal px-3 text-sm text-ink ${
          error ? 'border-danger' : 'border-border-subtle focus:border-electric'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, id: propId, className = '', ...props }: CheckboxProps) {
  const generatedId = useId()
  const id = propId ?? generatedId

  return (
    <label htmlFor={id} className={`inline-flex items-center gap-2.5 text-sm text-ink cursor-pointer ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-border-subtle bg-charcoal accent-electric"
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}

export interface SwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Switch({ label, checked, onChange, disabled = false }: SwitchProps) {
  const id = useId()

  return (
    <div className="inline-flex items-center gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border transition-colors disabled:opacity-50 ${
          checked
            ? 'border-electric bg-electric'
            : 'border-border-subtle bg-charcoal'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-ink transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <label htmlFor={id} className="text-sm text-ink cursor-pointer">
        {label}
      </label>
    </div>
  )
}

export interface FileUploadProps {
  label: string
  accept?: string
  hint?: string
  error?: string
  onFilesSelected: (files: FileList) => void
}

export function FileUpload({ label, accept = '.txt,.csv', hint, error, onFilesSelected }: FileUploadProps) {
  const id = useId()

  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <label
        htmlFor={id}
        className={`flex flex-col items-center justify-center rounded-md border border-dashed bg-charcoal/70 px-4 py-6 text-center transition-colors hover:border-electric cursor-pointer ${
          error ? 'border-danger' : 'border-border-subtle'
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-icy">
          Select or Drop File
        </span>
        <span className="mt-1 text-xs text-muted">
          Supported: {accept}
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFilesSelected(e.target.files)
            }
          }}
        />
      </label>
    </FieldWrapper>
  )
}

