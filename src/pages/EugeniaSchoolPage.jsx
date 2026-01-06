import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import {
  Briefcase,
  Users,
  Medal,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Sparkles,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function EugeniaSchoolPage() {
  const { student } = useStudentAuth();
  const firstName = student?.firstName || 'Étudiant';
  const containerRef = useRef(null);

  const panels = [
    {
      id: 'portfolio',
      title: 'Portfolio',
      subtitle: 'NARRATIF & IMPACT',
      desc: 'Centralisez vos projets, mesurez votre impact et créez votre propre héritage académique.',
      link: '/eugenia-school/portfolio?tab=mine',
      submitLink: '/eugenia-school/submit?type=project',
      icon: <Briefcase className="w-10 h-10" />,
      color: '#DBA12D',
      stats: '2 PROJETS'
    },
    {
      id: 'associations',
      title: 'Associations',
      subtitle: 'COLLECTIF & ÉNERGIE',
      desc: 'Rejoignez les acteurs du campus. Participez, collaborez et transformez la vie étudiante.',
      link: '/eugenia-school/associations',
      submitLink: '/eugenia-school/associations/agenda',
      icon: <Users className="w-10 h-10" />,
      color: '#DBA12D',
      stats: '3 ÉVÉNEMENTS'
    },
    {
      id: 'ambassadeur',
      title: 'Ambassadeur',
      subtitle: 'MÉRIRE & VISION',
      desc: 'Devenez le visage de l’école. Relevez des défis, gagnez des points et boostez votre prestige.',
      link: '/eugenia-school/ambassadeurs',
      submitLink: '/eugenia-school/submit?type=mission',
      icon: <Medal className="w-10 h-10" />,
      color: '#DBA12D',
      stats: '1 MISSION'
    }
  ];

  return (
    <PageLayout school="eugenia" minimalFooter={true}>
      <div ref={containerRef} className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black overflow-hidden font-sans">

        {/* Kinetic Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-20 max-w-[1700px] mx-auto overflow-hidden">
          <header className="flex flex-col lg:flex-row items-end justify-between gap-12">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-[2px] bg-black"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
                  EU — ECOSYSTEM PRIVATE
                </span>
              </div>

              <h1 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.85] mb-12" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                <span className="block">BIENVENUE,</span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="block italic text-[#671324]"
                  style={{ textShadow: '0 0 60px rgba(103,19,36,0.1)' }}
                >
                  {firstName.toUpperCase()}.
                </motion.span>
              </h1>

              <div className="flex items-center gap-12 mt-16">
                <div className="flex flex-col">
                  <span className="text-4xl font-black">{student?.totalPoints || 0}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Points de prestige</span>
                </div>
                <div className="w-[1px] h-12 bg-black/5" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black italic">M1</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Promotion</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 0.6 }}
              className="relative"
            >
              <Link
                to="/eugenia-school/submit"
                className="group relative flex flex-col items-center justify-center w-48 h-48 bg-black text-white rounded-full transition-all hover:scale-110 active:scale-95 shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:bg-[#671324]"
              >
                <Plus className="w-8 h-8 mb-2 group-hover:rotate-90 transition-transform duration-500 text-[#DBA12D]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 text-center">Nouvelle Soumission</span>
                <div className="absolute inset-2 border border-white/10 rounded-full group-hover:scale-110 transition-transform" />
              </Link>
            </motion.div>
          </header>

          {/* Background Accents (Kinetic) */}
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#671324]/10 blur-[180px] rounded-full -z-10"
          />
        </section>

        {/* WOW Interactive Grid */}
        <section className="border-t border-black flex flex-col lg:flex-row">

          {/* Sidebar Manifest (Pure Contrast) */}
          <div className="w-full lg:w-32 border-r border-black bg-black text-white flex lg:flex-col items-center justify-center py-20 gap-16 overflow-hidden">
            {["PROGRESS", "PEOPLE", "PROJECTS"].map((word, i) => (
              <motion.span
                key={i}
                whileHover={{ color: "#DBA12D", scale: 1.1 }}
                className="lg:rotate-90 text-[11px] font-black tracking-[0.6em] whitespace-nowrap cursor-default transition-colors"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Main Interactive Panels */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
            {panels.map((panel, i) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative group min-h-[500px] border-r border-b border-black flex flex-col p-16 hover:bg-black transition-all duration-700"
              >
                {/* Hover Overlay Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="w-20 h-20 border-2 border-black flex items-center justify-center group-hover:border-[#DBA12D] group-hover:text-[#DBA12D] transition-all bg-white group-hover:bg-transparent"
                    >
                      {panel.icon}
                    </motion.div>
                    <span className="bg-black text-white px-4 py-2 text-[10px] font-black tracking-widest border border-black group-hover:border-[#DBA12D] group-hover:text-[#DBA12D] transition-all">
                      {panel.stats}
                    </span>
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] font-black tracking-[0.4em] mb-6 block text-black/20 group-hover:text-[#DBA12D]/40 transition-colors uppercase">
                      {panel.subtitle}
                    </span>
                    <h2 className="text-5xl font-black mb-8 text-black group-hover:text-white transition-colors" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                      {panel.title}
                    </h2>
                    <p className="text-black/40 group-hover:text-white/60 transition-colors text-sm leading-relaxed max-w-xs font-bold uppercase tracking-tight">
                      {panel.desc}
                    </p>
                  </div>

                  <div className="mt-12 space-y-4">
                    <Link
                      to={panel.link}
                      className="flex items-center justify-between w-full py-6 px-8 bg-black text-white group-hover:bg-[#DBA12D] group-hover:text-black transition-all text-xs font-black uppercase tracking-widest shadow-2xl"
                    >
                      <span>Lancer l'Espace</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Kinetic Glow Effect on hover */}
                <div className="absolute inset-0 bg-[#DBA12D]/0 group-hover:bg-[#DBA12D]/5 transition-all duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DBA12D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* High-Impact Footer */}
        <section className="bg-black text-white py-32 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(219,161,45,0.05),transparent_50%)]" />
          <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-black italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Eugenia Engine.</h3>
              <p className="text-[10px] font-black tracking-[0.5em] text-white/20">THE NEXT ACADEMIC LEGACY</p>
            </div>
            <div className="text-right">
              <span className="text-8xl font-black text-white/5 block leading-none">2026</span>
              <span className="text-[9px] font-black tracking-widest text-[#DBA12D] animate-pulse uppercase">Operational Mode — Synergized</span>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
