import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getAlunos } from '../../services/alunos'
import { getUniformItems } from '../../services/uniform-item.service'
import { createWithdrawal } from '../../services/withdrawal.service'
import type { Aluno } from '../../types/aluno'
import type { UniformItemOption } from '../../types/uniform-item'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'
import { Select } from '../ui/Select'

interface NovaEntregaModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function NovaEntregaModal({ open, onClose, onSuccess }: NovaEntregaModalProps) {
  const { institution } = useAuth()
  const institutionId = institution?.id ?? ''

  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [items, setItems] = useState<UniformItemOption[]>([])

  const [studentId, setStudentId] = useState('')
  const [uniformItemId, setUniformItemId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !institutionId) return

    let active = true

    Promise.all([getAlunos(institutionId, { perPage: 100 }), getUniformItems(institutionId)])
      .then(([alunosResponse, itemsResponse]) => {
        if (!active) return
        setAlunos(alunosResponse.students)
        setItems(itemsResponse)
        setError(null)
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados.')
        }
      })

    return () => {
      active = false
    }
  }, [open, institutionId])

  const selectedItem = items.find((item) => item.id === uniformItemId)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!institutionId) return

    setError(null)
    setLoading(true)
    try {
      await createWithdrawal(institutionId, { studentId, uniformItemId, quantity })
      setStudentId('')
      setUniformItemId('')
      setQuantity(1)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível registrar a entrega.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Registrar entrega">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          label="Aluno"
          name="studentId"
          value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
          required
        >
          <option value="">Selecione um aluno...</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.name} ({aluno.enrollment})
            </option>
          ))}
        </Select>

        <Select
          label="Item de uniforme"
          name="uniformItemId"
          value={uniformItemId}
          onChange={(event) => {
            setUniformItemId(event.target.value)
            setQuantity(1)
          }}
          required
        >
          <option value="">Selecione um item...</option>
          {items.map((item) => (
            <option key={item.id} value={item.id} disabled={item.stockQuantity === 0}>
              {item.uniformType.name} — {item.size}
              {item.military ? ' (Militar)' : ''} — Estoque: {item.stockQuantity}
            </option>
          ))}
        </Select>

        <div className="flex flex-col gap-1">
          <Input
            label="Quantidade"
            name="quantity"
            type="number"
            min={1}
            max={selectedItem?.stockQuantity ?? undefined}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className="!h-[48px] border border-[#e0e0e0] !text-sm"
            required
          />
          {selectedItem && (
            <span className="font-app text-xs text-black/40">
              Estoque disponível: {selectedItem.stockQuantity} unidades
            </span>
          )}
        </div>

        {error && <p className="font-app text-sm text-danger">{error}</p>}

        <Button type="submit" loading={loading} className="!h-[48px]">
          Registrar entrega
        </Button>
      </form>
    </Modal>
  )
}
