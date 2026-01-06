import React from 'react';
import { motion } from 'framer-motion';
import EducationGlobe from './EducationGlobe';
import { Sparkles } from 'lucide-react';

export default function UniSphereHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-premium-dark">
      {/* Globe 3D en arrière-plan avec glow vert */}
      <div className="absolute inset-0 z-0 opacity-60">
        <EducationGlobe />
      </div>

      {/* Gradient radial vert + overlay sombre pour contraste */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(219, 161, 45, 0.08), transparent 70%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] w-full max-w-6xl mx-auto px-4 text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(219, 161, 45, 0.1)',
              border: `1px solid rgba(219, 161, 45, 0.3)`
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: 'var(--eugenia-green)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--eugenia-green)' }}>
              Adopté par 12+ grandes écoles
            </span>
          </motion.div>

          {/* H1 - Headline - BLANC pour contraste maximum */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-black"
          >
            Transformez l'engagement <span style={{ color: 'var(--eugenia-green)' }}>étudiant</span>
          </motion.h1>

          {/* Subtitle - Contraste optimal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-4xl mx-auto font-normal leading-relaxed text-black/80"
          >
            Un espace privé où projets, assos et missions se rencontrent
          </motion.p>

          {/* Microcopy - Vert accent */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg mb-12 font-medium text-black/60"
          >
            Simple pour l'école. Puissant pour les étudiants.
          </motion.p>

          {/* CTAs - Boutons cohérents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              className="px-8 py-4 font-semibold transform hover:scale-102 transition-all duration-300"
              style={{
                background: 'var(--eugenia-green)',
                color: '#000000',
                borderRadius: 'var(--premium-radius)',
                boxShadow: '0 0 20px rgba(20, 241, 149, 0.2)'
              }}
            >
              Démarrer gratuitement
            </button>
            <button
              className="px-8 py-4 font-semibold transition-all duration-300"
              style={{
                background: 'transparent',
                color: '#000000',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: 'var(--premium-radius)'
              }}
            >
              Voir comment ça marche
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
