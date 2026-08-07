<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (str_starts_with($path, '/api/')) {
    require __DIR__ . '/src/routes.php';

    return;
}
$manifestPath = __DIR__ . '/build/.vite/manifest.json';

if (!file_exists($manifestPath)) {
    http_response_code(500);
    echo 'Frontend build not found. Run "npm run build" inside frontend/ first.';
    exit;
}

$manifest = json_decode(file_get_contents($manifestPath), true);
$entry = $manifest['src/main.tsx'];

$scriptSrc = '/build/' . $entry['file'];
$cssFiles = $entry['css'] ?? [];

?>
<!doctype html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Art</title>
    <?php foreach ($cssFiles as $cssFile): ?>
        <link rel="stylesheet" href="/build/<?= htmlspecialchars($cssFile) ?>">
    <?php endforeach; ?>
</head>

<body>
    <div id="root"></div>
    <script type="module" src="<?= htmlspecialchars($scriptSrc) ?>"></script>
</body>

</html>