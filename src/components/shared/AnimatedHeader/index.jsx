import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

export default function Header({ school = 'eugenia' }) {
    const [isActive, setIsActive] = useState(false);
    const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

    const menu = {
        open: {
            width: "480px",
            height: "650px",
            top: "-25px",
            right: "-25px",
            transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
        },
        closed: {
            width: "100px",
            height: "40px",
            top: "0px",
            right: "0px",
            transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
        }
    }

    const links = [
        { title: "Accueil", href: schoolPath },
        { title: "Portfolio", href: `${schoolPath}/portfolio` },
        { title: "Associations", href: `${schoolPath}/associations` },
        { title: "Ambassadeur", href: `${schoolPath}/ambassadeurs` },
        { title: "Classement", href: `${schoolPath}/leaderboard` },
        { title: "Étudiant", href: `${schoolPath}/student/profile` },
        { title: "Soumettre", href: `${schoolPath}/submit` }
    ];

    const footerLinks = [
        { title: "Facebook", href: "/" },
        { title: "LinkedIn", href: "/" },
        { title: "Instagram", href: "/" },
        { title: "Twitter", href: "/" }
    ];

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    UniSphere <span className="opacity-40">|</span> <span className="font-serif italic font-medium">{school === 'eugenia' ? 'Eugenia' : 'Albert'}</span>
                </Link>
            </div>

            {/* Menu Toggle (Visible on all screens) */}
            <div className="relative z-50">
                <div className={styles.menuContainer}>
                    <motion.div
                        className={styles.menu}
                        variants={menu}
                        animate={isActive ? "open" : "closed"}
                        initial="closed"
                    >
                        <Nav
                            isActive={isActive}
                            links={links}
                            footerLinks={footerLinks}
                            setIsActive={setIsActive}
                        />
                    </motion.div>
                    <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
                </div>
            </div>
        </div>
    );
}
