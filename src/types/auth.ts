import type { Institution } from './institution'
import type { StudentSummary } from './student'

export type LoginTipo = 'instituicao' | 'aluno'

export interface LoginCredentials {
  identificador: string
  senha: string
}

export interface InstitutionAuthResponse {
  token: string
  institution: Institution
}

export interface StudentAuthResponse {
  token: string
  student: StudentSummary
}
