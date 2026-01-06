import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const universityBenefits = [
  "Plus d'engagement sans surcharge administrative",
  "Image innovante renforcée",
  "Visibilité complète sur événements, assos, ambassadeurs et projets",
  "Un vrai \"portfolio collectif\" de l'école"
];

const studentBenefits = [
  "Projets visibles et valorisés",
  "Associations faciles à découvrir et rejoindre",
  "Missions claires pour s'impliquer",
  "Reconnaissance de l'impact et de la participation"
];

export default function SectionBenefits() {
  return (
    <section id="universities" className="relative w-full bg-[#F7F7F5]" style={{ paddingTop: 'var(--premium-spacing)', paddingBottom: 'var(--premium-spacing)' }}>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Fait pour <span style={{ color: 'var(--eugenia-green)' }}>tous</span>
          </h2>
          <p className="text-lg md:text-xl text-black/80">
            Universités et étudiants bénéficient de la même plateforme
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* For Universities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-black">
              Pour les Universités
            </h3>
            <ul className="space-y-4">
              {universityBenefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--eugenia-green)' }} />
                  <span className="text-base leading-relaxed text-black/90">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* For Students */}
          <motion.div
            id="students"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-black">
              Pour les Étudiants
            </h3>
            <ul className="space-y-4">
              {studentBenefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--eugenia-green)' }} />
                  <span className="text-base leading-relaxed text-black/90">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
