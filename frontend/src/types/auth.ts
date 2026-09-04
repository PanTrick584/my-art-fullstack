export interface AuthUser {
    id: number
    email: string
    username: string
    role: 'user' | 'admin'
    createdAt: string
}

export interface AuthFormType {
    email: string
    password: string
    username?: string
}

export interface AuthFormProps {
    handler: (form: AuthFormType) => Promise<void>
    componentState: 'login' | 'register'
}