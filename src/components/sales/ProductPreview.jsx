import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, Zap, Layers, Tent, Award } from 'lucide-react';

const tabs = [
    {
        id: 'signalement',
        label: 'Signalement',
        title: 'Projets étudiants centralisés',
        description: 'Grille de projets avec photos, descriptions et liens LinkedIn/GitHub'
    },
    {
        id: 'associations',
        label: 'Associations',
        title: 'Vie associative organisée',
        description: 'Agenda, actualités et formulaires d\'adhésion'
    },
    {
        id: 'missions',
        label: 'Missions',
        title: 'Tableau de bord ambassadeur',
        description: 'Points, badges et générateur de posts'
    }
];

export default function ProductPreview() {
    const [activeTab, setActiveTab] = useState('signalement');

    return (
        <section className="relative w-full py-24 overflow-hidden bg-[#F7F7F5]" style={{ paddingTop: 'var(--premium-spacing)', paddingBottom: 'var(--premium-spacing)' }}>

            {/* Gradient glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,241,149,0.08),transparent_70%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                        Découvrez <span style={{ color: 'var(--eugenia-green)' }}>UniSphere</span> en action
                    </h2>
                    <p className="text-lg md:text-xl text-black/80">
                        Une interface claire pour gérer toute la vie étudiante
                    </p>
                </motion.div>

                {/* Tabs - LISIBILITÉ MAXIMALE */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-center gap-3 mb-12 flex-wrap"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 font-semibold transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-eugenia-green text-black shadow-lg'
                                : 'bg-white border border-gray-200 text-black/60 hover:text-eugenia-green'
                                }`}
                            style={{
                                borderRadius: 'var(--premium-radius)',
                                boxShadow: activeTab === tab.id ? '0 10px 20px rgba(20, 241, 149, 0.15)' : 'none'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {tabs.map((tab) => tab.id === activeTab && (
                        <motion.div
                            key={tab.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-5xl mx-auto"
                        >
                            {/* Tab description */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-semibold mb-2 text-black">
                                    {tab.title}
                                </h3>
                                <p className="text-lg text-black/70">
                                    {tab.description}
                                </p>
                            </div>

                            {/* Mockup container with browser chrome */}
                            <div
                                className="overflow-hidden glow-green"
                                style={{
                                    background: 'var(--premium-bg-surface)',
                                    borderRadius: 'var(--premium-radius)',
                                    boxShadow: 'var(--premium-shadow)'
                                }}
                            >
                                {/* Browser chrome */}
                                <div
                                    className="flex items-center gap-2 px-4 py-3"
                                    style={{
                                        background: '#f1f5f9',
                                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-slate-300" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <div
                                            className="rounded px-4 py-1 text-xs"
                                            style={{
                                                background: '#ffffff',
                                                color: '#64748b'
                                            }}
                                        >
                                            app.unisphere.fr/{tab.id}
                                        </div>
                                    </div>
                                </div>

                                {/* Mockup content */}
                                <div
                                    className="p-8 min-h-[400px] flex items-center justify-center bg-white"
                                >
                                    <div className="text-center">
                                        <div
                                            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                                            style={{ background: 'rgba(20, 241, 149, 0.1)' }}
                                        >
                                            {activeTab === 'signalement' && <Layers className="w-10 h-10" style={{ color: 'var(--eugenia-green)' }} />}
                                            {activeTab === 'associations' && <Tent className="w-10 h-10" style={{ color: 'var(--eugenia-green)' }} />}
                                            {activeTab === 'missions' && <Award className="w-10 h-10" style={{ color: 'var(--eugenia-green)' }} />}
                                        </div>
                                        <p className="text-gray-500">
                                            Interface {tab.label} • Design moderne et intuitif
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
