import { useCallback, useEffect, useState } from 'react'
import { NovaEntregaModal } from '../../components/forms/NovaEntregaModal'
import { EntregaCard } from '../../components/tables/EntregaCard'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Modal } from '../../components/ui/Modal'
import { Select } from '../../components/ui/Select'
import { Spinner } from '../../components/ui/Spinner'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useAuth } from '../../hooks/useAuth'
import { getAlunos } from '../../services/alunos'
import {
  cancelWithdrawal,
  deliverWithdrawal,
  getWithdrawals,
} from '../../services/withdrawal.service'
import type { Aluno } from '../../types/aluno'
import type { Withdrawal, WithdrawalListResponse, WithdrawalStatus } from '../../types/withdrawal'

const EMPTY_RESPONSE: WithdrawalListResponse = { withdrawals: [], total: 0, page: 1, perPage: 0 }

export function Entregas() {
  const { institution } = useAuth()
  const institutionId = institution?.id ?? ''

  const [filtroStatus, setFiltroStatus] = useState<WithdrawalStatus | ''>('')
  const [filtroAluno, setFiltroAluno] = useState('')
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [modalAberto, setModalAberto] = useState(false)
  const [acaoEmAndamento, setAcaoEmAndamento] = useState<string | null>(null)
  const [erroAcao, setErroAcao] = useState<string | null>(null)
  const [entregaCancelando, setEntregaCancelando] = useState<Withdrawal | null>(null)

  useEffect(() => {
    if (!institutionId) return

    let active = true
    getAlunos(institutionId, { perPage: 100 })
      .then((response) => {
        if (active) setAlunos(response.students)
      })
      .catch(() => {
        if (active) setAlunos([])
      })

    return () => {
      active = false
    }
  }, [institutionId])

  const fetcher = useCallback(
    () =>
      institutionId
        ? getWithdrawals(institutionId, {
            status: filtroStatus || undefined,
            studentId: filtroAluno || undefined,
          })
        : Promise.resolve(EMPTY_RESPONSE),
    [institutionId, filtroStatus, filtroAluno],
  )

  const { data, loading, error, refetch } = useAsyncData(fetcher)

  async function executarAcao(withdrawalId: string, acao: () => Promise<void>, falha: string) {
    setErroAcao(null)
    setAcaoEmAndamento(withdrawalId)
    try {
      await acao()
      refetch()
    } catch (err) {
      setErroAcao(err instanceof Error ? err.message : falha)
    } finally {
      setAcaoEmAndamento(null)
    }
  }

  function handleEntregar(withdrawalId: string) {
    return executarAcao(
      withdrawalId,
      () => deliverWithdrawal(institutionId, withdrawalId),
      'Não foi possível marcar a entrega como entregue.',
    )
  }

  async function handleConfirmarCancelamento() {
    if (!entregaCancelando) return

    const withdrawalId = entregaCancelando.id
    setEntregaCancelando(null)
    await executarAcao(
      withdrawalId,
      () => cancelWithdrawal(institutionId, withdrawalId),
      'Não foi possível cancelar a entrega.',
    )
  }

  const withdrawals = data?.withdrawals ?? []
  const temFiltro = Boolean(filtroStatus || filtroAluno)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-app text-2xl font-bold text-navy">ENTREGAS DE UNIFORMES:</h1>
        <Button onClick={() => setModalAberto(true)} className="!h-[44px] !w-auto !px-6">
          + Nova entrega
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select
          aria-label="Filtrar por status"
          value={filtroStatus}
          onChange={(event) => setFiltroStatus(event.target.value as WithdrawalStatus | '')}
        >
          <option value="">Todos os status</option>
          <option value="PENDING">Pendentes</option>
          <option value="DELIVERED">Entregues</option>
        </Select>

        <Select
          aria-label="Filtrar por aluno"
          value={filtroAluno}
          onChange={(event) => setFiltroAluno(event.target.value)}
        >
          <option value="">Todos os alunos</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.name} ({aluno.enrollment})
            </option>
          ))}
        </Select>
      </div>

      {erroAcao && <p className="font-app text-sm text-danger">{erroAcao}</p>}

      {!institutionId && (
        <EmptyState
          title="Instituição não identificada"
          description="Faça login como instituição para ver as entregas."
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
        (withdrawals.length === 0 ? (
          <EmptyState
            title={temFiltro ? 'Nenhuma entrega encontrada' : 'Nenhuma entrega registrada'}
            description={
              temFiltro
                ? 'Nenhuma entrega corresponde aos filtros selecionados.'
                : 'Registre entregas de uniforme para vê-las aqui.'
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            {withdrawals.map((withdrawal) => (
              <EntregaCard
                key={withdrawal.id}
                withdrawal={withdrawal}
                busy={acaoEmAndamento === withdrawal.id}
                onEntregar={() => handleEntregar(withdrawal.id)}
                onCancelar={() => setEntregaCancelando(withdrawal)}
              />
            ))}
          </div>
        ))}

      <NovaEntregaModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onSuccess={() => {
          setModalAberto(false)
          refetch()
        }}
      />

      <Modal
        open={!!entregaCancelando}
        onClose={() => setEntregaCancelando(null)}
        title="Cancelar entrega"
      >
        <p className="font-app text-sm text-text-muted">
          {`Tem certeza que deseja cancelar a entrega de "${entregaCancelando?.uniformItem.uniformType.name ?? ''}" para "${entregaCancelando?.student.name ?? ''}"?`}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => setEntregaCancelando(null)}
            className="!h-[44px] !w-auto !bg-[#e5e7eb] !px-6 !text-black"
          >
            Voltar
          </Button>
          <Button
            type="button"
            onClick={handleConfirmarCancelamento}
            className="!h-[44px] !w-auto !bg-danger !px-6"
          >
            Cancelar entrega
          </Button>
        </div>
      </Modal>
    </div>
  )
}
