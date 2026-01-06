import { useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../../hooks/useMousePosition';

export default function MaskRevealSection() {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const size = isHovered ? 600 : 60; // Larger mask and initial size

    return (
        <section
            className="relative w-full py-32 overflow-hidden"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                        Une expérience <span className="text-[#10B981]">transformée</span>
                    </h2>
                    <p className="text-xl text-white/60">
                        Découvrez comment UniSphere change la donne
                    </p>
                </div>

                {/* Mask Reveal Container */}
                <div className="relative min-h-[600px] flex items-center justify-center">
                    {/* Masked layer - reveals positive text underneath */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                        animate={{
                            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                            WebkitMaskSize: `${size}px`,
                        }}
                        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                        style={{
                            maskImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjIwMCIgZmlsbD0iYmxhY2siLz48L3N2Zz4=)',
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                        }}
                    >
                        <div
                            className="text-center px-8 pointer-events-auto"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#10B981]">
                                UniSphere centralise tout :{' '}
                                <span className="text-white">projets visibles</span>,{' '}
                                <span className="text-white">assos organisées</span>,{' '}
                                <span className="text-white">engagement tracé</span>,{' '}
                                <span className="text-white">portfolio collectif</span>.
                            </p>
                        </div>
                    </motion.div>

                    {/* Base layer - problem text (always visible behind mask) */}
                    <div className="relative z-0 text-center px-8">
                        <div
                            className="cursor-pointer"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                                <div className="space-y-2">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white/40">
                                        Projets invisibles
                                    </h3>
                                    <p className="text-lg text-white/30">
                                        Les étudiants créent, mais rien n'est centralisé
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white/40">
                                        Assos dispersées
                                    </h3>
                                    <p className="text-lg text-white/30">
                                        WhatsApp, Drive, Excel... impossible à suivre
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white/40">
                                        Engagement difficile
                                    </h3>
                                    <p className="text-lg text-white/30">
                                        Qui fait quoi ? Aucune vue d'ensemble
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white/40">
                                        Données perdues
                                    </h3>
                                    <p className="text-lg text-white/30">
                                        Aucun portfolio collectif de l'école
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hint text */}
                <div className="text-center mt-12">
                    <p className="text-sm text-white/40 font-medium">
                        Passez la souris pour révéler la solution
                    </p>
                </div>
            </div>
        </section>
    );
}
