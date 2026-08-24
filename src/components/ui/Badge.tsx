import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[10.92px] bg-white/[0.53] px-4 py-2 font-app text-[13.44px] font-bold text-white ${className}`}
    >
      {children}
    </span>
  )
}
