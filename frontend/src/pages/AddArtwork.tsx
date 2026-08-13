import { useState, type FormEvent } from 'react'
import styles from './AddArtwork.module.scss'
import { useApiClient } from '../api/ApiContext'

interface ArtworkFormState {
  name: string
  category: 'drawing' | 'painting' | 'photography'
  dimensions: string
  yearOfCreation: string
  price: string
}

interface ArtworkResponse {
  id: number
}

const initialState: ArtworkFormState = {
  name: '',
  category: 'drawing',
  dimensions: '',
  yearOfCreation: '',
  price: '',
}

function AddArtwork() {
  const apiFetch = useApiClient()
  const [form, setForm] = useState<ArtworkFormState>(initialState)
  const [images, setImages] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: keyof ArtworkFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files ? Array.from(event.target.files) : [])
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const artwork = await apiFetch<ArtworkResponse>('/artworks', {
        method: 'POST',
        body: JSON.stringify({ ...form, images: [] }),
      })

      if (images.length > 0) {
        const formData = new FormData()
        formData.append('artworkId', String(artwork.id))
        images.forEach((file) => formData.append('images[]', file))

        await apiFetch('/images/bulk', {
          method: 'POST',
          body: formData,
        })
      }

      setForm(initialState)
      setImages([])
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

      <label className={styles.field}>
        Zdjęcia
        <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
      </label>
      {images.length > 0 && <p>Wybrano {images.length} plik(ów).</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Wysyłanie...' : 'Dodaj'}
      </button>

      {error && <p role="alert">Błąd: {error}</p>}
      {success && <p>Dodano pracę.</p>}
    </form>
  )
}

export default AddArtwork
