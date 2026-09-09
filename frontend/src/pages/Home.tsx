import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Home.module.scss'
import { useApi } from '../hooks/useApi'
import type { Artwork } from '../types/artwork'
import GalleryTile from '../components/GalleryTile'
import Lightbox from '../components/Lightbox'

function Home() {
    const { data: artworks, loading, error } = useApi<Artwork[]>('/artworks')
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const visibleArtworks = (artworks ?? [])
        .filter((artwork) => artwork.images.length > 0)
        .filter((artwork) => !category || artwork.category === category)
    const [lightbox, setLightbox] = useState<{ artwork: Artwork; startIndex: number } | null>(null)

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
                    artwork={lightbox.artwork}
                    startIndex={lightbox.startIndex}
                    onClose={() => setLightbox(null)}
                />
            )}
        </div>
    )
}

export default Home
