<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CreateArtworkDto;
use App\Entity\Artwork;
use App\Repository\ArtworkRepositoryInterface;

class ArtworkService
{
    public function __construct(private ArtworkRepositoryInterface $artworkRepository) {}

    public function getAllArtworks(int $id): array
    {
        return $this->artworkRepository->findAll($id);
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
}
