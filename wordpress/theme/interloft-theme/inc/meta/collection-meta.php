<?php
/**
 * Collection Meta Boxes
 */

add_action('add_meta_boxes', 'interloft_collection_meta_boxes');

function interloft_collection_meta_boxes() {
    add_meta_box(
        'interloft_collection_details',
        __('Détails de la collection', 'interloft'),
        'interloft_collection_details_html',
        'collection',
        'normal',
        'high'
    );
}

function interloft_collection_details_html(WP_Post $post) {
    wp_nonce_field('interloft_collection_meta', 'interloft_collection_nonce');
    ?>
    <div class="interloft-meta-field">
        <label for="interloft_collection_slug">Slug (URL)</label>
        <input
            type="text"
            id="interloft_collection_slug"
            name="interloft_collection_slug"
            value="<?php echo esc_attr(get_post_meta($post->ID, 'interloft_collection_slug', true) ?: $post->post_name); ?>"
            class="widefat"
        />
        <p class="description">URL: /collections/[slug]</p>
    </div>

    <div class="interloft-meta-field">
        <label for="interloft_collection_description">Description</label>
        <textarea
            id="interloft_collection_description"
            name="interloft_collection_description"
            rows="4"
            class="widefat"
            placeholder="Décrivez la collection..."
        ><?php echo esc_textarea(get_post_meta($post->ID, 'interloft_collection_description', true)); ?></textarea>
    </div>

    <style>
        .interloft-meta-field { margin-bottom: 16px; }
        .interloft-meta-field label { display: block; font-weight: 600; margin-bottom: 4px; }
        .interloft-meta-field input,
        .interloft-meta-field textarea { width: 100%; }
    </style>
    <?php
}

add_action('save_post_collection', 'interloft_save_collection_meta', 10, 2);

function interloft_save_collection_meta(int $post_id, WP_Post $post) {
    if (!isset($_POST['interloft_collection_nonce']) ||
        !wp_verify_nonce($_POST['interloft_collection_nonce'], 'interloft_collection_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['interloft_collection_slug'])) {
        update_post_meta($post_id, 'interloft_collection_slug', sanitize_text_field($_POST['interloft_collection_slug']));
    }

    if (isset($_POST['interloft_collection_description'])) {
        update_post_meta($post_id, 'interloft_collection_description', sanitize_textarea_field($_POST['interloft_collection_description']));
    }
}
