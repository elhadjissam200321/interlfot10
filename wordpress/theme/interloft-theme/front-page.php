<?php
/**
 * Front page template
 */
get_header();
?>

<div style="max-width:1200px;margin:0 auto;padding:0 24px;">
    <section style="padding:120px 0 80px;text-align:center;">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#666;margin-bottom:24px;">
            Mobilier d'exception — Maroc
        </p>
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(48px,8vw,96px);font-weight:300;letter-spacing:0.05em;line-height:1.1;margin-bottom:32px;">
            INTERloft
        </h1>
        <p style="font-size:14px;color:#666;max-width:480px;margin:0 auto 48px;line-height:1.8;">
            Pièces uniques façonnées par des artisans marocains.<br>
            Chaque meuble raconte une histoire de tradition et de modernité.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
            <a href="<?php echo home_url('/products/'); ?>" style="padding:16px 48px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
                Découvrir la collection
            </a>
            <a href="<?php echo home_url('/collaborations/'); ?>" style="padding:16px 48px;border:1px solid #1a1a1a;color:#1a1a1a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
                Nos architectes
            </a>
        </div>
    </section>

    <?php
    $product_query = new WP_Query([
        'post_type'      => 'product',
        'posts_per_page' => 4,
        'post_status'    => 'publish',
        'orderby'       => 'date',
        'order'          => 'DESC',
    ]);
    $products = [];
    while ($product_query->have_posts()) {
        $product_query->the_post();
        $pid = get_the_ID();
        $products[] = [
            'name'        => get_the_title(),
            'slug'        => get_post_field('post_name', $pid),
            'category'    => '',
            'image'       => get_post_meta($pid, 'interloft_product_image', true),
            'materials'   => [],
        ];
    }
    wp_reset_postdata();
    ?>

    <?php if (!empty($products)) : ?>
    <section style="padding:80px 0;border-top:1px solid #e5e5e5;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:48px;">
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;">Sélection</h2>
            <a href="<?php echo home_url('/products/'); ?>" style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666;text-decoration:none;">
                Voir tout →
            </a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:32px;">
            <?php foreach ($products as $product) : ?>
            <a href="<?php echo home_url('/products/' . $product['slug']); ?>" style="text-decoration:none;color:inherit;display:block;">
                <div style="aspect-ratio:3/4;background:#f5f5f5;overflow:hidden;margin-bottom:16px;position:relative;">
                    <?php if ($product['image']) : ?>
                    <img src="<?php echo esc_url($product['image']); ?>" alt="<?php echo esc_attr($product['name']); ?>"
                         style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s;"
                         onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                    <?php else : ?>
                    <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ccc;font-size:48px;">+</div>
                    <?php endif; ?>
                </div>
                <p style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin-bottom:6px;">
                    <?php echo esc_html($product['category']); ?>
                </p>
                <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;margin-bottom:4px;">
                    <?php echo esc_html($product['name']); ?>
                </h3>
            </a>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <?php
    $categories = get_terms([
        'taxonomy'   => 'product_category',
        'hide_empty'  => false,
        'orderby'     => 'name',
    ]);
    ?>

    <?php if (!empty($categories)) : ?>
    <section style="padding:80px 0;border-top:1px solid #e5e5e5;">
        <h2 style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;margin-bottom:48px;">Catégories</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;">
        <?php foreach ($categories as $cat) : ?>
        <a href="<?php echo get_term_link($cat); ?>"
           style="aspect-ratio:1;background:#f5f5f5;display:flex;align-items:center;justify-content:center;text-decoration:none;color:#1a1a1a;transition:background 0.3s;"
           onmouseover="this.style.background='#e5e5e5'" onmouseout="this.style.background='#f5f5f5'">
                <span style="font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:400;text-align:center;padding:16px;">
                    <?php echo esc_html($cat->name); ?>
                </span>
        </a>
        <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <section style="padding:80px 0;border-top:1px solid #e5e5e5;text-align:center;">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#666;margin-bottom:16px;">Contact</p>
        <h2 style="font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:300;margin-bottom:24px;">
            Parlons de votre projet
        </h2>
        <p style="font-size:14px;color:#666;max-width:400px;margin:0 auto 32px;line-height:1.8;">
            Besoin d'un meuble sur mesure ? Une collaboration avec nos artisans ? Contactez-nous.
        </p>
        <a href="<?php echo home_url('/contact/'); ?>" style="display:inline-block;padding:16px 48px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
            Nous contacter
        </a>
    </section>
</div>

<style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #faf9f7; color: #1a1a1a; }
    a { color: inherit; }
</style>

<?php get_footer();
