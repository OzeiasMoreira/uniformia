import type { PedidoStatus } from '../../types/pedido'

interface PedidoCardProps {
  aluno: string
  item: string
  status: PedidoStatus
}

const STATUS_COLOR: Record<PedidoStatus, string> = {
  pendente: '#EB2A2A',
  entregue: '#2AEB2D',
}

export function PedidoCard({ aluno, item, status }: PedidoCardProps) {
  return (
    <div className="relative rounded-[25.2px] bg-white p-6 shadow-[0px_7.56px_47.88px_0px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-app text-2xl font-semibold text-black">{aluno}</p>
          <p className="mt-2 font-app text-base font-semibold text-placeholder">{item}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="size-[16px] rounded-full" style={{ backgroundColor: STATUS_COLOR[status] }} />
          <span className="size-[19px] rounded-full" style={{ backgroundColor: STATUS_COLOR[status] }} />
        </div>
      </div>
    </div>
  )
}
