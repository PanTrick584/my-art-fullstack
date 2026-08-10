<?php

declare(strict_types=1);

namespace App\Repository;

use App\Dto\CreateArtworkDto;
use App\Entity\Artwork;

interface ArtworkRepositoryInterface
{
    public function findAll(): array;

    public function insert(CreateArtworkDto $dto): Artwork;
}
