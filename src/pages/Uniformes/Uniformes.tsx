import { UniformeCard } from '../../components/tables/UniformeCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Spinner } from '../../components/ui/Spinner'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getUniformes } from '../../services/uniformes'

export function Uniformes() {
  const { data: uniformes, loading, error } = useAsyncData(getUniformes)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-app text-2xl font-bold text-navy">TIPOS DE UNIFORMES DISPONÍVEIS:</h1>

      {loading && (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      )}

      {!loading && (error || !uniformes) && <ErrorState description={error ?? undefined} />}

      {!loading &&
        uniformes &&
        (uniformes.length === 0 ? (
          <EmptyState
            title="Nenhum uniforme cadastrado"
            description="Cadastre tipos de uniforme para vê-los aqui."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {uniformes.map((uniforme) => (
              <UniformeCard key={uniforme.id} nome={uniforme.nome} itens={uniforme.itens} />
            ))}
          </div>
        ))}
    </div>
  )
}
