<?php get_header(); ?>

<?php
$collaborator_query = new WP_Query([
    'post_type'      => 'collaborator',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'orderby'        => 'title',
    'order'          => 'ASC',
]);
$collaborators = [];
while ($collaborator_query->have_posts()) {
    $collaborator_query->the_post();
    $pid = get_the_ID();
    $meta = get_post_meta($pid);
    $thumb = get_the_post_thumbnail_url($pid, 'medium');
    $collaborators[] = [
        'name'       => get_the_title($pid),
        'slug'       => get_post_field('post_name', $pid),
        'profession' => $meta['interloft_collaborator_profession'][0] ?? '',
        'city'       => $meta['interloft_collaborator_city'][0] ?? '',
        'story'      => $meta['interloft_collaborator_story'][0] ?? '',
        'image'      => $thumb ?: ($meta['interloft_collaborator_image'][0] ?? ''),
    ];
}
wp_reset_postdata();
?>

<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <header style="padding:120px 0 64px;text-align:center;">
        <p class="label-text" style="margin-bottom:16px;">Partenaires</p>
        <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(40px,6vw,72px);font-weight:300;margin-bottom:16px;">
            Architectes &amp; designers
        </h1>
        <p style="font-size:14px;color:#666;max-width:480px;margin:0 auto;line-height:1.8;">
            INTERloft collabore avec des architectes et designers marocains qui partagent notre vision de l'artisanat contemporain.
        </p>
    </header>

    <?php if (!empty($collaborators)) : ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:48px 32px;padding-bottom:80px;">
        <?php foreach ($collaborators as $collab) : ?>
        <a href="<?php echo home_url('/collaborations/' . $collab['slug']); ?>"
           style="display:block;text-decoration:none;color:inherit;">
            <div style="aspect-ratio:3/4;background:#f5f5f5;overflow:hidden;margin-bottom:20px;position:relative;">
                <?php if ($collab['image']) : ?>
                <img src="<?php echo esc_url($collab['image']); ?>"
                     alt="<?php echo esc_attr($collab['name']); ?>"
                     style="width:100%;height:100%;object-fit:cover;transition:transform 0.6s;"
                     loading="lazy"
                     onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                <?php else : ?>
                <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ccc;font-size:48px;">+</div>
                <?php endif; ?>
            </div>
            <p class="label-text" style="margin-bottom:6px;">
                <?php echo esc_html($collab['profession']); ?><?php if ($collab['city']) echo ' — ' . esc_html($collab['city']); ?>
            </p>
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;">
                <?php echo esc_html($collab['name']); ?>
            </h2>
            <?php if ($collab['story']) : ?>
            <p style="font-size:13px;color:#888;line-height:1.6;margin-top:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                <?php echo esc_html(wp_trim_words($collab['story'], 20)); ?>
            </p>
            <?php endif; ?>
        </a>
        <?php endforeach; ?>
    </div>
    <?php else : ?>
    <div style="text-align:center;padding:80px 0;color:#999;">
        <p style="font-size:14px;">Aucun collaborateur trouvé.</p>
    </div>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
