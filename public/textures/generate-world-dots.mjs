// Script pour générer une texture mondiale avec points bleus en dégradé sur tous les continents
import { createCanvas } from 'canvas';
import fs from 'fs';

const width = 4096;
const height = 2048;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Fond transparent (océans)
ctx.clearRect(0, 0, width, height);

// Paramètres des points
const dotSize = 2.5;
const spacing = 8; // Espacement entre les points

// Dégradé de bleu (du clair au foncé)
const blueGradient = [
  'rgba(173, 216, 230, 0.6)',  // bleu clair (nord)
  'rgba(135, 206, 250, 0.7)',  // bleu ciel
  'rgba(100, 149, 237, 0.75)', // bleu moyen
  'rgba(70, 130, 180, 0.8)',   // bleu acier
  'rgba(65, 105, 225, 0.85)',  // bleu royal
  'rgba(30, 144, 255, 0.9)',   // bleu profond
];

// Fonction pour dessiner un point rond
function drawDot(x, y, size, color) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// Fonction pour vérifier si un point est dans un continent
function isInContinent(x, y) {
  const normalizedX = x / width;
  const normalizedY = y / height;
  
  // Amérique du Nord
  if (normalizedX >= 0.15 && normalizedX <= 0.45 &&
      normalizedY >= 0.25 && normalizedY <= 0.65) {
    return true;
  }
  
  // Amérique du Sud
  if (normalizedX >= 0.25 && normalizedX <= 0.40 &&
      normalizedY >= 0.65 && normalizedY <= 0.90) {
    return true;
  }
  
  // Europe
  if (normalizedX >= 0.45 && normalizedX <= 0.55 &&
      normalizedY >= 0.30 && normalizedY <= 0.50) {
    return true;
  }
  
  // Afrique
  if (normalizedX >= 0.48 && normalizedX <= 0.58 &&
      normalizedY >= 0.50 && normalizedY <= 0.85) {
    return true;
  }
  
  // Asie
  if (normalizedX >= 0.55 && normalizedX <= 0.85 &&
      normalizedY >= 0.25 && normalizedY <= 0.60) {
    return true;
  }
  
  // Océanie / Australie
  if (normalizedX >= 0.70 && normalizedX <= 0.85 &&
      normalizedY >= 0.70 && normalizedY <= 0.85) {
    return true;
  }
  
  // Groenland
  if (normalizedX >= 0.20 && normalizedX <= 0.30 &&
      normalizedY >= 0.10 && normalizedY <= 0.25) {
    return true;
  }
  
  // Inde
  if (normalizedX >= 0.65 && normalizedX <= 0.72 &&
      normalizedY >= 0.50 && normalizedY <= 0.60) {
    return true;
  }
  
  // Japon
  if (normalizedX >= 0.80 && normalizedX <= 0.85 &&
      normalizedY >= 0.40 && normalizedY <= 0.50) {
    return true;
  }
  
  // Indonésie / Philippines
  if (normalizedX >= 0.70 && normalizedX <= 0.82 &&
      normalizedY >= 0.60 && normalizedY <= 0.70) {
    return true;
  }
  
  // Madagascar
  if (normalizedX >= 0.60 && normalizedX <= 0.63 &&
      normalizedY >= 0.70 && normalizedY <= 0.75) {
    return true;
  }
  
  // Grande-Bretagne
  if (normalizedX >= 0.46 && normalizedX <= 0.48 &&
      normalizedY >= 0.35 && normalizedY <= 0.38) {
    return true;
  }
  
  return false;
}

// Créer le pattern de points sur tous les continents
for (let y = 0; y < height; y += spacing) {
  for (let x = 0; x < width; x += spacing) {
    if (isInContinent(x, y)) {
      // Dégradé basé sur la latitude (Y) - du clair (nord) au foncé (sud)
      const normalizedY = y / height;
      const gradientIndex = Math.min(
        Math.floor(normalizedY * blueGradient.length),
        blueGradient.length - 1
      );
      const color = blueGradient[gradientIndex];
      
      // Ajouter un peu de variation aléatoire pour un rendu plus naturel
      const variation = (Math.random() - 0.5) * 0.2;
      const finalX = x + variation * spacing;
      const finalY = y + variation * spacing;
      
      drawDot(finalX, finalY, dotSize, color);
    }
  }
}

// Sauvegarder
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/textures/world-dots.png', buffer);
console.log('✅ Texture mondiale avec points bleus créée avec succès (4096×2048)');
console.log('   Tous les continents définis avec dégradé bleu');








