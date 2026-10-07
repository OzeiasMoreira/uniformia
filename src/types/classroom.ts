export interface Classroom {
  id: string
  name: string
  institutionId: string
  createdAt: string
  updatedAt: string
}

export interface ClassroomOption {
  id: string
  name: string
}

export interface CreateClassroomInput {
  name: string
}
