import { useState } from 'react'
import styles from './Trophy.module.scss'
import TrophySectionText from '../components/trophy/TrophySectionText'
import TrophyImgGrid from '../components/trophy/TrophyImgGrid'
import TrophyImgSingle from '../components/trophy/TrophyImgSingle'
import Lightbox from '../components/Lightbox'

export type Lang = 'pl' | 'en'

const TEXTS: Record<string, Record<Lang, string>> = {
    title: { pl: 'Trofeum', en: 'Trophy' },
    text_1: {
        pl: '...to upamiętnienie sukcesu, zachowana pamięć emocji w momencie triumfu. Niezależnie czy powieszone na ścianie, postawione na półce czy sfotografowane — stanowi symbol dominacji i przewagi.',
        en: 'It is a commemoration of success, a preserved memory of emotions at the moment of triumph. Whether hung on the wall, placed on a shelf or photographed — it is a symbol of domination and advantage.',
    },
    text_2: {
        pl: 'Mój dziadek zabrał swoich synów do fotografa, żeby zrobić zdjęcie złowionemu sandaczowi. Fotografie również stały się trofeum. Z mieszkania dziadków pamiętam ściany przedpokoju pełne wysuszonych, rybich głów. Dla mnie szczerzące się, rozwarte paszcze stada wodnych bestii — dla dziadka pamiątki dokonań, dokumentacja osiągnięć.',
        en: "My grandfather took his sons to a photographer to take a photo of a zander he caught. Photographs also became a trophy. From my grandparents' apartment I remember hallway walls full of dried fish heads. For me, the grinning, gaping mouths of water beasts — for my grandfather, souvenirs of achievement.",
    },
    text_3: {
        pl: 'Kiedyś pokonanie dzikiego zwierzęcia było nie tylko manifestacją siły, a także koniecznym środkiem do przeżycia. Zjadano je i zdobiono się biżuterią wykonaną ze szczątków — przypisywano jej mistyczne właściwości. Pokonując dzikie zwierzę, człowiek udowadniał odwagę i zdolność do zapewnienia pożywienia, dominację nad stworzeniami natury.',
        en: 'Defeating a wild animal was once not only a manifestation of strength, but a necessary means of survival. Animals were eaten and their remains worn as jewelry believed to hold mystical properties. By defeating a wild animal, man proved his courage and dominance over the creatures of nature.',
    },
    text_4: {
        pl: 'Patrząc martwemu zwierzęciu w ślepia — choćby sztuczne — mierzymy się z nim nawet po śmierci, oddajemy mu szacunek. W przeciwieństwie do tego, czaszka pozbawiona oczu staje się upokorzeniem przeciwnika, pozbawieniem go twarzy i wyzywającego spojrzenia. W języku zrodził się strach przed dzikością i bestią.',
        en: "Looking a dead animal in the eyes — even artificial ones — we face it even after death, paying it respect. A skull without eyes, in contrast, becomes a humiliation of the opponent, stripped of its face and defiant gaze.",
    },
    text_5: {
        pl: 'W przeciwieństwie do człowieka zwierzę bez świadomości śmierci jest w pewien sposób nieśmiertelne. Istotne pytanie dotyczy więc nie samej śmierci zwierzęcia, lecz cierpienia, które wydaje się tak niekonieczne. Dziś polowanie to nic więcej jak teatr okrucieństwa z mordowaniem za kulisami — skryte przed oczami widzów.',
        en: 'Unlike humans, an animal without awareness of death is in a way immortal. The real question is not the death itself, but the suffering that seems so unnecessary. Today, hunting is little more than a theatre of cruelty, its killing hidden behind the scenes.',
    },
}

