<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('—', true, 'right'); ?> <?php bloginfo('name'); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background: #faf9f7;
            color: #1a1a1a;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; display: block; }
        ::selection { background: #1a1a1a; color: #faf9f7; }

        /* Navbar */
        .navbar {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 1000;
            background: rgba(250, 249, 247, 0.95);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid #e5e5e5;
            padding: 0 32px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .navbar-nav {
            display: flex;
            gap: 32px;
            list-style: none;
        }
        .navbar-nav a {
            font-size: 10px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #666;
            transition: color 0.2s;
        }
        .navbar-nav a:hover { color: #1a1a1a; }
        .navbar-logo {
            font-family: 'Cormorant Garamond', serif;
            font-size: 24px;
            font-weight: 400;
            letter-spacing: 0.1em;
        }
        .navbar-actions {
            display: flex;
            gap: 16px;
            align-items: center;
        }
        .navbar-actions a {
            font-size: 10px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #666;
            transition: color 0.2s;
        }
        .navbar-actions a:hover { color: #1a1a1a; }

        /* Main content */
        main { padding-top: 72px; }

        /* Footer */
        footer {
            border-top: 1px solid #e5e5e5;
            padding: 64px 32px;
            margin-top: 80px;
        }
        .footer-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 48px;
        }
        .footer-col h4 {
            font-size: 9px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #999;
            margin-bottom: 16px;
        }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 8px; }
        .footer-col a {
            font-size: 13px;
            color: #666;
            transition: color 0.2s;
        }
        .footer-col a:hover { color: #1a1a1a; }
        .footer-bottom {
            max-width: 1200px;
            margin: 48px auto 0;
            padding-top: 32px;
            border-top: 1px solid #e5e5e5;
            font-size: 11px;
            color: #999;
            text-align: center;
        }

        /* Label text */
        .label-text {
            font-size: 9px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #999;
        }

        /* Section headings */
        h1, h2, h3 {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 400;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .navbar { padding: 0 16px; }
            .navbar-nav { display: none; }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <ul class="navbar-nav">
            <li><a href="<?php echo home_url('/products/'); ?>">Produits</a></li>
            <li><a href="<?php echo home_url('/collections/'); ?>">Collections</a></li>
            <li><a href="<?php echo home_url('/collaborations/'); ?>">Collaborations</a></li>
            <li><a href="<?php echo home_url('/introduction/'); ?>">À propos</a></li>
        </ul>
        <a href="<?php echo home_url('/'); ?>" class="navbar-logo">INTERloft</a>
        <div class="navbar-actions">
            <a href="<?php echo home_url('/contact/'); ?>">Contact</a>
            <a href="<?php echo home_url('/compte/'); ?>">Compte</a>
        </div>
    </nav>
    <main>
