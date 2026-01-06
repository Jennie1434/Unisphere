import React from 'react';
import { motion } from 'framer-motion';

const expertises = [
    "Présidents de BDE", "Responsables Associatifs", "Chargés de Vie Étudiante",
    "Étudiants Ambassadeurs", "Direction de la Communication", "Responsables de Scolarité",
    "Partenaires École", "Anciens Élèves", "Futurs Admis"
];

export default function ExpertiseList() {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="flex flex-col gap-12">
                {/* Horizontal Marquee (Lent) */}
                <div className="flex overflow-hidden whitespace-nowrap">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex gap-24 items-center pr-24"
                    >
                        {[...expertises, ...expertises].map((role, i) => (
                            <span
                                key={i}
                                className="text-4xl md:text-6xl font-black text-black/10 hover:text-black transition-colors cursor-default"
                                style={{ fontFamily: 'ui-serif, Georgia, serif' }}
                            >
                                {role.toUpperCase()}
                            </span>
                        ))}
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-xl text-black/40 font-medium"
                    >
                        UniSphere connecte chaque acteur du campus. <br />
                        Une vision 360° pour une collaboration sans friction.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
