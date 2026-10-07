import { api } from './api'
import type { Aluno, AlunoListResponse, UpdateAlunoInput } from '../types/aluno'

export interface GetAlunosParams {
  search?: string
  classroomId?: string
  page?: number
  perPage?: number
}

export async function getAlunos(
  institutionId: string,
  params?: GetAlunosParams,
): Promise<AlunoListResponse> {
  const { data } = await api.get<AlunoListResponse>(`/institutions/${institutionId}/students`, {
    params,
  })
  return data
}

export async function getAluno(institutionId: string, studentId: string): Promise<Aluno> {
  const { data } = await api.get<Aluno>(`/institutions/${institutionId}/students/${studentId}`)
  return data
}

export async function updateAluno(
  institutionId: string,
  studentId: string,
  input: UpdateAlunoInput,
): Promise<Aluno> {
  const { data } = await api.put<Aluno>(
    `/institutions/${institutionId}/students/${studentId}`,
    input,
  )
  return data
}

export async function deleteAluno(institutionId: string, studentId: string): Promise<void> {
  await api.delete(`/institutions/${institutionId}/students/${studentId}`)
}
