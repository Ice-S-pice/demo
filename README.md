# Le Carré - Carte AR

Démo web statique légère pour la carte digitale du Carré Vevey, pensée pour
téléphone et tablette.

La page affiche :

- l'identité Le Carré avec le logo local ;
- la carte complète des mets hiver 2025-2026 ;
- une navigation par sections ;
- un seul bouton d'action : `Poser sur ma table` ;
- une seule expérience AR de démonstration : `Salade César` ;
- une ouverture compatible iOS Quick Look et Android Scene Viewer/WebXR ;
- un écran de préparation stylé avant l'ouverture AR.

La page ne charge pas les modèles au démarrage et n'utilise pas de polices web
externes, afin de garder un poids initial bas. La bibliothèque AR et le fichier
de la salade se chargent uniquement après le clic sur `Poser sur ma table`.

## Modèles inclus

- `assets/models/caesar-salad.glb`
- `assets/models/caesar-salad.usdz`

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
