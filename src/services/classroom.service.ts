import { api } from './api'
import type { Classroom, CreateClassroomInput } from '../types/classroom'

export async function createClassroom(
  institutionId: string,
  input: CreateClassroomInput,
): Promise<Classroom> {
  const { data } = await api.post<Classroom>(`/institutions/${institutionId}/classrooms`, input)
  return data
}
