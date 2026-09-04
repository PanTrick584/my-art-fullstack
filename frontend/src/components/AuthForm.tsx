import { useState, type FormEvent } from 'react'
import styles from './AuthForm.module.scss'
import type { AuthFormType, AuthFormProps } from '../types/auth';

const TEXT = {
    login: {
        title: 'Zaloguj się',
        submitButton: 'Zaloguj',
    },
    register: {
        title: 'Zarejestruj się',
        submitButton: 'Zarejestruj',
    }
} as const;

function AuthForm({ handler, componentState }: AuthFormProps) {
    const text = TEXT;

    const [form, setForm] = useState<AuthFormType>({
        email: '',
        password: '',
        username: '',
    })
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (field: keyof AuthFormType) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            await handler(form)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Nieznany błąd')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>{text[componentState].title}</h1>

            <label className={styles.field}>
                Email
                <input value={form.email} onChange={handleChange('email')} required />
            </label>

            {componentState === 'register' && (
                <label className={styles.field}>
                    Nazwa użytkownika
                    <input value={form.username} onChange={handleChange('username')} required />
                </label>
            )}
            <label className={styles.field}>
                Hasło
                <input type="password" value={form.password} onChange={handleChange('password')} required />
            </label>

            <button type="submit" disabled={submitting}>
                {submitting ? 'Wysyłanie...' : text[componentState].submitButton}
            </button>

            {error && <p role="alert">Błąd: {error}</p>}
        </form>
    )
}

export default AuthForm
