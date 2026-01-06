import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AppMockups() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax values
    const mobileY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const webY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const lateralLeft = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-100, 0, 0, -50]);
    const lateralRight = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, 50]);

    return (
        <section
            ref={containerRef}
            className="py-64 bg-black overflow-hidden relative min-h-screen flex flex-col items-center justify-center"
        >
            <div className="max-w-7xl mx-auto px-6 w-full relative h-[600px] flex items-center justify-center">

                {/* Lateral Mockups */}
                <motion.div
                    style={{ x: lateralLeft, y: webY }}
                    className="absolute left-0 top-0 w-1/3 aspect-[9/16] bg-zinc-900 rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center p-8"
                >
                    <div className="w-full h-full bg-gradient-to-br from-[#14F195]/20 to-transparent rounded-[2rem] border border-white/5" />
                    <span className="absolute bottom-10 text-white/40 font-mono text-xs">PORTFOLIO.VIEW</span>
                </motion.div>

                <motion.div
                    style={{ x: lateralRight, y: mobileY }}
                    className="absolute right-0 bottom-0 w-1/4 aspect-[9/19] bg-zinc-800 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center justify-center p-6"
                >
                    <div className="w-full h-full bg-gradient-to-t from-[#14F195]/10 to-transparent rounded-[1.8rem] border border-white/5" />
                    <span className="absolute bottom-8 text-white/40 font-mono text-xs">MOBILE.APP</span>
                </motion.div>

                {/* Central Main Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="z-10 w-full max-w-4xl aspect-video bg-zinc-900 rounded-[2rem] border border-white/20 shadow-[0_0_100px_rgba(20,241,149,0.15)] overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#14F195]/5 via-white/5 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                </motion.div>

                <div className="absolute -top-32 text-center pointer-events-none">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                        Une interface <span className="text-[#14F195]">transparente</span>.
                    </h2>
                </div>
            </div>
        </section>
    );
}
