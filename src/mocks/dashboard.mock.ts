import avatarNavya from '../assets/images/avatar-navya.png'
import avatarNivaan from '../assets/images/avatar-nivaan.png'
import type { DashboardData } from '../types/dashboard'

export const DASHBOARD_MOCK: DashboardData = {
  uniformesEntregues: 534,
  alunosMatriculados: 1500,
  totalGasto: '500 mil',
  resumoEntregas: [
    { label: 'Entregues', valor: 534 },
    { label: 'Prontos para retirada', valor: 99 },
    { label: 'Sobrantes', valor: 30 },
  ],
  retiradaCoordenacaoHorario: '17:00',
  balanceamento: [
    { label: 'Alunos matriculados', valor: 1500, cor: '#f1554c' },
    { label: 'Uniformes retirados', valor: 534, cor: '#0f296d' },
    { label: 'Alunos sem uniforme', valor: 966, cor: '#ffa5a0' },
  ],
  resumoPedidos: [
    { label: 'Online', percentual: 50, cor: '#f1554c' },
    { label: 'Presencial', percentual: 30, cor: '#0f296d' },
    { label: 'Eventos', percentual: 20, cor: '#ffa5a0' },
  ],
  totalPedidos: 50,
  alunosQueRetiraram: [
    { nome: 'Nivaan', turma: 'Pré 2', badge: 'Blue Badge', corCard: '#6196c1', avatar: avatarNivaan },
    { nome: 'Navya', turma: 'Pré 1', badge: 'Pink Badge', corCard: '#0e5b99', avatar: avatarNavya },
    { nome: 'Anugrah', turma: '3º Ano', badge: 'Orange Badge', corCard: '#a0efff' },
  ],
}
