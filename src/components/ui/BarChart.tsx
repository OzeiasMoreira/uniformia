interface BarChartItem {
  label: string
  valor: number
  cor: string
}

interface BarChartProps {
  items: BarChartItem[]
  maxValue: number
}

const AXIS_STEPS = [100, 75, 55, 35, 0]

export function BarChart({ items, maxValue }: BarChartProps) {
  return (
    <div className="flex h-[220px] items-stretch gap-4">
      <div className="flex flex-col justify-between py-1 font-app text-xs text-placeholder">
        {AXIS_STEPS.map((step) => (
          <span key={step}>{String(step).padStart(2, '0')}</span>
        ))}
      </div>

      <div className="relative flex flex-1 items-end justify-around gap-6 border-l border-[#e5e5e5] pl-6">
        {AXIS_STEPS.map((step) => (
          <div
            key={step}
            className="pointer-events-none absolute inset-x-0 border-t border-[#f0f0f0]"
            style={{ bottom: `${(step / 100) * 100}%` }}
          />
        ))}
        {items.map((item) => (
          <div key={item.label} className="relative flex h-full flex-1 items-end justify-center">
            <div
              className="w-[60%] rounded-t-[8px]"
              style={{
                height: `${Math.min((item.valor / maxValue) * 100, 100)}%`,
                backgroundColor: item.cor,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
