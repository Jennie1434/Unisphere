import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const benefits = [
    { title: "Longue vie", desc: "Une autonomie pensée pour durer tout au long de l'année scolaire." },
    { title: "Portable", desc: "Accédez à vos projets partout, tout le temps." },
    { title: "Connecté", desc: "Une intégration parfaite avec vos outils existants." }
];

export default function BenefitCards() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="py-32 bg-[#F7F7F5]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: i * 0.2,
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            whileHover={{ scale: 1.02 }}
                            className="p-10 bg-white border border-black/5 rounded-3xl shadow-sm hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-3xl font-bold mb-4 text-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                {benefit.title}
                            </h3>
                            <p className="text-black/60 text-lg leading-relaxed">
                                {benefit.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
