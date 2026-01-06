// Script pour générer une texture de points/hexagones style Shopify
// Exécuter avec: node public/textures/generate-shopify-dots.js

const fs = require('fs');
const { createCanvas } = require('canvas');

const width = 4096;
const height = 2048;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fond transparent
ctx.fillStyle = 'rgba(0, 0, 0, 0)';
ctx.fillRect(0, 0, width, height);

// Style clair pour les points
const dotColor = 'rgba(255, 255, 255, 0.15)';
const dotSize = 2;
const spacing = 24; // Espacement entre les points

// Pattern de points en grille hexagonale
for (let y = 0; y < height; y += spacing * Math.sqrt(3) / 2) {
  for (let x = 0; x < width; x += spacing) {
    const offsetX = (Math.floor(y / (spacing * Math.sqrt(3) / 2)) % 2) * spacing / 2;
    
    ctx.beginPath();
    ctx.arc(x + offsetX, y, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
  }
}

// Sauvegarder en PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/textures/shopify-dots.png', buffer);
console.log('✅ Texture shopify-dots.png créée avec succès (4096×2048)');








