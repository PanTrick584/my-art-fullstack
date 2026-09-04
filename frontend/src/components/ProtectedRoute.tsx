import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../api/AuthContext'

function ProtectedRoute() {

    const { currentUser, loading } = useAuth();

    if (loading) return <p>Ładowanie...</p>
    if (!currentUser) return <Navigate to="/login" />

    return <Outlet />
}

export default ProtectedRoute;