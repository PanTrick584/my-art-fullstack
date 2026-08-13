import { Link } from 'react-router-dom'
import styles from './Admin.module.scss'
import { useApi } from '../hooks/useApi'

interface Artwork {
  id: number
  name: string
  category: string
  dimensions: string
  yearOfCreation: string
  price: string
}

function Admin() {
  const { data: artworks, loading, error } = useApi<Artwork[]>('/artworks')

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Prace</h1>
        <Link to="/admin/add-artwork">Dodaj nową pracę</Link>
      </div>

      {loading && <p>Ładowanie...</p>}
      {error && <p role="alert">Błąd: {error}</p>}

      {artworks && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Kategoria</th>
              <th>Wymiary</th>
              <th>Rok</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id}>
                <td>{artwork.name}</td>
                <td>{artwork.category}</td>
                <td>{artwork.dimensions}</td>
                <td>{artwork.yearOfCreation}</td>
                <td>{artwork.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Admin
