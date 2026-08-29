<?php

declare(strict_types=1);

use App\Database\Connection;
use App\Database\QueryBuilder;
use App\Http\Router;
use App\Repository\ArtworkRepository;
use App\Repository\ImageRepository;
use App\Service\ArtworkService;
use App\Service\ImageService;
use App\Controller\ImageController;
use App\Controller\ArtworkController;
use App\Controller\AuthController;
use App\Repository\UserRepository;
use App\Service\AuthService;

session_start();

$router = new Router();
$pdo = Connection::create();
$queryBuilder = new QueryBuilder($pdo);

$artworkRepository = new ArtworkRepository($queryBuilder);
$artworkService = new ArtworkService($artworkRepository);
$artworkController = new ArtworkController($artworkService);

$imageRepository = new ImageRepository($queryBuilder);
$imageService = new ImageService($imageRepository, $pdo);
$imageController = new ImageController($imageService, $pdo);

$userRepository = new UserRepository($queryBuilder);
$authService = new AuthService($userRepository);
$authController = new AuthController($authService);

$router->get('/api/hello', function () {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Hello from PHP! Artworks app here!']);
});

//ARTWORKS
$router->get('/api/artworks', $artworkController->index(...));
$router->post('/api/artworks', $artworkController->store(...));
$router->put('/api/artworks', $artworkController->update(...));
// IMAGES
$router->get('/api/images', $imageController->index(...));
$router->post('/api/images', $imageController->store(...));
$router->post('/api/images/bulk', $imageController->storeBulk(...));

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

$router->put('/api/artworks/status', $artworkController->updateStatus(...));

// AUTH
$router->get('/api/me', $authController->me(...));
$router->post('/api/register', $authController->register(...));
$router->post('/api/login', $authController->login(...));
$router->post('/api/logout', $authController->logout(...));

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
