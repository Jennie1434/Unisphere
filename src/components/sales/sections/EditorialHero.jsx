import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollLink from '../../shared/ScrollLink';

export default function EditorialHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white pt-20"
        >
            <motion.div
                style={{ y, opacity, scale }}
                className="max-w-5xl mx-auto px-6 text-center z-10"
            >
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight text-black"
                    style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                    Le futur de l'engagement <br />
                    <span className="italic text-[#14F195]">étudiant</span> commence ici.
                </h1>

                <p className="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Plus qu'une plateforme. Un écosystème conçu pour centraliser,
                    mesurer et transformer chaque projet en succès collectif.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <ScrollLink
                        to="/select-school"
                        className="px-10 py-5 bg-black text-white rounded-full text-lg font-bold hover:scale-105 active:scale-95 transition-transform shadow-2xl"
                    >
                        Découvrir UniSphere
                    </ScrollLink>
                </div>
            </motion.div>

            {/* Product Visual Overlay (Subtle) */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]), opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl"
            >
                <div className="aspect-[21/9] bg-gradient-to-t from-[#14F195]/20 to-transparent blur-3xl rounded-full opacity-50" />
            </motion.div>
        </section>
    );
}
