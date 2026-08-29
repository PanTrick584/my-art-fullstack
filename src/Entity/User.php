<?php

declare(strict_types=1);

namespace App\Entity;

use DateTimeImmutable;
use JsonSerializable;
use Override;

final class User implements JsonSerializable
{
    public function __construct(
        public readonly int $id,
        public readonly string $email,
        public readonly string $username,
        public readonly string $passwordHash,
        public readonly string $role,
        public readonly DateTimeImmutable $createdAt,
    ) {}

    #[Override]
    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'username' => $this->username,
            'role' => $this->role,
            'createdAt' => $this->createdAt->format(DATE_ATOM)
        ];
    }
}
