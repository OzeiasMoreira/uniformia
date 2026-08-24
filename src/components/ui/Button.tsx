import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function Button({
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`flex h-[75.66px] w-full items-center justify-center rounded-[5px] bg-primary-dark font-display text-xl font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {loading ? (
        <span
          aria-label="Carregando"
          className="size-6 animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
      ) : (
        children
      )}
    </button>
  )
}
