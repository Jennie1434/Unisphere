import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blur, translate } from './anim';

export default function NavBody({ links, selectedLink, setSelectedLink }) {
    const getChars = (word) => {
        let chars = [];
        word.split("").forEach((char, i) => {
            chars.push(
                <motion.span
                    custom={[i * 0.02, (word.length - i) * 0.01]}
                    variants={translate}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key={char + i}
                >
                    {char}
                </motion.span>
            );
        });
        return chars;
    };

    return (
        <div className="flex flex-col gap-3">
            {links.map((link, index) => {
                const { title, href } = link;
                return (
                    <Link key={`l_${index}`} to={href}>
                        <motion.p
                            onMouseOver={() => setSelectedLink({ isActive: true, index })}
                            onMouseLeave={() => setSelectedLink({ isActive: false, index })}
                            variants={blur}
                            animate={selectedLink.isActive && selectedLink.index !== index ? "open" : "closed"}
                            className="text-5xl md:text-6xl font-bold text-black cursor-pointer m-0 hover:text-[#10B981] transition-colors"
                        >
                            {getChars(title)}
                        </motion.p>
                    </Link>
                );
            })}
        </div>
    );
}