const grids: { images: string[]; order: number }[] = [
    { images: ['grand-1.jpg', 'grand-2.jpg', 'grand-3.jpg', 'grand-4.jpg'], order: 1 },
    { images: ['fish-1.jpg', 'fish-2.jpg', 'fish-3.jpg', 'fish-4.jpg', 'fish-8.jpg'], order: 2 },
    { images: ['fish-6.jpg', 'fish-7.jpg', 'fish-5.jpg'], order: 3 },
    {
        images: [
            'museum-pic-0-1.jpg', 'found-28.jpg', 'museum-pic-3-1.jpg', 'museum-pic-8-1.jpg',
            'found-16.jpg', 'museum-pic-4-1.jpg', 'found-2.jpg', 'museum-pic-5-1.jpg',
            'museum-pic-7-1.jpg', 'museum-pic-1-1.jpg',
        ],
        order: 4,
    },
    { images: ['found-5.jpg', 'piwnica-7.jpg', 'found-9.jpg', 'piwnica-1a.jpg'], order: 6 },
    { images: ['piwnica-9.jpg', 'piwnica-2a.jpg', 'found-6.jpg', 'found-8.jpg'], order: 7 },
    { images: ['found-19.jpg', 'found-18.jpg', 'found-1.jpg'], order: 8 },
    { images: ['found-13.jpg', 'found-15.jpg', 'found-25.jpg'], order: 9 },
    { images: ['found-29.jpg', 'piwnica-8.jpg', 'found-26.jpg', 'museum-pic-2-1.jpg'], order: 10 },
    { images: ['found-22.jpg', 'found-12.jpg', 'found-17.jpg'], order: 11 },
    { images: ['piwnica-6.jpg', 'found-21.jpg', 'found-23.jpg'], order: 12 },
]

function Trophy({ lang }: { lang: Lang }) {
    const [lightbox, setLightbox] = useState<string | null>(null)

    function t(key: keyof typeof TEXTS) {
        return TEXTS[key][lang]
    }

    return (
        <div className={styles.wrapper}>
        <div className={styles.page}>
            <div className={styles.hero}>
                <img src="/uploads/trophy/header-1.jpg" alt="" />
                <h1 className={styles.heroTitle}>{t('title')}</h1>
            </div>

            <div className={styles.main}>
                <TrophySectionText text={t('text_1')} />
                <TrophyImgGrid images={grids[0].images} order={grids[0].order} onOpen={setLightbox} />

                <TrophySectionText text={t('text_2')} />
                <TrophyImgGrid images={grids[1].images} order={grids[1].order} onOpen={setLightbox} />
                <TrophyImgGrid images={grids[2].images} order={grids[2].order} onOpen={setLightbox} />

                <TrophySectionText text={t('text_3')} />
                <TrophyImgSingle src="header-2.jpg" onOpen={setLightbox} />
                <TrophyImgGrid images={grids[3].images} order={grids[3].order} onOpen={setLightbox} />

                <TrophySectionText text={t('text_4')} />
                <TrophyImgGrid images={grids[4].images} order={grids[4].order} onOpen={setLightbox} />
                <TrophyImgSingle src="header-3.jpg" second onOpen={setLightbox} />
                <TrophyImgGrid images={grids[5].images} order={grids[5].order} onOpen={setLightbox} />

                <TrophySectionText text={t('text_5')} />
                <TrophyImgGrid images={grids[6].images} order={grids[6].order} onOpen={setLightbox} />
                <TrophyImgGrid images={grids[7].images} order={grids[7].order} onOpen={setLightbox} />
                <TrophyImgGrid images={grids[8].images} order={grids[8].order} onOpen={setLightbox} />
                <TrophyImgGrid images={grids[9].images} order={grids[9].order} onOpen={setLightbox} />
                <TrophyImgGrid images={grids[10].images} order={grids[10].order} onOpen={setLightbox} />
            </div>

            {lightbox && (
                <Lightbox images={[lightbox]} title="" startIndex={0} onClose={() => setLightbox(null)} />
            )}
        </div>
        </div>
    )
}

export default Trophy
