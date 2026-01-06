import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ParallaxIntro() {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

    return (
        <div ref={container} className='h-screen overflow-hidden relative'>
            <motion.div
                style={{ y }}
                className='relative h-full bg-gradient-to-br from-black via-gray-900 to-black'
            >
                {/* Gradient overlay with green accent */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.2), transparent 60%)'
                    }}
                />

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center px-6 max-w-5xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight"
                        >
                            Transformez votre{' '}
                            <span className="text-[#10B981]">Campus</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-xl md:text-2xl text-white/80 font-medium"
                        >
                            L'engagement étudiant réinventé
                        </motion.p>
                    </div>
                </div>

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </motion.div>
        </div>
    );
}
