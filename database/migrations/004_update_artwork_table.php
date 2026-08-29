<?php

declare(strict_types=1);

return [
    'up' => 'ALTER TABLE artworks
        ADD COLUMN
        status VARCHAR(20) NOT NULL DEFAULT \'approved\' CHECK (status IN (\'pending\', \'approved\', \'rejected\')),
        ADD COLUMN
        owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL
'
];
