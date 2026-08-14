export type Category = 'drawing' | 'painting' | 'photography'

export interface ArtworkFormType {
    name: string
    category: string
    dimensions: string
    yearOfCreation: string
    price: string
}

export interface Artwork extends ArtworkFormType {
    id: number
    images: string[]
}

