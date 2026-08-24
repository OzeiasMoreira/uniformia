import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="font-body text-xl text-text-strong">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={`h-[75.66px] rounded-[5px] bg-white px-6 font-body text-sm text-text-strong outline-none placeholder:text-placeholder focus:ring-2 focus:ring-primary-dark ${
          error ? 'ring-2 ring-danger' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="font-body text-sm text-danger">{error}</p>}
    </div>
  )
}
