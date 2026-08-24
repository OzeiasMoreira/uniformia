import { ALUNOS_MOCK } from '../mocks/alunos.mock'
import type { Aluno } from '../types/aluno'

const MOCK_DELAY_MS = 500

// TODO: substituir por api.get<Aluno[]>('/alunos') quando o backend estiver disponível
export async function getAlunos(): Promise<Aluno[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return ALUNOS_MOCK
}
