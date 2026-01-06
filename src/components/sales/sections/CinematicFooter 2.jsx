import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export default function CinematicFooter() {
    return (
        <footer className="bg-black pt-64 pb-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-64">
                    {/* Brand Meta */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 group">
                                UNISPHERE
                                <span className="text-[#14F195] opacity-0 group-hover:opacity-100 transition-opacity ml-4">.</span>
                            </h2>
                            <p className="text-2xl text-white/40 max-w-md leading-relaxed">
                                L'intelligence collective au cœur du campus.
                                Propulsé par la vision d'Albert & Eugenia School.
                            </p>
                        </div>

                        <div className="flex gap-8 items-center mt-24">
                            <motion.a href="#" whileHover={{ y: -5 }} className="text-white/60 hover:text-[#14F195]"><Linkedin /></motion.a>
                            <motion.a href="#" whileHover={{ y: -5 }} className="text-white/60 hover:text-[#14F195]"><Instagram /></motion.a>
                            <motion.a href="#" whileHover={{ y: -5 }} className="text-white/60 hover:text-[#14F195]"><Mail /></motion.a>
                        </div>
                    </div>

                    {/* Vertical Keywords (The Sofi Style) */}
                    <div className="flex flex-col items-start md:items-end gap-8">
                        {["PEOPLE", "PROJECTS", "PROGRESS"].map((word, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2, duration: 1 }}
                                className="flex items-center gap-6 group cursor-default"
                            >
                                <span className="text-6xl md:text-[8rem] font-black text-white leading-none group-hover:text-[#14F195] transition-colors" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                    {word}
                                </span>
                                <ArrowUpRight className="w-12 h-12 text-[#14F195] opacity-0 group-hover:opacity-100 transition-all -translate-y-4 group-hover:translate-y-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-white/30 font-medium">
                    <p>© 2026 UniSphere. All rights reserved.</p>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                        <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(20,241,149,0.1)_0%,transparent_50%)]" />
        </footer>
    );
}
