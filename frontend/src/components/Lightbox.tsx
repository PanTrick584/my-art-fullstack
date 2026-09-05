import { useEffect, useState, type MouseEvent } from 'react'
import styles from './Lightbox.module.scss'
import type { Artwork } from '../types/artwork'

interface LightboxProps {
    artwork: Artwork
    startIndex: number
    onClose: () => void
}

function Lightbox({ artwork, startIndex, onClose }: LightboxProps) {
    const [index, setIndex] = useState(startIndex)
    const hasMultiple = artwork.images.length > 1

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    function showPrev(event: MouseEvent) {
        event.stopPropagation()
        setIndex((prev) => (prev - 1 + artwork.images.length) % artwork.images.length)
    }

    function showNext(event: MouseEvent) {
        event.stopPropagation()
        setIndex((prev) => (prev + 1) % artwork.images.length)
    }

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <img
                className={styles.image}
                src={artwork.images[index]}
                alt={artwork.name}
                onClick={(event) => event.stopPropagation()}
            />

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

            <button type="button" className={styles.close} onClick={onClose} aria-label="Zamknij">
                ×
            </button>

            <div className={styles.caption} onClick={(event) => event.stopPropagation()}>
                {artwork.name}
            </div>
        </div>
    )
}

export default Lightbox
