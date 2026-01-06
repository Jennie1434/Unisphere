import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

const pillars = [
  {
    title: "UniSphere Portfolio",
    text: "Fiches projets + profils étudiants + intégration LinkedIn / GitHub.",
  },
  {
    title: "UniSphere Associations",
    text: "Fiches assos, agenda, actualités, formulaires d'adhésion.",
  },
  {
    title: "UniSphere Ambassadeurs",
    text: "Missions, planning, ressources, points & badges + générateur de post LinkedIn.",
  },
  {
    title: "Espace privé par université",
    text: "Une communauté organisée, sécurisée, contrôlée par l'école.",
  }
];

export default function SectionSolution() {
  return (
    <Section background="white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-20 tracking-tight editorial-heading"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Une seule plateforme pour 3 besoins.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {pillars.map((pillar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center p-8 border border-[var(--color-border)] rounded-2xl hover:shadow-md transition-shadow"
          >
            <h3 className="text-2xl font-semibold mb-4 editorial-heading" style={{ color: 'var(--color-text-primary)' }}>
              {pillar.title}
            </h3>
            <p className="text-lg leading-relaxed editorial-body" style={{ color: 'var(--color-text-secondary)' }}>
              {pillar.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
