export interface StudentSummary {
  id: string
  name: string
  enrollment: string
  classroom: string
}

export interface CreateStudentInput {
  name: string
  enrollment: string
  senha: string
  classroomId: string
}
