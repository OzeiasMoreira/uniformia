interface DonutChartSegment {
  label: string
  percentual: number
  cor: string
}

interface DonutChartProps {
  segments: DonutChartSegment[]
  centerValue: string
  centerLabel: string
  size?: number
}

const STROKE_WIDTH = 22

export function DonutChart({ segments, centerValue, centerLabel, size = 180 }: DonutChartProps) {
  const radius = (size - STROKE_WIDTH) / 2
  const circumference = 2 * Math.PI * radius

  const dashes = segments.map((segment) => (segment.percentual / 100) * circumference)
  const offsets = dashes.reduce<number[]>((acc, _dash, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + dashes[index - 1])
    return acc
  }, [])

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {segments.map((segment, index) => (
          <circle
            key={segment.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={segment.cor}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${dashes[index]} ${circumference - dashes[index]}`}
            strokeDashoffset={-offsets[index]}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-app text-2xl font-bold text-navy">{centerValue}</span>
        <span className="font-app text-xs text-text-muted">{centerLabel}</span>
      </div>
    </div>
  )
}
