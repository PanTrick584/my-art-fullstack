import styles from './TrophySectionText.module.scss'

function TrophySectionText({ text }: { text: string }) {
    return <p className={styles.text}>{text}</p>
}

export default TrophySectionText
