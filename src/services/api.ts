import axios from 'axios'
import { clearToken, getToken } from './token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export interface ApiErrorResponse {
  message: string
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      if (!error.response) {
        return Promise.reject(
          new ApiError(0, 'Não foi possível conectar ao servidor. Verifique se a API está rodando.'),
        )
      }

      const status = error.response.status

      if (status === 401) {
        clearToken()
      }

      const message = error.response.data?.message ?? 'Não foi possível completar a requisição.'
      return Promise.reject(new ApiError(status, message))
    }

    return Promise.reject(error)
  },
)
