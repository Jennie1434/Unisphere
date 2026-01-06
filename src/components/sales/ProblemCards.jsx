import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const problems = [
    {
        problem: 'Projets invisibles',
        solution: 'Portfolio centralisé',
        detail: 'Les étudiants créent, mais rien n\'est centralisé'
    },
    {
        problem: 'Assos dispersées',
        solution: 'Hub unifié',
        detail: 'WhatsApp, Drive, Excel... impossible à suivre'
    },
    {
        problem: 'Engagement difficile',
        solution: 'Suivi en temps réel',
        detail: 'Qui fait quoi ? Aucune vue d\'ensemble'
    },
    {
        problem: 'Données perdues',
        solution: 'Archive complète',
        detail: 'Aucun portfolio collectif de l\'école'
    }
];

export default function ProblemCards() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative w-full min-h-[400vh] bg-black">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Title that fades out */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white text-center px-4">
                        Le problème qu'on <span className="text-[#10B981]">résout</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 text-center px-4">
                        Aujourd'hui, tout est dispersé
                    </p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="mt-12"
                    >
                        <p className="text-white/40 text-sm">Scrollez pour découvrir</p>
                    </motion.div>
                </motion.div>

                {/* Animated Items */}
                {problems.map((item, index) => {
                    const start = 0.1 + (index * 0.2);
                    const end = start + 0.2;

                    const opacity = useTransform(
                        scrollYProgress,
                        [start - 0.05, start, end - 0.05, end],
                        [0, 1, 1, 0]
                    );

                    const scale = useTransform(
                        scrollYProgress,
                        [start - 0.05, start, end - 0.05, end],
                        [0.8, 1, 1, 0.8]
                    );

                    const problemOpacity = useTransform(
                        scrollYProgress,
                        [start, start + 0.05, start + 0.1],
                        [1, 1, 0]
                    );

                    const solutionOpacity = useTransform(
                        scrollYProgress,
                        [start + 0.1, start + 0.15],
                        [0, 1]
                    );

                    const xProblem = useTransform(
                        scrollYProgress,
                        [start, start + 0.1],
                        [0, -100]
                    );

                    const xSolution = useTransform(
                        scrollYProgress,
                        [start + 0.1, start + 0.15],
                        [100, 0]
                    );

                    return (
                        <motion.div
                            key={index}
                            style={{ opacity, scale }}
                            className="absolute inset-0 flex items-center justify-center px-8"
                        >
                            <div className="relative w-full max-w-6xl">
                                {/* Problem State */}
                                <motion.div
                                    style={{
                                        opacity: problemOpacity,
                                        x: xProblem
                                    }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                >
                                    <div className="mb-8">
                                        <X className="w-24 h-24 text-red-500 mx-auto mb-6" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-6xl md:text-8xl font-black text-red-500 mb-6 leading-none">
                                        {item.problem}
                                    </h3>
                                    <p className="text-2xl md:text-3xl text-white/60 max-w-3xl">
                                        {item.detail}
                                    </p>
                                </motion.div>

                                {/* Arrow Transition */}
                                <motion.div
                                    style={{
                                        opacity: useTransform(
                                            scrollYProgress,
                                            [start + 0.08, start + 0.1, start + 0.12],
                                            [0, 1, 0]
                                        )
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <ArrowRight className="w-32 h-32 text-[#10B981]" strokeWidth={2} />
                                </motion.div>

                                {/* Solution State */}
                                <motion.div
                                    style={{
                                        opacity: solutionOpacity,
                                        x: xSolution
                                    }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                >
                                    <div className="mb-8">
                                        <div className="w-24 h-24 rounded-full bg-[#10B981] mx-auto mb-6 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-6xl md:text-8xl font-black text-[#10B981] mb-6 leading-none">
                                        {item.solution}
                                    </h3>
                                    <p className="text-2xl md:text-3xl text-white/80 max-w-3xl font-medium">
                                        UniSphere centralise et organise tout
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Progress Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {problems.map((_, index) => {
                        const start = 0.1 + (index * 0.2);
                        const end = start + 0.2;

                        const dotOpacity = useTransform(
                            scrollYProgress,
                            [start, end],
                            [0.3, 1]
                        );

                        return (
                            <motion.div
                                key={index}
                                style={{ opacity: dotOpacity }}
                                className="w-3 h-3 rounded-full bg-white"
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
