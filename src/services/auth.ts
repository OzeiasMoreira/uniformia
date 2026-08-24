import { MOCK_CREDENTIALS } from '../mocks/auth.mock'
import type { LoginCredentials, LoginTipo } from '../types/auth'

const MOCK_DELAY_MS = 800

// TODO: substituir pela chamada real quando o backend Node.js estiver disponível,
// ex: api.post(`/auth/${tipo}`, credentials)
export async function login(tipo: LoginTipo, credentials: LoginCredentials): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

  const expected = MOCK_CREDENTIALS[tipo]
  if (credentials.identificador !== expected.identificador || credentials.senha !== expected.senha) {
    throw new Error(
      tipo === 'instituicao' ? 'CNPJ ou senha inválidos.' : 'Matrícula ou senha inválidos.',
    )
  }
}
