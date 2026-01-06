// Script pour générer une texture de points/hexagones style Shopify
// Exécuter avec: node public/textures/generate-shopify-dots.mjs

import { createCanvas } from 'canvas';
import fs from 'fs';

const width = 4096;
const height = 2048;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fond transparent
ctx.clearRect(0, 0, width, height);

// Style clair pour les points (style Shopify - subtil et élégant)
const dotColor = 'rgba(255, 255, 255, 0.12)';
const dotSize = 1.5;
const spacing = 28; // Espacement entre les points (grille hexagonale)

// Pattern de points en grille hexagonale pour un rendu premium
for (let y = 0; y < height + spacing; y += spacing * Math.sqrt(3) / 2) {
  for (let x = 0; x < width + spacing; x += spacing) {
    // Décalage alterné pour créer un pattern hexagonal
    const offsetX = (Math.floor(y / (spacing * Math.sqrt(3) / 2)) % 2) * spacing / 2;
    
    ctx.beginPath();
    ctx.arc(x + offsetX, y, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
  }
}

// Ajouter quelques points supplémentaires pour plus de densité (optionnel)
const secondaryDotColor = 'rgba(255, 255, 255, 0.06)';
for (let y = spacing * Math.sqrt(3) / 4; y < height + spacing; y += spacing * Math.sqrt(3) / 2) {
  for (let x = spacing / 2; x < width + spacing; x += spacing) {
    const offsetX = (Math.floor(y / (spacing * Math.sqrt(3) / 2)) % 2) * spacing / 2;
    ctx.beginPath();
    ctx.arc(x + offsetX, y, dotSize * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = secondaryDotColor;
    ctx.fill();
  }
}

// Sauvegarder en PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/textures/shopify-dots.png', buffer);
console.log('✅ Texture shopify-dots.png créée avec succès (4096×2048)');
console.log('   Style: Points hexagonaux clairs, ratio 2:1');








