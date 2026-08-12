import { useState, type FormEvent } from 'react'
import styles from './Admin.module.scss'
import { useApiClient } from '../api/ApiContext'

interface ArtworkFormState {
  name: string
  category: 'drawing' | 'painting' | 'photography'
  dimensions: string
  yearOfCreation: string
  price: string
}

const initialState: ArtworkFormState = {
  name: '',
  category: 'drawing',
  dimensions: '',
  yearOfCreation: '',
  price: '',
}

function Admin() {
  const apiFetch = useApiClient()
  const [form, setForm] = useState<ArtworkFormState>(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: keyof ArtworkFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      await apiFetch('/artworks', {
        method: 'POST',
        body: JSON.stringify({ ...form, images: [] }),
      })
      setForm(initialState)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nieznany błąd')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Dodaj pracę</h1>

      <label className={styles.field}>
        Nazwa
        <input value={form.name} onChange={handleChange('name')} required />
      </label>

      <label className={styles.field}>
        Kategoria
        <select value={form.category} onChange={handleChange('category')}>
          <option value="drawing">Rysunek</option>
          <option value="painting">Obraz</option>
          <option value="photography">Fotografia</option>
        </select>
      </label>

      <label className={styles.field}>
        Wymiary
        <input value={form.dimensions} onChange={handleChange('dimensions')} required />
      </label>

      <label className={styles.field}>
        Rok powstania
        <input value={form.yearOfCreation} onChange={handleChange('yearOfCreation')} required />
      </label>

      <label className={styles.field}>
        Cena
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange('price')}
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Wysyłanie...' : 'Dodaj'}
      </button>

      {error && <p role="alert">Błąd: {error}</p>}
      {success && <p>Dodano pracę.</p>}
    </form>
  )
}

export default Admin
