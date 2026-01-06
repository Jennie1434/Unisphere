import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function CommunitySection() {
    return (
        <section className="py-32 bg-[#F7F7F5]">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden"
                >
                    <Quote className="absolute top-10 right-10 w-24 h-24 text-[#14F195]/10" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black/30 flex items-center gap-4">
                            <span className="w-12 h-[2px] bg-[#14F195]" />
                            NEVER UNISPHERE ALONE
                        </h2>

                        <blockquote className="text-3xl md:text-5xl font-bold mb-12 text-black leading-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                            "La plateforme a totalement changé notre façon de gérer le BDE. On ne perd plus aucune info, tout est centralisé, mesuré et valorisé."
                        </blockquote>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-[#14F195] font-bold text-xl">
                                AB
                            </div>
                            <div>
                                <p className="text-xl font-bold text-black">Alexandre Bertrand</p>
                                <p className="text-[#14F195] font-semibold">Président BDE, Eugenia School</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
