import { AlunoRow } from '../../components/tables/AlunoRow'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Spinner } from '../../components/ui/Spinner'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getAlunos } from '../../services/alunos'

export function Alunos() {
  const { data: alunos, loading, error } = useAsyncData(getAlunos)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-app text-2xl font-bold text-navy">ALUNOS MATRICULADOS:</h1>

      {loading && (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      )}

      {!loading && (error || !alunos) && <ErrorState description={error ?? undefined} />}

      {!loading &&
        alunos &&
        (alunos.length === 0 ? (
          <EmptyState title="Nenhum aluno matriculado" description="Cadastre alunos para vê-los aqui." />
        ) : (
          <Card className="overflow-hidden">
            {alunos.map((aluno, index) => (
              <AlunoRow
                key={aluno.id}
                numero={index + 1}
                nome={aluno.nome}
                uniformeRetirado={aluno.uniformeRetirado}
              />
            ))}
          </Card>
        ))}
    </div>
  )
}
