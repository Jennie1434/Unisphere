import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

const problems = [
  {
    title: "Les projets étudiants sont peu visibles",
    text: "Les étudiants créent, mais leurs projets restent difficiles à trouver et à valoriser.",
  },
  {
    title: "Les associations manquent de visibilité",
    text: "Recrutement, événements, infos : rien n'est centralisé, tout se perd.",
  },
  {
    title: "Les ambassadeurs sont mal coordonnés",
    text: "Missions, plannings, contenus : répartis entre chats, drives et outils différents.",
  },
  {
    title: "Aucun suivi clair de l'engagement",
    text: "Difficile de mesurer la participation et de mettre en avant les meilleurs contributeurs.",
  }
];

export default function SectionProblem() {
  return (
    <Section background="default">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-20 tracking-tight editorial-heading"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Aujourd'hui, tout est dispersé.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {problems.map((problem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-4 editorial-heading" style={{ color: 'var(--color-text-primary)' }}>
              {problem.title}
            </h3>
            <p className="text-lg leading-relaxed editorial-body" style={{ color: 'var(--color-text-secondary)' }}>
              {problem.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
