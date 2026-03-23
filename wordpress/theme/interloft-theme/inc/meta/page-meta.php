<?php
/**
 * Page Meta Boxes
 *
 * Adds subtitle field to specific pages (introduction, contact).
 */

add_action('add_meta_boxes', 'interloft_page_meta_boxes');

function interloft_page_meta_boxes() {
    $tracked = ['introduction', 'contact', 'points-de-vente'];

    foreach ($tracked as $slug) {
        add_meta_box(
            'interloft_page_extra',
            __('Informations supplémentaires', 'interloft'),
            'interloft_page_extra_html',
            'page',
            'side',
            'low',
            [$slug]
        );
    }
}

function interloft_page_extra_html(WP_Post $post, $args) {
    $page_slug = $args['args'][0];
    if ($post->post_name !== $page_slug) {
        echo '<p style="color:#999;font-size:12px;">Ce bloc est associé à la page <code>' . esc_html($page_slug) . '</code>.</p>';
    }

    wp_nonce_field('interloft_page_meta', 'interloft_page_nonce');
    $subtitle = get_post_meta($post->ID, 'interloft_page_subtitle', true);
    $extra    = get_post_meta($post->ID, 'interloft_page_extra', true);
    ?>
    <div class="interloft-meta-field">
        <label for="interloft_page_subtitle">Sous-titre / Label</label>
        <input type="text" id="interloft_page_subtitle" name="interloft_page_subtitle"
            value="<?php echo esc_attr($subtitle); ?>" class="widefat" />
    </div>
    <div class="interloft-meta-field">
        <label for="interloft_page_extra">Information complémentaire</label>
        <textarea id="interloft_page_extra" name="interloft_page_extra"
            rows="3" class="widefat"><?php echo esc_textarea($extra); ?></textarea>
    </div>
    <style>
        .interloft-meta-field { margin-bottom: 12px; }
        .interloft-meta-field > label { display: block; font-weight: 600; margin-bottom: 4px; }
        .interloft-meta-field input, .interloft-meta-field textarea { width: 100%; }
    </style>
    <?php
}

add_action('save_post', 'interloft_save_page_meta', 10, 2);

function interloft_save_page_meta(int $post_id, WP_Post $post) {
    if ($post->post_type !== 'page') return;
    if (!isset($_POST['interloft_page_nonce']) ||
        !wp_verify_nonce($_POST['interloft_page_nonce'], 'interloft_page_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['interloft_page_subtitle'])) {
        update_post_meta($post_id, 'interloft_page_subtitle', sanitize_text_field($_POST['interloft_page_subtitle']));
    }
    if (isset($_POST['interloft_page_extra'])) {
        update_post_meta($post_id, 'interloft_page_extra', sanitize_textarea_field($_POST['interloft_page_extra']));
    }
}
