import { DASHBOARD_MOCK } from '../mocks/dashboard.mock'
import type { DashboardData } from '../types/dashboard'

const MOCK_DELAY_MS = 500

// TODO: substituir por api.get<DashboardData>('/dashboard') quando o backend estiver disponível
export async function getDashboardData(): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return DASHBOARD_MOCK
}
