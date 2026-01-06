import React from 'react';
import { motion } from 'framer-motion';

export default function NatureMagicSection() {
    return (
        <section className="py-32 bg-white flex flex-col items-center">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-bold mb-12 text-black leading-tight"
                    style={{ fontFamily: 'ui-serif, Georgia, serif' }}
                >
                    La technologie au service de <br />
                    <span className="text-[#14F195]">l'intelligence collective.</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-left"
                    >
                        <p className="text-xl text-black/70 leading-relaxed mb-6">
                            UniSphere utilise des algorithmes de pointe pour mesurer l'impact
                            réel de chaque action. Nous ne nous contentons pas de stocker,
                            nous révélons le potentiel caché.
                        </p>
                        <p className="text-xl text-black/70 leading-relaxed">
                            Chaque donnée collectée sert à nourrir un écosystème où
                            le mérite est reconnu et le talent amplifié.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="aspect-square bg-black rounded-[4rem] flex items-center justify-center p-12"
                    >
                        <div className="w-full h-full border border-[#14F195]/30 rounded-full animate-pulse flex items-center justify-center">
                            <div className="w-1/2 h-1/2 bg-[#14F195] blur-[100px] opacity-20 rounded-full" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
