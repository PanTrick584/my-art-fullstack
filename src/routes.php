<?php

declare(strict_types=1);

use App\Controller\ArtworkController;
use App\Database\QueryBuilder;
use App\Http\Router;
use App\Repository\ArtworkRepository;
use App\Service\ArtworkService;
use App\Database\Connection;

$router = new Router();
$pdo = Connection::create();
$queryBuilder = new QueryBuilder($pdo);

$artworkRepository = new ArtworkRepository($queryBuilder);
$artworkService = new ArtworkService($artworkRepository);
$artworkController = new ArtworkController($artworkService);

$router->get('/api/hello', function () {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Hello from PHP! Artworks app here!']);
});

$router->get('/api/artworks', $artworkController->index(...));
$router->post('/api/artworks', $artworkController->store(...));

$router->get('/api/artworks/paintings', function () {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Artworks']);
});

$router->get('/api/artworks/drawings', function () {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Artworks']);
});

$router->get('/api/artworks/photographs', function () {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Artworks']);
});

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
