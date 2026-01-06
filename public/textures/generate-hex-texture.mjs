// Script pour générer une texture hexagonale style moderne
import { createCanvas } from 'canvas';
import fs from 'fs';

const width = 4096;
const height = 2048;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fond transparent
ctx.clearRect(0, 0, width, height);

// Paramètres pour le pattern hexagonal
const hexSize = 40;
const spacing = hexSize * 1.5;
const colors = [
  'rgba(144, 238, 144, 0.4)',  // vert clair
  'rgba(102, 205, 170, 0.4)',  // turquoise clair
  'rgba(64, 224, 208, 0.4)',   // turquoise
  'rgba(72, 209, 204, 0.4)',  // turquoise moyen
];

// Fonction pour dessiner un hexagone
function drawHexagon(x, y, size, color) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const hx = x + size * Math.cos(angle);
    const hy = y + size * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(hx, hy);
    } else {
      ctx.lineTo(hx, hy);
    }
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Créer un pattern hexagonal avec gradient de couleur
for (let y = 0; y < height + spacing; y += spacing * Math.sqrt(3) / 2) {
  for (let x = 0; x < width + spacing; x += spacing) {
    const offsetX = (Math.floor(y / (spacing * Math.sqrt(3) / 2)) % 2) * spacing / 2;
    const finalX = x + offsetX;
    const finalY = y;
    
    // Gradient de couleur basé sur la position
    const colorIndex = Math.floor((finalX / width + finalY / height) * colors.length) % colors.length;
    const color = colors[colorIndex];
    
    drawHexagon(finalX, finalY, hexSize, color);
  }
}

// Sauvegarder
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/textures/hex-globe.png', buffer);
console.log('✅ Texture hexagonale créée avec succès (4096×2048)');








