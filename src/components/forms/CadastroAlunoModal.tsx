import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { createClassroom, getClassrooms } from '../../services/classroom.service'
import { createStudent } from '../../services/student.service'
import type { ClassroomOption } from '../../types/classroom'
import type { StudentSummary } from '../../types/student'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'
import { Select } from '../ui/Select'

interface CadastroAlunoModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CadastroAlunoModal({ open, onClose, onSuccess }: CadastroAlunoModalProps) {
  const { institution } = useAuth()
  const institutionId = institution?.id ?? ''

  const [turmas, setTurmas] = useState<ClassroomOption[]>([])
  const [turmaId, setTurmaId] = useState('')
  const [turmaNome, setTurmaNome] = useState('')
  const [turmaLoading, setTurmaLoading] = useState(false)
  const [turmaError, setTurmaError] = useState<string | null>(null)
  const [turmaCriada, setTurmaCriada] = useState<string | null>(null)

  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [alunoLoading, setAlunoLoading] = useState(false)
  const [alunoError, setAlunoError] = useState<string | null>(null)
  const [alunoCriado, setAlunoCriado] = useState<StudentSummary | null>(null)

  useEffect(() => {
    if (!open || !institutionId) return

    let active = true
    getClassrooms(institutionId)
      .then((result) => {
        if (active) setTurmas(result)
      })
      .catch((err: unknown) => {
        if (active) {
          setTurmaError(err instanceof Error ? err.message : 'Não foi possível carregar as turmas.')
        }
      })

    return () => {
      active = false
    }
  }, [open, institutionId])

  async function handleCriarTurma(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!institutionId) return

    setTurmaError(null)
    setTurmaCriada(null)
    setTurmaLoading(true)
    try {
      const classroom = await createClassroom(institutionId, { name: turmaNome })
      setTurmas((current) => [...current, { id: classroom.id, name: classroom.name }])
      setTurmaId(classroom.id)
      setTurmaCriada(classroom.name)
      setTurmaNome('')
    } catch (err) {
      setTurmaError(err instanceof Error ? err.message : 'Não foi possível criar a turma.')
    } finally {
      setTurmaLoading(false)
    }
  }

  async function handleCadastrarAluno(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!institutionId) return

    setAlunoError(null)
    setAlunoCriado(null)
    setAlunoLoading(true)
    try {
      const student = await createStudent(institutionId, {
        name: nome,
        enrollment: matricula,
        senha,
        classroomId: turmaId,
      })
      setAlunoCriado(student)
      setNome('')
      setMatricula('')
      setSenha('')
      onSuccess?.()
    } catch (err) {
      setAlunoError(err instanceof Error ? err.message : 'Não foi possível cadastrar o aluno.')
    } finally {
      setAlunoLoading(false)
    }
  }

  if (!institution) {
    return (
      <Modal open={open} onClose={onClose} title="Cadastrar aluno">
        <p className="font-app text-sm text-text-muted">
          Você precisa estar logado como instituição para cadastrar alunos.
        </p>
      </Modal>
    )
  }

  return (
    <Modal open={open} onClose={onClose} title="Cadastrar aluno">
      <div className="flex max-h-[70vh] flex-col gap-8 overflow-y-auto pr-1">
        <div className="flex flex-col gap-4">
          <p className="font-app text-sm font-semibold text-navy">1. Turma</p>

          <Select
            label="Turma do aluno"
            name="turmaId"
            value={turmaId}
            onChange={(event) => setTurmaId(event.target.value)}
          >
            <option value="">Selecione uma turma...</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.name}
              </option>
            ))}
          </Select>

          <form onSubmit={handleCriarTurma} className="flex flex-col gap-3">
            <Input
              label="Ou crie uma nova turma"
              name="turmaNome"
              placeholder="1º Ano A"
              value={turmaNome}
              onChange={(event) => setTurmaNome(event.target.value)}
              className="!h-[48px] border border-[#e0e0e0] !text-sm"
              required
            />

            {turmaError && <p className="font-app text-sm text-danger">{turmaError}</p>}
            {turmaCriada && (
              <p className="font-app text-sm text-navy">Turma "{turmaCriada}" criada e selecionada.</p>
            )}

            <Button type="submit" loading={turmaLoading} className="!h-[48px]">
              Criar turma
            </Button>
          </form>
        </div>

        <form
          onSubmit={handleCadastrarAluno}
          className="flex flex-col gap-4 border-t border-[#f0f0f0] pt-6"
        >
          <p className="font-app text-sm font-semibold text-navy">2. Aluno</p>

          <Input
            label="Nome do aluno"
            name="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="!h-[48px] border border-[#e0e0e0] !text-sm"
            required
          />
          <Input
            label="Matrícula"
            name="matricula"
            value={matricula}
            onChange={(event) => setMatricula(event.target.value)}
            className="!h-[48px] border border-[#e0e0e0] !text-sm"
            required
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            className="!h-[48px] border border-[#e0e0e0] !text-sm"
            required
          />

          {alunoError && <p className="font-app text-sm text-danger">{alunoError}</p>}
          {alunoCriado && (
            <p className="font-app text-sm text-navy">
              Aluno "{alunoCriado.name}" cadastrado (matrícula {alunoCriado.enrollment}).
            </p>
          )}

          <Button type="submit" loading={alunoLoading} disabled={!turmaId} className="!h-[48px]">
            Cadastrar aluno
          </Button>
        </form>
      </div>
    </Modal>
  )
}
