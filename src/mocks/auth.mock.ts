import type { LoginCredentials } from '../types/auth'

export const MOCK_CREDENTIALS: Record<'instituicao' | 'aluno', LoginCredentials> = {
  instituicao: { identificador: '12.345.678/0001-90', senha: '123456' },
  aluno: { identificador: '2024001234', senha: '123456' },
}
