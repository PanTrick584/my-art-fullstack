import { Link } from 'react-router-dom'
import styles from './About.module.scss'
import { useLang } from '../api/LangContext'

const TEXTS = {
    heading1: { pl: 'O mnie', en: 'About me' },
    bio1: {
        pl: 'Ukończyłem Akademię Sztuk Pięknych w Krakowie, na Wydziale Grafiki, z dyplomem w pracowni rysunku. Zajmuję się rysunkiem oraz malarstwem abstrakcyjnym.',
        en: 'I graduated from the Academy of Fine Arts in Kraków, Faculty of Graphic Arts, with a diploma from the drawing studio. I work with drawing and abstract painting.',
    },
    bio2Before: {
        pl: 'Jednym z moich większych projektów jest',
        en: 'One of my bigger projects is',
    },
    bio2Link: { pl: 'Trofeum', en: 'Trophy' },
    bio2After: {
        pl: 'esej fotograficzny o pamięci, sile i symbolach dominacji.',
        en: 'a photographic essay about memory, power and symbols of domination.',
    },
    heading2: { pl: 'O projekcie (strona techniczna)', en: 'About the project (technical side)' },
    tech: {
        pl: 'Ta strona to portfolio zbudowane od podstaw: backend w czystym PHP (bez frameworka) z własnym routerem, warstwą Controller/Service/Repository i PostgreSQL, front w React + TypeScript. Konta użytkowników z rolami (user/admin) i workflow akceptacji — zwykli użytkownicy mogą dodawać prace, które trafiają do kolejki moderacji admina. Całość postawiona na Dockerze.',
        en: 'This site is a portfolio built from scratch: backend in plain PHP (no framework) with a custom router, a Controller/Service/Repository layer and PostgreSQL, frontend in React + TypeScript. User accounts with roles (user/admin) and an approval workflow — regular users can submit works that go into an admin moderation queue. Everything runs on Docker.',
    },
    hosting: {
        pl: 'Strona stoi na własnym VPS-ie, który sam skonfigurowałem od zera — Docker, nginx (w tym przekierowania i certyfikat SSL) i deployment całości.',
        en: 'The site runs on my own VPS, which I configured myself from scratch — Docker, nginx (including redirects and the SSL certificate) and deployment of the whole stack.',
    },
    repoLink: { pl: 'Kod źródłowy na GitHubie', en: 'Source code on GitHub' },
    demoIntro: {
        pl: 'Mechanizm można przetestować samodzielnie. Te odnośniki celowo nie są widoczne w głównym menu (żeby przypadkowe osoby nie zakładały tam kont) — trzeba wejść pod konkretny adres:',
        en: 'You can try the mechanism yourself. These links are intentionally not shown in the main menu (so random visitors don’t create accounts there) — you need to go to the specific address:',
    },
    demoRegister: { pl: 'załóż konto', en: 'create an account' },
    demoLogin: { pl: 'zaloguj się na nie', en: 'log into it' },
    demoOutro: {
        pl: 'Z poziomu konta możesz dodać swoją pracę. Nie pojawi się ona jednak od razu w galerii — trafia do kolejki moderacji i wymaga mojej (admina) akceptacji, zanim stanie się publicznie widocznym artworkiem.',
        en: 'From your account you can submit a work. It won’t appear in the gallery right away though — it goes into a moderation queue and requires my (admin) approval before it becomes a publicly visible artwork.',
    },
}

function About() {
    const { lang } = useLang()

    return (
        <div className={styles.page}>
            <section className={styles.section}>
                <h1>{TEXTS.heading1[lang]}</h1>
                <p>{TEXTS.bio1[lang]}</p>
                <p>
                    {TEXTS.bio2Before[lang]} <Link to="/trophy">{TEXTS.bio2Link[lang]}</Link> —{' '}
                    {TEXTS.bio2After[lang]}
                </p>
            </section>

            <section className={styles.section}>
                <h2>{TEXTS.heading2[lang]}</h2>
                <p>{TEXTS.tech[lang]}</p>
                <p>{TEXTS.hosting[lang]}</p>
                <p>{TEXTS.demoIntro[lang]}</p>
                <ul className={styles.demoList}>
                    <li>
                        <Link to="/register">/register</Link> — {TEXTS.demoRegister[lang]}
                    </li>
                    <li>
                        <Link to="/login">/login</Link> — {TEXTS.demoLogin[lang]}
                    </li>
                </ul>
                <p>{TEXTS.demoOutro[lang]}</p>
                <p>
                    <a href="https://github.com/PanTrick584/my-art-fullstack" target="_blank" rel="noreferrer">
                        {TEXTS.repoLink[lang]}
                    </a>
                </p>
            </section>
        </div>
    )
}

export default About
