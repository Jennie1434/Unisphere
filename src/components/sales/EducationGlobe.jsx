import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { schools } from "../../constants/schools";

export default function EducationGlobe() {
  const wrapperRef = useRef(null);
  const globeRef = useRef(null);

  const [size, setSize] = useState({ w: 800, h: 600 });
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Générer les arcs de connexion entre les écoles
  const arcsData = useMemo(() => {
    const arcs = [];
    for (let i = 0; i < schools.length; i++) {
      for (let j = i + 1; j < schools.length; j++) {
        arcs.push({
          startLat: schools[i].lat,
          startLng: schools[i].lng,
          endLat: schools[j].lat,
          endLng: schools[j].lng,
        });
      }
    }
    return arcs;
  }, []);

  // Points de données supplémentaires pour simuler les nombreuses villes de l'image
  const additionalPoints = useMemo(() => {
    return [
      // Points supplémentaires aux USA (est et centre)
      { lat: 40.7128, lng: -74.0060 }, // NYC
      { lat: 41.8781, lng: -87.6298 }, // Chicago
      { lat: 39.9526, lng: -75.1652 }, // Philadelphia
      { lat: 42.3601, lng: -71.0589 }, // Boston
      { lat: 38.9072, lng: -77.0369 }, // Washington DC
      { lat: 33.7490, lng: -84.3880 }, // Atlanta
      { lat: 29.7604, lng: -95.3698 }, // Houston
      { lat: 32.7767, lng: -96.7970 }, // Dallas
      { lat: 39.7392, lng: -104.9903 }, // Denver
      { lat: 47.6062, lng: -122.3321 }, // Seattle
    ];
  }, []);

  // Responsive size (width/height are mandatory for react-globe.gl)
  useEffect(() => {
    if (!wrapperRef.current) return;

    const el = wrapperRef.current;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({
        w: Math.max(320, Math.floor(rect.width)),
        h: Math.max(320, Math.floor(rect.height))
      });
    });

    ro.observe(el);
    // initial
    const rect = el.getBoundingClientRect();
    setSize({
      w: Math.max(320, Math.floor(rect.width)),
      h: Math.max(320, Math.floor(rect.height))
    });

    return () => ro.disconnect();
  }, []);

  // prefers-reduced-motion => no rotation
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  // Auto rotation
  useEffect(() => {
    if (!globeRef.current) return;

    // Vue exacte comme sur la photo : Amérique du Nord au centre
    globeRef.current.pointOfView({ lat: 42, lng: -88, altitude: 1.9 }, 0);

    if (reducedMotion) return;

    let raf;
    const rotate = () => {
      const pov = globeRef.current.pointOfView();
      globeRef.current.pointOfView({ ...pov, lng: pov.lng + 0.06 }, 0);
      raf = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, size.w, size.h]);

  // Rendre le globe clair + premium (le vrai switch)
  useEffect(() => {
    if (!globeRef.current) return;

    // Attendre que le globe soit complètement initialisé
    const timeoutId = setTimeout(() => {
      if (!globeRef.current) return;

      const mat = globeRef.current.globeMaterial?.();
      if (!mat) return;

      // Style premium light : beige et bordeaux
      mat.color?.set?.("#F7F7F5");
      mat.emissive?.set?.("#14F195");
      mat.emissiveIntensity = 0.05;
      mat.opacity = 0.8;
      mat.transparent = true;

      // Surface mate
      mat.shininess = 5;
      mat.metalness = 0.1;
      mat.roughness = 0.9;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [size.w, size.h]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full overflow-hidden pointer-events-none"
    >
      {/* Fond beige paper */}
      <div className="absolute inset-0 bg-[#F7F7F5]" />
      {/* Glow jaune subtil autour du globe */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20, 241, 149, 0.05),transparent_70%)]" />
      {/* Pas d'ombre blanche */}
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      <div className="pointer-events-auto">
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"

          // Texture exacte : hexagones + points bleus
          globeImageUrl="/textures/exact-globe.png"
          bumpImageUrl={null}

          // Atmosphere bordeaux subtile
          atmosphereColor="rgba(20, 241, 149, 0.15)"
          atmosphereAltitude={0.15}

          // Points - exactement comme la photo
          pointsData={[...schools, ...additionalPoints]}
          pointLat="lat"
          pointLng="lng"
          pointRadius={(d) => {
            // Marqueur violet proéminent pour Columbia (est des USA)
            if (d.name === "Columbia University") {
              return 0.35; // Plus gros, proéminent
            }
            // Points des écoles légèrement plus gros
            if (d.name) return 0.20;
            // Petits points bleu foncé
            return 0.14;
          }}
          pointAltitude={0.012}
          pointColor={(d) => {
            // Marqueur bordeaux éclatant pour Columbia
            if (d.name === "Columbia University") {
              return "#14F195";
            }
            // Autres points en jaune
            return "rgba(20, 241, 149, 0.6)";
          }}
          pointsMerge={true}

          // Arcs de connexion - exactement comme la photo (bleu clair et violet)
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={(arc) => {
            // Lignes bordeaux éclatantes
            return ["#14F195", "#14F195"];
            // Autres lignes en jaune plus subtil
            return ["rgba(20, 241, 149, 0.3)", "rgba(20, 241, 149, 0.3)"];
          }}
          arcStroke={1.0}
          arcDashLength={0.6}
          arcDashGap={0.2}
          arcDashAnimateTime={4000}
          arcCurveResolution={128}

          // Hover tooltip (désactivé car en arrière-plan)
          onPointHover={(p) => setHovered(null)}
          enablePointerInteraction={false}

          // Optional: limit user zoom
          onZoom={() => {
            // keep default, but you can enforce altitude limits if needed
          }}
        />
      </div>

      {/* Tooltip (only on hover) */}
      {hovered && (
        <div
          className="fixed z-50 rounded-xl bg-white/90 px-3 py-2 text-sm shadow-lg backdrop-blur"
          style={{ left: mouse.x + 14, top: mouse.y + 14 }}
        >
          <div className="font-semibold text-black">{hovered.name}</div>
          <div className="text-black/70">{hovered.city}</div>
        </div>
      )}

      {/* Overlay beige vers le haut */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F7F7F5] to-transparent" />
    </div>
  );
}
