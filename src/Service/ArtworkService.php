<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CreateArtworkDto;
use App\Entity\Artwork;
use App\Repository\ArtworkRepositoryInterface;

class ArtworkService
{
    public function __construct(private ArtworkRepositoryInterface $artworkRepository) {}

    public function getAllArtworks(): array
    {
        return $this->artworkRepository->findAll();
    }

    public function createArtwork(CreateArtworkDto $dto): Artwork
    {
        return $this->artworkRepository->insert($dto);
    }
}
