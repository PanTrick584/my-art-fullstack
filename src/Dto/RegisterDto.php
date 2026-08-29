<?php

declare(strict_types=1);

namespace App\Dto;

use InvalidArgumentException;

final class RegisterDto
{
    public function __construct(
        public readonly string $email,
        public readonly string $username,
        public readonly string $password
    ) {
        if ($password === '') throw new InvalidArgumentException();
    }

    public static function fromArray(array $data): self
    {
        return new self(
            email: (string) ($data['email'] ?? ''),
            username: (string) ($data['username'] ?? ''),
            password: (string) ($data['password'] ?? '')
        );
    }
}
