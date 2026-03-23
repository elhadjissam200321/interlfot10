<?php get_header(); ?>

<div style="max-width:800px;margin:0 auto;padding:120px 32px;text-align:center;">
    <p class="label-text" style="margin-bottom:16px;">Erreur 404</p>
    <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(48px,8vw,96px);font-weight:300;line-height:1.1;margin-bottom:24px;">
        Page introuvable
    </h1>
    <p style="font-size:14px;color:#666;max-width:400px;margin:0 auto 40px;line-height:1.8;">
        La page que vous recherchez n'existe pas ou a été déplacée.
    </p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
        <a href="<?php echo home_url('/'); ?>"
           style="display:inline-block;padding:16px 48px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
            Accueil
        </a>
        <a href="<?php echo home_url('/products/'); ?>"
           style="display:inline-block;padding:16px 48px;border:1px solid #e5e5e5;color:#1a1a1a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
            Produits
        </a>
    </div>
</div>

<?php get_footer(); ?>
