interface SpinnerProps {
  className?: string
}

export function Spinner({ className = '' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Carregando"
      className={`inline-block size-8 animate-spin rounded-full border-2 border-primary-dark/20 border-t-primary-dark ${className}`}
    />
  )
}
