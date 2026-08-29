<?php

declare(strict_types=1);

namespace App\Dto;

use InvalidArgumentException;

final class UpdateStatusDto
{
    private const ALLOWED_STATUSES = ['approved', 'rejected', 'pending'];

    public function __construct(
        public readonly int $id,
        public readonly string $status
    ) {
        if (!in_array($this->status, self::ALLOWED_STATUSES, true)) {
            throw new InvalidArgumentException("Invalid status: {$this->status}");
        }
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: (int) ($data['id'] ?? 0),
            status: (string) ($data['status'] ?? '')
        );
    }
}
