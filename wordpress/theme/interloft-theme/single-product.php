<?php get_header(); ?>

<?php
$queried = get_queried_object();

if (!$queried || $queried->post_type !== 'product') {
    echo '<div style="max-width:1200px;margin:0 auto;padding:120px 32px;text-align:center;">';
    echo '<h1 style="font-family:Cormorant Garamond,serif;font-size:48px;font-weight:300;">Produit introuvable</h1>';
    echo '<a href="' . home_url('/products/') . '" style="display:inline-block;margin-top:24px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666;">← Retour aux produits</a>';
    echo '</div>';
    get_footer();
    exit;
}

$pid = $queried->ID;

$meta = get_post_meta($pid);

$terms = get_the_terms($pid, 'product_category');
$primary_cat = !empty($terms) && !is_wp_error($terms) ? $terms[0] : null;

$materials = [];
if (!empty($meta['interloft_product_materials'][0])) {
    $decoded = json_decode($meta['interloft_product_materials'][0], true);
    if (is_array($decoded)) $materials = $decoded;
}

$gallery = [];
if (!empty($meta['interloft_product_gallery'][0])) {
    $decoded = json_decode($meta['interloft_product_gallery'][0], true);
    if (is_array($decoded)) $gallery = $decoded;
}

$image = $meta['interloft_product_image'][0] ?? '';
$gallery = !empty($gallery) ? $gallery : ($image ? [$image] : []);
$firstImage = $gallery[0] ?? '';
$product_name = get_the_title($pid);
$product_description = $queried->post_content;
$product_dimensions = $meta['interloft_product_dimensions'][0] ?? '';
$cat_slug = $primary_cat ? $primary_cat->slug : '';
$cat_name = $primary_cat ? ucfirst($primary_cat->name) : '';
?>

<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <nav style="padding:120px 0 32px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#999;">
        <a href="<?php echo home_url('/products/'); ?>" style="color:inherit;">Produits</a>
        <span style="margin:0 12px;">—</span>
        <a href="<?php echo home_url('/products/' . esc_attr($cat_slug)); ?>" style="color:inherit;">
            <?php echo esc_html($cat_name); ?>
        </a>
        <span style="margin:0 12px;">—</span>
        <span style="color:#1a1a1a;"><?php echo esc_html($product_name); ?></span>
    </nav>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;padding-bottom:80px;" class="product-grid">
        <div>
            <?php if ($firstImage) : ?>
            <div style="aspect-ratio:3/4;background:#f5f5f5;overflow:hidden;margin-bottom:8px;">
                <img src="<?php echo esc_url($firstImage); ?>"
                     alt="<?php echo esc_attr($product_name); ?>"
                     style="width:100%;height:100%;object-fit:cover;"
                     id="main-product-image">
            </div>
            <?php endif; ?>

            <?php if (count($gallery) > 1) : ?>
            <div style="display:flex;gap:8px;overflow-x:auto;">
                <?php foreach ($gallery as $img) : ?>
                <button onclick="document.getElementById('main-product-image').src=this.querySelector('img').src"
                        style="flex-shrink:0;width:80px;height:80px;background:#f5f5f5;border:none;padding:0;overflow:hidden;cursor:pointer;opacity:0.7;transition:opacity 0.2s;"
                        onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                    <img src="<?php echo esc_url($img); ?>" alt="" style="width:100%;height:100%;object-fit:cover;">
                </button>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>

        <div style="padding-top:24px;">
            <p class="label-text" style="margin-bottom:16px;">
        <a href="<?php echo home_url('/categorie/' . esc_attr($cat_slug)); ?>" style="color:inherit;">
                    <?php echo esc_html($cat_name); ?>
                </a>
            </p>

            <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,48px);font-weight:300;line-height:1.2;margin-bottom:24px;">
                <?php echo esc_html($product_name); ?>
            </h1>

            <?php if ($product_description) : ?>
            <p style="font-size:14px;line-height:1.9;color:#555;margin-bottom:40px;">
                <?php echo esc_html($product_description); ?>
            </p>
            <?php endif; ?>

            <?php if ($product_dimensions) : ?>
            <div style="margin-bottom:24px;">
                <p class="label-text" style="margin-bottom:8px;">Dimensions</p>
                <p style="font-size:14px;color:#555;"><?php echo esc_html($product_dimensions); ?></p>
            </div>
            <?php endif; ?>

            <?php if (!empty($materials)) : ?>
            <div style="margin-bottom:40px;">
                <p class="label-text" style="margin-bottom:12px;">Matériaux</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                    <?php foreach ($materials as $mat) : ?>
                    <span style="padding:6px 16px;background:#f0f0f0;font-size:12px;color:#555;">
                        <?php echo esc_html($mat); ?>
                    </span>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <a href="<?php echo home_url('/contact/?subject=Mobilier: ' . urlencode($product_name)); ?>"
               style="display:inline-block;padding:18px 48px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;transition:opacity 0.2s;"
               onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                Nous contacter
            </a>
        </div>
    </div>
</div>

<style>
@media (max-width: 768px) {
    .product-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
}
</style>

<?php get_footer(); ?>
