<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\LoginDto;
use App\Dto\RegisterDto;
use App\Exception\DuplicateEmailException;
use App\Exception\InvalidCredentialException;
use App\Service\AuthService;
use InvalidArgumentException;

class AuthController
{
    public function __construct(private AuthService $authService) {}

    public function register(): void
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        header('Content-Type: application/json');

        try {
            $dto = RegisterDto::fromArray($data);
            $user = $this->authService->register($dto);
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        } catch (DuplicateEmailException $e) {
            http_response_code(409);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        session_regenerate_id(true);
        $_SESSION['user_id'] = $user->id;
        $_SESSION['role'] = $user->role;
        http_response_code(201);
        echo json_encode($user);
    }

    public function login(): void
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        header('Content-Type: application/json');

        try {
            $dto = LoginDto::fromArray($data);
            $user = $this->authService->login($dto);
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        } catch (InvalidCredentialException $e) {
            http_response_code(401);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        session_regenerate_id(true);
        $_SESSION['user_id'] = $user->id;
        $_SESSION['role'] = $user->role;
        http_response_code(200);
        echo json_encode($user);
    }
    public function logout(): void
    {
        header('Content-Type: application/json');
        session_destroy();

        echo json_encode(['message' => 'Zostałeś wylogowany']);
    }

    public function me(): void
    {
        header('Content-Type: application/json');

        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Nie jesteś zalogowany']);

            return;
        }

        echo json_encode($this->authService->findById($_SESSION['user_id']));
    }

    // public function index(): void
    // {
    //     $id = (int) ($_GET['id'] ?? 0);

    //     header('Content-Type: application/json');
    //     echo json_encode($this->artworkService->getAllArtworks($id));
    // }

    // public function store(): void
    // {
    //     $body = file_get_contents('php://input');
    //     $data = json_decode($body, true);

    //     header('Content-Type: application/json');

    //     try {
    //         $dto = CreateArtworkDto::fromArray($data);
    //         $artwork = $this->artworkService->createArtwork($dto);
    //     } catch (InvalidArgumentException $e) {
    //         http_response_code(422);
    //         echo json_encode(['error' => $e->getMessage()]);
    //         return;
    //     }

    //     http_response_code(201);
    //     echo json_encode($artwork);
    // }

    // public function update(): void
    // {
    //     $body = file_get_contents('php://input');
    //     $data = json_decode($body, true);
    //     $id = (int) ($data['id'] ?? 0);

    //     header('Content-Type: application/json');

    //     try {
    //         $dto = CreateArtworkDto::fromArray($data);
    //         $artwork = $this->artworkService->updateArtwork($id, $dto);
    //     } catch (InvalidArgumentException $e) {
    //         http_response_code(422);
    //         echo json_encode(['error' => $e->getMessage()]);
    //         return;
    //     }

    //     http_response_code(200);
    //     echo json_encode($artwork);
    // }
}
