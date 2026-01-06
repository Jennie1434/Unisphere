// Script pour générer une texture hexagonale style moderne avec continents
import { createCanvas } from 'canvas';
import fs from 'fs';

const width = 4096;
const height = 2048;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fond blanc/bleu très clair (océans)
ctx.fillStyle = 'rgba(240, 248, 255, 0.3)';
ctx.fillRect(0, 0, width, height);

// Paramètres hexagonaux
const hexSize = 35;
const spacing = hexSize * 1.3;

// Couleurs gradient vert/turquoise pour les continents
const colors = [
  'rgba(144, 238, 144, 0.5)',  // vert clair (nord)
  'rgba(102, 205, 170, 0.5)',  // turquoise clair
  'rgba(64, 224, 208, 0.5)',   // turquoise
  'rgba(72, 209, 204, 0.5)',  // turquoise moyen
  'rgba(95, 158, 160, 0.5)',  // turquoise foncé (sud)
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
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

// Zones approximatives des continents (coordonnées simplifiées)
// Amérique du Nord
const northAmericaBounds = {
  minX: width * 0.15, maxX: width * 0.45,
  minY: height * 0.25, maxY: height * 0.65
};

// Europe
const europeBounds = {
  minX: width * 0.45, maxX: width * 0.55,
  minY: height * 0.35, maxY: height * 0.5
};

// Asie
const asiaBounds = {
  minX: width * 0.55, maxX: width * 0.85,
  minY: height * 0.3, maxY: height * 0.6
};

// Fonction pour vérifier si un point est dans un continent
function isInContinent(x, y) {
  return (
    (x >= northAmericaBounds.minX && x <= northAmericaBounds.maxX &&
     y >= northAmericaBounds.minY && y <= northAmericaBounds.maxY) ||
    (x >= europeBounds.minX && x <= europeBounds.maxX &&
     y >= europeBounds.minY && y <= europeBounds.maxY) ||
    (x >= asiaBounds.minX && x <= asiaBounds.maxX &&
     y >= asiaBounds.minY && y <= asiaBounds.maxY)
  );
}

// Créer le pattern hexagonal avec gradient sur les continents
for (let y = 0; y < height + spacing; y += spacing * Math.sqrt(3) / 2) {
  for (let x = 0; x < width + spacing; x += spacing) {
    const offsetX = (Math.floor(y / (spacing * Math.sqrt(3) / 2)) % 2) * spacing / 2;
    const finalX = x + offsetX;
    const finalY = y;
    
    // Dessiner uniquement sur les continents
    if (isInContinent(finalX, finalY)) {
      // Gradient vertical : vert clair (nord) vers turquoise (sud)
      const normalizedY = (finalY / height);
      const colorIndex = Math.min(
        Math.floor(normalizedY * colors.length),
        colors.length - 1
      );
      const color = colors[colorIndex];
      
      drawHexagon(finalX, finalY, hexSize, color);
    }
  }
}

// Sauvegarder
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/textures/hex-globe.png', buffer);
console.log('✅ Texture hexagonale mondiale créée avec succès (4096×2048)');








