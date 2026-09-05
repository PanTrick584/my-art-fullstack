<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\Database\Connection;
use App\Database\QueryBuilder;
use App\Dto\CreateArtworkDto;
use App\Dto\CreateImageDto;
use App\Repository\ArtworkRepository;
use App\Repository\ImageRepository;

const ADMIN_OWNER_ID = 1;
const PLACEHOLDER_DIMENSIONS = '-';
const PLACEHOLDER_PRICE = '0.00';

$jsonPath = __DIR__ . '/../uploads/legacy-artworks.json';
$items = json_decode(file_get_contents($jsonPath), true);

$pdo = Connection::create();
$queryBuilder = new QueryBuilder($pdo);
$artworkRepository = new ArtworkRepository($queryBuilder);
$imageRepository = new ImageRepository($queryBuilder);

$artworkCount = 0;
$imageCount = 0;

foreach ($items as $item) {
    $dto = new CreateArtworkDto(
        name: $item['name'],
        category: $item['category'],
        dimensions: PLACEHOLDER_DIMENSIONS,
        yearOfCreation: $item['yearOfCreation'],
        price: PLACEHOLDER_PRICE,
        images: [],
    );

    $artwork = $artworkRepository->insert($dto, ADMIN_OWNER_ID, 'approved');
    $artworkCount++;

    foreach ($item['images'] as $url) {
        $imageDto = CreateImageDto::fromArray([
            'artworkId' => $artwork->id,
            'url' => $url,
        ]);
        $imageRepository->insert($imageDto);
        $imageCount++;
    }
}

echo "Zaimportowano artworków: {$artworkCount}\n";
echo "Zaimportowano zdjęć: {$imageCount}\n";
