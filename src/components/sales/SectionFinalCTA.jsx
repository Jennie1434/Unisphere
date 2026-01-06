import React from 'react';
import { motion } from 'framer-motion';

export default function SectionFinalCTA() {
  return (
    <section className="relative w-full bg-premium-dark overflow-hidden" style={{ paddingTop: 'var(--premium-spacing)', paddingBottom: 'var(--premium-spacing)' }}>
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,185,129,0.15),transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-black">
          Prêt à transformer votre campus ?
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-xl md:text-2xl mb-10 font-normal leading-relaxed text-black/80"
        >
          Rejoignez les universités qui ont choisi l'innovation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
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
            Demander une démo
          </button>
          <button
            className="px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-102"
            style={{
              background: 'transparent',
              color: '#000000',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: 'var(--premium-radius)'
            }}
          >
            Rejoindre mon université
          </button>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm font-medium"
          style={{ color: 'var(--eugenia-green)' }}
        >
          Configuration en 48h • Support dédié • Aucun engagement
        </motion.p>
      </div>
    </section>
  );
}
