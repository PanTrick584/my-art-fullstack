import { useState, type MouseEvent } from 'react'
import styles from './GalleryTile.module.scss'
import type { Artwork } from '../types/artwork'

interface GalleryTileProps {
    artwork: Artwork
    onOpen: (artwork: Artwork, startIndex: number) => void
}

function GalleryTile({ artwork, onOpen }: GalleryTileProps) {
    const [index, setIndex] = useState(0)
    const hasMultiple = artwork.images.length > 1

    function showPrev(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()
        setIndex((prev) => (prev - 1 + artwork.images.length) % artwork.images.length)
    }

    function showNext(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()
        setIndex((prev) => (prev + 1) % artwork.images.length)
    }

    return (
        <div className={styles.item} onClick={() => onOpen(artwork, index)}>
            <img src={artwork.images[index]} alt={artwork.name} loading="lazy" />

            {hasMultiple && (
                <>
                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={showPrev}
                        aria-label="Poprzednie zdjęcie"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={showNext}
                        aria-label="Następne zdjęcie"
                    >
                        ›
                    </button>
                </>
            )}

            <div className={styles.overlay}>
                <span>{artwork.name}</span>
            </div>
        </div>
    )
}

export default GalleryTile
