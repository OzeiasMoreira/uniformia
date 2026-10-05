import { useCallback, useState } from 'react'
import { CadastroAlunoModal } from '../../components/forms/CadastroAlunoModal'
import { EditarAlunoModal } from '../../components/forms/EditarAlunoModal'
import { AlunoRow } from '../../components/tables/AlunoRow'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Modal } from '../../components/ui/Modal'
import { Spinner } from '../../components/ui/Spinner'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useAuth } from '../../hooks/useAuth'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { deleteAluno, getAlunos } from '../../services/alunos'
import type { Aluno, AlunoListResponse } from '../../types/aluno'

const EMPTY_RESPONSE: AlunoListResponse = { students: [], total: 0, page: 1, perPage: 0 }

export function Alunos() {
  const { institution } = useAuth()
  const institutionId = institution?.id ?? ''

  const [busca, setBusca] = useState('')
  const buscaDebounced = useDebouncedValue(busca.trim())

  const fetcher = useCallback(
    () =>
      institutionId
        ? getAlunos(institutionId, { search: buscaDebounced || undefined })
        : Promise.resolve(EMPTY_RESPONSE),
    [institutionId, buscaDebounced],
  )
  const { data, loading, error, refetch } = useAsyncData(fetcher)

  const [modalCadastro, setModalCadastro] = useState(false)
  const [alunoEditando, setAlunoEditando] = useState<Aluno | null>(null)
  const [alunoExcluindo, setAlunoExcluindo] = useState<Aluno | null>(null)
  const [excluindo, setExcluindo] = useState(false)
  const [erroExclusao, setErroExclusao] = useState<string | null>(null)

  function fecharExclusao() {
    setAlunoExcluindo(null)
    setErroExclusao(null)
  }

  async function handleExcluir() {
    if (!alunoExcluindo || !institutionId) return

    setErroExclusao(null)
    setExcluindo(true)
    try {
      await deleteAluno(institutionId, alunoExcluindo.id)
      fecharExclusao()
      refetch()
    } catch (err) {
      setErroExclusao(err instanceof Error ? err.message : 'Não foi possível excluir o aluno.')
    } finally {
      setExcluindo(false)
    }
  }

  const alunos = data?.students ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-app text-2xl font-bold text-navy">ALUNOS MATRICULADOS:</h1>
        <Button onClick={() => setModalCadastro(true)} className="!h-[44px] !w-auto !px-6">
          Cadastrar aluno
        </Button>
      </div>

      <input
        type="search"
        aria-label="Buscar aluno"
        placeholder="Buscar por nome ou matrícula..."
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
        className="h-[44px] w-full max-w-[420px] rounded-lg border border-[#e0e0e0] bg-white px-4 font-app text-sm text-text-muted outline-none placeholder:text-placeholder focus:ring-2 focus:ring-primary-dark"
      />

      {!institutionId && (
        <EmptyState
          title="Instituição não identificada"
          description="Faça login como instituição para ver os alunos."
        />
      )}

      {institutionId && loading && (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      )}

      {institutionId && !loading && (error || !data) && (
        <ErrorState description={error ?? undefined} onRetry={refetch} />
      )}

      {institutionId &&
        !loading &&
        data &&
        (alunos.length === 0 ? (
          <EmptyState
            title={buscaDebounced ? 'Nenhum aluno encontrado' : 'Nenhum aluno matriculado'}
            description={
              buscaDebounced
                ? 'Tente buscar por outro nome ou matrícula.'
                : 'Cadastre alunos para vê-los aqui.'
            }
          />
        ) : (
          <>
            <Card className="overflow-hidden">
              {alunos.map((aluno, index) => (
                <AlunoRow
                  key={aluno.id}
                  numero={index + 1}
                  nome={aluno.name}
                  turma={aluno.classroom.name}
                  matricula={aluno.enrollment}
                  onEditar={() => setAlunoEditando(aluno)}
                  onExcluir={() => setAlunoExcluindo(aluno)}
                />
              ))}
            </Card>
            {data.total > alunos.length && (
              <p className="font-app text-sm text-text-muted">
                Mostrando {alunos.length} de {data.total} alunos. Use a busca para refinar.
              </p>
            )}
          </>
        ))}

      <CadastroAlunoModal
        open={modalCadastro}
        onClose={() => setModalCadastro(false)}
        onSuccess={refetch}
      />

      {alunoEditando && (
        <EditarAlunoModal
          open
          aluno={alunoEditando}
          onClose={() => setAlunoEditando(null)}
          onSuccess={() => {
            setAlunoEditando(null)
            refetch()
          }}
        />
      )}

      <Modal open={!!alunoExcluindo} onClose={fecharExclusao} title="Excluir aluno">
        <p className="font-app text-sm text-text-muted">
          Tem certeza que deseja excluir o aluno "{alunoExcluindo?.name}"? Esta ação não pode ser
          desfeita.
        </p>
        {erroExclusao && <p className="mt-3 font-app text-sm text-danger">{erroExclusao}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={fecharExclusao}
            className="!h-[44px] !w-auto !bg-[#e5e7eb] !px-6 !text-black"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleExcluir}
            loading={excluindo}
            className="!h-[44px] !w-auto !bg-danger !px-6"
          >
            Excluir
          </Button>
        </div>
      </Modal>
    </div>
  )
}
