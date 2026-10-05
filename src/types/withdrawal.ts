export type WithdrawalStatus = 'PENDING' | 'DELIVERED'

export interface Withdrawal {
  id: string
  studentId: string
  uniformItemId: string
  quantity: number
  status: WithdrawalStatus
  createdAt: string
  deliveredAt: string | null
  student: {
    id: string
    name: string
    enrollment: string
  }
  uniformItem: {
    id: string
    size: string
    uniformType: {
      name: string
    }
  }
}

export interface WithdrawalListResponse {
  withdrawals: Withdrawal[]
  total: number
  page: number
  perPage: number
}

export interface CreateWithdrawalInput {
  studentId: string
  uniformItemId: string
  quantity: number
}
