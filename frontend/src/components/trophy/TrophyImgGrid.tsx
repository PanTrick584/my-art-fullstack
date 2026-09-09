import styles from './TrophyImgGrid.module.scss'

interface TrophyImgGridProps {
    images: string[]
    order: number
    onOpen: (src: string) => void
}

function TrophyImgGrid({ images, order, onOpen }: TrophyImgGridProps) {
    const gridClass = (styles as Record<string, string>)[`grid${order}`]

    return (
        <div className={`${styles.grid} ${gridClass}`}>
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`${styles.imageBox} image-box-${index}`}
                    onClick={() => onOpen(`/uploads/trophy/${src}`)}
                >
                    <img src={`/uploads/trophy/${src}`} alt="" loading="lazy" />
                </div>
            ))}
        </div>
    )
}

export default TrophyImgGrid
