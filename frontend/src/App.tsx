import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AddArtwork from './pages/AddArtwork'
import EditArtwork from './pages/EditArtwork'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add-artwork" element={<AddArtwork />} />
            <Route path="/admin/:id/edit-artwork" element={<EditArtwork />} />
        </Routes>
    )
}

export default App
