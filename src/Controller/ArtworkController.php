<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\CreateArtworkDto;
use App\Dto\UpdateStatusDto;
use App\Http\Auth;
use App\Service\ArtworkService;
use InvalidArgumentException;

class ArtworkController
{
    public function __construct(private ArtworkService $artworkService) {}

    public function index(): void
    {
        $id = (int) ($_GET['id'] ?? 0);
        $role = (string) ($_SESSION['role'] ?? '');
        $ownerId = (int) ($_SESSION['user_id'] ?? 0);
        $status = (string) ($_GET['status'] ?? '');

        header('Content-Type: application/json');
        echo json_encode($this->artworkService->getAllArtworks($id, $role, $ownerId, $status));
    }

    public function store(): void
    {
        Auth::requireLogin();

        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        header('Content-Type: application/json');
        $ownerId = (int) ($_SESSION['user_id'] ?? 0);
        $role = (string) ($_SESSION['role'] ?? 'user');

        try {
            $dto = CreateArtworkDto::fromArray($data);
            $artwork = $this->artworkService->createArtwork($dto, $ownerId, $role);
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        http_response_code(201);
        echo json_encode($artwork);
    }

    public function update(): void
    {
        Auth::requireLogin();

        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        $id = (int) ($data['id'] ?? 0);
        $role = (string) ($_SESSION['role'] ?? 'user');

        header('Content-Type: application/json');

        try {
            $dto = CreateArtworkDto::fromArray($data);
            $artwork = $this->artworkService->updateArtwork($id, $dto, $role);
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        http_response_code(200);
        echo json_encode($artwork);
    }

    public function updateStatus(): void
    {
        Auth::requireRole('admin');

        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        header('Content-Type: application/json');

        try {
            $dto = UpdateStatusDto::fromArray($data);
            $artwork = $this->artworkService->updateStatus($dto->id, $dto->status);
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        http_response_code(200);
        echo json_encode($artwork);
    }
}
