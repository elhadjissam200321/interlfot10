<?php get_header(); ?>

<div style="max-width:800px;margin:0 auto;padding:0 32px;">
    <article style="padding:120px 0 80px;">
        <header style="text-align:center;margin-bottom:64px;">
            <?php if (get_post_meta(get_the_ID(), 'interloft_page_subtitle', true)) : ?>
            <p class="label-text" style="margin-bottom:16px;">
                <?php echo esc_html(get_post_meta(get_the_ID(), 'interloft_page_subtitle', true)); ?>
            </p>
            <?php endif; ?>
            <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.2;margin-bottom:16px;">
                <?php the_title(); ?>
            </h1>
        </header>
        <div style="font-size:15px;line-height:2;color:#444;max-width:640px;margin:0 auto;">
            <?php the_content(); ?>
        </div>
    </article>
</div>

<?php get_footer(); ?>
