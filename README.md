# Brasserie Michot - Carte ete 3D / AR

Demo web statique pour une carte restaurant premium Vision Gourmand.

La page affiche une vraie carte courte :

- titre `Carte ete Brasserie Michot`
- plats avec prix
- 2 plats premium avec 3D/AR
- le reste de la carte en lignes classiques legeres
- bouton `Voir mon plat`
- bouton `Poser sur ma table` pour lancer l'AR

## Optimisations anti-bug

- Seuls 2 plats chargent des fichiers 3D : Sunday dinner et Poulet teriyaki.
- Les autres plats sont affiches comme les boissons, sans fichier 3D.
- Aucun apercu 3D n'est charge dans la liste.
- Le modele de la fenetre 3D est charge uniquement au clic sur `Voir mon plat`.
- Le modele de la fenetre 3D est libere quand on ferme la fenetre.
- Le bouton AR ne charge plus le viewer 3D avant d'ouvrir la camera.
- iPhone ouvre directement le `.usdz` avec Quick Look.
- Android ouvre directement Scene Viewer avec le `.glb` en HTTPS.
- La librairie `model-viewer` n'est plus chargee au demarrage, seulement au clic sur `Voir mon plat`.

Pour une version commerciale, il faudra aussi compresser les `.glb`, car certains fichiers font plus de 30 Mo.

## Modeles inclus

- `assets/models/sunday-dinner.glb`
- `assets/models/sunday-dinner.usdz`
- `assets/models/teriyaki-chicken.glb`
- `assets/models/teriyaki-chicken.usdz`

## Lancer la demo

Depuis ce dossier :

```powershell
python -m http.server 4178 --bind 127.0.0.1
```

Puis ouvrir :

```text
http://127.0.0.1:4178/
```

## AR

L'AR depend du telephone et du navigateur.

- Android : Chrome peut ouvrir la camera via Scene Viewer/WebXR.
- iPhone/iPad : Safari fonctionne mieux avec des fichiers `.usdz`.
- Pour une demo publique, heberge la page en HTTPS sur Vercel, Netlify ou GitHub Pages.
