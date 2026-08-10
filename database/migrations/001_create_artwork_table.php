<?php

declare(strict_types=1);

return [
    'up' => 'CREATE TABLE IF NOT EXISTS artworks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        dimensions VARCHAR(255) NOT NULL,
        year_of_creation VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL
    )',
];
