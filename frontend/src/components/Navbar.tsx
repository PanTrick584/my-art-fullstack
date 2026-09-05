import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { useAuth } from '../api/AuthContext'

const CATEGORIES: { value: string; label: string }[] = [
    { value: '', label: 'Wszystkie' },
    { value: 'drawing', label: 'Rysunek' },
    { value: 'painting', label: 'Malarstwo' },
    { value: 'photography', label: 'Fotografia' },
]

function Navbar() {
    const { currentUser, logout } = useAuth()
    const location = useLocation()
    const activeCategory = new URLSearchParams(location.search).get('category') ?? ''
    const onHome = location.pathname === '/'

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.brand}>Mad.Art</Link>

            {onHome && (
                <div className={styles.categories}>
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.value}
                            to={category.value ? `/?category=${category.value}` : '/'}
                            className={activeCategory === category.value ? styles.categoryActive : undefined}
                        >
                            {category.label}
                        </Link>
                    ))}
                </div>
            )}

            <div className={styles.links}>
                {currentUser ? (
                    <>
                        <Link to="/artworks">Prace</Link>
                        <button onClick={logout}>Wyloguj</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Zaloguj</Link>
                        <Link to="/register">Zarejestruj</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
