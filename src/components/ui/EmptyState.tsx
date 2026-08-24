import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[25.2px] bg-white/60 px-6 py-16 text-center">
      {icon}
      <p className="font-app text-lg font-semibold text-text-muted">{title}</p>
      {description && <p className="font-app text-sm text-text-muted/70">{description}</p>}
    </div>
  )
}
