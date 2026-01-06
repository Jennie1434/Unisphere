import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { perspective, slideIn } from "./anim";

export default function Nav({ links, footerLinks, school }) {
    return (
        <div className={styles.nav}>
            <div className={styles.body}>
                {
                    links.map((link, i) => {
                        const { title, href } = link;
                        return (
                            <div key={`b_${i}`} className={styles.linkContainer}>
                                <motion.div
                                    custom={i}
                                    variants={perspective}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                >
                                    {link.action ? (
                                        <button
                                            onClick={link.action}
                                            className="text-left w-full px-4 py-2 bg-black text-white hover:bg-red-600 transition-colors font-black uppercase text-sm tracking-widest rounded-none border-2 border-black hover:border-red-600"
                                        >
                                            {title}
                                        </button>
                                    ) : (
                                        <Link to={href}>
                                            {title}
                                        </Link>
                                    )}
                                </motion.div>
                            </div>
                        )
                    })
                }
            </div>

            <motion.div className={styles.footer}>
                {
                    footerLinks.map((link, i) => {
                        const { title, href } = link;
                        return (
                            <motion.a
                                variants={slideIn}
                                custom={i}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                                key={`f_${i}`}
                                href={href}
                            >
                                {title}
                            </motion.a>
                        )
                    })
                }
            </motion.div>
        </div>
    )
}
