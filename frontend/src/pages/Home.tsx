import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Home.module.scss'
import { useApi } from '../hooks/useApi'
import type { Artwork } from '../types/artwork'
import GalleryTile from '../components/GalleryTile'
import Lightbox from '../components/Lightbox'

function shuffle<T>(items: T[]): T[] {
    const result = [...items]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
}

function sortByYearThenId(a: Artwork, b: Artwork): number {
    const yearA = Number(a.yearOfCreation)
    const yearB = Number(b.yearOfCreation)
    const hasYearA = a.yearOfCreation !== '' && !Number.isNaN(yearA)
    const hasYearB = b.yearOfCreation !== '' && !Number.isNaN(yearB)

    if (hasYearA && hasYearB) return yearB - yearA
    if (hasYearA) return -1
    if (hasYearB) return 1
    return b.id - a.id
}

function Home() {
    const { data: artworks, loading, error } = useApi<Artwork[]>('/artworks')
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [lightbox, setLightbox] = useState<{ artwork: Artwork; startIndex: number } | null>(null)

    // Shuffled once per fetch, so the order stays stable across re-renders
    // (e.g. opening the lightbox) instead of jumping around.
    const shuffledArtworks = useMemo(
        () => shuffle((artworks ?? []).filter((artwork) => artwork.images.length > 0)),
        [artworks],
    )

    const visibleArtworks = category
        ? shuffledArtworks
              .filter((artwork) => artwork.category === category)
              .sort(sortByYearThenId)
        : shuffledArtworks

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Patryk Chodacki</h1>
                <p>rysunek malarstwo fotografia</p>
            </header>

            {loading && <p className={styles.status}>Ładowanie...</p>}
            {error && <p className={styles.status} role="alert">Błąd: {error}</p>}
            {!loading && !error && visibleArtworks.length === 0 && (
                <p className={styles.status}>Brak prac do wyświetlenia.</p>
            )}

            <div className={styles.grid}>
                {visibleArtworks.map((artwork) => (
                    <GalleryTile
                        key={artwork.id}
                        artwork={artwork}
                        onOpen={(artwork, startIndex) => setLightbox({ artwork, startIndex })}
                    />
                ))}
            </div>

            {lightbox && (
                <Lightbox
                    images={lightbox.artwork.images}
                    title={lightbox.artwork.name}
                    startIndex={lightbox.startIndex}
                    onClose={() => setLightbox(null)}
                />
            )}
        </div>
    )
}

export default Home
