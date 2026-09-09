import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Trophy from './pages/Trophy'
import Admin from './pages/Admin'
import AddArtwork from './pages/AddArtwork'
import EditArtwork from './pages/EditArtwork'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
    const [trophyLang, setTrophyLang] = useState<'pl' | 'en'>('pl')

    return (
        <>
            <Navbar trophyLang={trophyLang} onToggleTrophyLang={() => setTrophyLang((prev) => (prev === 'pl' ? 'en' : 'pl'))} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trophy" element={<Trophy lang={trophyLang} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/artworks" element={<Admin />} />
                    <Route path="/artworks/add-artwork" element={<AddArtwork />} />
                    <Route path="/artworks/:id/edit-artwork" element={<EditArtwork />} />
                </Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App
