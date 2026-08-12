<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\CreateImageDto;
use App\Service\ImageService;
use InvalidArgumentException;
use PDOException;

class ImageController
{
    public function __construct(private ImageService $imageService) {}

    public function store(): void
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        header('Content-Type: application/json');

        try {
            $dto = CreateImageDto::fromArray($data);
            $image = $this->imageService->createImage($dto);
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        } catch (PDOException $e) {
            http_response_code(409);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        http_response_code(201);
        echo json_encode($image);
    }

    public function index(): void
    {
        header('Content-Type: application/json');

        $artworkId = (int) ($_GET['artworkId'] ?? 0);
        $image = $this->imageService->getByArtworkId($artworkId) ?? [];

        echo json_encode($image);
    }
}
