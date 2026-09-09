<?php

declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (str_starts_with($path, '/api')) {
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

$siteUrl = 'https://chodackiart.pl';
$defaultImage = $siteUrl . '/uploads/trophy/header-1.jpg';

$seoByPath = [
    '/' => [
        'title' => 'Patryk Chodacki — portfolio',
        'description' => 'Portfolio artystyczne Patryka Chodackiego — rysunek, malarstwo i fotografia.',
    ],
    '/trophy' => [
        'title' => 'Trophy — Patryk Chodacki',
        'description' => 'Trofeum — projekt fotograficzny Patryka Chodackiego o pamięci, sile i symbolach dominacji.',
    ],
];

$seo = $seoByPath[$path] ?? [
    'title' => 'Patryk Chodacki',
    'description' => 'Portfolio artystyczne Patryka Chodackiego.',
];

$canonicalUrl = $siteUrl . $path;

?>
<!doctype html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($seo['title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($seo['description']) ?>">
    <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl) ?>">

    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= htmlspecialchars($seo['title']) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($seo['description']) ?>">
    <meta property="og:url" content="<?= htmlspecialchars($canonicalUrl) ?>">
    <meta property="og:image" content="<?= htmlspecialchars($defaultImage) ?>">
    <meta name="twitter:card" content="summary_large_image">

    <?php foreach ($cssFiles as $cssFile): ?>
        <link rel="stylesheet" href="/build/<?= htmlspecialchars($cssFile) ?>">
    <?php endforeach; ?>
</head>

<body>
    <div id="root"></div>
    <script type="module" src="<?= htmlspecialchars($scriptSrc) ?>"></script>
</body>

</html>