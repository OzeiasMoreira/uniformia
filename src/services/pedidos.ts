import { PEDIDOS_MOCK } from '../mocks/pedidos.mock'
import type { Pedido } from '../types/pedido'

const MOCK_DELAY_MS = 500

// TODO: substituir por api.get<Pedido[]>('/pedidos') quando o backend estiver disponível
export async function getPedidos(): Promise<Pedido[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return PEDIDOS_MOCK
}
