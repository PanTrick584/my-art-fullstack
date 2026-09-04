import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useApiClient } from "./ApiContext"
import type { AuthUser } from "../types/auth"

interface AuthContextValue {
    currentUser: AuthUser | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, username: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const apiFetch = useApiClient();
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch<AuthUser>('/me')
            .then(setCurrentUser)
            .catch(() => setCurrentUser(null))
            .finally(() => setLoading(false))
    }, [apiFetch])

    async function login(email: string, password: string) {
        const user = await apiFetch<AuthUser>('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
        setCurrentUser(user)
    }

    async function register(email: string, username: string, password: string) {
        const user = await apiFetch<AuthUser>('/register', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
        })
        setCurrentUser(user)
    }

    async function logout() {
        await apiFetch<AuthUser>('/logout', {
            method: 'POST',
        })
        setCurrentUser(null)
    }

    return <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (context === null) throw new Error('Bla bla');

    return context;
}