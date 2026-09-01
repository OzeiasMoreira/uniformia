import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { loginInstituicao } from '../services/auth.service'
import { createInstitution } from '../services/institution.service'

export function useCadastroInstituicaoForm() {
  const navigate = useNavigate()
  const { login: setInstitutionSession } = useAuth()
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      await createInstitution({ name: nome, cnpj, senha })
      const { institution } = await loginInstituicao({ identificador: cnpj, senha })
      setInstitutionSession(institution)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível criar a conta.')
    } finally {
      setLoading(false)
    }
  }

  return {
    nome,
    setNome,
    cnpj,
    setCnpj,
    senha,
    setSenha,
    confirmarSenha,
    setConfirmarSenha,
    mostrarSenha,
    setMostrarSenha,
    loading,
    error,
    handleSubmit,
  }
}
