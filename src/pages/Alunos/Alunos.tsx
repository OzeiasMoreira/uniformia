import { useCallback, useEffect, useState } from 'react'
import { CadastroAlunoModal } from '../../components/forms/CadastroAlunoModal'
import { EditarAlunoModal } from '../../components/forms/EditarAlunoModal'
import { AlunoRow } from '../../components/tables/AlunoRow'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Modal } from '../../components/ui/Modal'
import { Select } from '../../components/ui/Select'
import { Spinner } from '../../components/ui/Spinner'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useAuth } from '../../hooks/useAuth'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { deleteAluno, getAlunos } from '../../services/alunos'
import { getClassrooms } from '../../services/classroom.service'
import type { Aluno, AlunoListResponse } from '../../types/aluno'
import type { ClassroomOption } from '../../types/classroom'

const PER_PAGE = 20

const EMPTY_RESPONSE: AlunoListResponse = { students: [], total: 0, page: 1, perPage: 0 }

export function Alunos() {
  const { institution } = useAuth()
  const institutionId = institution?.id ?? ''

  const [busca, setBusca] = useState('')
  const [turmaFiltro, setTurmaFiltro] = useState('')
  const [page, setPage] = useState(1)
  const [turmas, setTurmas] = useState<ClassroomOption[]>([])
  const buscaDebounced = useDebouncedValue(busca.trim())

  useEffect(() => {
    if (!institutionId) return

    let active = true
    getClassrooms(institutionId)
      .then((result) => {
        if (active) setTurmas(result)
      })
      .catch(() => {
        if (active) setTurmas([])
      })

    return () => {
      active = false
    }
  }, [institutionId])

  const fetcher = useCallback(
    () =>
      institutionId
        ? getAlunos(institutionId, {
            search: buscaDebounced || undefined,
            classroomId: turmaFiltro || undefined,
            page,
            perPage: PER_PAGE,
          })
        : Promise.resolve(EMPTY_RESPONSE),
    [institutionId, buscaDebounced, turmaFiltro, page],
  )
  const { data, loading, error, refetch } = useAsyncData(fetcher)

  const [modalCadastro, setModalCadastro] = useState(false)
  const [alunoEditando, setAlunoEditando] = useState<Aluno | null>(null)
  const [alunoExcluindo, setAlunoExcluindo] = useState<Aluno | null>(null)
  const [excluindo, setExcluindo] = useState(false)
  const [erroExclusao, setErroExclusao] = useState<string | null>(null)

  const temFiltro = Boolean(busca.trim() || turmaFiltro)

  function handleBusca(value: string) {
    setBusca(value)
    setPage(1)
  }

  function handleTurma(value: string) {
    setTurmaFiltro(value)
    setPage(1)
  }

  function limparFiltros() {
    setBusca('')
    setTurmaFiltro('')
    setPage(1)
  }

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
      if (page > 1 && (data?.students.length ?? 0) <= 1) {
        setPage(page - 1)
      } else {
        refetch()
      }
    } catch (err) {
      setErroExclusao(err instanceof Error ? err.message : 'Não foi possível excluir o aluno.')
    } finally {
      setExcluindo(false)
    }
  }

  const alunos = data?.students ?? []
  const totalPages = data ? Math.max(1, Math.ceil(data.total / PER_PAGE)) : 1

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-app text-2xl font-bold text-navy">ALUNOS MATRICULADOS:</h1>
        <Button onClick={() => setModalCadastro(true)} className="!h-[44px] !w-auto !px-6">
          Cadastrar aluno
        </Button>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <input
          type="search"
          aria-label="Buscar aluno"
          placeholder="Buscar por nome ou matrícula..."
          value={busca}
          onChange={(event) => handleBusca(event.target.value)}
          className="h-[48px] w-full max-w-[420px] rounded-lg border border-[#e0e0e0] bg-white px-4 font-app text-sm text-text-muted outline-none placeholder:text-placeholder focus:ring-2 focus:ring-primary-dark"
        />
        <Select
          aria-label="Filtrar por turma"
          value={turmaFiltro}
          onChange={(event) => handleTurma(event.target.value)}
        >
          <option value="">Todas as turmas</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.name}
            </option>
          ))}
        </Select>
        {temFiltro && (
          <button
            type="button"
            onClick={limparFiltros}
            className="h-[48px] rounded-lg px-4 font-app text-sm font-semibold text-primary-dark hover:bg-primary-dark/10"
          >
            Limpar filtros
          </button>
        )}
      </div>

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
            title={temFiltro ? 'Nenhum aluno encontrado' : 'Nenhum aluno matriculado'}
            description={
              temFiltro
                ? 'Nenhum aluno corresponde à busca ou à turma selecionada. Tente outros filtros.'
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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-app text-sm text-text-muted">
                {data.total} {data.total === 1 ? 'aluno encontrado' : 'alunos encontrados'}
              </p>
              {totalPages > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2 font-app text-sm font-semibold text-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span className="font-app text-sm text-text-muted">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2 font-app text-sm font-semibold text-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </div>
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
