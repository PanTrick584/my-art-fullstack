import ArtworkForm from '../components/ArtworkForm';
import { useApiClient } from '../api/ApiContext'
import type { Artwork, ArtworkFormType } from '../types/artwork'

function AddArtwork() {
    const initialValue = {
        name: '',
        category: '',
        dimensions: '',
        yearOfCreation: '',
        price: '',
    }

    const apiFetch = useApiClient();

    async function postArtwork(form: ArtworkFormType) {
        return apiFetch<Artwork>('/artworks', {
            method: 'POST',
            body: JSON.stringify({ ...form, images: [] }),
        })
    }

    return (
        <div>
            <ArtworkForm
                initialValue={initialValue}
                handler={postArtwork}
                componentState='add'
            />
        </div>
    )
}

export default AddArtwork;