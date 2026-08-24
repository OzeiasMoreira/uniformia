import type { HTMLAttributes } from 'react'

export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[25.2px] bg-white shadow-[0px_7.56px_47.88px_0px_rgba(0,0,0,0.04)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
