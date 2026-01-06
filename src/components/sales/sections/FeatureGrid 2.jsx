import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const features = [
    { name: "Engagement", sub: "Étudiants actifs", target: 85, unit: "%", desc: "Taux moyen d'interaction" },
    { name: "Projets", sub: "Centralisés", target: 236, unit: "+", desc: "Impact collectif mesuré" },
    { name: "Satisfaction", sub: "Écoles & BDE", target: 18, unit: "/20", desc: "Note de recommandation" }
];

function CountUp({ target, unit }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(target);
            if (start === end) return;

            let totalMiliseconds = 2000;
            let incrementTime = (totalMiliseconds / end) > 10 ? (totalMiliseconds / end) : 10;

            let timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, target]);

    return (
        <span ref={ref} className="text-6xl md:text-8xl font-black text-black">
            {count}{unit}
        </span>
    );
}

export default function FeatureGrid() {
    return (
        <section className="py-32 bg-[#F7F7F5]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-12 rounded-[3rem] shadow-sm border border-black/5 flex flex-col items-center text-center transition-all hover:border-[#14F195]/30 group"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-black/40 mb-2 group-hover:text-[#14F195] transition-colors">
                                {f.sub}
                            </span>
                            <h3 className="text-2xl font-bold mb-8 text-black">
                                {f.name}
                            </h3>
                            <CountUp target={f.target} unit={f.unit} />
                            <p className="mt-8 text-black/60 font-medium">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
