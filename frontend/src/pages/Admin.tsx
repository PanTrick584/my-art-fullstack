import { Link } from 'react-router-dom'
import styles from './Admin.module.scss'
import { useApi } from '../hooks/useApi'
import type { Artwork } from '../types/artwork'
import { useAuth } from '../api/AuthContext'
import { useState } from 'react'
import { useApiClient } from '../api/ApiContext'
import Lightbox from '../components/Lightbox'

function Admin() {
    const [statusFilter, setStatusFilter] = useState('');
    const path = statusFilter ? `/artworks?status=${statusFilter}` : '/artworks'
    const { data: artworks, loading, error } = useApi<Artwork[]>(path)
    const { currentUser } = useAuth()
    const sortedArtworks = [...(artworks ?? [])].sort((a, b) => b.id - a.id);
    const apiFetch = useApiClient();
    const [lightbox, setLightbox] = useState<{ artwork: Artwork; startIndex: number } | null>(null)

    async function handleStatusChange(id: number, status: 'approved' | 'rejected') {
        await apiFetch('/artworks/status', {
            method: 'PUT',
            body: JSON.stringify({ id, status }),
        })

        window.location.reload()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Prace</h1>
                <Link to="/artworks/add-artwork">Dodaj nową pracę</Link>
            </div>

            {currentUser?.role === 'admin' && (
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">Wszystkie</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            )}

            {loading && <p>Ładowanie...</p>}
            {error && <p role="alert">Błąd: {error}</p>}

            {artworks && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nazwa</th>
                            <th>Kategoria</th>
                            <th>Wymiary</th>
                            <th>Rok</th>
                            <th>Cena</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedArtworks.map((artwork) => (
                            <tr key={artwork.id}>
                                <td>
                                    {artwork.images.length > 0 && (
                                        <img
                                            className={styles.thumbnail}
                                            src={artwork.images[0]}
                                            alt={artwork.name}
                                            onClick={() => setLightbox({ artwork, startIndex: 0 })}
                                        />
                                    )}
                                </td>
                                <td>
                                    <Link to={`/artworks/${artwork.id}/edit-artwork`}>
                                        {artwork.name}
                                    </Link>
                                </td>
                                <td>{artwork.category}</td>
                                <td>{artwork.dimensions}</td>
                                <td>{artwork.yearOfCreation}</td>
                                <td>{artwork.price}</td>
                                <td>{artwork.status}</td>
                                <td>
                                    {currentUser?.role === 'admin' && artwork.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleStatusChange(artwork.id, 'approved')}>Zatwierdź</button>
                                            <button onClick={() => handleStatusChange(artwork.id, 'rejected')}>Odrzuć</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {lightbox && (
                <Lightbox
                    artwork={lightbox.artwork}
                    startIndex={lightbox.startIndex}
                    onClose={() => setLightbox(null)}
                />
            )}
        </div>
    )
}

export default Admin
