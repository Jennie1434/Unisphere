import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Settings, Shield } from 'lucide-react';

const trustPoints = [
  {
    title: "Espace isolé par université",
    text: "Les étudiants accèdent uniquement à l'espace de leur école.",
    icon: Lock
  },
  {
    title: "Infrastructure sécurisée",
    text: "Protection des données et standards de sécurité.",
    icon: Settings
  },
  {
    title: "Contrôle total par l'université",
    text: "Gestion des accès, contenus et règles de la communauté.",
    icon: Shield
  }
];

export default function SectionTrust() {
  return (
    <section className="relative w-full py-24 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Une confiance <span style={{ color: 'var(--eugenia-green)' }}>absolue</span>
          </h2>
          <p className="text-lg md:text-xl text-black/80">
            Sécurité, isolation et contrôle total pour les institutions
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trustPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-premium text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(20, 241, 149, 0.1)' }}
              >
                <point.icon className="w-8 h-8" style={{ color: 'var(--eugenia-green)' }} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">
                {point.title}
              </h3>
              <p className="text-base leading-relaxed text-black/70">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
