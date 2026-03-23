<?php
/**
 * Collaborator Meta Boxes
 */

add_action('add_meta_boxes', 'interloft_collaborator_meta_boxes');

function interloft_collaborator_meta_boxes() {
    add_meta_box(
        'interloft_collaborator_profile',
        __('Profil', 'interloft'),
        'interloft_collaborator_profile_html',
        'collaborator',
        'normal',
        'high'
    );

    add_meta_box(
        'interloft_collaborator_contact',
        __('Contact', 'interloft'),
        'interloft_collaborator_contact_html',
        'collaborator',
        'side'
    );

    add_meta_box(
        'interloft_collaborator_projects',
        __('Projets', 'interloft'),
        'interloft_collaborator_projects_html',
        'collaborator',
        'normal'
    );
}

function interloft_collaborator_profile_html(WP_Post $post) {
    wp_nonce_field('interloft_collaborator_meta', 'interloft_collaborator_nonce');

    $profession     = get_post_meta($post->ID, 'interloft_collaborator_profession', true);
    $city           = get_post_meta($post->ID, 'interloft_collaborator_city', true);
    $story          = get_post_meta($post->ID, 'interloft_collaborator_story', true);
    $image          = get_post_meta($post->ID, 'interloft_collaborator_image', true);
    $hero_image     = get_post_meta($post->ID, 'interloft_collaborator_hero_image', true);

    $expertise_raw  = get_post_meta($post->ID, 'interloft_collaborator_expertise', true);
    $expertise      = $expertise_raw ? json_decode($expertise_raw, true) : [];
    if (!is_array($expertise)) $expertise = [];

    $featured_raw   = get_post_meta($post->ID, 'interloft_collaborator_featured_project', true);
    $featured       = $featured_raw ? json_decode($featured_raw, true) : [];
    if (!is_array($featured)) $featured = [];

    ?>
    <div class="interloft-meta-field">
        <label for="interloft_collaborator_profession">Profession</label>
        <select id="interloft_collaborator_profession" name="interloft_collaborator_profession" class="widefat">
            <option value="Architecte" <?php selected($profession, 'Architecte'); ?>>Architecte</option>
            <option value="Designer d'intérieur" <?php selected($profession, "Designer d'intérieur"); ?>>Designer d'intérieur</option>
        </select>
    </div>

    <div class="interloft-meta-field">
        <label for="interloft_collaborator_city">Ville</label>
        <input type="text" id="interloft_collaborator_city" name="interloft_collaborator_city"
            value="<?php echo esc_attr($city); ?>" class="widefat" />
    </div>

    <div class="interloft-meta-field">
        <label for="interloft_collaborator_story">L'histoire de la collaboration</label>
        <textarea id="interloft_collaborator_story" name="interloft_collaborator_story"
            rows="4" class="widefat"><?php echo esc_textarea($story); ?></textarea>
    </div>

    <div class="interloft-meta-field">
        <label for="interloft_collaborator_image">Photo de profil (URL)</label>
        <input type="url" id="interloft_collaborator_image" name="interloft_collaborator_image"
            value="<?php echo esc_url($image); ?>" class="widefat" />
        <?php if ($image) echo '<img src="' . esc_url($image) . '" width="80" height="80" style="object-fit:cover;margin-top:4px;display:block;border-radius:50%;" />'; ?>
    </div>

    <div class="interloft-meta-field">
        <label for="interloft_collaborator_hero_image">Image hero (URL)</label>
        <input type="url" id="interloft_collaborator_hero_image" name="interloft_collaborator_hero_image"
            value="<?php echo esc_url($hero_image); ?>" class="widefat" />
        <?php if ($hero_image) echo '<img src="' . esc_url($hero_image) . '" style="max-width:200px;margin-top:4px;display:block;" />'; ?>
    </div>

    <div class="interloft-meta-field">
        <label>Expertise / Tags</label>
        <div id="interloft-expertise-list" class="interloft-tag-list">
            <?php foreach ($expertise as $exp) : ?>
                <span class="interloft-tag">
                    <?php echo esc_html($exp); ?>
                    <button type="button" class="interloft-remove-tag">×</button>
                    <input type="hidden" name="interloft_collaborator_expertise_items[]" value="<?php echo esc_attr($exp); ?>" />
                </span>
            <?php endforeach; ?>
        </div>
        <input type="hidden" id="interloft_collaborator_expertise" name="interloft_collaborator_expertise"
            value="<?php echo esc_attr($expertise_raw ?: '[]'); ?>" />
        <div class="interloft-add-row">
            <input type="text" id="interloft_new_expertise" class="widefat" placeholder="Ajouter une expertise..." />
            <button type="button" id="interloft_add_expertise" class="button">Ajouter</button>
        </div>
    </div>

    <div class="interloft-meta-field">
        <label>Projet Phare</label>
        <input type="text" name="interloft_collaborator_featured_name"
            value="<?php echo esc_attr($featured['name'] ?? ''); ?>"
            class="widefat" placeholder="Nom du projet" style="margin-bottom:4px;" />
        <textarea name="interloft_collaborator_featured_description"
            class="widefat" rows="2" placeholder="Description"><?php echo esc_textarea($featured['description'] ?? ''); ?></textarea>
        <input type="url" name="interloft_collaborator_featured_image"
            value="<?php echo esc_url($featured['image'] ?? ''); ?>"
            class="widefat" placeholder="Image URL du projet" style="margin-top:4px;" />
        <input type="hidden" id="interloft_collaborator_featured_project" name="interloft_collaborator_featured_project"
            value="<?php echo esc_attr($featured_raw ?: '{"name":"","description":"","image":""}'); ?>" />
    </div>

    <style>
        .interloft-meta-field { margin-bottom: 16px; }
        .interloft-meta-field > label { display: block; font-weight: 600; margin-bottom: 4px; }
        .interloft-meta-field input, .interloft-meta-field select, .interloft-meta-field textarea { width: 100%; }
        .interloft-tag { display: inline-flex; align-items: center; gap: 4px; background: #f0f0f0; padding: 2px 6px; margin: 2px; font-size: 12px; }
        .interloft-remove-tag { background: none; border: none; cursor: pointer; color: #999; padding: 0; font-size: 14px; line-height: 1; }
        .interloft-remove-tag:hover { color: #c00; }
        .interloft-tag-list { min-height: 24px; margin-bottom: 4px; }
        .interloft-add-row { display: flex; gap: 4px; margin-top: 4px; }
    </style>

    <script>
    (function() {
        document.addEventListener('DOMContentLoaded', function() {
            // Expertise
            var expList = document.getElementById('interloft-expertise-list');
            var expHidden = document.getElementById('interloft_collaborator_expertise');
            function getExpItems() {
                var items = [];
                expList.querySelectorAll('input[name="interloft_collaborator_expertise_items[]"]').forEach(function(el) { items.push(el.value); });
                return items;
            }
            function renderExp() { expHidden.value = JSON.stringify(getExpItems()); }
            expList.addEventListener('click', function(e) {
                if (e.target.classList.contains('interloft-remove-tag')) {
                    e.target.closest('.interloft-tag').remove();
                    renderExp();
                }
            });
            document.getElementById('interloft_add_expertise').addEventListener('click', function() {
                var input = document.getElementById('interloft_new_expertise');
                if (!input.value.trim()) return;
                var span = document.createElement('span');
                span.className = 'interloft-tag';
                span.textContent = input.value;
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'interloft-remove-tag';
                btn.textContent = '×';
                var hid = document.createElement('input');
                hid.type = 'hidden';
                hid.name = 'interloft_collaborator_expertise_items[]';
                hid.value = input.value;
                span.appendChild(btn);
                span.appendChild(hid);
                expList.appendChild(span);
                input.value = '';
                renderExp();
            });

            // Featured project
            var featHidden = document.getElementById('interloft_collaborator_featured_project');
            function updateFeatured() {
                var name = document.querySelector('input[name="interloft_collaborator_featured_name"]').value;
                var desc = document.querySelector('textarea[name="interloft_collaborator_featured_description"]').value;
                var img  = document.querySelector('input[name="interloft_collaborator_featured_image"]').value;
                featHidden.value = JSON.stringify({name: name, description: desc, image: img});
            }
            document.querySelectorAll('input[name="interloft_collaborator_featured_name"], input[name="interloft_collaborator_featured_image"], textarea[name="interloft_collaborator_featured_description"]').forEach(function(el) {
                el.addEventListener('input', updateFeatured);
            });
        });
    })();
    </script>
    <?php
}

function interloft_collaborator_contact_html(WP_Post $post) {
    $email   = get_post_meta($post->ID, 'interloft_collaborator_email', true);
    $website = get_post_meta($post->ID, 'interloft_collaborator_website', true);
    ?>
    <div class="interloft-meta-field">
        <label for="interloft_collaborator_email">Email</label>
        <input type="email" id="interloft_collaborator_email" name="interloft_collaborator_email"
            value="<?php echo esc_attr($email); ?>" class="widefat" />
    </div>
    <div class="interloft-meta-field">
        <label for="interloft_collaborator_website">Site web</label>
        <input type="url" id="interloft_collaborator_website" name="interloft_collaborator_website"
            value="<?php echo esc_url($website); ?>" class="widefat" placeholder="https://..." />
    </div>
    <style>.interloft-meta-field { margin-bottom: 12px; } .interloft-meta-field label { display: block; font-weight: 600; margin-bottom: 4px; }</style>
    <?php
}

function interloft_collaborator_projects_html(WP_Post $post) {
    $projects_raw = get_post_meta($post->ID, 'interloft_collaborator_projects', true);
    $projects = $projects_raw ? json_decode($projects_raw, true) : [];
    if (!is_array($projects)) $projects = [];

    $existing = [];
    foreach ($projects as $p) {
        $existing[] = ($p['name'] ?? '') . '|' . ($p['image'] ?? '') . '|' . ($p['location'] ?? '');
    }
    ?>
    <div class="interloft-meta-field">
        <label>Projets (un par ligne: Nom | Image URL | Lieu)</label>
        <textarea id="interloft_collaborator_projects_text" name="interloft_collaborator_projects_text"
            rows="6" class="widefat" placeholder="Nom du projet | https://... | Casablanca"><?php
            echo esc_textarea(implode("\n", $existing));
        ?></textarea>
        <input type="hidden" id="interloft_collaborator_projects" name="interloft_collaborator_projects"
            value="<?php echo esc_attr($projects_raw ?: '[]'); ?>" />
        <p class="description">Un projet par ligne: <code>Nom | URL image | Lieu</code></p>
    </div>

    <script>
    (function() {
        document.addEventListener('DOMContentLoaded', function() {
            var textArea = document.getElementById('interloft_collaborator_projects_text');
            var hidden = document.getElementById('interloft_collaborator_projects');
            function parseLines(val) {
                return val.split('\n').map(function(line) {
                    var parts = line.split('|').map(function(p) { return p.trim(); });
                    return { name: parts[0] || '', image: parts[1] || '', location: parts[2] || '' };
                }).filter(function(p) { return p.name || p.image; });
            }
            function update() { hidden.value = JSON.stringify(parseLines(textArea.value)); }
            textArea.addEventListener('input', update);
            update();
        });
    })();
    </script>
    <style>.interloft-meta-field { margin-bottom: 12px; } .interloft-meta-field label { display: block; font-weight: 600; margin-bottom: 4px; }</style>
    <?php
}

add_action('save_post_collaborator', 'interloft_save_collaborator_meta', 10, 2);

function interloft_save_collaborator_meta(int $post_id, WP_Post $post) {
    if (!isset($_POST['interloft_collaborator_nonce']) ||
        !wp_verify_nonce($_POST['interloft_collaborator_nonce'], 'interloft_collaborator_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $text_fields = [
        'interloft_collaborator_profession',
        'interloft_collaborator_city',
        'interloft_collaborator_story',
        'interloft_collaborator_email',
        'interloft_collaborator_website',
        'interloft_collaborator_image',
        'interloft_collaborator_hero_image',
    ];

    foreach ($text_fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }

    // Expertise array
    if (isset($_POST['interloft_collaborator_expertise_items'])) {
        update_post_meta($post_id, 'interloft_collaborator_expertise',
            json_encode(array_map('sanitize_text_field', (array) $_POST['interloft_collaborator_expertise_items'])));
    }

    // Featured project JSON
    if (isset($_POST['interloft_collaborator_featured_project'])) {
        $data = json_decode($_POST['interloft_collaborator_featured_project'], true);
        if (is_array($data)) {
            $data = array_map('sanitize_text_field', $data);
            update_post_meta($post_id, 'interloft_collaborator_featured_project', json_encode($data));
        }
    }

    // Projects JSON (parsed from textarea)
    if (isset($_POST['interloft_collaborator_projects_text'])) {
        $lines = array_filter(array_map('trim', explode("\n", $_POST['interloft_collaborator_projects_text'])));
        $projects = [];
        foreach ($lines as $line) {
            $parts = array_map('trim', explode('|', $line));
            $projects[] = [
                'name'     => sanitize_text_field($parts[0] ?? ''),
                'image'    => esc_url_raw($parts[1] ?? ''),
                'location' => sanitize_text_field($parts[2] ?? ''),
            ];
        }
        update_post_meta($post_id, 'interloft_collaborator_projects', json_encode($projects));
    }
}
