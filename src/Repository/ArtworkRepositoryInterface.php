<?php

declare(strict_types=1);

namespace App\Repository;

use App\Dto\CreateArtworkDto;
use App\Entity\Artwork;

interface ArtworkRepositoryInterface
{
    public function findAll(int $id, string $role, int $ownerId, string $status): array;

    public function insert(CreateArtworkDto $dto, int $ownerId, string $status): Artwork;

    public function update(int $id, CreateArtworkDto $dto, string $status): Artwork;

    public function updateStatus(int $id, string $status): Artwork;
}
