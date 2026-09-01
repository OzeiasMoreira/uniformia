import { api } from './api'
import type { CreateStudentInput, StudentSummary } from '../types/student'

export async function createStudent(
  institutionId: string,
  input: CreateStudentInput,
): Promise<StudentSummary> {
  const { data } = await api.post<StudentSummary>(`/institutions/${institutionId}/students`, input)
  return data
}
