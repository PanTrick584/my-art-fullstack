<?php

declare(strict_types=1);

namespace App\Repository;

use App\Database\QueryBuilder;
use App\Dto\CreateUserDto;
use App\Entity\User;
use DateTimeImmutable;
use PDOException;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(private QueryBuilder $queryBuilder) {}
    public function findByEmail(string $email): ?User
    {
        $row = $this->queryBuilder->table('users')
            ->where('email', '=', $email)
            ->first();

        return $row === null ? null : new User(
            id: (int) $row['id'],
            email: $row['email'],
            username: $row['username'],
            role: $row['role'],
            passwordHash: $row['password_hash'],
            createdAt: new DateTimeImmutable($row['created_at'])
        );
    }

    public function findById(int $id): ?User
    {
        $row = $this->queryBuilder->table('users')
            ->where('id', '=', $id)
            ->first();

        return $row === null ? null : new User(
            id: (int) $row['id'],
            email: $row['email'],
            username: $row['username'],
            role: $row['role'],
            passwordHash: $row['password_hash'],
            createdAt: new DateTimeImmutable($row['created_at'])
        );
    }

    public function insert(CreateUserDto $dto): User
    {
        try {
            $id = $this->queryBuilder->table('users')->insert([
                'email' => $dto->email,
                'username' => $dto->username,
                'password_hash' => $dto->passwordHash,
            ]);
        } catch (PDOException $e) {
            throw $e;
        }

        return new User(
            id: $id,
            email: $dto->email,
            username: $dto->username,
            passwordHash: $dto->passwordHash,
            role: 'user',
            createdAt: new DateTimeImmutable()
        );
    }
}
