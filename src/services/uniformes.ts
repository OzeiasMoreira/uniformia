import { UNIFORMES_MOCK } from '../mocks/uniformes.mock'
import type { Uniforme } from '../types/uniforme'

const MOCK_DELAY_MS = 500

// TODO: substituir por api.get<Uniforme[]>('/uniformes') quando o backend estiver disponível
export async function getUniformes(): Promise<Uniforme[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return UNIFORMES_MOCK
}
