import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AddArtwork from './pages/AddArtwork'
import EditArtwork from './pages/EditArtwork'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks" element={<Admin />} />
            <Route path="/artworks/add-artwork" element={<AddArtwork />} />
            <Route path="/artworks/:id/edit-artwork" element={<EditArtwork />} />
        </Routes>
    )
}

export default App
