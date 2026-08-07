import { useEffect, useState } from 'react'
import { useApiClient } from '../api/ApiContext'

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(path: string): UseApiResult<T> {
  const apiFetch = useApiClient()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    apiFetch<T>(path, { signal: controller.signal })
      .then((result) => setData(result))
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [path, apiFetch])

  return { data, loading, error }
}
