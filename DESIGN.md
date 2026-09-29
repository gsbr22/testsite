# SparrOne — système de design

## Direction

Un univers sportif éditorial, énergique et crédible, pensé d’abord pour les écrans mobiles des jeunes joueurs et de leurs parents. Le contraste bleu profond, encre et fond froid garde une tonalité football sans photos de joueurs, fausses évaluations ni promesses de résultats. Les mêmes en-têtes, boutons, cartes, formulaires, modales et pieds de page traversent les pages boutique, compte et informations légales.

## Couleurs

| Jeton CSS | Valeur | Usage |
|---|---|---|
| `--blue` | `#174bdb` | Liens, action principale, accent de marque |
| `--blue-hover` | `#123ca8` | Survol et pression de l’action principale |
| `--ink` | `#172c40` | Texte principal et surfaces fortes |
| `--muted` | `#526477` | Texte secondaire |
| `--ground` | `#f4f7fa` | Fond global |
| `--white` | `#ffffff` | Cartes, navigation, fenêtres |
| `--line` | `#d6dfe7` | Séparateurs et contours doux |
| `--input-line` | `#7b8b9b` | Contours de champs et contrôles |
| `--green` | `#16734a` | Confirmation et statut positif |
| `--danger` | `#b42318` | Suppression et erreurs critiques |
| `--yellow` | `#fde68a` | Repères légaux à compléter conservés du site |

Contrastes des textes et contrôles vérifiés par axe-core WCAG 2.1 AA sur les pages et formulaires; les focus clavier sont explicitement visibles.

## Typographie

- Titres et identité : Barlow Condensed Bold, auto-hébergée (woff2), avec repli Arial Narrow/Arial.
- Corps, navigation et formulaires : Source Sans 3 (400, 600, 700), auto-hébergée (woff2), avec repli Arial.
- Base 18 px bureau et 17 px mobile, interligne 1.55. Titres fluides par `clamp()`.

## Espacement et composants

- Échelle pratique : 4, 8, 12, 16, 20, 24, 32, 48, 64 px; conteneurs centrés (max. 1200 px) et marges latérales de 20 px sur mobile.
- Cartes et panneaux : fond blanc, bord `--line`, rayon 12 px; commandes rayonnées 8 px.
- Boutons : hauteur minimale 48 px, zones interactives et liens au moins 44 px; variations principale, secondaire et destructive.
- Champs : labels persistants, aide et erreur associées, bordures contrastées, focus visible.
- Navigation : en-tête commun et menu mobile clavier; lien d’évitement; dialogues avec retour et confinement du focus.
- Mouvement réduit pris en charge; images responsives en WebP et polices locales.

## Comportement responsive

Une colonne sur mobile, deux colonnes quand cela sert la comparaison ou la lecture; largeur testée à 320, 390, 768 et 1440 px. Les tableaux légaux défilants sont atteignables au clavier. Une seule balise `h1` par page.
