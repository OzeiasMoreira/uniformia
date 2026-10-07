import type { Withdrawal, WithdrawalStatus } from '../../types/withdrawal'

interface EntregaCardProps {
  withdrawal: Withdrawal
  busy?: boolean
  onEntregar: () => void
  onCancelar: () => void
}

const STATUS_CONFIG: Record<WithdrawalStatus, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'Pendente', color: '#b45309', bg: '#fef3c7' },
  DELIVERED: { label: 'Entregue', color: '#15803d', bg: '#dcfce7' },
}

export function EntregaCard({ withdrawal, busy = false, onEntregar, onCancelar }: EntregaCardProps) {
  const status = STATUS_CONFIG[withdrawal.status]

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-app text-lg font-semibold text-black">
            {withdrawal.student.name}
            <span className="ml-2 text-sm font-normal text-black/40">
              ({withdrawal.student.enrollment})
            </span>
          </p>
          <p className="font-app text-sm text-black/60">
            {withdrawal.uniformItem.uniformType.name} · Tamanho {withdrawal.uniformItem.size} · Qtd:{' '}
            {withdrawal.quantity}
          </p>
          {withdrawal.deliveredAt && (
            <p className="font-app text-xs text-black/40">
              Entregue em {new Date(withdrawal.deliveredAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-app text-xs font-semibold"
            style={{ backgroundColor: status.bg, color: status.color }}
          >
            {status.label}
          </span>

          {withdrawal.status === 'PENDING' && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onEntregar}
                disabled={busy}
                className="rounded-lg bg-green-600 px-3 py-1 font-app text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Entregar
              </button>
              <button
                type="button"
                onClick={onCancelar}
                disabled={busy}
                className="rounded-lg bg-danger/10 px-3 py-1 font-app text-sm font-semibold text-danger hover:bg-danger/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
