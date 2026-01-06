import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const beforeItems = [
    'WhatsApp pour les assos',
    'Drive pour les documents',
    'Excel pour le suivi',
    'LinkedIn pour les projets',
    'Emails pour tout le reste'
];

const afterItems = [
    'Un seul espace privé',
    'Tout centralisé et organisé',
    'Vue d\'ensemble instantanée',
    'Données exploitables',
    'Plus d\'impact, moins d\'effort'
];

export default function BeforeAfter() {
    return (
        <section className="relative w-full bg-[#F7F7F5] py-24">
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
                        De la dispersion à l'organisation
                    </h2>
                </motion.div>

                {/* Before/After Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* BEFORE */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="card-premium rounded-[20px] p-8"
                    >
                        <div className="mb-6">
                            <span
                                className="inline-block px-4 py-2 rounded-lg font-bold text-sm mb-2"
                                style={{
                                    background: 'rgba(148, 163, 184, 0.1)',
                                    color: '#64748b'
                                }}
                            >
                                AVANT
                            </span>
                            <h3 className="text-2xl font-bold text-black">
                                Outils dispersés
                            </h3>
                        </div>

                        <ul className="space-y-3">
                            {beforeItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="flex items-start gap-3"
                                >
                                    <XCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-base text-black/50">
                                        {item}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* AFTER */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="card-premium rounded-[20px] p-8"
                        style={{
                            border: `1px solid var(--eugenia-green)`,
                        }}
                    >
                        <div className="mb-6">
                            <span
                                className="inline-block px-4 py-2 rounded-lg font-bold text-sm mb-2"
                                style={{
                                    background: 'rgba(20, 241, 149, 0.1)',
                                    color: 'var(--eugenia-green)'
                                }}
                            >
                                APRÈS
                            </span>
                            <h3 className="text-2xl font-bold text-black">
                                Tout au même endroit
                            </h3>
                        </div>

                        <ul className="space-y-3">
                            {afterItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--eugenia-green)' }} />
                                    <span className="text-base text-black/90">
                                        {item}
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
