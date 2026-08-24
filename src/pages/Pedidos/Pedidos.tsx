import { PedidoCard } from '../../components/tables/PedidoCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Spinner } from '../../components/ui/Spinner'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getPedidos } from '../../services/pedidos'

export function Pedidos() {
  const { data: pedidos, loading, error } = useAsyncData(getPedidos)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-app text-2xl font-bold text-navy">PEDIDOS:</h1>

      {loading && (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      )}

      {!loading && (error || !pedidos) && <ErrorState description={error ?? undefined} />}

      {!loading &&
        pedidos &&
        (pedidos.length === 0 ? (
          <EmptyState title="Nenhum pedido registrado" description="Novos pedidos aparecerão aqui." />
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {pedidos.map((pedido) => (
              <PedidoCard
                key={pedido.id}
                aluno={pedido.aluno}
                item={pedido.item}
                status={pedido.status}
              />
            ))}
          </div>
        ))}
    </div>
  )
}
