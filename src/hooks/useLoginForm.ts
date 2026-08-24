import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'
import type { LoginTipo } from '../types/auth'

export function useLoginForm(tipo: LoginTipo) {
  const navigate = useNavigate()
  const [identificador, setIdentificador] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(tipo, { identificador, senha })
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return {
    identificador,
    setIdentificador,
    senha,
    setSenha,
    mostrarSenha,
    setMostrarSenha,
    loading,
    error,
    handleSubmit,
  }
}
