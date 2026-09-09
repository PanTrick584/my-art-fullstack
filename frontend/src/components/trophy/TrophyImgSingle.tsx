import styles from './TrophyImgSingle.module.scss'

interface TrophyImgSingleProps {
    src: string
    second?: boolean
    onOpen: (src: string) => void
}

function TrophyImgSingle({ src, second, onOpen }: TrophyImgSingleProps) {
    return (
        <div
            className={`${styles.single} ${second ? styles.second : ''}`}
            onClick={() => onOpen(`/uploads/trophy/${src}`)}
        >
            <img src={`/uploads/trophy/${src}`} alt="" loading="lazy" />
        </div>
    )
}

export default TrophyImgSingle
