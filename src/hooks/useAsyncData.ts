import { useCallback, useEffect, useState } from 'react'

interface UseAsyncDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

interface SettledRequest<T> {
  fetcher: () => Promise<T>
  trigger: number
  data: T | null
  error: string | null
}

// O fetcher deve ter referência estável (função de módulo ou useCallback),
// pois uma nova referência dispara uma nova requisição.
export function useAsyncData<T>(fetcher: () => Promise<T>): UseAsyncDataResult<T> {
  const [settled, setSettled] = useState<SettledRequest<T> | null>(null)
  const [trigger, setTrigger] = useState(0)

  const refetch = useCallback(() => {
    setTrigger((previous) => previous + 1)
  }, [])

  useEffect(() => {
    let active = true

    fetcher()
      .then((data) => {
        if (active) setSettled({ fetcher, trigger, data, error: null })
      })
      .catch((err: unknown) => {
        if (active) {
          setSettled({
            fetcher,
            trigger,
            data: null,
            error: err instanceof Error ? err.message : 'Não foi possível carregar os dados.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [fetcher, trigger])

  const isCurrent = settled !== null && settled.fetcher === fetcher && settled.trigger === trigger

  return {
    data: settled?.data ?? null,
    loading: !isCurrent,
    error: isCurrent ? settled.error : null,
    refetch,
  }
}
