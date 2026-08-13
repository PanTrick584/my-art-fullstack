<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CreateImageDto;
use App\Entity\Image;
use App\Repository\ImageRepository;
use App\Storage\FileUploader;
use PDO;
use RuntimeException;
use Throwable;

class ImageService
{
    public function __construct(private ImageRepository $imageRepository, private PDO $pdo) {}

    public function createImage(CreateImageDto $dto): Image
    {
        return $this->imageRepository->insert($dto);
    }

    public function getByArtworkId(int $artworkId): array
    {
        return $this->imageRepository->findByArtworkId($artworkId);
    }

    public function createManyFromUpload(int $artworkId, int $fileCount): array
    {
        $this->pdo->beginTransaction();
        $savedFiles = [];
        $images = [];

        try {
            for ($i = 0; $i < $fileCount; $i++) {
                if ($_FILES['images']['error'][$i] !== UPLOAD_ERR_OK) {
                    throw new RuntimeException("Upload error for file {$i}");
                }

                $result = FileUploader::saveFile($artworkId, $i);
                $savedFiles[] = $result['path'];
                $images[] = $this->createImage($result['dto']);
            }

            $this->pdo->commit();
        } catch (Throwable $e) {
            $this->pdo->rollBack();

            foreach ($savedFiles as $file) {
                @unlink($file);
            }

            throw $e;
        }

        return $images;
    }
}
