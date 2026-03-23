<?php
/**
 * Product Meta Boxes
 *
 * Three meta boxes: Details, Specs, Gallery.
 */

add_action('add_meta_boxes', 'interloft_product_meta_boxes');

function interloft_product_meta_boxes() {
    add_meta_box(
        'interloft_product_details',
        __('Détails du produit', 'interloft'),
        'interloft_product_details_html',
        'product',
        'normal',
        'high'
    );

    add_meta_box(
        'interloft_product_specs',
        __('Caractéristiques', 'interloft'),
        'interloft_product_specs_html',
        'product',
        'side'
    );

    add_meta_box(
        'interloft_product_gallery',
        __('Galerie photos', 'interloft'),
        'interloft_product_gallery_html',
        'product',
        'side'
    );
}

function interloft_product_details_html(WP_Post $post) {
    wp_nonce_field('interloft_product_meta', 'interloft_product_nonce');

    $slug         = get_post_meta($post->ID, 'interloft_product_slug', true);
    $collection_id = get_post_meta($post->ID, 'interloft_product_collection', true);

    $collections = get_posts([
        'post_type'      => 'collection',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'title',
        'order'          => 'ASC',
    ]);

    ?>
    <div class="interloft-meta-field">
        <label for="interloft_product_slug">Slug (URL)</label>
        <input
            type="text"
            id="interloft_product_slug"
            name="interloft_product_slug"
            value="<?php echo esc_attr($slug ?: $post->post_name); ?>"
            class="widefat"
            placeholder="canape-alba"
        />
        <p class="description">Utilisé dans l'URL: /products/[catégorie]/[slug]</p>
    </div>

    <div class="interloft-meta-field">
        <label for="interloft_product_collection">Collection (optionnel)</label>
        <select id="interloft_product_collection" name="interloft_product_collection" class="widefat">
            <option value="">Aucune collection</option>
            <?php foreach ($collections as $coll) : ?>
                <option value="<?php echo esc_attr($coll->ID); ?>" <?php selected($collection_id, $coll->ID); ?>>
                    <?php echo esc_html($coll->post_title); ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="interloft-meta-field">
        <label for="interloft_product_image">Image principale (URL)</label>
        <input
            type="url"
            id="interloft_product_image"
            name="interloft_product_image"
            value="<?php echo esc_url(get_post_meta($post->ID, 'interloft_product_image', true)); ?>"
            class="widefat"
            placeholder="https://..."
        />
        <?php $img_url = get_post_meta($post->ID, 'interloft_product_image', true); ?>
        <?php if ($img_url) : ?>
            <img src="<?php echo esc_url($img_url); ?>" style="max-width:200px;margin-top:8px;display:block;object-fit:cover;" />
        <?php endif; ?>
    </div>
    <?php
}

