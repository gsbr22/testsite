# Rapport de conformité — SparrOne (28/09/2026)
Ce fichier est ignoré au déploiement (.assetsignore). Je ne suis pas juriste : relecture par un professionnel recommandée avant toute vente réelle.

## 1. Fichiers créés / modifiés
- mentions-legales.html, confidentialite.html, cgv.html (avec formulaire de rétractation), cgu.html : créés (champs jaunes « À COMPLÉTER »).
- legal.html : remplacé par une redirection (l'ancien contenu citait GitHub Pages et PayPal).
- Tous les autres .html : pied de page unifié (4 liens légaux + médiateur), © 2026.
- index.html : mention sous le formulaire de contact, champs obligatoires signalés, case CGU/confidentialité non pré-cochée à l'inscription, aria-label sur les champs, lien d'évitement, méta description/Open Graph.
- guide-football, pack, ebook-preparation-mentale, ebook-cardio-technique-muscu, pack-3-ebooks : case CGV + renoncement à la rétractation à cocher AVANT le bouton de paiement.
- merci-cardio-technique-muscu.html + page produit : on ne peut pas « répondre à l'email Stripe » ; remplacé par un email de contact.
- script.js : BUG corrigé — le code écrivait dans Firestore (jamais chargé) : le formulaire de contact échouait et l'inscription générait une erreur. Tout passe maintenant par Realtime Database (déjà chargée et lue par moncompte.html) ; le message de contact n'est plus stocké en base (minimisation), il part seulement par EmailJS.
- moncompte.html : nom affiché échappé (faille XSS), noindex.
- styles.css : focus visible, styles pages légales, case CGV. robots.txt, sitemap.xml, llms.txt : créés. .assetsignore : empêche de publier wrangler.jsonc, ce rapport et hors-ligne/.
- ftrprojet/ déplacé dans hors-ligne/ (non déployé) : page « histoires personnalisées » restée sur PayPal, sans lien Stripe, potentiellement des données d'enfants.

## 2. Résumé par point
1 Mentions légales : faites, identité à compléter. 2 Confidentialité : 4 traitements réels trouvés dans le code (compte, contact, paiement, hébergement). 3 Cookies : aucun bandeau (aucun traceur non nécessaire trouvé). 4 CGV : faites (particuliers, contenu numérique). 5 CGU : faites + case à l'inscription. 6 Médiateur : emplacements prévus. 7 Formulaires : corrigés (aucun champ superflu). 8 Tiers : tableau ci-dessous. 9 Accessibilité : correctifs de base. 10 IA : llms.txt, robots, sitemap, méta. 11-13 : ci-dessous.

## 3. Services tiers (point 8)
| Service | Collecte | Traceur | Hors UE | Verdict |
|---|---|---|---|---|
| Firebase Auth/Realtime DB (Google) | nom, email, mdp chiffré, dates | jeton de session (nécessaire) | possible (région de la base à vérifier) | nécessaire, déclaré |
| EmailJS | nom, email, message | non | probable | nécessaire, déclaré |
| Stripe | paiement | sur stripe.com | possible | nécessaire, déclaré |
| Cloudflare | IP, logs | non | oui (société US) | nécessaire, déclaré |
| Font Awesome (cdnjs) / EmailJS lib (jsDelivr) | IP au chargement | non | non | acceptable ; option : héberger en local |
| Discord (merci-pack) | lien externe | — | oui | mentionné |
Aucun analytics / pixel / chat / carte : pas de consentement requis.

## 4. Contenu (point 11) — à relire
- « Programme d'entraînement holistique et scientifique », « préparation physique scientifique » : promesse sans preuve → « programme structuré sur 8 semaines ».
- « Guide exhaustif » (index) → « guide complet ».
- « exemples de joueurs pros » (pack.html) : ne pas utiliser noms/images/logos de joueurs ou clubs sans droits.
- Images à vérifier (droits) : SparrLogo1.png, guide_footballeur.png, pack.png, comingsoon.png. Les 3 couvertures ebook-*.png sont générées par moi (libres).
- « Téléchargement immédiat » : faux pour l'ebook au choix (envoi sous 24 h) — corrigé sur la page produit.
- Ancienne remise « au lieu de 14,99 € » : retirée.

## 5. Incohérences / autres risques (points 12-13)
- Identité absente de tout le site (cohérence à assurer entre mentions, CGV, confidentialité).
- PDF publics : « Le_Guide du_footballeur.pdf » est téléchargeable par toute personne qui connaît l'URL, sans payer. À terme : livraison par lien signé ou par email.
- Règles de sécurité Firebase : à vérifier dans la console (jamais en « mode test » ouvert) ; la clé API dans script.js est publique par conception, ce sont les règles qui protègent.
- « Mes achats » (moncompte.html) lit purchases/{uid} mais rien ne l'alimente : aucune donnée d'achat n'est enregistrée aujourd'hui.
- Reçus/factures : Stripe envoie un reçu ; une facture conforme dépend du statut (à voir avec un pro).
- Statut de l'éditeur : voir plus bas.

## 6. À FAIRE PAR UN HUMAIN
1. Régler le statut légal de vendeur avant tout paiement réel (majorité, ou solution avec représentant légal), puis remplir tous les champs jaunes.
2. Choisir et adhérer à un médiateur de la consommation (liste officielle), puis le renseigner (CGV, mentions, pied de page).
3. Stripe : titulaire du compte = personne majeure vérifiée ; activer « accepter les CGV » sur chaque lien + URL de redirection vers la bonne page merci.
4. Vérifier hébergeur (téléphone Cloudflare), région Firebase, durées de conservation proposées (3 ans / 12 mois).
5. Remplacer [VOTRE-DOMAINE] dans sitemap.xml, robots.txt, llms.txt ; ajouter canonical/JSON-LD une fois l'identité et le domaine connus.
6. Ajouter les vrais PDF (Ebook_Preparation_Mentale.pdf, Ebook_Cardio.pdf, Ebook_Technique.pdf, Ebook_Musculation.pdf).
7. Relecture par un avocat avant mise en ligne.

## 7. Jugé NON applicable
Bandeau cookies (aucun traceur), déclaration d'accessibilité (< 10 salariés / 2 M€), CGV professionnelles (vente aux particuliers uniquement).
