import type { UniformItemOption } from '../types/uniform-item'

export const LOW_STOCK_THRESHOLD = 5

export type StockLevel = 'out' | 'low' | 'ok'

export function getStockLevel(quantity: number): StockLevel {
  if (quantity <= 0) return 'out'
  if (quantity <= LOW_STOCK_THRESHOLD) return 'low'
  return 'ok'
}

export interface StockGroup {
  typeId: string
  typeName: string
  items: UniformItemOption[]
  total: number
}

export function groupStockByType(items: UniformItemOption[]): StockGroup[] {
  const groups = new Map<string, StockGroup>()

  for (const item of items) {
    const group = groups.get(item.uniformType.id) ?? {
      typeId: item.uniformType.id,
      typeName: item.uniformType.name,
      items: [],
      total: 0,
    }
    group.items.push(item)
    group.total += item.stockQuantity
    groups.set(item.uniformType.id, group)
  }

  return [...groups.values()].sort((a, b) => a.typeName.localeCompare(b.typeName, 'pt-BR'))
}
