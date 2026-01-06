import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from './anim';
import NavBody from './NavBody';
import NavFooter from './NavFooter';
import NavImage from './NavImage';

const links = [
    {
        title: "Accueil",
        href: "/",
        src: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        title: "Projets",
        href: "/portfolio",
        src: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        title: "Associations",
        href: "/eugenia-school/associations",
        src: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        title: "Ambassadeurs",
        href: "/eugenia-school/ambassadeurs",
        src: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        title: "Classement",
        href: "/eugenia-school/leaderboard",
        src: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    }
];

export default function AnimatedNav() {
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

    return (
        <motion.div
            variants={height}
            initial="initial"
            animate="enter"
            exit="exit"
            className="overflow-hidden bg-white"
        >
            <div className="flex p-10 md:p-20 gap-12 h-full">
                <div className="flex flex-col justify-between flex-1">
                    <NavBody links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
                    <NavFooter />
                </div>
                <div className="hidden md:block relative w-1/3 h-full rounded-3xl overflow-hidden">
                    <NavImage src={links[selectedLink.index].src} selectedLink={selectedLink} />
                </div>
            </div>
        </motion.div>
    );
}
