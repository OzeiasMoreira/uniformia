import { api } from './api'
import type { Classroom, ClassroomOption, CreateClassroomInput } from '../types/classroom'

export async function createClassroom(
  institutionId: string,
  input: CreateClassroomInput,
): Promise<Classroom> {
  const { data } = await api.post<Classroom>(`/institutions/${institutionId}/classrooms`, input)
  return data
}

export async function getClassrooms(institutionId: string): Promise<ClassroomOption[]> {
  const { data } = await api.get<ClassroomOption[]>(`/institutions/${institutionId}/classrooms`)
  return data
}
