import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { updateAluno } from '../../services/alunos'
import { getClassrooms } from '../../services/classroom.service'
import type { Aluno, UpdateAlunoInput } from '../../types/aluno'
import type { ClassroomOption } from '../../types/classroom'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'
import { Select } from '../ui/Select'

interface EditarAlunoModalProps {
  open: boolean
  aluno: Aluno
  onClose: () => void
  onSuccess: () => void
}

export function EditarAlunoModal({ open, aluno, onClose, onSuccess }: EditarAlunoModalProps) {
  const { institution } = useAuth()
  const institutionId = institution?.id ?? ''

  const [name, setName] = useState(aluno.name)
  const [enrollment, setEnrollment] = useState(aluno.enrollment)
  const [classroomId, setClassroomId] = useState(aluno.classroomId)
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [classrooms, setClassrooms] = useState<ClassroomOption[]>([])

  useEffect(() => {
    if (!open || !institutionId) return

    let active = true
    getClassrooms(institutionId)
      .then((result) => {
        if (active) setClassrooms(result)
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Não foi possível carregar as turmas.')
        }
      })

    return () => {
      active = false
    }
  }, [open, institutionId])

  const classroomOptions = classrooms.some((classroom) => classroom.id === aluno.classroomId)
    ? classrooms
    : [{ id: aluno.classroom.id, name: aluno.classroom.name }, ...classrooms]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!institutionId) return

    setError(null)

    const input: UpdateAlunoInput = {}
    if (name !== aluno.name) input.name = name
    if (enrollment !== aluno.enrollment) input.enrollment = enrollment
    if (classroomId !== aluno.classroomId) input.classroomId = classroomId
    if (senha) input.senha = senha

    if (Object.keys(input).length === 0) {
      onClose()
      return
    }

    setLoading(true)
    try {
      await updateAluno(institutionId, aluno.id, input)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível atualizar o aluno.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar aluno">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nome"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="!h-[48px] border border-[#e0e0e0] !text-sm"
          required
        />
        <Input
          label="Matrícula"
          name="enrollment"
          value={enrollment}
          onChange={(event) => setEnrollment(event.target.value)}
          className="!h-[48px] border border-[#e0e0e0] !text-sm"
          required
        />

        <Select
          label="Turma"
          name="classroomId"
          value={classroomId}
          onChange={(event) => setClassroomId(event.target.value)}
        >
          {classroomOptions.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.name}
            </option>
          ))}
        </Select>

        <Input
          label="Nova senha (deixe vazio para manter)"
          name="senha"
          type="password"
          autoComplete="new-password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          className="!h-[48px] border border-[#e0e0e0] !text-sm"
        />

        {error && <p className="font-app text-sm text-danger">{error}</p>}

        <Button type="submit" loading={loading} className="!h-[48px]">
          Salvar alterações
        </Button>
      </form>
    </Modal>
  )
}
