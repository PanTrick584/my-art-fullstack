<?php

declare(strict_types=1);

namespace App\Storage;

use App\Dto\CreateImageDto;

class FileUploader
{
    private function __construct() {}

    public static function saveFile(int $artworkId, int $i): array
    {
        $uploadsDir = __DIR__ . '/../../uploads';

        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0755, true);
        }

        $filename = uniqid() . '_' . basename($_FILES['images']['name'][$i]);
        $destination = $uploadsDir . '/' . $filename;
        move_uploaded_file($_FILES['images']['tmp_name'][$i], $destination);

        $dto = CreateImageDto::fromArray([
            'artworkId' => $artworkId,
            'url' => '/uploads/' . $filename,
        ]);

        return ['dto' => $dto, 'path' => $destination];
    }
}
