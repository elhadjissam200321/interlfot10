<?php
/**
 * INTERloft Headless Theme
 *
 * This theme provides CPTs and REST API for the Next.js headless frontend.
 * Frontend templates are handled by Next.js.
 *
 * @package Interloft
 */

header('HTTP/1.1 200 OK');
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INTERloft CMS</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background: #faf9f7;
            color: #1a1a1a;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 600px;
            padding: 48px;
            text-align: center;
        }
        .logo {
            font-family: 'Cormorant Garamond', serif;
            font-size: 48px;
            font-weight: 300;
            letter-spacing: 0.1em;
            margin-bottom: 32px;
        }
        .subtitle {
            font-size: 14px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #666;
            margin-bottom: 48px;
        }
        .info {
            background: white;
            border: 1px solid #e5e5e5;
            padding: 32px;
            text-align: left;
            font-size: 13px;
            line-height: 1.8;
        }
        .info h2 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 16px;
        }
        .info a {
            color: #1a1a1a;
            text-decoration: underline;
        }
        .endpoints {
            margin-top: 24px;
            padding: 16px;
            background: #f5f5f5;
            font-family: monospace;
            font-size: 12px;
        }
        .endpoints div {
            margin: 4px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">INTERloft</div>
        <div class="subtitle">Headless WordPress CMS</div>
        <div class="info">
            <h2>Installation Complete</h2>
            <p>Your INTERloft WordPress CMS is ready. The Next.js frontend will use the WordPress REST API for content management.</p>
            <div class="endpoints">
                <div><strong>API Base:</strong> http://localhost:8080/interloft/wp-json/interloft/v1/</div>
                <div><strong>Products:</strong> /products</div>
                <div><strong>Categories:</strong> /categories</div>
                <div><strong>Collections:</strong> /collections</div>
                <div><strong>Search:</strong> /search?q=query</div>
            </div>
            <p style="margin-top:24px;"><a href="/interloft/wp-admin/">Go to WordPress Admin →</a></p>
        </div>
    </div>
</body>
</html>
