import { AlunoRow } from '../../components/tables/AlunoRow'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ALUNOS_MOCK } from '../../mocks/alunos.mock'

export function Alunos() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-app text-2xl font-bold text-navy">ALUNOS MATRICULADOS:</h1>

      {ALUNOS_MOCK.length === 0 ? (
        <EmptyState title="Nenhum aluno matriculado" description="Cadastre alunos para vê-los aqui." />
      ) : (
        <Card className="overflow-hidden">
          {ALUNOS_MOCK.map((aluno, index) => (
            <AlunoRow
              key={aluno.id}
              numero={index + 1}
              nome={aluno.nome}
              uniformeRetirado={aluno.uniformeRetirado}
            />
          ))}
        </Card>
      )}
    </div>
  )
}
