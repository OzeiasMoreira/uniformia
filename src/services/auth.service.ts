import { api } from './api'
import { setToken } from './token'
import type { InstitutionAuthResponse, LoginCredentials, StudentAuthResponse } from '../types/auth'

export async function loginInstituicao(
  credentials: LoginCredentials,
): Promise<InstitutionAuthResponse> {
  const { data } = await api.post<InstitutionAuthResponse>('/auth/instituicao', credentials)
  setToken(data.token)
  return data
}

export async function loginAluno(credentials: LoginCredentials): Promise<StudentAuthResponse> {
  const { data } = await api.post<StudentAuthResponse>('/auth/aluno', credentials)
  setToken(data.token)
  return data
}
