<?php
/**
 * INTERloft Theme
 *
 * Headless WordPress CMS theme. Provides CPTs, REST API, and meta boxes
 * for use with the Next.js headless frontend.
 *
 * @package Interloft
 */

if (!defined('ABSPATH')) {
    exit;
}

// ─── VERSION ──────────────────────────────────────────────────────────────────
define('INTERLOFT_THEME_VERSION', '1.0.0');

// ─── INCLUDES ────────────────────────────────────────────────────────────────
require_once get_template_directory() . '/inc/meta/product-meta.php';
require_once get_template_directory() . '/inc/meta/collection-meta.php';
require_once get_template_directory() . '/inc/meta/collaborator-meta.php';
require_once get_template_directory() . '/inc/meta/page-meta.php';

// ─── THEME SETUP ─────────────────────────────────────────────────────────────
add_action('after_setup_theme', 'interloft_setup');

function interloft_setup() {
    load_theme_textdomain('interloft', get_template_directory() . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    add_theme_support('customize-selective-refresh-widgets');

    register_nav_menus([
        'primary' => __('Primary Menu', 'interloft'),
        'footer'  => __('Footer Menu', 'interloft'),
    ]);
}

// ─── ENQUEUE SCRIPTS & STYLES ────────────────────────────────────────────────
add_action('wp_enqueue_scripts', 'interloft_enqueue_scripts');

function interloft_enqueue_scripts() {
    wp_enqueue_style(
        'interloft-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap',
        [],
        null
    );
}

// ─── CPT REGISTRATION ────────────────────────────────────────────────────────
add_action('init', 'interloft_register_cpts');

function interloft_register_cpts() {

    // Products
    register_post_type('product', [
        'labels'       => [
            'name'          => __('Produits', 'interloft'),
            'singular_name' => __('Produit', 'interloft'),
            'add_new_item'  => __('Ajouter un produit', 'interloft'),
            'edit_item'     => __('Modifier le produit', 'interloft'),
            'view_item'     => __('Voir le produit', 'interloft'),
            'search_items'  => __('Rechercher un produit', 'interloft'),
        ],
        'public'       => true,
        'has_archive'   => true,
        'show_in_rest'  => true,
        'rest_base'     => 'products',
        'rewrite'       => ['slug' => 'products'],
        'supports'      => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon'    => 'dashicons-cart',
        'menu_position'=> 25,
        'capabilities'  => ['create_posts' => 'edit_posts'],
    ]);

    // Collections
    register_post_type('collection', [
        'labels'       => [
            'name'          => __('Collections', 'interloft'),
            'singular_name' => __('Collection', 'interloft'),
            'add_new_item'  => __('Ajouter une collection', 'interloft'),
            'edit_item'     => __('Modifier la collection', 'interloft'),
        ],
        'public'       => true,
        'has_archive'   => false,
        'show_in_rest'  => true,
        'rest_base'     => 'collections',
        'rewrite'       => ['slug' => 'collections'],
        'supports'      => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon'    => 'dashicons-art',
        'menu_position'=> 26,
    ]);

    // Collaborators
    register_post_type('collaborator', [
        'labels'       => [
            'name'          => __('Collaborateurs', 'interloft'),
            'singular_name' => __('Collaborateur', 'interloft'),
            'add_new_item'  => __('Ajouter un collaborateur', 'interloft'),
            'edit_item'     => __('Modifier le collaborateur', 'interloft'),
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest'  => true,
        'rest_base'     => 'collaborators',
        'rewrite'       => ['slug' => 'collaborations'],
        'supports'      => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon'    => 'dashicons-groups',
        'menu_position'=> 27,
    ]);
}

// ─── TAXONOMIES ──────────────────────────────────────────────────────────────
add_action('init', 'interloft_register_taxonomies');

function interloft_register_taxonomies() {

    register_taxonomy('product_category', ['product'], [
        'labels'       => [
            'name'              => __('Catégories produits', 'interloft'),
            'singular_name'     => __('Catégorie produit', 'interloft'),
            'search_items'      => __('Rechercher une catégorie', 'interloft'),
            'all_items'         => __('Toutes les catégories', 'interloft'),
            'edit_item'         => __('Modifier la catégorie', 'interloft'),
            'add_new_item'      => __('Ajouter une catégorie', 'interloft'),
        ],
        'hierarchical'  => true,
        'show_in_rest'  => true,
        'rest_base'     => 'product_categories',
        'rewrite'       => ['slug' => 'categorie'],
        'show_admin_column' => true,
    ]);

    // Seed default categories
    add_action('after_switch_theme', 'interloft_seed_categories');

    function interloft_seed_categories() {
        $defaults = [
            'nouveautes'         => 'Nouveautés',
            'canapes'            => 'Canapés',
            'canapes-composables'=> 'Canapés Composables',
            'fauteuils'          => 'Fauteuils',
            'lits'               => 'Lits',
            'meubles'            => 'Meubles',
        ];

        foreach ($defaults as $slug => $name) {
            if (!term_exists($slug, 'product_category')) {
                wp_insert_term($name, 'product_category', ['slug' => $slug]);
            }
        }
    }
}

// ─── REST API CUSTOM ENDPOINTS ───────────────────────────────────────────────
add_action('rest_api_init', 'interloft_register_rest_routes');

function interloft_register_rest_routes() {

    // Custom search endpoint
    register_rest_route('interloft/v1', '/search', [
        'methods'  => 'GET',
        'callback' => 'interloft_api_search',
        'permission_callback' => '__return_true',
        'args' => [
            'q' => [
                'required'          => false,
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ],
    ]);

    // Products with pagination + category filter
    register_rest_route('interloft/v1', '/products', [
        'methods'  => 'GET',
        'callback' => 'interloft_api_products',
        'permission_callback' => '__return_true',
        'args' => [
            'page'     => ['sanitize_callback' => 'absint'],
            'per_page' => ['sanitize_callback' => 'absint'],
            'category' => ['sanitize_callback' => 'sanitize_text_field'],
        ],
    ]);

    // Product categories (flat list for dropdowns)
    register_rest_route('interloft/v1', '/categories', [
        'methods'  => 'GET',
        'callback' => 'interloft_api_categories',
        'permission_callback' => '__return_true',
    ]);

    // Single product by slug
    register_rest_route('interloft/v1', '/products/(?P<slug>[^/]+)', [
        'methods'  => 'GET',
        'callback' => 'interloft_api_product_by_slug',
        'permission_callback' => '__return_true',
        'args' => [
            'slug' => ['sanitize_callback' => 'sanitize_text_field'],
        ],
    ]);

    // Collections list
    register_rest_route('interloft/v1', '/collections', [
        'methods'  => 'GET',
        'callback' => 'interloft_api_collections',
        'permission_callback' => '__return_true',
    ]);

    // Collaborators list
    register_rest_route('interloft/v1', '/collaborators', [
        'methods'  => 'GET',
        'callback' => 'interloft_api_collaborators',
        'permission_callback' => '__return_true',
        'args' => [
            'exclude' => ['sanitize_callback' => 'sanitize_text_field'],
        ],
    ]);
}

// ─── REST API CALLBACKS ───────────────────────────────────────────────────────

function interloft_api_search(WP_REST_Request $request) {
    $query = sanitize_text_field($request->get_param('q') ?: '');

    if (empty($query)) {
        return [
            'products'   => [],
            'categories' => [],
        ];
    }

    // Search products via WP_Query
    $product_args = [
        'post_type'      => 'product',
        'posts_per_page' => 6,
        's'              => $query,
        'post_status'    => 'publish',
    ];

    $product_query = new WP_Query($product_args);
    $products = [];

    foreach ($product_query->posts as $post) {
        $products[] = interloft_format_product($post);
    }

    // Search categories via get_terms
    $categories = get_terms([
        'taxonomy'   => 'product_category',
        'name__like' => $query,
        'number'     => 5,
        'hide_empty' => false,
    ]);

    $formatted_cats = [];
    if (!is_wp_error($categories)) {
        foreach ($categories as $cat) {
            $formatted_cats[] = [
                'id'    => (int) $cat->term_id,
                'slug'  => $cat->slug,
                'label' => $cat->name,
                'href'  => '/categorie/' . $cat->slug,
            ];
        }
    }

    return [
        'products'   => $products,
        'categories' => $formatted_cats,
    ];
}

function interloft_api_products(WP_REST_Request $request) {
    $page     = (int) $request->get_param('page') ?: 1;
    $per_page = min((int) $request->get_param('per_page') ?: 12, 100);
    $category = sanitize_text_field($request->get_param('category') ?: '');

    $args = [
        'post_type'      => 'product',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    if (!empty($category)) {
        $args['tax_query'] = [
            [
                'taxonomy' => 'product_category',
                'field'    => 'slug',
                'terms'    => $category,
            ],
        ];
    }

    $query = new WP_Query($args);
    $products = [];

    foreach ($query->posts as $post) {
        $products[] = interloft_format_product($post);
    }

    return [
        'products' => $products,
        'total'    => (int) $query->found_posts,
        'pages'    => (int) $query->max_num_pages,
        'page'     => $page,
    ];
}

function interloft_api_product_by_slug(WP_REST_Request $request) {
    $slug = sanitize_text_field($request->get_param('slug'));

    $posts = get_posts([
        'name'        => $slug,
        'post_type'   => 'product',
        'post_status'  => 'publish',
        'numberposts' => 1,
    ]);

    if (empty($posts)) {
        return new WP_Error('not_found', 'Product not found', ['status' => 404]);
    }

    return interloft_format_product($posts[0]);
}

function interloft_api_categories(WP_REST_Request $request) {
    $terms = get_terms([
        'taxonomy'   => 'product_category',
        'hide_empty' => false,
        'orderby'    => 'name',
    ]);

    if (is_wp_error($terms)) {
        return [];
    }

    $formatted = [];
    foreach ($terms as $term) {
        $formatted[] = [
            'id'    => (int) $term->term_id,
            'slug'  => $term->slug,
            'label' => $term->name,
            'href'  => '/categorie/' . $term->slug,
        ];
    }

    // Sort: "nouveautes" first
    usort($formatted, function ($a, $b) {
        if ($a['slug'] === 'nouveautes') return -1;
        if ($b['slug'] === 'nouveautes') return 1;
        return strcmp($a['label'], $b['label']);
    });

    return $formatted;
}

function interloft_api_collections(WP_REST_Request $request) {
    $posts = get_posts([
        'post_type'   => 'collection',
        'posts_per_page' => -1,
        'post_status'  => 'publish',
        'orderby'     => 'title',
        'order'       => 'ASC',
    ]);

    $formatted = [];
    foreach ($posts as $post) {
        $formatted[] = interloft_format_collection($post);
    }

    return $formatted;
}

function interloft_api_collaborators(WP_REST_Request $request) {
    $exclude = sanitize_text_field($request->get_param('exclude') ?: '');

    $args = [
        'post_type'   => 'collaborator',
        'posts_per_page' => -1,
        'post_status'  => 'publish',
        'orderby'     => 'title',
        'order'       => 'ASC',
    ];

    if (!empty($exclude)) {
        $args['post__not_in'] = array_map('intval', explode(',', $exclude));
    }

    $posts = get_posts($args);

    $formatted = [];
    foreach ($posts as $post) {
        $formatted[] = interloft_format_collaborator($post);
    }

    return $formatted;
}

// ─── REST FIELD FORMatters ────────────────────────────────────────────────────

function interloft_format_product(WP_Post $post): array {
    $meta = get_post_meta($post->ID);
    $terms = get_the_terms($post, 'product_category');
    $primary_cat = !empty($terms) && !is_wp_error($terms) ? $terms[0] : null;

    $materials = [];
    if (!empty($meta['interloft_product_materials'][0])) {
        $decoded = json_decode($meta['interloft_product_materials'][0], true);
        if (is_array($decoded)) {
            $materials = $decoded;
        }
    }

    $gallery = [];
    if (!empty($meta['interloft_product_gallery'][0])) {
        $decoded = json_decode($meta['interloft_product_gallery'][0], true);
        if (is_array($decoded)) {
            $gallery = $decoded;
        }
    }

    return [
        'id'           => $post->ID,
        'slug'         => $post->post_name,
        'name'         => $post->post_title,
        'description'  => $post->post_content,
        'category'     => $primary_cat ? $primary_cat->slug : '',
        'category_id'  => $primary_cat ? (int) $primary_cat->term_id : 0,
        'collection_id' => !empty($meta['interloft_product_collection'][0]) ? (int) $meta['interloft_product_collection'][0] : 0,
        'materials'    => $materials,
        'dimensions'   => $meta['interloft_product_dimensions'][0] ?? '',
        'image'        => $meta['interloft_product_image'][0] ?? '',
        'gallery'      => $gallery,
        'created_at'   => $post->post_date_gmt,
    ];
}

function interloft_format_collection(WP_Post $post): array {
    $meta = get_post_meta($post->ID);

    return [
        'id'          => $post->ID,
        'slug'        => $post->post_name,
        'label'       => $post->post_title,
        'description' => $post->post_content,
        'href'        => '/collections/' . $post->post_name,
    ];
}

function interloft_format_collaborator(WP_Post $post): array {
    $meta = get_post_meta($post->ID);

    $expertise = [];
    if (!empty($meta['interloft_collaborator_expertise'][0])) {
        $decoded = json_decode($meta['interloft_collaborator_expertise'][0], true);
        if (is_array($decoded)) {
            $expertise = $decoded;
        }
    }

    $featured_project = [];
    if (!empty($meta['interloft_collaborator_featured_project'][0])) {
        $decoded = json_decode($meta['interloft_collaborator_featured_project'][0], true);
        if (is_array($decoded)) {
            $featured_project = $decoded;
        }
    }

    $projects = [];
    if (!empty($meta['interloft_collaborator_projects'][0])) {
        $decoded = json_decode($meta['interloft_collaborator_projects'][0], true);
        if (is_array($decoded)) {
            $projects = $decoded;
        }
    }

    return [
        'id'                  => $post->ID,
        'slug'                => $post->post_name,
        'name'                => $post->post_title,
        'profession'          => $meta['interloft_collaborator_profession'][0] ?? 'Architecte',
        'city'                => $meta['interloft_collaborator_city'][0] ?? '',
        'description'         => $post->post_content,
        'collaboration_story' => $meta['interloft_collaborator_story'][0] ?? '',
        'image'               => $meta['interloft_collaborator_image'][0] ?? '',
        'hero_image'          => $meta['interloft_collaborator_hero_image'][0] ?? '',
        'email'               => $meta['interloft_collaborator_email'][0] ?? '',
        'website'             => $meta['interloft_collaborator_website'][0] ?? '',
        'expertise'           => $expertise,
        'featured_project'    => $featured_project,
        'projects'            => $projects,
    ];
}

// ─── REGISTER POST META FOR REST API ──────────────────────────────────────────
add_action('init', 'interloft_register_post_meta');

function interloft_register_post_meta() {
    $product_meta = [
        'interloft_product_slug',
        'interloft_product_category',
        'interloft_product_collection',
        'interloft_product_description',
        'interloft_product_materials',
        'interloft_product_dimensions',
        'interloft_product_image',
        'interloft_product_gallery',
    ];

    foreach ($product_meta as $key) {
        register_post_meta('product', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'auth_callback' => '__return_true',
        ]);
    }

    $collaborator_meta = [
        'interloft_collaborator_profession',
        'interloft_collaborator_city',
        'interloft_collaborator_story',
        'interloft_collaborator_image',
        'interloft_collaborator_hero_image',
        'interloft_collaborator_email',
        'interloft_collaborator_website',
        'interloft_collaborator_expertise',
        'interloft_collaborator_featured_project',
        'interloft_collaborator_projects',
    ];

    foreach ($collaborator_meta as $key) {
        register_post_meta('collaborator', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'auth_callback' => '__return_true',
        ]);
    }
}

// ─── ADMIN COLUMNS ────────────────────────────────────────────────────────────
add_filter('manage_product_posts_columns', 'interloft_product_columns');
add_action('manage_product_posts_custom_column', 'interloft_product_column_content', 10, 2);

function interloft_product_columns($columns) {
    $new = [];
    foreach ($columns as $key => $value) {
        if ($key === 'date') {
            $new['interloft_category'] = __('Catégorie', 'interloft');
            $new['interloft_image']     = __('Image', 'interloft');
        }
        $new[$key] = $value;
    }
    return $new;
}

function interloft_product_column_content($column, $post_id) {
    if ($column === 'interloft_category') {
        $terms = get_the_terms($post_id, 'product_category');
        if ($terms && !is_wp_error($terms)) {
            echo esc_html($terms[0]->name);
        }
    }
    if ($column === 'interloft_image') {
        $img = get_post_meta($post_id, 'interloft_product_image', true);
        if ($img) {
            echo '<img src="' . esc_url($img) . '" width="60" height="60" style="object-fit:cover" />';
        }
    }
}

// ─── CONTACT FORM HANDLER ─────────────────────────────────────────────────────
add_action('admin_post_interloft_contact', 'interloft_handle_contact');
add_action('admin_post_nopriv_interloft_contact', 'interloft_handle_contact');

function interloft_handle_contact() {
    if (!isset($_POST['contact_nonce']) || !wp_verify_nonce($_POST['contact_nonce'], 'interloft_contact')) {
        wp_redirect(home_url('/contact/?error=invalid'));
        exit;
    }

    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $subject = sanitize_text_field($_POST['subject'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        wp_redirect(home_url('/contact/?error=missing'));
        exit;
    }

    $to = get_option('admin_email');
    $full_subject = $subject ?: '[INTERloft] Nouveau message';
    $body = "Nom: $name\nEmail: $email\nSujet: $subject\n\nMessage:\n$message";
    $headers = "From: $name <$email>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

    wp_mail($to, $full_subject, $body, $headers);

    // Try Supabase if configured
    if (defined('SUPABASE_URL') && defined('SUPABASE_ANON_KEY')) {
        @file_get_contents(SUPABASE_URL . '/rest/v1/contact_messages', false, stream_context_create([
            'http' => [
                'method'  => 'POST',
                'header'  => [
                    'apikey: ' . SUPABASE_ANON_KEY,
                    'Authorization: Bearer ' . SUPABASE_ANON_KEY,
                    'Content-Type: application/json',
                    'Prefer: return=minimal',
                ],
                'content' => json_encode([
                    'name'    => $name,
                    'email'   => $email,
                    'subject' => $subject,
                    'message' => $message,
                ]),
                'ignore_errors' => true,
            ],
        ]));
    }

    wp_redirect(home_url('/contact/?sent=1'));
    exit;
}

// ─── THUMBNAIL COLUMNS ────────────────────────────────────────────────────────
add_image_size('interloft-admin-thumb', 60, 60, true);
