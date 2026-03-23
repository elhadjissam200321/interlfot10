<?php
/**
 * INTERloft — Supabase to WordPress Migration Script
 *
 * Run via: wp eval-file wordpress/migration/migrate-from-supabase.php
 *
 * Prerequisites:
 * 1. Install WP-CLI: curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
 * 2. chmod +x wp-cli.phar && sudo mv wp-cli.phar /usr/local/bin/wp
 * 3. Make sure the INTERloft theme is active
 *
 * This script:
 * - Fetches all products, categories, collections, and collaborators from Supabase
 * - Creates corresponding WordPress CPT posts with all meta fields
 * - Sets taxonomy terms for products
 * - Reports progress and errors
 */

// ─── CONFIGURATION ─────────────────────────────────────────────────────────────
define('SUPABASE_URL', getenv('SUPABASE_URL') ?: 'https://your-project.supabase.co');
define('SUPABASE_KEY', getenv('SUPABASE_SERVICE_ROLE_KEY') ?: 'your-service-role-key');
define('BATCH_SIZE', 20);

// ─── UTILITIES ─────────────────────────────────────────────────────────────────

function interloft_log($msg) {
    WP_CLI::log('[' . date('H:i:s') . '] ' . $msg);
}

function interloft_error($msg) {
    WP_CLI::error('ERROR: ' . $msg, false);
}

function interloft_success($msg) {
    WP_CLI::success($msg);
}

function interloft_http($endpoint, $method = 'GET', $data = null) {
    $url = rtrim(SUPABASE_URL, '/') . '/rest/v1/' . ltrim($endpoint, '/');

    $headers = [
        'apikey'        => SUPABASE_KEY,
        'Authorization' => 'Bearer ' . SUPABASE_KEY,
        'Content-Type'  => 'application/json',
        'Prefer'        => 'return=representation',
    ];

    $args = [
        'method'      => $method,
        'headers'      => $headers,
        'timeout'      => 30,
    ];

    if ($data !== null) {
        $args['body'] = json_encode($data);
    }

    $response = wp_remote_request($url, $args);

    if (is_wp_error($response)) {
        return ['error' => $response->get_error_message()];
    }

    $body = wp_remote_retrieve_body($response);
    $code = wp_remote_retrieve_response_code($response);

    if ($code >= 400) {
        return ['error' => "HTTP $code: $body"];
    }

    $decoded = json_decode($body, true);
    return $decoded;
}

// ─── MIGRATION ─────────────────────────────────────────────────────────────────

function interloft_migrate_categories() {
    interloft_log('Migrating categories...');

    $result = interloft_http('/categories');

    if (isset($result['error'])) {
        interloft_error('Categories: ' . $result['error']);
        return 0;
    }

    if (empty($result)) {
        interloft_log('No categories found in Supabase. Using defaults.');
        $defaults = [
            'nouveautes'          => 'Nouveautés',
            'canapes'             => 'Canapés',
            'canapes-composables' => 'Canapés Composables',
            'fauteuils'          => 'Fauteuils',
            'lits'                => 'Lits',
            'meubles'            => 'Meubles',
        ];
        foreach ($defaults as $slug => $name) {
            if (!term_exists($slug, 'product_category')) {
                wp_insert_term($name, 'product_category', ['slug' => $slug]);
            }
        }
        return count($defaults);
    }

    $count = 0;
    foreach ($result as $cat) {
        $slug = sanitize_title($cat['id'] ?? $cat['label'] ?? 'category-' . $count);
        if (!term_exists($slug, 'product_category')) {
            wp_insert_term($cat['label'] ?? $slug, 'product_category', [
                'slug'   => $slug,
                'description' => $cat['description'] ?? '',
            ]);
            $count++;
        }
    }

    interloft_success("Migrated $count categories.");
    return $count;
}

function interloft_migrate_collections() {
    interloft_log('Migrating collections...');

    $result = interloft_http('/collections');

    if (isset($result['error'])) {
        interloft_error('Collections: ' . $result['error']);
        return 0;
    }

    $count = 0;
    foreach ($result as $coll) {
        $slug = sanitize_title($coll['id'] ?? $coll['label'] ?? 'collection-' . $count);

        // Check if already exists
        $exists = get_posts([
            'name'        => $slug,
            'post_type'   => 'collection',
            'post_status' => 'publish',
            'numberposts' => 1,
        ]);

        if (!empty($exists)) {
            interloft_log("  Skipping collection: {$slug} (already exists)");
            continue;
        }

        $post_id = wp_insert_post([
            'post_type'    => 'collection',
            'post_status'  => 'publish',
            'post_name'    => $slug,
            'post_title'   => $coll['label'] ?? $slug,
            'post_content' => $coll['description'] ?? '',
        ]);

        if (!is_wp_error($post_id)) {
            update_post_meta($post_id, 'interloft_collection_slug', $slug);
            update_post_meta($post_id, 'interloft_collection_description', $coll['description'] ?? '');
            $count++;
        } else {
            interloft_error("Failed to create collection: " . $coll['label']);
        }
    }

    interloft_success("Migrated $count collections.");
    return $count;
}

