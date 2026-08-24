import { PedidoCard } from '../../components/tables/PedidoCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { PEDIDOS_MOCK } from '../../mocks/pedidos.mock'

export function Pedidos() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-app text-2xl font-bold text-navy">PEDIDOS:</h1>

      {PEDIDOS_MOCK.length === 0 ? (
        <EmptyState title="Nenhum pedido registrado" description="Novos pedidos aparecerão aqui." />
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {PEDIDOS_MOCK.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              aluno={pedido.aluno}
              item={pedido.item}
              status={pedido.status}
            />
          ))}
        </div>
      )}
    </div>
  )
}
