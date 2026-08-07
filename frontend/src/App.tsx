import styles from './App.module.scss'
import { useApi } from './hooks/useApi'

interface HelloResponse {
  message: string
}

function App() {
  const { data, loading, error } = useApi<HelloResponse>('/hello')

  const text = error ? `Błąd: ${error}` : loading ? 'Ładowanie...' : data?.message

  return <h1 className={styles.heading}>{text}</h1>
}

export default App
