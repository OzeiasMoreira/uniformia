import { api } from './api'
import type { CreateInstitutionInput, Institution } from '../types/institution'

export async function createInstitution(input: CreateInstitutionInput): Promise<Institution> {
  const { data } = await api.post<Institution>('/institutions', input)
  return data
}
