<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\Database\Connection;

$pdo = Connection::create();

$pdo->exec('
    CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        migration VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
');

$applied = $pdo->query('SELECT migration FROM migrations')->fetchAll(PDO::FETCH_COLUMN);

$files = glob(__DIR__ . '/migrations/*.php');
sort($files);

foreach ($files as $file) {
    $name = basename($file);

    if (in_array($name, $applied, true)) {
        continue;
    }

    $migration = require $file;
    $pdo->exec($migration['up']);

    $stmt = $pdo->prepare('INSERT INTO migrations (migration) VALUES (:name)');
    $stmt->execute(['name' => $name]);

    echo "Applied: {$name}\n";
}

echo "Done.\n";
