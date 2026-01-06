import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: "50k", label: "Actions certifiées", detail: "En moins de 6 mois d'utilisation" },
    { value: "100+", label: "Associations actives", detail: "Sur un seul écosystème campus" },
    { value: "x3", label: "Impact visuel", detail: "Conversion de projets en opportunités" }
];

export default function StatsHighlight() {
    return (
        <section className="py-64 bg-black relative flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-6 w-full text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="relative group"
                        >
                            <motion.span
                                whileInView={{
                                    textShadow: ["0 0 0px #14F195", "0 0 40px #14F195", "0 0 0px #14F195"]
                                }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="text-8xl md:text-[10rem] font-black text-white block leading-none mb-6"
                            >
                                {stat.value}
                            </motion.span>
                            <h4 className="text-2xl font-bold text-[#14F195] mb-2 uppercase tracking-widest">
                                {stat.label}
                            </h4>
                            <p className="text-white/40 text-lg">
                                {stat.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 aspect-square bg-[#14F195]/5 blur-[150px] rounded-full pointer-events-none" />
        </section>
    );
}
