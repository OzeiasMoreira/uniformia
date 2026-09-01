export interface UniformType {
  id: string
  name: string
  institutionId: string
  createdAt: string
  updatedAt: string
}

export interface UniformItem {
  id: string
  uniformTypeId: string
  size: string
  military: boolean
  stockQuantity: number
  createdAt: string
  updatedAt: string
}

export interface StockEntry {
  id: string
  quantity: number
  uniformItemId: string
  receivedAt: string
}

export interface CreateStockEntryInput {
  uniformTypeName: string
  size: string
  military: boolean
  quantity: number
}

export interface StockEntryResult {
  stockEntry: StockEntry
  uniformItem: UniformItem
}
