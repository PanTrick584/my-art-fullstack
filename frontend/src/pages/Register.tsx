import { useAuth } from '../api/AuthContext'
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import type { AuthFormType } from '../types/auth';

function Register() {

    const { register } = useAuth();
    const navigate = useNavigate();

    async function handleRegister(form: AuthFormType) {
        await register(form.email, form.username ?? '', form.password)
        navigate('/artworks')
    }

    return (
        <div>
            <AuthForm
                handler={handleRegister}
                componentState='register'
            />
        </div>
    )
}

export default Register;