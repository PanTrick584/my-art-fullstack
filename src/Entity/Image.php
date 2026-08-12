<?php

declare(strict_types=1);

namespace App\Entity;

final class Image
{
    public function __construct(
        public readonly int $id,
        public readonly int $artworkId,
        public readonly string $url
    ) {}
}
