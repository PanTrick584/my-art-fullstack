import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import ArtworkForm from './pages/ArtworkForm'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add-artwork" element={<ArtworkForm />} />
            <Route path="/admin/:id/edit-artwork" element={<ArtworkForm />} />
        </Routes>
    )
}

export default App
