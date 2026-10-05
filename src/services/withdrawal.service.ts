import { api } from './api'
import type {
  CreateWithdrawalInput,
  Withdrawal,
  WithdrawalListResponse,
  WithdrawalStatus,
} from '../types/withdrawal'

export interface GetWithdrawalsParams {
  status?: WithdrawalStatus
  studentId?: string
  page?: number
  perPage?: number
}

export async function getWithdrawals(
  institutionId: string,
  params?: GetWithdrawalsParams,
): Promise<WithdrawalListResponse> {
  const { data } = await api.get<WithdrawalListResponse>(
    `/institutions/${institutionId}/withdrawals`,
    { params },
  )
  return data
}

export async function createWithdrawal(
  institutionId: string,
  input: CreateWithdrawalInput,
): Promise<Withdrawal> {
  const { data } = await api.post<Withdrawal>(`/institutions/${institutionId}/withdrawals`, input)
  return data
}

export async function deliverWithdrawal(
  institutionId: string,
  withdrawalId: string,
): Promise<void> {
  await api.patch(`/institutions/${institutionId}/withdrawals/${withdrawalId}/deliver`)
}

export async function cancelWithdrawal(
  institutionId: string,
  withdrawalId: string,
): Promise<void> {
  await api.delete(`/institutions/${institutionId}/withdrawals/${withdrawalId}`)
}
