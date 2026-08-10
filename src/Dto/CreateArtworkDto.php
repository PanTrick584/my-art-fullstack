<?php

declare(strict_types=1);

namespace App\Dto;

use InvalidArgumentException;

final class CreateArtworkDto
{
    private const ALLOWED_CATEGORIES = ['drawing', 'painting', 'photography'];

    public function __construct(
        public readonly string $name,
        public readonly string $category,
        public readonly string $dimensions,
        public readonly string $yearOfCreation,
        public readonly string $price,
        public readonly array $images
    ) {
        if (!in_array($this->category, self::ALLOWED_CATEGORIES, true)) {
            throw new InvalidArgumentException("Invalid category: {$this->category}");
        }
    }

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'] ?? '',
            category: $data['category'] ?? '',
            dimensions: $data['dimensions'] ?? '',
            yearOfCreation: $data['yearOfCreation'] ?? '',
            price: $data['price'] ?? '',
            images: $data['images'] ?? []
        );
    }
}
