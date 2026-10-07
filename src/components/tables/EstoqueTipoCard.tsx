import { Card } from '../ui/Card'
import { getStockLevel } from '../../utils/stock'
import type { StockGroup, StockLevel } from '../../utils/stock'

interface EstoqueTipoCardProps {
  group: StockGroup
}

const LEVEL_CONFIG: Record<StockLevel, { label: string; color: string; bg: string }> = {
  out: { label: 'Zerado', color: '#b91c1c', bg: '#fee2e2' },
  low: { label: 'Saldo baixo', color: '#b45309', bg: '#fef3c7' },
  ok: { label: 'Em estoque', color: '#15803d', bg: '#dcfce7' },
}

export function EstoqueTipoCard({ group }: EstoqueTipoCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-app text-xl font-bold text-black">{group.typeName}</h2>
        <span className="font-app text-sm text-black/40">Total: {group.total}</span>
      </div>

      <ul className="mt-4 flex flex-col">
        {group.items.map((item) => {
          const level = getStockLevel(item.stockQuantity)
          const config = LEVEL_CONFIG[level]

          return (
            <li
              key={item.id}
              className={`flex items-center justify-between gap-3 border-b border-[#f0f0f0] px-2 py-3 last:border-b-0 ${
                level === 'ok' ? '' : 'rounded-lg'
              }`}
              style={level === 'ok' ? undefined : { backgroundColor: `${config.bg}80` }}
            >
              <span className="font-app text-sm font-semibold text-black/80">
                Tamanho {item.size}
                {item.military && <span className="ml-2 font-normal text-black/40">(Militar)</span>}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-app text-lg font-extrabold" style={{ color: config.color }}>
                  {item.stockQuantity}
                </span>
                <span
                  className="w-[104px] whitespace-nowrap rounded-full px-3 py-1 text-center font-app text-xs font-semibold"
                  style={{ backgroundColor: config.bg, color: config.color }}
                >
                  {config.label}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
