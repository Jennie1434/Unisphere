import React, { useState, useEffect } from 'react';
import DottedSphereFallback from './DottedSphereFallback';

export default function HeroGlobe({ children }) {
  const [useFallback, setUseFallback] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Vérifier si les vidéos existent
  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch('/videos/globe.mp4', { method: 'HEAD' });
        if (!response.ok) {
          setUseFallback(true);
        }
      } catch {
        setUseFallback(true);
      }
    };
    checkVideo();
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden flex items-center justify-center">
      {/* Background vidéo ou fallback SVG */}
      <div className="absolute inset-0 z-0">
        {!useFallback ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setUseFallback(true)}
              onLoadedData={() => setVideoLoaded(true)}
              poster="/images/globe-poster.jpg"
            >
              <source src="/videos/globe.webm" type="video/webm" />
              <source src="/videos/globe.mp4" type="video/mp4" />
            </video>
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
            )}
          </>
        ) : (
          <DottedSphereFallback />
        )}
      </div>

      {/* Overlay gradient pour premium look */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/60 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.8)_100%)] z-[1]" />

      {/* Contenu au-dessus */}
      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
}

