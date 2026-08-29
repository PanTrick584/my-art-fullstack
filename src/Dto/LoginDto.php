<?php

declare(strict_types=1);

namespace App\Dto;

final class LoginDto
{
    public function __construct(
        public readonly string $email,
        public readonly string $password
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            email: (string) ($data['email'] ?? ''),
            password: (string) ($data['password'] ?? '')
        );
    }
}
