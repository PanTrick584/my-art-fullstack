<?php

declare(strict_types=1);

namespace App\Dto;

final class CreateUserDto
{
    public function __construct(
        public readonly string $email,
        public readonly string $username,
        public readonly string $passwordHash
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            email: (string) ($data['email'] ?? ''),
            username: (string) ($data['username'] ?? ''),
            passwordHash: (string) ($data['password_hash'] ?? '')
        );
    }
}
