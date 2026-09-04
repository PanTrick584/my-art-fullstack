import { useAuth } from '../api/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(form: { email: string; password: string }) {
        await login(form.email, form.password)
        navigate('/artworks')
    }

    return (
        <div>
            <AuthForm
                handler={handleLogin}
                componentState='login'
            />
        </div>
    )
}

export default Login;