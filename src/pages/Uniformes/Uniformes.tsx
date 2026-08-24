import { UniformeCard } from '../../components/tables/UniformeCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { UNIFORMES_MOCK } from '../../mocks/uniformes.mock'

export function Uniformes() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-app text-2xl font-bold text-navy">TIPOS DE UNIFORMES DISPONÍVEIS:</h1>

      {UNIFORMES_MOCK.length === 0 ? (
        <EmptyState
          title="Nenhum uniforme cadastrado"
          description="Cadastre tipos de uniforme para vê-los aqui."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {UNIFORMES_MOCK.map((uniforme) => (
            <UniformeCard key={uniforme.id} nome={uniforme.nome} itens={uniforme.itens} />
          ))}
        </div>
      )}
    </div>
  )
}
