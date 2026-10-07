import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { clearToken } from '../services/token'
import type { Institution } from '../types/institution'
import { AuthContext, SESSION_STORAGE_KEY } from './authContextInstance'

function readStoredInstitution(): Institution | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Institution
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [institution, setInstitution] = useState<Institution | null>(readStoredInstitution)

  useEffect(() => {
    if (institution) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(institution))
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY)
    }
  }, [institution])

  function login(nextInstitution: Institution) {
    setInstitution(nextInstitution)
  }

  function logout() {
    setInstitution(null)
    clearToken()
  }

  return (
    <AuthContext.Provider value={{ institution, login, logout }}>{children}</AuthContext.Provider>
  )
}
