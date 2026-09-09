import styles from './Footer.module.scss'

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.small}>created by</p>
            <h3 className={styles.header}>Patryk Chodacki</h3>
            <ul className={styles.list}>
                <li><a href="mailto:chodacki.pc@gmail.com">chodacki.pc@gmail.com</a></li>
                <li><a href="https://www.instagram.com/chodackipatryk/" target="_blank" rel="noreferrer">instagram@chodackipatryk</a></li>
            </ul>
        </footer>
    )
}

export default Footer
