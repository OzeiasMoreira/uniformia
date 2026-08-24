import { useEffect, useState } from 'react'

interface UseAsyncDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useAsyncData<T>(fetcher: () => Promise<T>): UseAsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (active) setData(result)
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar os dados.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // executa apenas na montagem: fetcher é recriado a cada render pelo chamador
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error }
}
