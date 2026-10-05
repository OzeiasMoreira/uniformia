import { api } from './api'
import type { UniformItemOption } from '../types/uniform-item'

export async function getUniformItems(institutionId: string): Promise<UniformItemOption[]> {
  const { data } = await api.get<UniformItemOption[]>(`/institutions/${institutionId}/uniform-items`)
  return data
}
