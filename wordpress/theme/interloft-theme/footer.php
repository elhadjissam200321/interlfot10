    </main>

    <footer>
        <div class="footer-grid">
            <div class="footer-col">
                <h4>INTERloft</h4>
                <p style="font-size:13px;color:#666;line-height:1.8;max-width:240px;">
                    Mobilier d'exception façonné par des artisans marocains. Tradition et modernité en harmonie.
                </p>
            </div>
            <div class="footer-col">
                <h4>Navigation</h4>
                <ul>
                    <li><a href="<?php echo home_url('/products/'); ?>">Produits</a></li>
                    <li><a href="<?php echo home_url('/collections/'); ?>">Collections</a></li>
                    <li><a href="<?php echo home_url('/collaborations/'); ?>">Collaborations</a></li>
                    <li><a href="<?php echo home_url('/introduction/'); ?>">À propos</a></li>
                    <li><a href="<?php echo home_url('/contact/'); ?>">Contact</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Informations</h4>
                <ul>
                    <li><a href="<?php echo home_url('/points-de-vente/'); ?>">Points de vente</a></li>
                    <li><a href="<?php echo home_url('/privacy-policy/'); ?>">Politique de confidentialité</a></li>
                    <li><a href="<?php echo home_url('/cookies/'); ?>">Politique de cookies</a></li>
                    <li><a href="<?php echo home_url('/conditions/'); ?>">Conditions générales</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <ul>
                    <li><a href="mailto:contact@interloft.ma">contact@interloft.ma</a></li>
                    <li style="font-size:13px;color:#666;margin-top:8px;">Casablanca, Maroc</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            © <?php echo date('Y'); ?> INTERloft — Tous droits réservés
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>
