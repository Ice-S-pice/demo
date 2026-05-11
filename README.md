# Brasserie Michot - Carte ete 3D / AR

Demo web statique pour une carte restaurant premium Vision Gourmand.

La page affiche une vraie carte courte :

- titre `Carte ete Brasserie Michot`
- plats avec prix
- apercu 3D discret
- bouton `Voir mon plat`
- bouton `Poser sur ma table` pour lancer l'AR

## Optimisations anti-bug

- Les apercus 3D ne chargent plus tous en meme temps.
- Les modeles se chargent seulement quand la carte arrive pres de l'ecran.
- Les apercus ne tournent que quand on survole ou touche une carte.
- Le modele de la fenetre 3D est libere quand on ferme la fenetre.

Pour une version commerciale, il faudra aussi compresser les `.glb`, car certains fichiers font plus de 30 Mo.

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
