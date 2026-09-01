import { createContext } from 'react'
import type { Institution } from '../types/institution'

export const SESSION_STORAGE_KEY = 'schoolclothes:institution'

export interface AuthContextValue {
  institution: Institution | null
  login: (institution: Institution) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
