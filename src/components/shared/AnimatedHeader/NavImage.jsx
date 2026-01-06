import { motion } from 'framer-motion';
import { opacity } from './anim';

export default function NavImage({ src, selectedLink }) {
    return (
        <motion.div
            variants={opacity}
            initial="initial"
            animate={selectedLink.isActive ? "open" : "closed"}
            className="absolute top-0 left-0 w-full h-full"
            style={{
                background: src,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    );
}
