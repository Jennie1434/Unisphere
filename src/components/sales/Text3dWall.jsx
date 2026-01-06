import { useRef } from 'react';
import styles from './styles/Text3dWall.module.css';

export default function Text3dWall() {
    const plane = useRef(null);
    const maxRotate = 45;

    const manageMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const perspective = window.innerWidth * 4;
        const rotateX = maxRotate * x - maxRotate / 2;
        const rotateY = (maxRotate * y - maxRotate / 2) * -1;

        if (plane.current) {
            plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
        }
    };

    return (
        <div
            onMouseMove={manageMouseMove}
            className="w-full min-h-[60vh] flex items-center justify-center bg-[#F7F7F5] py-24 my-12"
            style={{ overflow: 'visible' }}
        >
            <div ref={plane} className={styles.body}>
                <Text3d primary={"Centralisez"} secondary={"Vos Projets"} />
                <Text3d primary={"Inspirez"} secondary={"Votre Campus"} />
                <Text3d primary={"Connectez"} secondary={"Les Talents"} />
                <Text3d primary={"Eugenia"} secondary={"School"} />
            </div>
        </div>
    );
}

function Text3d({ primary, secondary }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.textContainer}>
                <p className={styles.primary}>{primary}</p>
                <p className={styles.secondary}>{secondary}</p>
            </div>
        </div>
    );
}
