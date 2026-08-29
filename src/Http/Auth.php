<?php

declare(strict_types=1);

namespace App\Http;

final class Auth
{
    public static function requireRole(string $role): void
    {
        if (($_SESSION['role'] ?? null) !== $role) {
            http_response_code(403);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Brak uprawnień']);

            exit;
        }
    }

    public static function requireLogin(): void
    {
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Musisz byc zalogowany']);

            exit;
        }
    }
}
