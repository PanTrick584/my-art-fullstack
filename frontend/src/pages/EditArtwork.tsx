import { useParams } from "react-router-dom";
import ArtworkForm from "../components/ArtworkForm";
import { useApi } from "../hooks/useApi";
import { useApiClient } from "../api/ApiContext";
import type { Artwork, ArtworkFormType, Image } from '../types/artwork'

function EditArtwork() {
    const { id } = useParams();
    const artworkId = Number(id);

    const { data, loading } = useApi<Artwork[]>(`/artworks?id=${artworkId}`)
    const { data: images, loading: loadingImages } = useApi<Image[]>(`/images?artworkId=${artworkId}`)

    const [artwork] = data ?? [];
    const initialValue = {
        name: artwork?.name,
        category: artwork?.category,
        dimensions: artwork?.dimensions,
        yearOfCreation: artwork?.yearOfCreation,
        price: artwork?.price,
    }

    const apiFetch = useApiClient();

    async function updateArtwork(form: ArtworkFormType) {
        return apiFetch<Artwork>(`/artworks`, {
            method: 'PUT',
            body: JSON.stringify({ ...form, images: [], id: artworkId }),
        })
    }

    if (loading || loadingImages) return <p>Ładowanie...</p>
    if (!artwork) return <p>Nie znalezioni tego arcydzieła, spróbuj ponownie</p>

    return (
        <div>
            <ArtworkForm
                initialValue={initialValue}
                handler={updateArtwork}
                componentState="edit"
                existingImages={images ?? []}
            />
        </div>
    )
}

export default EditArtwork;