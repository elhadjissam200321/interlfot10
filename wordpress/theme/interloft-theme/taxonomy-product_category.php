<?php
$term = get_queried_object();
$slug = $term->slug ?? '';
$name = $term->name ?? '';
?>
<?php get_header(); ?>

<?php
$product_query = new WP_Query([
    'post_type'      => 'product',
    'posts_per_page' => 100,
    'post_status'    => 'publish',
    'tax_query'     => [
        [
            'taxonomy' => 'product_category',
            'field'     => 'slug',
            'terms'    => $slug,
        ],
    ],
    'orderby'       => 'date',
    'order'         => 'DESC',
]);
$products = [];
while ($product_query->have_posts()) {
    $product_query->the_post();
    $pid = get_the_ID();
    $products[] = [
        'name'       => get_the_title(),
        'slug'       => get_post_field('post_name', $pid),
        'image'      => get_post_meta($pid, 'interloft_product_image', true),
        'dimensions' => get_post_meta($pid, 'interloft_product_dimensions', true),
    ];
}
wp_reset_postdata();
?>

<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <header style="padding:120px 0 64px;text-align:center;">
        <p class="label-text" style="margin-bottom:16px;">
            <a href="<?php echo home_url('/products/'); ?>" style="color:inherit;">Produits</a> —
        </p>
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(40px,6vw,72px);font-weight:300;">
            <?php echo esc_html($name); ?>
        </h1>
    </header>

    <?php if (!empty($products)) : ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:48px 32px;padding-bottom:80px;">
        <?php foreach ($products as $product) : ?>
        <a href="<?php echo home_url('/products/' . $product['slug']); ?>"
           style="display:block;text-decoration:none;color:inherit;">
            <div style="aspect-ratio:3/4;background:#f5f5f5;overflow:hidden;margin-bottom:20px;">
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
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;margin-bottom:4px;">
                <?php echo esc_html($product['name']); ?>
            </h2>
            <?php if (!empty($product['dimensions'])) : ?>
            <p style="font-size:12px;color:#999;"><?php echo esc_html($product['dimensions']); ?></p>
            <?php endif; ?>
        </a>
        <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div style="text-align:center;padding:80px 0;color:#999;">
        <p style="font-size:14px;">Aucun produit dans cette catégorie.</p>
        <a href="<?php echo home_url('/products/'); ?>" style="display:inline-block;margin-top:24px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666;text-decoration:underline;">
            ← Voir tous les produits
        </a>
    </div>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
