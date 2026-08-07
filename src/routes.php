<?php

declare(strict_types=1);

use App\Http\Router;

$router = new Router();

$router->get('/', function () {
    echo 'Hello from PHP';
});
