import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'pl' | 'en'

interface LangContextValue {
    lang: Lang
    toggleLang: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>('pl')

    function toggleLang() {
        setLang((prev) => (prev === 'pl' ? 'en' : 'pl'))
    }

    return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
    const context = useContext(LangContext)

    if (context === null) throw new Error('useLang must be used within a LangProvider')

    return context
}
