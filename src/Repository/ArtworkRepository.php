<?php

declare(strict_types=1);

namespace App\Repository;

use App\Database\QueryBuilder;
use App\Dto\CreateArtworkDto;
use App\Entity\Artwork;
use PDOException;

class ArtworkRepository implements ArtworkRepositoryInterface
{
    public function __construct(private QueryBuilder $queryBuilder) {}
    public function findAll(int $id): array
    {
        if (0 !== $id) {
            $rows = $this->queryBuilder->table('artworks')
                ->where('id', '=', $id)
                ->get();
        } else {
            $rows = $this->queryBuilder->table('artworks')->get();
        }


        return array_map(
            fn(array $row) => new Artwork(
                id: (int) $row['id'],
                name: $row['name'],
                category: $row['category'],
                dimensions: $row['dimensions'],
                yearOfCreation: $row['year_of_creation'],
                price: $row['price'],
                images: $row['images'] ?? [],
                status: $row['status'],
                ownerId: $row['owner_id'] !== null ? (int) $row['owner_id'] : null
            ),
            $rows
        );
    }

    public function insert(CreateArtworkDto $dto, int $ownerId, string $status): Artwork
    {
        try {
            $id = $this->queryBuilder->table('artworks')->insert([
                'name' => $dto->name,
                'category' => $dto->category,
                'dimensions' => $dto->dimensions,
                'year_of_creation' => $dto->yearOfCreation,
                'price' => $dto->price,
                'status' => $status,
                'owner_id' => $ownerId
            ]);
        } catch (PDOException $e) {
            throw $e;
        }

        return new Artwork(
            id: $id,
            name: $dto->name,
            category: $dto->category,
            dimensions: $dto->dimensions,
            yearOfCreation: $dto->yearOfCreation,
            price: $dto->price,
            images: $dto->images,
            status: $status,
            ownerId: $ownerId
        );
    }

    public function update(int $id, CreateArtworkDto $dto, string $status): Artwork
    {
        $row = $this->queryBuilder->table('artworks')->where('id', '=', $id)->first();
        try {
            $id = $this->queryBuilder->table('artworks')
                ->where('id', '=', $id)
                ->update([
                    'name' => $dto->name,
                    'category' => $dto->category,
                    'dimensions' => $dto->dimensions,
                    'year_of_creation' => $dto->yearOfCreation,
                    'price' => $dto->price,
                    'status' => $status,
                ]);
        } catch (PDOException $e) {
            throw $e;
        }

        return new Artwork(
            id: $id,
            name: $dto->name,
            category: $dto->category,
            dimensions: $dto->dimensions,
            yearOfCreation: $dto->yearOfCreation,
            price: $dto->price,
            images: $dto->images,
            status: $status,
            ownerId: $row['owner_id'] !== null ? (int) $row['owner_id'] : null
        );
    }

    public function updateStatus(int $id, string $status): Artwork
    {
        $row = $this->queryBuilder->table('artworks')->where('id', '=', $id)->first();

        try {
            $id = $this->queryBuilder->table('artworks')
                ->where('id', '=', $id)
                ->update([
                    'status' => $status,
                ]);
        } catch (PDOException $e) {
            throw $e;
        }

        return new Artwork(
            id: $id,
            name: $row['name'],
            category: $row['category'],
            dimensions: $row['dimensions'],
            yearOfCreation: $row['year_of_creation'],
            price: $row['price'],
            images: $row['images'] ?? [],
            status: $status,
            ownerId: $row['owner_id'] !== null ? (int) $row['owner_id'] : null
        );
    }
}