function interloft_migrate_collaborators() {
    interloft_log('Migrating collaborators...');

    $result = interloft_http('/collaborators');

    if (isset($result['error'])) {
        interloft_error('Collaborators: ' . $result['error']);
        return 0;
    }

    $count = 0;
    foreach ($result as $collab) {
        $slug = sanitize_title($collab['slug'] ?? $collab['name'] ?? 'collaborator-' . $count);

        $exists = get_posts([
            'name'        => $slug,
            'post_type'   => 'collaborator',
            'post_status' => 'publish',
            'numberposts' => 1,
        ]);

        if (!empty($exists)) {
            interloft_log("  Skipping collaborator: {$slug} (already exists)");
            continue;
        }

        $post_id = wp_insert_post([
            'post_type'    => 'collaborator',
            'post_status'  => 'publish',
            'post_name'    => $slug,
            'post_title'   => $collab['name'] ?? $slug,
            'post_content' => $collab['description'] ?? '',
        ]);

        if (!is_wp_error($post_id)) {
            $meta_fields = [
                'interloft_collaborator_profession'     => $collab['profession'] ?? 'Architecte',
                'interloft_collaborator_city'            => $collab['city'] ?? '',
                'interloft_collaborator_story'           => $collab['collaboration_story'] ?? '',
                'interloft_collaborator_image'           => $collab['image'] ?? '',
                'interloft_collaborator_hero_image'     => $collab['hero_image'] ?? '',
                'interloft_collaborator_email'          => $collab['email'] ?? '',
                'interloft_collaborator_website'         => $collab['website'] ?? '',
            ];

            foreach ($meta_fields as $key => $value) {
                if (!empty($value)) {
                    update_post_meta($post_id, $key, $value);
                }
            }

            if (!empty($collab['expertise']) && is_array($collab['expertise'])) {
                update_post_meta($post_id, 'interloft_collaborator_expertise', json_encode($collab['expertise']));
            }

            if (!empty($collab['featured_project']) && is_array($collab['featured_project'])) {
                update_post_meta($post_id, 'interloft_collaborator_featured_project', json_encode($collab['featured_project']));
            }

            if (!empty($collab['projects']) && is_array($collab['projects'])) {
                update_post_meta($post_id, 'interloft_collaborator_projects', json_encode($collab['projects']));
            }

            $count++;
        } else {
            interloft_error("Failed to create collaborator: " . ($collab['name'] ?? 'unknown'));
        }
    }

    interloft_success("Migrated $count collaborators.");
    return $count;
}

function interloft_migrate_products() {
    interloft_log('Migrating products...');

    $offset = 0;
    $count  = 0;

    while (true) {
        $result = interloft_http('/products?select=*&limit=' . BATCH_SIZE . '&offset=' . $offset);

        if (isset($result['error'])) {
            interloft_error('Products batch offset=' . $offset . ': ' . $result['error']);
            break;
        }

        if (empty($result) || !is_array($result)) {
            break;
        }

        foreach ($result as $product) {
            $slug = sanitize_title($product['slug'] ?? $product['name'] ?? 'product-' . $offset);

            $exists = get_posts([
                'name'        => $slug,
                'post_type'   => 'product',
                'post_status' => 'publish',
                'numberposts' => 1,
            ]);

            if (!empty($exists)) {
                interloft_log("  Skipping product: {$slug} (already exists)");
                continue;
            }

            $post_id = wp_insert_post([
                'post_type'    => 'product',
                'post_status'  => 'publish',
                'post_name'    => $slug,
                'post_title'   => $product['name'] ?? $slug,
                'post_content' => $product['description'] ?? '',
            ]);

            if (!is_wp_error($post_id)) {
                $meta_fields = [
                    'interloft_product_slug'       => $slug,
                    'interloft_product_category'  => $product['category'] ?? '',
                    'interloft_product_collection' => $product['collection_id'] ?? '',
                    'interloft_product_dimensions' => $product['dimensions'] ?? '',
                    'interloft_product_image'      => $product['image'] ?? '',
                ];

                foreach ($meta_fields as $key => $value) {
                    if (!empty($value)) {
                        update_post_meta($post_id, $key, $value);
                    }
                }

                if (!empty($product['materials']) && is_array($product['materials'])) {
                    update_post_meta($post_id, 'interloft_product_materials', json_encode($product['materials']));
                }

                if (!empty($product['gallery']) && is_array($product['gallery'])) {
                    update_post_meta($post_id, 'interloft_product_gallery', json_encode($product['gallery']));
                }

                // Set taxonomy term
                if (!empty($product['category'])) {
                    $term = get_term_by('slug', $product['category'], 'product_category');
                    if ($term) {
                        wp_set_object_terms($post_id, (int) $term->term_id, 'product_category');
                    }
                }

                $count++;
            } else {
                interloft_error("Failed to create product: " . ($product['name'] ?? 'unknown'));
            }
        }

        if (count($result) < BATCH_SIZE) {
            break;
        }

        $offset += BATCH_SIZE;
        interloft_log("  ... processed {$offset}+ products");
    }

    interloft_success("Migrated {$count} products.");
    return $count;
}

// ─── RUN ────────────────────────────────────────────────────────────────────────

if (!defined('WP_CLI')) {
    die('This script must be run via WP-CLI: wp eval-file migrate-from-supabase.php');
}

WP_CLI::line('=== INTERloft Migration: Supabase → WordPress ===');

$start = microtime(true);

$cats   = interloft_migrate_categories();
$colls  = interloft_migrate_collections();
$cols   = interloft_migrate_collaborators();
$prods  = interloft_migrate_products();

$elapsed = round(microtime(true) - $start, 1);

WP_CLI::line('');
WP_CLI::success("Migration complete in {$elapsed}s.");
WP_CLI::line("  Categories:     {$cats}");
WP_CLI::line("  Collections:    {$colls}");
WP_CLI::line("  Collaborators:  {$cols}");
WP_CLI::line("  Products:       {$prods}");
WP_CLI::line('');
WP_CLI::line('Next: Update Next.js .env.local with WORDPRESS_URL, then run the WordPress API proxy setup.');
