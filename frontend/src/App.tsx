import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AddArtwork from './pages/AddArtwork'
import EditArtwork from './pages/EditArtwork'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/artworks" element={<Admin />} />
                    <Route path="/artworks/add-artwork" element={<AddArtwork />} />
                    <Route path="/artworks/:id/edit-artwork" element={<EditArtwork />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
