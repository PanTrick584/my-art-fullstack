<?php

declare(strict_types=1);

return [
    'up' => 'CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        artwork_id INTEGER NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
        url VARCHAR(255) NOT NULL
    )',
];
