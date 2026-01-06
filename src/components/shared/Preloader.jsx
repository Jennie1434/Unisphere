import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Project-specific words for UniSphere
const words = ['Centralisez', 'Connectez', 'Rayonnez'];

export default function Preloader({ onComplete }) {
    const [phase, setPhase] = useState('intro'); // intro, exit
    const [index, setIndex] = useState(0);
    const [visibleLetters, setVisibleLetters] = useState(0);

    const currentWord = words[index];

    useEffect(() => {
        let timer;

        if (phase === 'intro') {
            if (visibleLetters < currentWord.length) {
                timer = setTimeout(() => {
                    setVisibleLetters(visibleLetters + 1);
                }, 120); // Slightly faster letter reveal to allow more hold time
            } else if (index < words.length - 1) {
                timer = setTimeout(() => {
                    setIndex(index + 1);
                    setVisibleLetters(0);
                }, 1600); // Longer hold in the center for elegance
            } else {
                // Last word finished, wait a bit then start exit
                timer = setTimeout(() => {
                    setPhase('exit');
                }, 1200);
            }
        }

        return () => clearTimeout(timer);
    }, [phase, index, visibleLetters, currentWord]);

    return (
        <AnimatePresence onExitComplete={() => {
            sessionStorage.setItem('preloader-shown', 'true');
            onComplete();
        }}>
            {phase !== 'exit' && (
                <motion.div
                    key="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                >
                    {/* BAND PHASE: Continuous slow expansion of white band */}
                    <motion.div
                        initial={{ height: '15vh' }}
                        animate={{
                            height: '100vh',
                            transition: {
                                duration: 9.5, // Slower expansion as requested
                                ease: "linear"
                            }
                        }}
                        className="w-full bg-white flex items-center justify-center overflow-hidden relative"
                    >
                        <div className="relative flex items-center justify-center w-full h-[200px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`word-group-${index}`}
                                    // Vertical entry from bottom, exit through top
                                    initial={{ y: '100%', opacity: 0 }}
                                    animate={{ y: '0%', opacity: 1 }}
                                    exit={{ y: '-100%', opacity: 0 }}
                                    transition={{
                                        duration: 1,
                                        ease: [0.76, 0, 0.24, 1]
                                    }}
                                    className="absolute flex flex-row items-center justify-center gap-[0.2em]"
                                >
                                    {currentWord.split('').map((letter, i) => (
                                        <motion.span
                                            key={`${index}-${i}`}
                                            initial={{ opacity: 0 }}
                                            animate={i < visibleLetters ? { opacity: 1 } : { opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-black uppercase font-light"
                                            style={{
                                                fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                                                fontFamily: 'ui-serif, Georgia, serif',
                                                fontWeight: 300,
                                                letterSpacing: '0.1em'
                                            }}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
