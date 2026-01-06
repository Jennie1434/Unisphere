import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Text3dWall from './Text3dWall';

export default function ParallaxSection() {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

    return (
        <div
            ref={container}
            className='relative flex items-center justify-center h-screen overflow-hidden'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            {/* Text overlay with 3D effect */}
            <div className="relative z-20 w-full">
                <Text3dWall />
            </div>

            {/* Fixed parallax background */}
            <div className='fixed top-[-10vh] left-0 h-[120vh] w-full z-10'>
                <motion.div style={{ y }} className='relative w-full h-full'>
                    {/* Gradient background */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-gray-100 via-[#F7F7F5] to-gray-200"
                    />

                    {/* Green accent glow */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: 'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.3), transparent 50%)'
                        }}
                    />

                    {/* Subtle pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: 'linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000), linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000)',
                            backgroundSize: '60px 60px'
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
