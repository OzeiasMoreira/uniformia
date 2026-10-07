import { useCallback } from 'react'
import { EstoqueTipoCard } from '../../components/tables/EstoqueTipoCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Spinner } from '../../components/ui/Spinner'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useAuth } from '../../hooks/useAuth'
import { getUniformItems } from '../../services/uniform-item.service'
import { LOW_STOCK_THRESHOLD, getStockLevel, groupStockByType } from '../../utils/stock'

export function Uniformes() {
  const { institution } = useAuth()
  const institutionId = institution?.id ?? ''

  const fetcher = useCallback(
    () => (institutionId ? getUniformItems(institutionId) : Promise.resolve([])),
    [institutionId],
  )
  const { data: items, loading, error, refetch } = useAsyncData(fetcher)

  const groups = groupStockByType(items ?? [])
  const outCount = (items ?? []).filter((item) => getStockLevel(item.stockQuantity) === 'out').length
  const lowCount = (items ?? []).filter((item) => getStockLevel(item.stockQuantity) === 'low').length

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-app text-2xl font-bold text-navy">ESTOQUE DE UNIFORMES:</h1>

      {!institutionId && (
        <EmptyState
          title="Instituição não identificada"
          description="Faça login como instituição para ver o estoque."
        />
      )}

      {institutionId && loading && (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      )}

      {institutionId && !loading && (error || !items) && (
        <ErrorState description={error ?? undefined} onRetry={refetch} />
      )}

      {institutionId && !loading && items && items.length === 0 && (
        <EmptyState
          title="Nenhum uniforme em estoque"
          description="Registre uma entrada de estoque para ver os tipos e tamanhos aqui."
        />
      )}

      {institutionId && !loading && items && items.length > 0 && (
        <>
          {(outCount > 0 || lowCount > 0) && (
            <div
              role="alert"
              className="rounded-[20px] border border-[#fcd34d] bg-[#fffbeb] px-6 py-4 font-app text-sm text-[#92400e]"
            >
              <strong className="font-bold">Atenção ao estoque: </strong>
              {outCount > 0 && `${outCount} ${outCount === 1 ? 'item zerado' : 'itens zerados'}`}
              {outCount > 0 && lowCount > 0 && ' e '}
              {lowCount > 0 &&
                `${lowCount} ${lowCount === 1 ? 'item' : 'itens'} com saldo baixo (até ${LOW_STOCK_THRESHOLD} unidades)`}
              . Considere repor.
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {groups.map((group) => (
              <EstoqueTipoCard key={group.typeId} group={group} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
