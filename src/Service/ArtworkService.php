<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CreateArtworkDto;
use App\Entity\Artwork;
use App\Repository\ArtworkRepositoryInterface;
use App\Repository\ImageRepository;

class ArtworkService
{
    public function __construct(
        private ArtworkRepositoryInterface $artworkRepository,
        private ImageRepository $imageRepository
    ) {}

    public function getAllArtworks(int $id, string $role, int $ownerId, string $status): array
    {
        return $this->artworkRepository->findAll($id, $role, $ownerId, $status);
    }

    public function createArtwork(CreateArtworkDto $dto, int $ownerId, string $role): Artwork
    {
        $status = $role === 'admin' ? 'approved' : 'pending';
        return $this->artworkRepository->insert($dto, $ownerId, $status);
    }

    public function updateArtwork(int $id, CreateArtworkDto $dto, string $role): Artwork
    {
        $status = $role === 'admin' ? 'approved' : 'pending';
        return $this->artworkRepository->update($id, $dto, $status);
    }

    public function updateStatus(int $id, string $status): Artwork
    {
        return $this->artworkRepository->updateStatus($id, $status);
    }

    public function deleteArtwork(int $id): void
    {
        $images = $this->imageRepository->findByArtworkId($id);

        $this->artworkRepository->delete($id);

        foreach ($images as $image) {
            @unlink(__DIR__ . '/../../uploads/' . basename($image->url));
        }
    }
}
