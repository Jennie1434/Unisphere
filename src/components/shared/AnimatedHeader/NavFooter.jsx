import { motion } from 'framer-motion';
import { translate } from './anim';

export default function NavFooter() {
    return (
        <div className="flex gap-10 text-sm mt-8">
            <ul className="flex flex-col gap-2">
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="text-black/60"
                >
                    <span className="text-black/40">Made by:</span> UniSphere
                </motion.li>
            </ul>
            <ul className="flex flex-col gap-2">
                <motion.li
                    custom={[0.3, 0]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="text-black/60"
                >
                    <span className="text-black/40">Design:</span> Premium
                </motion.li>
            </ul>
        </div>
    );
}
