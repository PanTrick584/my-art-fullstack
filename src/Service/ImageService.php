<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\CreateImageDto;
use App\Entity\Image;
use App\Repository\ImageRepository;

class ImageService
{
    public function __construct(private ImageRepository $imageRepository) {}

    public function createImage(CreateImageDto $dto): Image
    {
        return $this->imageRepository->insert($dto);
    }

    public function getByArtworkId(int $artworkId): array
    {
        return $this->imageRepository->findByArtworkId($artworkId);
    }
}
