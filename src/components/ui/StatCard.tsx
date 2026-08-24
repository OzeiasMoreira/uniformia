import type { ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  icon: ReactNode
  value: string
  label: string
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="flex h-[147.84px] w-full items-center gap-6 px-8">
      <div
        className="flex size-20 shrink-0 items-center justify-center rounded-[20px] shadow-[0px_4px_21px_0px_rgba(16,42,109,0.29)]"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, #375dbe 0%, #244496 48%, #102a6d 93%, transparent 100%)',
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-app text-[32px] font-extrabold text-black">{value}</span>
        <span className="font-app text-sm font-semibold text-black/40">{label}</span>
      </div>
    </Card>
  )
}
