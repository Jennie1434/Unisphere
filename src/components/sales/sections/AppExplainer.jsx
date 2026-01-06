import React from 'react';
import { motion } from 'framer-motion';

const points = [
    { title: "Tableau de bord intelligent", text: "Suivez l'évolution de vos projets en temps réel avec des indicateurs de performance clairs." },
    { title: "Journal d'engagement", text: "Chaque étudiant possède son propre journal où ses actions sont valorisées automatiquement." },
    { title: "Communauté active", text: "Connectez-vous avec les autres membres du campus pour collaborer sur des projets communs." }
];

export default function AppExplainer() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="space-y-24">
                    {points.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="group"
                        >
                            <span className="text-[#14F195] font-black text-xl mb-4 block">0{i + 1}</span>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                {point.title}
                            </h3>
                            <p className="text-xl text-black/60 leading-relaxed max-w-2xl">
                                {point.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
