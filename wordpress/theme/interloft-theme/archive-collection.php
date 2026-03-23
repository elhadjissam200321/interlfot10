<?php get_header(); ?>

<?php
$collection_query = new WP_Query([
    'post_type'      => 'collection',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'orderby'        => 'title',
    'order'          => 'ASC',
]);
$collections = [];
while ($collection_query->have_posts()) {
    $collection_query->the_post();
    $pid = get_the_ID();
    $thumb = get_the_post_thumbnail_url($pid, 'medium');
    $collections[] = [
        'name'        => get_the_title($pid),
        'slug'        => get_post_field('post_name', $pid),
        'description' => get_the_post_field('post_content', $pid),
        'image'       => $thumb,
    ];
}
wp_reset_postdata();
?>

<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <header style="padding:120px 0 64px;text-align:center;">
        <p class="label-text" style="margin-bottom:16px;">Nos créations</p>
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(40px,6vw,72px);font-weight:300;margin-bottom:16px;">
            Collections
        </h1>
        <p style="font-size:14px;color:#666;max-width:480px;margin:0 auto;line-height:1.8;">
            Chaque collection INTERloft naît d'une vision. Découvrez nos créations pensées pour transformer vos espaces.
        </p>
    </header>

    <?php if (!empty($collections)) : ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:48px 32px;padding-bottom:80px;">
        <?php foreach ($collections as $collection) : ?>
        <a href="<?php echo home_url('/collections/' . $collection['slug']); ?>"
           style="display:block;text-decoration:none;color:inherit;">
            <div style="aspect-ratio:3/4;background:#f5f5f5;overflow:hidden;margin-bottom:20px;position:relative;">
                <?php if ($collection['image']) : ?>
                <img src="<?php echo esc_url($collection['image']); ?>"
                     alt="<?php echo esc_attr($collection['name']); ?>"
                     style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s;"
                     loading="lazy"
                     onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                <?php else : ?>
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ccc;font-size:48px;">+</div>
                <?php endif; ?>
            </div>
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;margin-bottom:8px;">
                <?php echo esc_html($collection['name']); ?>
            </h2>
            <?php if ($collection['description']) : ?>
            <p style="font-size:13px;color:#888;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                <?php echo esc_html(wp_trim_words($collection['description'], 20)); ?>
            </p>
            <?php endif; ?>
        </a>
        <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div style="text-align:center;padding:80px 0;color:#999;">
        <p style="font-size:14px;">Aucune collection trouvée.</p>
    </div>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
