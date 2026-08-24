export interface ResumoEntregasItem {
  label: string
  valor: number
}

export interface BalanceamentoItem {
  label: string
  valor: number
  cor: string
}

export interface ResumoPedidosItem {
  label: string
  percentual: number
  cor: string
}

export interface AlunoRetirada {
  nome: string
  turma: string
  badge: string
  corCard: string
  avatar?: string
}

export interface DashboardData {
  uniformesEntregues: number
  alunosMatriculados: number
  totalGasto: string
  resumoEntregas: ResumoEntregasItem[]
  retiradaCoordenacaoHorario: string
  balanceamento: BalanceamentoItem[]
  resumoPedidos: ResumoPedidosItem[]
  totalPedidos: number
  alunosQueRetiraram: AlunoRetirada[]
}
