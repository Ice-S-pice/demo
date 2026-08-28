# Le Carré - Carte AR

Démo web statique légère pour la carte digitale du Carré Vevey, pensée pour
téléphone et tablette.

La page affiche :

- l'identité Le Carré avec le logo local ;
- la carte complète des mets hiver 2025-2026 ;
- une navigation par sections ;
- un seul bouton d'action : `Poser sur ma table` ;
- une seule expérience AR de démonstration, libellée `Démo AR <n>` ;
- un numéro de build visible en haut à droite, pour savoir si GitHub Pages
  a bien publié la dernière version ;
- une ouverture compatible iOS Quick Look et Android Scene Viewer/WebXR ;
- un écran de préparation stylé avant l'ouverture AR.

La page ne charge pas les modèles au démarrage et n'utilise pas de polices web
externes, afin de garder un poids initial bas. La bibliothèque AR et le fichier
du modèle se chargent uniquement après le clic sur `Poser sur ma table`.

## Modèles inclus

- `assets/models/objet.glb` — Scene Viewer (AR Android) et repli general
- `assets/models/objet.usdz` — AR Quick Look (AR iOS)
- `assets/models/objet_webxr.glb` — variante Draco, non utilisee par cette page
  (le chemin WebXR de `model-viewer` n'est pas branche ici) ; ne jamais la servir
  a Scene Viewer, qui refuse l'extension Draco.

## Numéro de build

`DEMO_VERSION`, tout en haut de `app.js`, est la **seule** valeur à incrémenter
avant chaque push. Elle apparaît :

- en pastille `v<n>` en haut à droite de la page ;
- dans le nom de la démo sur la carte (`Démo AR <n>`) ;
- en suffixe `?v=<n>` sur les URL des modèles, ce qui force le téléchargement du
  `.glb` et du `.usdz` à jour au lieu de la version en cache.

Si la pastille affiche encore l'ancien numéro sur le téléphone, GitHub Pages n'a
pas fini de publier : attendre et recharger, plutôt que chercher ailleurs.

## Lancer la démo

Depuis ce dossier :

```powershell
python -m http.server 4178 --bind 127.0.0.1
```

Puis ouvrir :

```text
http://127.0.0.1:4178/
```

## AR

L'AR dépend du téléphone et du navigateur.

- Android : Chrome peut ouvrir la caméra via Scene Viewer ou WebXR.
- iPhone/iPad : Safari fonctionne mieux avec les fichiers `.usdz`.
- Pour une démo publique, héberger la page en HTTPS.
