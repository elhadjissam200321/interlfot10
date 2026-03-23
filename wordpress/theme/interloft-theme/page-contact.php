<?php
/**
 * Template Name: Contact
 */
get_header();
?>

<div style="max-width:800px;margin:0 auto;padding:0 32px;">
    <article style="padding:120px 0 80px;">
        <header style="text-align:center;margin-bottom:64px;">
            <p class="label-text" style="margin-bottom:16px;">
                <?php echo esc_html(get_post_meta(get_the_ID(), 'interloft_page_subtitle', true) ?: 'Nous écrire'); ?>
            </p>
            <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.2;margin-bottom:16px;">
                <?php the_title(); ?>
            </h1>
            <?php if (get_post_meta(get_the_ID(), 'interloft_page_extra', true)) : ?>
            <p style="font-size:15px;color:#666;max-width:480px;margin:0 auto;line-height:1.8;">
                <?php echo esc_html(get_post_meta(get_the_ID(), 'interloft_page_extra', true)); ?>
            </p>
            <?php endif; ?>
        </header>

        <div style="font-size:15px;line-height:2;color:#444;max-width:640px;margin:0 auto 64px;">
            <?php the_content(); ?>
        </div>

        <form name="contact-form" id="contact-form" style="max-width:480px;margin:0 auto;"
              action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
            <input type="hidden" name="action" value="interloft_contact">
            <?php wp_nonce_field('interloft_contact', 'contact_nonce'); ?>

            <div style="margin-bottom:24px;">
                <label for="cf_name" class="label-text" style="display:block;margin-bottom:8px;">Nom</label>
                <input type="text" name="name" id="cf_name" required
                       style="width:100%;padding:12px 0;border:none;border-bottom:1px solid #e5e5e5;background:transparent;font-size:14px;outline:none;"
                       placeholder="Votre nom">
            </div>

            <div style="margin-bottom:24px;">
                <label for="cf_email" class="label-text" style="display:block;margin-bottom:8px;">Email</label>
                <input type="email" name="email" id="cf_email" required
                       style="width:100%;padding:12px 0;border:none;border-bottom:1px solid #e5e5e5;background:transparent;font-size:14px;outline:none;"
                       placeholder="votre@email.com">
            </div>

            <div style="margin-bottom:24px;">
                <label for="cf_subject" class="label-text" style="display:block;margin-bottom:8px;">Sujet</label>
                <input type="text" name="subject" id="cf_subject"
                       style="width:100%;padding:12px 0;border:none;border-bottom:1px solid #e5e5e5;background:transparent;font-size:14px;outline:none;"
                       placeholder="Objet de votre message"
                       value="<?php echo esc_attr($_GET['subject'] ?? ''); ?>">
            </div>

            <div style="margin-bottom:32px;">
                <label for="cf_message" class="label-text" style="display:block;margin-bottom:8px;">Message</label>
                <textarea name="message" id="cf_message" rows="6" required
                          style="width:100%;padding:12px 0;border:none;border-bottom:1px solid #e5e5e5;background:transparent;font-size:14px;outline:none;resize:none;"
                          placeholder="Votre message..."></textarea>
            </div>

            <div id="cf_status" style="margin-bottom:16px;font-size:13px;"></div>

            <button type="submit"
                    style="padding:18px 48px;background:#1a1a1a;color:#fff;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;border:none;cursor:pointer;transition:opacity 0.2s;">
                Envoyer
            </button>
        </form>

        <div style="text-align:center;margin-top:64px;padding-top:48px;border-top:1px solid #e5e5e5;">
            <p class="label-text" style="margin-bottom:16px;">Autres moyens de nous contacter</p>
            <p style="font-size:14px;color:#666;">
                <a href="mailto:contact@interloft.ma" style="color:#1a1a1a;">contact@interloft.ma</a>
            </p>
            <p style="font-size:14px;color:#666;margin-top:8px;">Casablanca, Maroc</p>
        </div>
    </article>
</div>

<script>
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = this.querySelector('button[type=submit]');
    var status = document.getElementById('cf_status');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours...';
    status.textContent = '';

    var formData = new FormData(this);
    try {
        var response = await fetch('<?php echo admin_url('admin-post.php'); ?>', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            status.textContent = '✓ Message envoyé. Nous vous répondrons sous 48h.';
            status.style.color = '#2a2';
            this.reset();
        } else {
            status.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
            status.style.color = '#a22';
        }
    } catch (err) {
        status.textContent = 'Erreur réseau. Veuillez réessayer.';
        status.style.color = '#a22';
    }
    btn.disabled = false;
    btn.textContent = 'Envoyer';
});
</script>

<?php get_footer(); ?>
