export interface Aluno {
  id: string
  name: string
  enrollment: string
  classroomId: string
  classroom: {
    id: string
    name: string
  }
  createdAt: string
}

export interface AlunoListResponse {
  students: Aluno[]
  total: number
  page: number
  perPage: number
}

export interface UpdateAlunoInput {
  name?: string
  enrollment?: string
  classroomId?: string
  senha?: string
}
