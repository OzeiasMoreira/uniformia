import type { DashboardData } from '../types/dashboard'

export const DASHBOARD_MOCK: DashboardData = {
  uniformesEntregues: 0,
  alunosMatriculados: 0,
  totalGasto: 'R$ 0,00',
  resumoEntregas: [
    { label: 'Entregues', valor: 0 },
    { label: 'Prontos para retirada', valor: 0 },
    { label: 'Sobrantes', valor: 0 },
  ],
  retiradaCoordenacaoHorario: '00:00',
  balanceamento: [
    { label: 'Alunos matriculados', valor: 0, cor: '#f1554c' },
    { label: 'Uniformes retirados', valor: 0, cor: '#0f296d' },
    { label: 'Alunos sem uniforme', valor: 0, cor: '#ffa5a0' },
  ],
  resumoPedidos: [
    { label: 'Online', percentual: 0, cor: '#f1554c' },
    { label: 'Presencial', percentual: 0, cor: '#0f296d' },
    { label: 'Eventos', percentual: 0, cor: '#ffa5a0' },
  ],
  totalPedidos: 0,
  alunosQueRetiraram: [],
}
