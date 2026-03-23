<?php get_header(); ?>

<?php
$slug = get_query_var('name') ?: get_post_field('post_name');

$collab_query = new WP_Query([
    'name'        => $slug,
    'post_type'   => 'collaborator',
    'post_status' => 'publish',
    'numberposts' => 1,
]);

if (!$collab_query->have_posts()) {
    echo '<div style="max-width:1200px;margin:0 auto;padding:120px 32px;text-align:center;">';
    echo '<h1 style="font-family:Cormorant Garamond,serif;font-size:48px;font-weight:300;">Collaborateur introuvable</h1>';
    echo '<a href="' . home_url('/collaborations/') . '" style="display:inline-block;margin-top:24px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666;">← Retour aux collaborations</a>';
    echo '</div>';
    get_footer();
    exit;
}

$collab_query->the_post();
$pid = get_the_ID();
$meta = get_post_meta($pid);

$name = get_the_title($pid);
$description = get_the_post_field('post_content', $pid);
$profession = $meta['interloft_collaborator_profession'][0] ?? '';
$city = $meta['interloft_collaborator_city'][0] ?? '';
$story = $meta['interloft_collaborator_story'][0] ?? '';
$image = get_the_post_thumbnail_url($pid, 'large') ?: ($meta['interloft_collaborator_image'][0] ?? '');
$hero_image = $meta['interloft_collaborator_hero_image'][0] ?? '';
$email = $meta['interloft_collaborator_email'][0] ?? '';
$website = $meta['interloft_collaborator_website'][0] ?? '';

$expertise = [];
if (!empty($meta['interloft_collaborator_expertise'][0])) {
    $decoded = json_decode($meta['interloft_collaborator_expertise'][0], true);
    if (is_array($decoded)) $expertise = $decoded;
}

$featured_project = [];
if (!empty($meta['interloft_collaborator_featured_project'][0])) {
    $decoded = json_decode($meta['interloft_collaborator_featured_project'][0], true);
    if (is_array($decoded)) $featured_project = $decoded;
}

$projects = [];
if (!empty($meta['interloft_collaborator_projects'][0])) {
    $decoded = json_decode($meta['interloft_collaborator_projects'][0], true);
    if (is_array($decoded)) $projects = $decoded;
}

$header_image = $hero_image ?: $image;

wp_reset_postdata();
?>

<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <nav style="padding:120px 0 32px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#999;">
        <a href="<?php echo home_url('/collaborations/'); ?>" style="color:inherit;">Collaborations</a>
        <span style="margin:0 12px;">—</span>
        <span style="color:#1a1a1a;"><?php echo esc_html($name); ?></span>
    </nav>

    <?php if ($header_image) : ?>
    <div style="aspect-ratio:21/9;background:#f5f5f5;overflow:hidden;margin-bottom:64px;">
        <img src="<?php echo esc_url($header_image); ?>"
             alt="<?php echo esc_attr($name); ?>"
             style="width:100%;height:100%;object-fit:cover;">
    </div>
    <?php endif; ?>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;padding-bottom:80px;" class="collab-grid">
        <div>
            <p class="label-text" style="margin-bottom:8px;">
                <?php echo esc_html($profession); ?><?php if ($city) echo ' — ' . esc_html($city); ?>
            </p>
            <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,48px);font-weight:300;line-height:1.2;margin-bottom:32px;">
                <?php echo esc_html($name); ?>
            </h1>

            <?php if ($story) : ?>
            <p style="font-size:15px;line-height:2;color:#555;margin-bottom:32px;">
                <?php echo esc_html($story); ?>
            </p>
            <?php endif; ?>

            <?php if ($description) : ?>
            <p style="font-size:14px;line-height:1.9;color:#666;margin-bottom:40px;">
                <?php echo esc_html($description); ?>
            </p>
            <?php endif; ?>

            <?php if (!empty($expertise)) : ?>
            <div style="margin-bottom:40px;">
                <p class="label-text" style="margin-bottom:12px;">Expertise</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">
                    <?php foreach ($expertise as $exp) : ?>
                    <span style="padding:6px 16px;background:#f0f0f0;font-size:12px;color:#555;">
                        <?php echo esc_html($exp); ?>
                    </span>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <div style="display:flex;gap:16px;flex-wrap:wrap;">
                <?php if ($email) : ?>
                <a href="mailto:<?php echo esc_attr($email); ?>"
                   style="padding:16px 32px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
                    Contacter
                </a>
                <?php endif; ?>
                <?php if ($website) : ?>
                <a href="<?php echo esc_url($website); ?>" target="_blank" rel="noopener"
                   style="padding:16px 32px;border:1px solid #e5e5e5;color:#666;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
                    Site web
                </a>
                <?php endif; ?>
            </div>
        </div>

        <div>
            <?php if (!empty($featured_project) && !empty($featured_project['image'])) : ?>
            <div style="margin-bottom:40px;">
                <p class="label-text" style="margin-bottom:12px;">Projet phare</p>
                <div style="aspect-ratio:4/3;background:#f5f5f5;overflow:hidden;margin-bottom:12px;">
                    <img src="<?php echo esc_url($featured_project['image']); ?>"
                         alt="<?php echo esc_attr($featured_project['name'] ?? ''); ?>"
                         style="width:100%;height:100%;object-fit:cover;">
                </div>
                <?php if (!empty($featured_project['name'])) : ?>
                <h3 style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;margin-bottom:4px;">
                    <?php echo esc_html($featured_project['name']); ?>
                </h3>
                <?php endif; ?>
                <?php if (!empty($featured_project['description'])) : ?>
                <p style="font-size:13px;color:#666;"><?php echo esc_html($featured_project['description']); ?></p>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <?php if (!empty($projects)) : ?>
            <div>
                <p class="label-text" style="margin-bottom:16px;">Projets</p>
                <?php foreach (array_slice($projects, 0, 4) as $project) : ?>
                <div style="display:flex;gap:16px;margin-bottom:16px;">
                    <?php if (!empty($project['image'])) : ?>
                    <div style="width:80px;height:80px;flex-shrink:0;background:#f5f5f5;overflow:hidden;">
                        <img src="<?php echo esc_url($project['image']); ?>"
                             alt="<?php echo esc_attr($project['name'] ?? ''); ?>"
                             style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <?php endif; ?>
                    <div style="padding-top:4px;">
                        <h4 style="font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:400;margin-bottom:4px;">
                            <?php echo esc_html($project['name'] ?? ''); ?>
                        </h4>
                        <?php if (!empty($project['location'])) : ?>
                        <p style="font-size:12px;color:#999;"><?php echo esc_html($project['location']); ?></p>
                        <?php endif; ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<style>
@media (max-width: 768px) {
    .collab-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
}
</style>

<?php get_footer(); ?>
