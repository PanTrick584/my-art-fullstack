<?php

declare(strict_types=1);

return [
    'up' => 'CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        username VARCHAR(100) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT \'user\' CHECK (role IN (\'user\', \'admin\')),
        created_at TIMESTAMP NOT NULL DEFAULT now()
    )',
];
