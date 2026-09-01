import { api } from './api'
import type { CreateStockEntryInput, StockEntryResult } from '../types/uniform'

export async function createStockEntry(
  institutionId: string,
  input: CreateStockEntryInput,
): Promise<StockEntryResult> {
  const { data } = await api.post<StockEntryResult>(
    `/institutions/${institutionId}/stock-entries`,
    input,
  )
  return data
}
