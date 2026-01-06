import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';

const universitySteps = [
  {
    title: "Créer l'espace UniSphere",
    text: "Un espace privé pour votre université, avec vos accès et vos rôles.",
  },
  {
    title: "Publier & coordonner",
    text: "Projets, assos, missions : tout est au même endroit.",
  },
  {
    title: "Suivre & valoriser",
    text: "Engagement mesurable, meilleurs projets et étudiants mis en avant.",
  }
];

const studentSteps = [
  {
    title: "Rejoindre mon université",
    text: "Accès à l'espace privé de votre école.",
  },
  {
    title: "Partager ses projets / rejoindre une asso / prendre une mission",
    text: "Tout est visible et accessible en quelques clics.",
  },
  {
    title: "Être reconnu",
    text: "Badges, points, mise en avant des contributions.",
  }
];

export default function SectionHowItWorks() {
  const [activeTab, setActiveTab] = useState('universities');

  return (
    <Section id="product" background="default">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-12 tracking-tight editorial-heading"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Pour les Universités
      </motion.h2>

      {/* Toggle */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-white border-2 border-black/5 rounded-full p-1 shadow-md">
          <button
            onClick={() => setActiveTab('universities')}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 relative ${activeTab === 'universities'
              ? 'text-black'
              : 'text-black/60 hover:text-[#14F195]'
              }`}
          >
            {activeTab === 'universities' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: 'rgba(20, 241, 149, 0.2)',
                  zIndex: 0,
                  boxShadow: '0 2px 8px rgba(20, 241, 149, 0.15)'
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 font-semibold">
              Pour les Universités
            </span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 relative ${activeTab === 'students'
              ? 'text-black'
              : 'text-black/60 hover:text-[#14F195]'
              }`}
          >
            {activeTab === 'students' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: 'rgba(20, 241, 149, 0.2)',
                  zIndex: 0,
                  boxShadow: '0 2px 8px rgba(20, 241, 149, 0.15)'
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 font-semibold">
              Pour les Étudiants
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {(activeTab === 'universities' ? universitySteps : studentSteps).map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-8 border border-[var(--color-border)] rounded-2xl hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 editorial-heading" style={{ color: 'var(--color-text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-base leading-relaxed editorial-body" style={{ color: 'var(--color-text-secondary)' }}>
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
