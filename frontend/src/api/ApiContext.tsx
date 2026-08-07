import { createContext, useContext, useMemo, type ReactNode } from 'react'

type ApiFetch = <T>(path: string, options?: RequestInit) => Promise<T>

const API_BASE = '/api'

const ApiContext = createContext<ApiFetch | null>(null)

export function ApiProvider({ children }: { children: ReactNode }) {
  const apiFetch = useMemo<ApiFetch>(() => {
    return async (path, options) => {
      const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      return response.json()
    }
  }, [])

  return <ApiContext.Provider value={apiFetch}>{children}</ApiContext.Provider>
}

export function useApiClient(): ApiFetch {
  const context = useContext(ApiContext)

  if (context === null) {
    throw new Error('useApiClient must be used within an ApiProvider')
  }

  return context
}
