import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import styles from './style.module.scss';
import { ArrowUpRight } from 'lucide-react';

const Card = ({ i, title, description, src, url, color, progress, range, targetScale }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className={styles.cardContainer}>
            <motion.div
                className={styles.card}
                style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }}
            >
                <h2>{title}</h2>
                <div className={styles.body}>
                    <div className={styles.description}>
                        <p>{description}</p>
                        <span className="flex items-center gap-2">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="font-bold uppercase tracking-widest text-xs">Voir le projet</a>
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>

                    <div className={styles.imageContainer}>
                        <motion.div
                            className={styles.inner}
                            style={{ scale: imageScale }}
                        >
                            {src ? (
                                <img
                                    src={src}
                                    alt={title}
                                />
                            ) : (
                                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                                    <span className="text-white/40 uppercase font-black">No Image</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Card
