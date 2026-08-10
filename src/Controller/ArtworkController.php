<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\CreateArtworkDto;
use App\Service\ArtworkService;
use InvalidArgumentException;

class ArtworkController
{
    public function __construct(private ArtworkService $artworkService) {}

    public function index(): void
    {
        header('Content-Type: application/json');
        echo json_encode($this->artworkService->getAllArtworks());
    }

    public function store(): void
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        header('Content-Type: application/json');

        try {
            $dto = CreateArtworkDto::fromArray($data);
            $artwork = $this->artworkService->createArtwork($dto);
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        http_response_code(201);
        echo json_encode($artwork);
    }
}
