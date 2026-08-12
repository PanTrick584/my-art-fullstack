import styles from './Home.module.scss'
import { useApi } from '../hooks/useApi'

interface HelloResponse {
  message: string
}

function Home() {
  const { data, loading, error } = useApi<HelloResponse>('/hello')

  const text = error ? `Błąd: ${error}` : loading ? 'Ładowanie...' : data?.message

  return <h1 className={styles.heading}>{text}</h1>
}

export default Home
