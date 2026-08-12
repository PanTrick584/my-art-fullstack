<?php

declare(strict_types=1);

namespace App\Dto;

final class CreateImageDto
{
    public function __construct(
        public readonly int $artworkId,
        public readonly string $url
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            artworkId: (int) ($data['artworkId'] ?? 0),
            url: (string) ($data['url'] ?? 0)
        );
    }
}
