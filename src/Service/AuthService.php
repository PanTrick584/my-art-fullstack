<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CreateUserDto;
use App\Dto\LoginDto;
use App\Dto\RegisterDto;
use App\Entity\User;
use App\Exception\DuplicateEmailException;
use App\Exception\InvalidCredentialException;
use App\Repository\UserRepositoryInterface;

class AuthService
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}

    public function register(RegisterDto $dto): User
    {
        $existing = $this->userRepository->findByEmail($dto->email);

        if ($existing !== null) {
            throw new DuplicateEmailException('Email już zajęty');
        }

        $hash = password_hash($dto->password, PASSWORD_DEFAULT);

        $createUserDto = new CreateUserDto(
            email: $dto->email,
            username: $dto->username,
            passwordHash: $hash
        );

        return $this->userRepository->insert($createUserDto);
    }

    public function login(LoginDto $dto): User
    {
        $existing = $this->userRepository->findByEmail($dto->email);

        if ($existing === null || !password_verify($dto->password, $existing->passwordHash)) {
            throw new InvalidCredentialException('Niewłaściwe dane, spróbuj ponownie');
        }

        return $existing;
    }

    public function findById(int $id): User
    {
        return $this->userRepository->findById($id);
    }
}
