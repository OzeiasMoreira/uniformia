export type PedidoStatus = 'pendente' | 'entregue'

export interface Pedido {
  id: number
  aluno: string
  item: string
  status: PedidoStatus
}
