interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Algo deu errado',
  description = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[25.2px] bg-white/60 px-6 py-16 text-center">
      <p className="font-app text-lg font-semibold text-danger">{title}</p>
      <p className="font-app text-sm text-text-muted/70">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-[5px] bg-primary-dark px-6 py-2 font-app text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}
