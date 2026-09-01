import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { createClassroom } from '../../services/classroom.service'
import { createStudent } from '../../services/student.service'
import type { StudentSummary } from '../../types/student'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

interface CadastroAlunoModalProps {
  open: boolean
  onClose: () => void
}

export function CadastroAlunoModal({ open, onClose }: CadastroAlunoModalProps) {
  const { institution } = useAuth()

  const [turmaNome, setTurmaNome] = useState('')
  const [turmaId, setTurmaId] = useState('')
  const [turmaLoading, setTurmaLoading] = useState(false)
  const [turmaError, setTurmaError] = useState<string | null>(null)
  const [turmaCriada, setTurmaCriada] = useState<string | null>(null)

  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [alunoLoading, setAlunoLoading] = useState(false)
  const [alunoError, setAlunoError] = useState<string | null>(null)
  const [alunoCriado, setAlunoCriado] = useState<StudentSummary | null>(null)

  async function handleCriarTurma(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!institution) return

    setTurmaError(null)
    setTurmaLoading(true)
    try {
      const classroom = await createClassroom(institution.id, { name: turmaNome })
      setTurmaId(classroom.id)
      setTurmaCriada(classroom.name)
    } catch (err) {
      setTurmaError(err instanceof Error ? err.message : 'Não foi possível criar a turma.')
    } finally {
      setTurmaLoading(false)
    }
  }

  async function handleCadastrarAluno(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!institution) return

    setAlunoError(null)
    setAlunoLoading(true)
    try {
      const student = await createStudent(institution.id, {
        name: nome,
        enrollment: matricula,
        senha,
        classroomId: turmaId,
      })
      setAlunoCriado(student)
      setNome('')
      setMatricula('')
      setSenha('')
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
      <div className="flex flex-col gap-8">
        <form onSubmit={handleCriarTurma} className="flex flex-col gap-4">
          <p className="font-app text-sm font-semibold text-navy">1. Turma</p>

          <Input
            label="Nome da turma"
            name="turmaNome"
            placeholder="1º Ano A"
            value={turmaNome}
            onChange={(event) => setTurmaNome(event.target.value)}
            className="!h-[48px] !text-sm"
            required
          />

          <Input
            label="ID da turma (preenchido automaticamente ao criar)"
            name="turmaId"
            placeholder="UUID da turma"
            value={turmaId}
            onChange={(event) => setTurmaId(event.target.value)}
            className="!h-[48px] !text-sm"
          />

          {turmaError && <p className="font-app text-sm text-danger">{turmaError}</p>}
          {turmaCriada && (
            <p className="font-app text-sm text-navy">Turma "{turmaCriada}" criada.</p>
          )}

          <Button type="submit" loading={turmaLoading} className="!h-[48px]">
            Criar turma
          </Button>
        </form>

        <form onSubmit={handleCadastrarAluno} className="flex flex-col gap-4 border-t border-[#f0f0f0] pt-6">
          <p className="font-app text-sm font-semibold text-navy">2. Aluno</p>

          <Input
            label="Nome do aluno"
            name="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="!h-[48px] !text-sm"
            required
          />
          <Input
            label="Matrícula"
            name="matricula"
            value={matricula}
            onChange={(event) => setMatricula(event.target.value)}
            className="!h-[48px] !text-sm"
            required
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            className="!h-[48px] !text-sm"
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
