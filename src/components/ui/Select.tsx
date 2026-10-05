import type { SelectHTMLAttributes } from 'react'
import { useId } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export function Select({ label, error, id, className = '', children, ...props }: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="font-body text-xl text-text-strong">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        className={`h-[48px] rounded-lg border border-[#e0e0e0] bg-white px-4 font-app text-sm text-text-muted outline-none focus:ring-2 focus:ring-primary-dark ${
          error ? 'ring-2 ring-danger' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="font-app text-sm text-danger">{error}</p>}
    </div>
  )
}
