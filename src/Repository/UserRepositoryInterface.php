<?php

declare(strict_types=1);

namespace App\Repository;

use App\Dto\CreateUserDto;
use App\Entity\User;

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?User;
    public function findById(int $id): ?User;

    public function insert(CreateUserDto $dto): User;
}
