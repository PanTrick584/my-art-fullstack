<?php

declare(strict_types=1);

namespace App\Http;


class Router
{
    private array $routes = [];

    public function get(string $path, callable $handler)
    {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, callable $handler)
    {
        $this->routes['POST'][$path] = $handler;
    }

    public function dispatch(string $method, string $requestUri)
    {
        $path = parse_url($requestUri, PHP_URL_PATH);

        $handler = $this->routes[$method][$path] ?? null;

        if ($handler === null) {
            http_response_code(404);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'NotFound']);
        }
    }
}
