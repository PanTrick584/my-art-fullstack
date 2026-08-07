<?php

declare(strict_types=1);

use App\Http\Router;

$router = new Router();

$router->get('/api/hello', function () {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Hello from PHP']);
});

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
