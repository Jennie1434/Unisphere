import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VerticalManifestColumn() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // We'll reveal letters one by one
    const text = "CONNECTEZ";
    const letters = text.replace(/\s/g, "").split("");

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center"
        >
            <motion.div
                style={{ y }}
                className="flex flex-col items-center gap-4"
            >
                {letters.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, margin: "-10% 0px" }}
                        transition={{
                            delay: i * 0.05,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="text-6xl md:text-8xl font-black text-white leading-none hover:text-[#14F195] transition-colors"
                        style={{ fontFamily: 'ui-serif, Georgia, serif' }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>

            {/* Subtle background text */}
            <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                <h2 className="text-[20vw] font-black text-white select-none rotate-90">
                    UNISPHERE
                </h2>
            </div>
        </section>
    );
}
