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
                images: $row['images'] ?? []
            ),
            $rows
        );
    }

    public function insert(CreateArtworkDto $dto): Artwork
    {
        try {
            $id = $this->queryBuilder->table('artworks')->insert([
                'name' => $dto->name,
                'category' => $dto->category,
                'dimensions' => $dto->dimensions,
                'year_of_creation' => $dto->yearOfCreation,
                'price' => $dto->price
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
            images: $dto->images
        );
    }

    public function update(int $id, CreateArtworkDto $dto): Artwork
    {
        try {
            $id = $this->queryBuilder->table('artworks')
                ->where('id', '=', $id)
                ->update([
                    'name' => $dto->name,
                    'category' => $dto->category,
                    'dimensions' => $dto->dimensions,
                    'year_of_creation' => $dto->yearOfCreation,
                    'price' => $dto->price
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
            images: $dto->images
        );
    }
}
