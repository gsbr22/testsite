# Livraison — refonte SparrOne

## Déploiement

Le dossier livré reste un site statique sans étape de build. Décompresser `SparrOne-refonte.zip`, puis lancer `npx wrangler deploy` à sa racine. `wrangler.jsonc` sert les fichiers depuis le dossier courant. La configuration Cloudflare peut être déployée après intégration des ressources et paramètres externes manquants listés plus bas.

## Changements

- Refonte cohérente et mobile-first de l’accueil, des cinq pages produits, des cinq pages de remerciement, du compte et des pages légales, en conservant les routes.
- Ajout d’un système de design dans `DESIGN.md`, `styles.css` et `.impeccable/design.json`.
- Couleurs, typographies Barlow Condensed et Source Sans 3 servies localement, grilles adaptatives, boutons, formulaires, modales, menus et pied de page unifiés.
- Illustrations originales des ebooks et de la page d’accueil converties en WebP responsifs; polices et dépendances Firebase/EmailJS hébergées localement. Fichiers d’images PNG obsolètes retirés.
- Accessibilité renforcée : lien d’évitement, états de focus, clavier et confinement du focus des modales, libellés et messages de formulaire, tableau légal défilant accessible au clavier, prise en charge des mouvements réduits.
- Les redirections de remerciement correspondent aux cinq produits; le Programme Complet conserve sa livraison Discord, le thème au choix explique la livraison par courriel sous 24 h, et le pack de trois garde ses trois boutons de téléchargement.
- Les URL Stripe des cinq offres sont inchangées. L’accord CGV reste décoché par défaut et bloque le bouton de paiement jusqu’à validation.
- Pied de page commun sur toutes les pages publiées; champs légaux `[À COMPLÉTER]` et `[MÉDIATEUR À CHOISIR]` conservés.

Fichiers HTML modifiés : `index.html`, `guide-football.html`, `pack.html`, `ebook-preparation-mentale.html`, `ebook-cardio-technique-muscu.html`, `pack-3-ebooks.html`, `merci.html`, `merci-pack.html`, `merci-mentale.html`, `merci-cardio-technique-muscu.html`, `merci-pack-3-ebooks.html`, `moncompte.html`, `mentions-legales.html`, `confidentialite.html`, `cgv.html`, `cgu.html`, `legal.html`.

Autres fichiers modifiés ou ajoutés : `.assetsignore`, `favicon/site.webmanifest`, `script.js`, `styles.css`, `site-config.js`, `DESIGN.md`, `PRODUCT.md`, `.impeccable/design.json`, `assets/fonts/*`, `assets/images/*`, `assets/vendor/*`.

## Vérifications réalisées

- 14 groupes de parcours navigateur réussis : cinq produits, accord CGV/destination Stripe interceptée et page merci, navigation mobile, ouverture/fermeture clavier et focus des modales, inscription, connexion, déconnexion, suppression de compte avec échec et restauration, formulaire de contact avec validation et réponses simulées.
- Axe-core sans violation WCAG 2.1 A/AA sur les pages testées et les états de formulaire/modale.
- Les 16 pages publiées ont été contrôlées à 320, 768 et 1440 px : un seul `h1` et aucun débordement horizontal.
- `script.js` passe `node --check`. Le test compare les cinq liens Stripe à l’archive de départ : aucune différence.
- Les services Firebase, EmailJS et Stripe ont été simulés/interceptés en local. Aucun paiement, email ou compte réel n’a été effectué. La redirection finale a été ouverte séparément pour test; la configuration du dashboard Stripe n’a pas été changée.

## À fournir avant une mise en vente réelle

- L’archive d’origine ne contenait pas ces fichiers : `Ebook_Preparation_Mentale.pdf`, `Ebook_Cardio.pdf`, `Ebook_Technique.pdf`, `Ebook_Musculation.pdf`. Les liens ont été conservés dans leurs pages prévues, mais ces quatre ressources doivent être ajoutées avant de proposer les téléchargements correspondants. Le guide PDF d’origine est conservé.
- La clé publique EmailJS n’existait pas dans le dépôt d’origine. `site-config.js` la laisse vide : ajouter la clé publique ainsi que les valeurs de service et de modèle EmailJS déjà attendues avant d’activer l’envoi. Sans clé, le formulaire affiche un message de disponibilité et propose le contact par email.
- Les champs vendeur/médiateur restés en évidence attendent la régularisation déjà signalée dans les consignes.

Le dossier `hors-ligne/` n’est pas inclus dans l’archive Workers et ses fichiers source n’ont pas été modifiés. Aucun build n’a été introduit.
