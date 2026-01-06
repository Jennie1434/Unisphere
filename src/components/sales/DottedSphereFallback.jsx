import React from 'react';

export default function DottedSphereFallback() {
  // Générer les points de la sphère avec un pattern plus dense et premium
  const dots = [];
  const radius = 250;
  const centerX = 400;
  const centerY = 400;

  // Créer un pattern de points sur une sphère (plus dense)
  for (let lat = -Math.PI / 2; lat < Math.PI / 2; lat += 0.12) {
    for (let lng = 0; lng < Math.PI * 2; lng += 0.12) {
      const x3d = Math.cos(lat) * Math.cos(lng);
      const y3d = Math.sin(lat);
      const z3d = Math.cos(lat) * Math.sin(lng);

      // Projection 2D (vue frontale avec perspective)
      const perspective = 1 + z3d * 0.4;
      const scale = 1 / perspective;
      const x2d = centerX + x3d * radius * scale;
      const y2d = centerY + y3d * radius * scale;

      // Opacité et taille basées sur la profondeur
      const depth = (z3d + 1) / 2; // 0 à 1
      const opacity = Math.max(0.15, depth * 0.5);
      const size = Math.max(1.5, depth * 3);

      dots.push({ x: x2d, y: y2d, opacity, size, depth });
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        className="sphere-rotate"
        style={{ opacity: 0.12 }}
      >
        <defs>
          <radialGradient id="dotGradient">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.8)" />
            <stop offset="100%" stopColor="rgba(96, 165, 250, 0.4)" />
          </radialGradient>
        </defs>
        <g>
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill="url(#dotGradient)"
              opacity={dot.opacity}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
