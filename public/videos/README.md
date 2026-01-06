# Assets vidéo pour HeroGlobe

Pour utiliser une vidéo de globe en arrière-plan, placez les fichiers suivants dans ce dossier :

- `globe.webm` - Version WebM (recommandé pour meilleure compression)
- `globe.mp4` - Version MP4 (fallback pour compatibilité)

**Spécifications recommandées :**
- Format : 1920x1080 ou 2560x1440
- Durée : 10-20 secondes (boucle)
- Codec : VP9 (WebM) / H.264 (MP4)
- Style : Globe rotatif avec points/hexagones, fond blanc

**Note :** Si les fichiers vidéo ne sont pas présents, le composant utilisera automatiquement le fallback SVG animé (`DottedSphereFallback`).