function interloft_product_specs_html(WP_Post $post) {
    $dimensions = get_post_meta($post->ID, 'interloft_product_dimensions', true);
    $materials  = get_post_meta($post->ID, 'interloft_product_materials', true);

    if ($materials) {
        $materials = json_decode($materials, true);
        if (!is_array($materials)) {
            $materials = [];
        }
    } else {
        $materials = [];
    }
    ?>
    <div class="interloft-meta-field">
        <label for="interloft_product_dimensions">Dimensions</label>
        <input
            type="text"
            id="interloft_product_dimensions"
            name="interloft_product_dimensions"
            value="<?php echo esc_attr($dimensions); ?>"
            class="widefat"
            placeholder="L 240 × P 96 × H 78 cm"
        />
    </div>

    <div class="interloft-meta-field">
        <label>Matériaux</label>
        <div id="interloft-materials-list" class="interloft-tag-list">
            <?php foreach ($materials as $m) : ?>
                <span class="interloft-tag">
                    <?php echo esc_html($m); ?>
                    <button type="button" class="interloft-remove-tag" data-field="interloft_product_materials">×</button>
                    <input type="hidden" name="interloft_product_materials_items[]" value="<?php echo esc_attr($m); ?>" />
                </span>
            <?php endforeach; ?>
        </div>
        <input type="hidden" id="interloft_product_materials" name="interloft_product_materials" value="<?php echo esc_attr(json_encode($materials)); ?>" />
        <div class="interloft-add-row">
            <input type="text" id="interloft_new_material" class="widefat" placeholder="Ajouter un matériau..." />
            <button type="button" id="interloft_add_material" class="button">Ajouter</button>
        </div>
    </div>

    <p class="description">Assignez aussi une <strong>catégorie</strong> dans le panneau de droite (boîte Catégories produits).</p>

    <style>
        .interloft-meta-field { margin-bottom: 16px; }
        .interloft-meta-field label { display: block; font-weight: 600; margin-bottom: 4px; }
        .interloft-meta-field input[type="text"],
        .interloft-meta-field input[type="url"],
        .interloft-meta-field select,
        .interloft-meta-field textarea { width: 100%; }
        .interloft-tag { display: inline-flex; align-items: center; gap: 4px; background: #f0f0f0; padding: 2px 6px; margin: 2px; font-size: 12px; }
        .interloft-remove-tag { background: none; border: none; cursor: pointer; color: #999; padding: 0; font-size: 14px; line-height: 1; }
        .interloft-remove-tag:hover { color: #c00; }
        .interloft-tag-list { min-height: 24px; margin-bottom: 4px; }
        .interloft-add-row { display: flex; gap: 4px; margin-top: 4px; }
    </style>

    <script>
    (function() {
        document.addEventListener('DOMContentLoaded', function() {
            var list = document.getElementById('interloft-materials-list');
            var hidden = document.getElementById('interloft_product_materials');
            var input = document.getElementById('interloft_new_material');
            var addBtn = document.getElementById('interloft_add_material');

            function getTags() {
                var tags = [];
                list.querySelectorAll('input[name="interloft_product_materials_items[]"]').forEach(function(el) {
                    tags.push(el.value);
                });
                return tags;
            }

            function renderTags() {
                hidden.value = JSON.stringify(getTags());
            }

            function addTag(val) {
                if (!val.trim()) return;
                var span = document.createElement('span');
                span.className = 'interloft-tag';
                span.textContent = val;
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'interloft-remove-tag';
                btn.textContent = '×';
                btn.onclick = function() { span.remove(); renderTags(); };
                var hid = document.createElement('input');
                hid.type = 'hidden';
                hid.name = 'interloft_product_materials_items[]';
                hid.value = val;
                span.appendChild(btn);
                span.appendChild(hid);
                list.appendChild(span);
                renderTags();
            }

            addBtn.addEventListener('click', function() { addTag(input.value); input.value = ''; });
            input.addEventListener('keypress', function(e) { if (e.key === 'Enter') { e.preventDefault(); addTag(input.value); input.value = ''; } });
        });
    })();
    </script>
    <?php
}

function interloft_product_gallery_html(WP_Post $post) {
    $gallery = get_post_meta($post->ID, 'interloft_product_gallery', true);

    if ($gallery) {
        $gallery = json_decode($gallery, true);
        if (!is_array($gallery)) {
            $gallery = [];
        }
    } else {
        $gallery = [];
    }

    $lines = implode("\n", $gallery);
    ?>
    <div class="interloft-meta-field">
        <label for="interloft_product_gallery">URLs de la galerie (un par ligne)</label>
        <textarea
            id="interloft_product_gallery"
            name="interloft_product_gallery_text"
            rows="5"
            class="widefat"
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
        ><?php echo esc_textarea($lines); ?></textarea>
        <input type="hidden" id="interloft_product_gallery" name="interloft_product_gallery" value="<?php echo esc_attr(json_encode($gallery)); ?>" />
        <p class="description">Entrez une URL d'image par ligne.</p>
    </div>

    <script>
    (function() {
        document.addEventListener('DOMContentLoaded', function() {
            var textArea = document.querySelector('textarea[name="interloft_product_gallery_text"]');
            var hidden = document.getElementById('interloft_product_gallery');
            textArea.addEventListener('input', function() {
                var lines = textArea.value.split('\n').filter(function(l) { return l.trim(); });
                hidden.value = JSON.stringify(lines);
            });
            hidden.value = JSON.stringify(textArea.value.split('\n').filter(function(l) { return l.trim(); }));
        });
    })();
    </script>
    <?php
}

// ─── SAVE HANDLER ─────────────────────────────────────────────────────────────
add_action('save_post_product', 'interloft_save_product_meta', 10, 2);

function interloft_save_product_meta(int $post_id, WP_Post $post) {
    if (!isset($_POST['interloft_product_nonce']) ||
        !wp_verify_nonce($_POST['interloft_product_nonce'], 'interloft_product_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = [
        'interloft_product_slug',
        'interloft_product_collection',
        'interloft_product_dimensions',
        'interloft_product_image',
    ];

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }

    // Materials (array)
    if (isset($_POST['interloft_product_materials'])) {
        $items = isset($_POST['interloft_product_materials_items'])
            ? array_map('sanitize_text_field', (array) $_POST['interloft_product_materials_items'])
            : [];
        update_post_meta($post_id, 'interloft_product_materials', json_encode($items));
    }

    // Gallery (array)
    if (isset($_POST['interloft_product_gallery_text'])) {
        $lines = array_filter(
            array_map('trim', explode("\n", $_POST['interloft_product_gallery_text'])),
            function ($l) { return !empty($l) && filter_var($l, FILTER_VALIDATE_URL); }
        );
        update_post_meta($post_id, 'interloft_product_gallery', json_encode(array_values($lines)));
    }
}
