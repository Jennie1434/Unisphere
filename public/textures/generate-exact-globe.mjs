// Script pour générer une texture exacte comme sur la photo : hexagones + points
import { createCanvas } from 'canvas';
import fs from 'fs';

const width = 4096;
const height = 2048;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fond blanc pur (océans)
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.fillRect(0, 0, width, height);

// Paramètres hexagonaux
const hexSize = 32;
const hexSpacing = hexSize * 1.4;

// Couleurs gradient vert/turquoise pour les hexagones (continents)
const hexColors = [
  'rgba(144, 238, 144, 0.45)',  // vert clair (nord)
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
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

// Zones des continents (approximatives mais précises)
function isInContinent(x, y) {
  const nx = x / width;
  const ny = y / height;
  
  // Amérique du Nord (plus large)
  if (nx >= 0.12 && nx <= 0.48 &&
      ny >= 0.20 && ny <= 0.68) {
    return true;
  }
  
  // Amérique du Sud
  if (nx >= 0.22 && nx <= 0.42 &&
      ny >= 0.65 && ny <= 0.92) {
    return true;
  }
  
  // Europe
  if (nx >= 0.44 && nx <= 0.56 &&
      ny >= 0.28 && ny <= 0.52) {
    return true;
  }
  
  // Afrique
  if (nx >= 0.47 && nx <= 0.60 &&
      ny >= 0.48 && ny <= 0.88) {
    return true;
  }
  
  // Asie
  if (nx >= 0.54 && nx <= 0.88 &&
      ny >= 0.22 && ny <= 0.62) {
    return true;
  }
  
  // Océanie
  if (nx >= 0.68 && nx <= 0.88 &&
      ny >= 0.68 && ny <= 0.88) {
    return true;
  }
  
  // Groenland
  if (nx >= 0.18 && nx <= 0.32 &&
      ny >= 0.08 && ny <= 0.22) {
    return true;
  }
  
  // Inde
  if (nx >= 0.64 && nx <= 0.74 &&
      ny >= 0.48 && ny <= 0.60) {
    return true;
  }
  
  // Japon
  if (nx >= 0.78 && nx <= 0.86 &&
      ny >= 0.38 && ny <= 0.48) {
    return true;
  }
  
  // Indonésie
  if (nx >= 0.68 && nx <= 0.84 &&
      ny >= 0.58 && ny <= 0.72) {
    return true;
  }
  
  // Madagascar
  if (nx >= 0.58 && nx <= 0.64 &&
      ny >= 0.68 && ny <= 0.76) {
    return true;
  }
  
  // Grande-Bretagne
  if (nx >= 0.45 && nx <= 0.49 &&
      ny >= 0.32 && ny <= 0.38) {
    return true;
  }
  
  return false;
}

// Étape 1 : Dessiner les hexagones sur les continents
for (let y = 0; y < height + hexSpacing; y += hexSpacing * Math.sqrt(3) / 2) {
  for (let x = 0; x < width + hexSpacing; x += hexSpacing) {
    const offsetX = (Math.floor(y / (hexSpacing * Math.sqrt(3) / 2)) % 2) * hexSpacing / 2;
    const finalX = x + offsetX;
    const finalY = y;
    
    if (isInContinent(finalX, finalY)) {
      // Gradient vertical : vert clair (nord) vers turquoise (sud)
      const normalizedY = finalY / height;
      const colorIndex = Math.min(
        Math.floor(normalizedY * hexColors.length),
        hexColors.length - 1
      );
      const color = hexColors[colorIndex];
      
      drawHexagon(finalX, finalY, hexSize, color);
    }
  }
}

// Étape 2 : Ajouter de nombreux petits points bleu foncé (surtout sur l'est des USA)
const dotSize = 1.8;
const dotSpacing = 6;

// Zones avec plus de densité de points (est et centre des USA)
function getDotDensity(x, y) {
  const nx = x / width;
  const ny = y / height;
  
  // Est des USA - très dense
  if (nx >= 0.20 && nx <= 0.35 && ny >= 0.40 && ny <= 0.55) {
    return 0.85; // 85% de chance
  }
  
  // Centre des USA - dense
  if (nx >= 0.25 && nx <= 0.40 && ny >= 0.45 && ny <= 0.60) {
    return 0.70;
  }
  
  // Autres continents - moins dense
  if (isInContinent(x, y)) {
    return 0.25;
  }
  
  return 0;
}

// Dessiner les points bleu foncé
for (let y = 0; y < height; y += dotSpacing) {
  for (let x = 0; x < width; x += dotSpacing) {
    const density = getDotDensity(x, y);
    if (Math.random() < density) {
      // Dégradé de bleu (du clair au foncé selon la latitude)
      const normalizedY = y / height;
      const blueIntensity = 0.6 + (normalizedY * 0.3); // 0.6 à 0.9
      const blueColor = `rgba(30, 58, 138, ${blueIntensity})`;
      
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = blueColor;
      ctx.fill();
    }
  }
}

// Sauvegarder
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/textures/exact-globe.png', buffer);
console.log('✅ Texture exacte créée : hexagones + points bleus (4096×2048)');








