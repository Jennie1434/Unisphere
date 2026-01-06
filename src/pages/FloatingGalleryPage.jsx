import { useRef } from 'react';
import {
    floating1, 
    floating2, 
    floating3, 
    floating4, 
    floating5, 
    floating6, 
    floating7, 
    floating8
} from '../data';
import styles from './FloatingGalleryPage.module.scss';

export default function FloatingGalleryPage() {
    const plane1 = useRef(null);
    const plane2 = useRef(null);
    const plane3 = useRef(null);

    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <h1>Floating Images Gallery</h1>
                <p>React and GSAP</p>
            </div>
            
            <div ref={plane1} className={styles.plane}>
                <img 
                    src={floating1}
                    alt='floating image 1'
                    width={300}
                />
                <img 
                    src={floating2}
                    alt='floating image 2'
                    width={300}
                />
                <img 
                    src={floating7}
                    alt='floating image 7'
                    width={225}
                />
            </div>
            
            <div ref={plane2} className={styles.plane}>
                <img 
                    src={floating4}
                    alt='floating image 4'
                    width={250}
                />
                <img 
                    src={floating6}
                    alt='floating image 6'
                    width={200}
                />
                <img 
                    src={floating8}
                    alt='floating image 8'
                    width={225}
                />
            </div>
            
            <div ref={plane3} className={styles.plane}>
                <img 
                    src={floating3}
                    alt='floating image 3'
                    width={150}
                />
                <img 
                    src={floating5}
                    alt='floating image 5'
                    width={200}
                />
            </div>
        </main>
    );
}

