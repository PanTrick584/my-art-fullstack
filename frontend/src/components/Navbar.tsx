import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { useAuth } from '../api/AuthContext'
import type { Lang } from '../pages/Trophy'

const CATEGORIES: { value: string; label: string }[] = [
    { value: '', label: 'Wszystkie' },
    { value: 'drawing', label: 'Rysunek' },
    { value: 'painting', label: 'Malarstwo' },
    { value: 'photography', label: 'Fotografia' },
]

interface NavbarProps {
    trophyLang: Lang
    onToggleTrophyLang: () => void
}

function Navbar({ trophyLang, onToggleTrophyLang }: NavbarProps) {
    const { currentUser, logout } = useAuth()
    const location = useLocation()
    const activeCategory = new URLSearchParams(location.search).get('category') ?? ''
    const onHome = location.pathname === '/'
    const onTrophy = location.pathname === '/trophy'

    const [hidden, setHidden] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        function handleScroll() {
            const currentY = window.scrollY
            const scrollingDown = currentY > lastScrollY.current

            setHidden(scrollingDown && currentY > 80)
            lastScrollY.current = currentY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`${styles.nav} ${hidden ? styles.navHidden : ''}`}>
            <div className={styles.primary}>
                <Link to="/" className={styles.brand}>chodacki.art</Link>
                <Link to="/trophy">Trophy</Link>
            </div>

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
                {onTrophy && (
                    <button type="button" onClick={onToggleTrophyLang}>
                        {trophyLang === 'pl' ? 'EN' : 'PL'}
                    </button>
                )}
                {currentUser && (
                    <>
                        <Link to="/artworks">Prace</Link>
                        <button onClick={logout}>Wyloguj</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
