<?php
/**
 * Template Name: Introduction
 */
get_header();
?>

<?php
$subtitle = get_post_meta(get_the_ID(), 'interloft_page_subtitle', true);
$extra = get_post_meta(get_the_ID(), 'interloft_page_extra', true);
$hero_image = get_the_post_thumbnail_url(get_the_ID(), 'large');
?>

<?php if ($hero_image) : ?>
<div style="max-width:1200px;margin:0 auto;padding:0 32px;">
    <div style="aspect-ratio:21/9;background:#f5f5f5;overflow:hidden;margin-bottom:64px;margin-top:72px;">
        <img src="<?php echo esc_url($hero_image); ?>"
             alt="<?php the_title_attribute(); ?>"
             style="width:100%;height:100%;object-fit:cover;">
    </div>
</div>
<?php endif; ?>

<div style="max-width:800px;margin:0 auto;padding:0 32px;">
    <article style="padding-bottom:80px;">
        <header style="text-align:center;margin-bottom:64px;">
            <?php if ($subtitle) : ?>
            <p class="label-text" style="margin-bottom:16px;"><?php echo esc_html($subtitle); ?></p>
            <?php endif; ?>
            <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.2;margin-bottom:16px;">
                <?php the_title(); ?>
            </h1>
            <?php if ($extra) : ?>
            <p style="font-size:15px;color:#666;max-width:480px;margin:0 auto;line-height:1.8;">
                <?php echo esc_html($extra); ?>
            </p>
            <?php endif; ?>
        </header>

        <div style="font-size:15px;line-height:2;color:#444;max-width:640px;margin:0 auto;">
            <?php the_content(); ?>
        </div>

        <div style="text-align:center;margin-top:64px;padding-top:48px;border-top:1px solid #e5e5e5;">
            <a href="<?php echo home_url('/contact/'); ?>"
               style="display:inline-block;padding:16px 48px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
                Nous contacter
            </a>
        </div>
    </article>
</div>

<?php get_footer(); ?>
