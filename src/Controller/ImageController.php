<?php

declare(strict_types=1);

namespace App\Controller;

use App\Dto\CreateImageDto;
use App\Service\ImageService;
use InvalidArgumentException;
use PDO;
use PDOException;
use Throwable;

class ImageController
{
    public function __construct(private ImageService $imageService, private PDO $pdo) {}

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

    public function storeBulk(): void
    {
        header('Content-Type: application/json');

        $artworkId = (int) ($_POST['artworkId'] ?? 0);
        $fileCount = count($_FILES['images']['name'] ?? []);

        try {
            $images = $this->imageService->createManyFromUpload($artworkId, $fileCount);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            return;
        }

        http_response_code(201);
        echo json_encode(['message' => 'Images uploaded', 'images' => $images]);
    }

    public function index(): void
    {
        header('Content-Type: application/json');

        $artworkId = (int) ($_GET['artworkId'] ?? 0);
        $image = $this->imageService->getByArtworkId($artworkId) ?? [];

        echo json_encode($image);
    }
}
