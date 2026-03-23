<?php get_header(); ?>

<?php
$slug = get_query_var('name') ?: get_post_field('post_name');

$collection_query = new WP_Query([
    'name'        => $slug,
    'post_type'   => 'collection',
    'post_status' => 'publish',
    'numberposts' => 1,
]);

if (!$collection_query->have_posts()) {
    echo '<div style="max-width:1200px;margin:0 auto;padding:120px 32px;text-align:center;">';
    echo '<h1 style="font-family:Cormorant Garamond,serif;font-size:48px;font-weight:300;">Collection introuvable</h1>';
    echo '<a href="' . home_url('/collections/') . '" style="display:inline-block;margin-top:24px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666;">← Retour aux collections</a>';
    echo '</div>';
    get_footer();
    exit;
}

$collection_query->the_post();
$pid = get_the_ID();
$name = get_the_title($pid);
$description = get_the_post_field('post_content', $pid);
$hero_image = get_the_post_thumbnail_url($pid, 'large');
wp_reset_postdata();
?>

<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <nav style="padding:120px 0 32px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#999;">
        <a href="<?php echo home_url('/collections/'); ?>" style="color:inherit;">Collections</a>
        <span style="margin:0 12px;">—</span>
        <span style="color:#1a1a1a;"><?php echo esc_html($name); ?></span>
    </nav>

    <?php if ($hero_image) : ?>
    <div style="aspect-ratio:16/9;background:#f5f5f5;overflow:hidden;margin-bottom:64px;">
        <img src="<?php echo esc_url($hero_image); ?>"
             alt="<?php echo esc_attr($name); ?>"
             style="width:100%;height:100%;object-fit:cover;">
    </div>
    <?php endif; ?>

    <div style="max-width:720px;margin:0 auto;text-align:center;padding-bottom:80px;">
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.2;margin-bottom:32px;">
            <?php echo esc_html($name); ?>
        </h1>
        <?php if ($description) : ?>
        <p style="font-size:15px;line-height:2;color:#555;">
            <?php echo esc_html($description); ?>
        </p>
        <?php endif; ?>
        <a href="<?php echo home_url('/contact/?subject=Collection: ' . urlencode($name)); ?>"
           style="display:inline-block;margin-top:40px;padding:16px 48px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
            Nous contacter
        </a>
    </div>
</div>

<?php get_footer(); ?>
