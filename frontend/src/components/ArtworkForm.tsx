import { useEffect, useMemo, useState, type FormEvent } from 'react'
import styles from './ArtworkForm.module.scss'
import { useApiClient } from '../api/ApiContext'
import type { Artwork, ArtworkFormType, Image } from '../types/artwork'
import Lightbox from './Lightbox'

interface InitialValueType {
    initialValue: ArtworkFormType,
    handler: (form: ArtworkFormType) => Promise<Artwork>,
    componentState: 'add' | 'edit',
    existingImages?: Image[]
}

const TEXT = {
    add: {
        title: 'Dodaj pracę',
        submitButton: 'Dodaj',
        successMessage: 'Dodano pracę!'
    },
    edit: {
        title: 'Edytuj pracę',
        submitButton: 'Edytuj',
        successMessage: 'Praca zaktualizowana!'
    }
} as const;

function ArtworkForm({ initialValue, handler, componentState, existingImages }: InitialValueType) {
    const initialState: ArtworkFormType = {
        name: initialValue.name,
        category: initialValue.category,
        dimensions: initialValue.dimensions,
        yearOfCreation: initialValue.yearOfCreation,
        price: initialValue.price,
    }
    const text = TEXT;

    const apiFetch = useApiClient()
    const [form, setForm] = useState<ArtworkFormType>(initialState)
    const [images, setImages] = useState<File[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [lightbox, setLightbox] = useState<number | null>(null)
    const [currentImages, setCurrentImages] = useState<Image[] | undefined>(existingImages)

    const previewUrls = useMemo(() => images.map((file) => URL.createObjectURL(file)), [images])

    useEffect(() => {
        return () => previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }, [previewUrls])

    const handleChange = (field: keyof ArtworkFormType) => (
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
            const artwork = await handler(form);

            if (images.length > 0) {
                const formData = new FormData()
                formData.append('artworkId', String(artwork.id))
                images.forEach((file) => formData.append('images[]', file))

                const result = await apiFetch<{ message: string; images: Image[] }>('/images/bulk', {
                    method: 'POST',
                    body: formData,
                })

                setCurrentImages((prev) => [...(prev ?? []), ...result.images])

                await apiFetch('/images/bulk', {
                    method: 'POST',
                    body: formData,
                })
            }

            const removedImages = existingImages?.filter(
                (original) => !currentImages?.some((current) => current.id === original.id)
            ) ?? []

            if (removedImages.length > 0) {
                await Promise.all(
                    removedImages.map((image) => apiFetch(`/images?id=${image.id}`, { method: 'DELETE' }))
                )
            }

            setForm(componentState === 'add' ? initialState : artwork);
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
            <h1>{text[componentState].title}</h1>

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

            <div className={styles.thumbnails}>
                {currentImages?.map((image, index) => (
                    <div className={styles.thumbnailWrapper} key={`saved-${index}`}>
                        <img
                            className={styles.thumbnail}
                            src={image.url}
                            onClick={() => setLightbox(index)}
                        />
                        <button
                            type="button"
                            className={styles.deleteButton}
                            aria-label="Usuń zdjęcie"
                            onClick={(event) => {
                                event.stopPropagation()
                                setCurrentImages(prev => prev?.filter(imgItem => imgItem.id !== image.id))
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
                {previewUrls.map((url, index) => (
                    <img className={styles.thumbnail} src={url} key={`preview-${index}`} />
                ))}
            </div>
            {!currentImages?.length ?
                '' :
                lightbox !== null && <Lightbox
                    images={currentImages?.map(i => i.url) ?? []}
                    title={form.name}
                    startIndex={lightbox ?? 0}
                    onClose={() => setLightbox(null)}
                />}
            <button type="submit" disabled={submitting}>
                {submitting ? 'Wysyłanie...' : text[componentState].submitButton}
            </button>

            {error && <p role="alert">Błąd: {error}</p>}
            {success && <p>{text[componentState].successMessage}</p>}
        </form>
    )
}

export default ArtworkForm
