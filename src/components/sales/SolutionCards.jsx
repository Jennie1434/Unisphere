import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Target, Award } from 'lucide-react';

const modules = [
    {
        name: 'UniSphere Portfolio',
        icon: Layers,
        description: 'Le portfolio collectif de votre école',
        features: [
            'Projets visibles et valorisés',
            'Profils étudiants enrichis',
            'Export LinkedIn/GitHub automatique'
        ]
    },
    {
        name: 'UniSphere Associations',
        icon: Target,
        description: 'La vie étudiante centralisée',
        features: [
            'Agenda et actualités centralisés',
            'Formulaires d\'adhésion intégrés',
            'Suivi des membres en temps réel'
        ],
        popular: true
    },
    {
        name: 'UniSphere Missions',
        icon: Award,
        description: 'L\'engagement gamifié',
        features: [
            'Tableau de bord ambassadeur',
            'Points & badges gamifiés',
            'Générateur de posts LinkedIn'
        ]
    }
];

export default function SolutionCards() {
    return (
        <section className="relative w-full py-24 bg-white/50">
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
                        Une seule plateforme pour <span style={{ color: 'var(--eugenia-green)' }}>tout</span>
                    </h2>
                    <p className="text-lg md:text-xl text-black/80">
                        3 modules puissants intégrés dans une expérience fluide
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {modules.map((module, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="card-premium relative overflow-hidden group"
                        >
                            {/* Popular badge */}
                            {module.popular && (
                                <div className="absolute top-0 right-0 p-4">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                                        style={{ background: 'var(--eugenia-green)', color: '#000000' }}
                                    >
                                        Populaire
                                    </span>
                                </div>
                            )}

                            {/* Icon */}
                            <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                style={{ background: 'rgba(20, 241, 149, 0.1)' }}
                            >
                                <module.icon className="w-8 h-8" style={{ color: 'var(--eugenia-green)' }} />
                            </div>

                            {/* Name */}
                            <h3 className="text-2xl font-bold mb-4 text-black">
                                {module.name}
                            </h3>

                            {/* Description */}
                            <p className="text-base leading-relaxed mb-8 text-black/70">
                                {module.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3">
                                {module.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="mt-1" style={{ color: 'var(--eugenia-green)' }}>✓</span>
                                        <span className="text-sm text-black/90">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
