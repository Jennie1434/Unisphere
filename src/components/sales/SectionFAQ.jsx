import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "C'est quoi UniSphere ?",
    a: "Une plateforme unifiée pour gérer projets étudiants, associations et programme ambassadeur dans un espace privé par université."
  },
  {
    q: "Pour qui ?",
    a: "Pour les universités qui veulent centraliser la vie étudiante, et pour les étudiants qui veulent valoriser leur parcours."
  },
  {
    q: "Comment ça marche ?",
    a: "Chaque université a son espace privé. Les étudiants se connectent via leur école et accèdent aux 3 modules : Portfolio, Associations, Missions."
  },
  {
    q: "Combien ça coûte ?",
    a: "Tarif sur mesure selon la taille de votre université. Contactez-nous pour une démo personnalisée."
  },
  {
    q: "Comment démarrer ?",
    a: "Demandez une démo, nous configurons votre espace en 48h. Formation incluse pour votre équipe."
  }
];

export default function SectionFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative w-full bg-[#F7F7F5] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-black/80">
            Tout ce que vous devez savoir sur la plateforme
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="overflow-hidden card-premium !p-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-lg text-black">
                  {faq.q}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}
                  style={{ color: 'var(--eugenia-green)' }}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-base leading-relaxed text-black/70">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
