<?php get_header(); ?>

<?php
$product_query = new WP_Query([
    'post_type'      => 'product',
    'posts_per_page' => 100,
    'post_status'    => 'publish',
    'orderby'       => 'date',
    'order'          => 'DESC',
]);
$products = [];
while ($product_query->have_posts()) {
    $product_query->the_post();
    $pid = get_the_ID();
    $terms = get_the_terms($pid, 'product_category');
    $cat = !empty($terms) && !is_wp_error($terms) ? $terms[0]->slug : '';
    $products[] = [
        'name'       => get_the_title(),
        'slug'       => get_post_field('post_name', $pid),
        'category'   => $cat,
        'image'      => get_post_meta($pid, 'interloft_product_image', true),
        'materials'  => [],
        'dimensions' => get_post_meta($pid, 'interloft_product_dimensions', true),
    ];
}
wp_reset_postdata();

$categories = get_terms([
    'taxonomy'   => 'product_category',
    'hide_empty'  => false,
    'orderby'     => 'name',
]);
?>

<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <header style="padding:120px 0 64px;text-align:center;">
        <p class="label-text" style="margin-bottom:16px;">Collection</p>
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(40px,6vw,72px);font-weight:300;margin-bottom:16px;">Nos Produits</h1>
        <p style="font-size:14px;color:#666;max-width:480px;margin:0 auto;line-height:1.8;">
            Découvrez notre sélection de mobiliers d'exception, créés par des artisans marocains.
        </p>
    </header>

    <!-- Categories filter -->
    <?php if (!empty($categories)) : ?>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:64px;">
        <a href="<?php echo home_url('/products/'); ?>"
           style="padding:8px 24px;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;border:1px solid #e5e5e5;color:#666;transition:all 0.2s;">
            TOUT
        </a>
        <?php foreach ($categories as $cat) : ?>
        <a href="<?php echo get_term_link($cat); ?>"
           style="padding:8px 24px;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;border:1px solid #e5e5e5;color:#666;transition:all 0.2s;"
           onmouseover="this.style.borderColor='#1a1a1a';this.style.color='#1a1a1a'"
           onmouseout="this.style.borderColor='#e5e5e5';this.style.color='#666'">
             <?php echo esc_html($cat->name); ?>
        </a>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>

    <!-- Products grid -->
    <?php if (!empty($products)) : ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:48px 32px;padding-bottom:80px;">
        <?php foreach ($products as $product) : ?>
        <a href="<?php echo home_url('/products/' . $product['slug']); ?>"
           style="display:block;text-decoration:none;color:inherit;">
            <div style="aspect-ratio:3/4;background:#f5f5f5;overflow:hidden;margin-bottom:20px;position:relative;">
                <?php if ($product['image']) : ?>
                <img src="<?php echo esc_url($product['image']); ?>"
                     alt="<?php echo esc_attr($product['name']); ?>"
                     style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s;"
                     loading="lazy"
                     onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                <?php else : ?>
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ccc;font-size:48px;">+</div>
                <?php endif; ?>
            </div>
            <p class="label-text" style="margin-bottom:8px;">
                <?php echo esc_html(ucfirst($product['category'])); ?>
            </p>
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;margin-bottom:4px;">
                <?php echo esc_html($product['name']); ?>
            </h2>
            <?php if (!empty($product['materials'])) : ?>
            <p style="font-size:12px;color:#999;line-height:1.6;">
                <?php echo esc_html(implode(' — ', array_slice($product['materials'], 0, 2))); ?>
            </p>
            <?php endif; ?>
        </a>
        <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div style="text-align:center;padding:80px 0;color:#999;">
        <p style="font-size:14px;">Aucun produit trouvé.</p>
    </div>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
