<?php

declare(strict_types=1);

namespace App\Entity;

final class Artwork
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $category,
        public readonly string $dimensions,
        public readonly string $yearOfCreation,
        public readonly string $price,
        public readonly ?array $images
    ) {}
}
