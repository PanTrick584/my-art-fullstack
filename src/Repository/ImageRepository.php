<?php

declare(strict_types=1);

namespace App\Repository;

use App\Database\QueryBuilder;
use App\Dto\CreateImageDto;
use App\Entity\Image;

class ImageRepository
{
    public function __construct(private QueryBuilder $queryBuilder) {}

    public function insert(CreateImageDto $dto): Image
    {
        $id = $this->queryBuilder->table('images')->insert([
            'artwork_id' => $dto->artworkId,
            'url' => $dto->url
        ]);

        return new Image(
            id: $id,
            artworkId: $dto->artworkId,
            url: $dto->url
        );
    }

    public function findByArtworkId(int $artworkId): array
    {
        $rows = $this->queryBuilder->table('images')->where('artwork_id', '=', $artworkId)->get();

        return array_map(
            fn(array $row) => new Image(
                id: (int) $row['id'],
                artworkId: (int) $row['artwork_id'],
                url: $row['url']
            ),
            $rows
        );
    }
}
