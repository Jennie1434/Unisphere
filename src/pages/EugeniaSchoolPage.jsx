import { useRef } from 'react';
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
  Trophy,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function EugeniaSchoolPage() {
  const { student } = useStudentAuth();
  const firstName = (student?.firstName && student.firstName !== 'Étudiant')
    ? student.firstName
    : (student?.email?.split('@')[0] || 'Étudiant');
  const containerRef = useRef(null);

  const panels = [
    {
      id: 'ambassadeur',
      title: 'Ambassadeur',
      subtitle: 'MÉRITE & VISION',
      desc: 'Devenez le visage de l\'école. Relevez des défis, gagnez des points et boostez votre prestige.',
      link: '/eugenia-school/ambassadeurs',
      submitLink: '/eugenia-school/submit?type=mission',
      icon: <Medal className="w-10 h-10" />,
      color: '#DBA12D',
      stats: '1 MISSION'
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
      id: 'signalement',
      title: 'Signalement',
      subtitle: 'AMÉLIORATION & RESPONSABILITÉ',
      desc: 'Signalez un problème ou proposez une amélioration pour le campus.',
      link: '/eugenia-school/report',
      submitLink: '/eugenia-school/report',
      icon: <AlertTriangle className="w-10 h-10" />,
      color: '#DBA12D',
      stats: 'SUPPORT'
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
                <div className="w-[2px] h-12 bg-black/10" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black">{student?.actionsCount || 0}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Actions validées</span>
                </div>
              </div>
            </motion.div>

            {/* Nouvelle Soumission Button (Floating Action) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex-shrink-0"
            >
              <Link
                to="/eugenia-school/submit"
                className="group relative px-10 py-6 bg-black text-white rounded-none font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-[#671324] hover:scale-105 hover:shadow-[20px_20px_0px_rgba(219,161,45,0.3)] inline-flex items-center gap-5 border-2 border-black"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <Plus className="w-5 h-5 group-hover:text-[#DBA12D] group-hover:rotate-90 transition-all" />
                NOUVELLE SOUMISSION
              </Link>
            </motion.div>
          </header>

          {/* Background Glow Effect */}
          <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-[#671324]/5 blur-[200px] -z-10 animate-pulse" />
        </section>

        {/* Vertical Keywords (Sideline Aesthetic) */}
        <aside className="fixed left-10 top-1/2 -translate-y-1/2 z-50 hidden 2xl:block">
          <div className="flex flex-col gap-12 items-center writing-mode-vertical-rl text-[9px] font-black uppercase tracking-[0.5em] text-black/10">
            {['PORTFOLIO', 'ASSOCIATIONS', 'AMBASSADEUR', 'CLASSEMENT'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="hover:text-[#DBA12D] hover:tracking-[0.8em] transition-all cursor-default"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </aside>

        {/* MAIN PANELS SECTION */}
        <section className="max-w-[1700px] mx-auto px-6 lg:px-20 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {panels.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 80 }}
                className="group bg-white border-2 border-black p-10 relative overflow-hidden hover:translate-x-[-8px] hover:translate-y-[-8px] hover:shadow-[20px_20px_0px_#DBA12D] transition-all duration-500"
              >
                {/* Panel Icon & Stats */}
                <div className="flex items-start justify-between mb-12">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:bg-[#671324] transition-colors">
                    <div className="text-white">{panel.icon}</div>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-black/20 group-hover:text-[#DBA12D] transition-colors">
                    {panel.stats}
                  </span>
                </div>

                {/* Panel Content */}
                <div className="mb-12">
                  <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-black/30 mb-3">
                    {panel.subtitle}
                  </span>
                  <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                    {panel.title}.
                  </h2>
                  <p className="text-sm text-black/50 leading-relaxed font-medium">
                    {panel.desc}
                  </p>
                </div>

                {/* Panel Actions */}
                <div className="flex flex-col gap-4">
                  {panel.id !== 'signalement' && (
                    <Link
                      to={panel.link}
                      className="py-4 px-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] text-center hover:bg-[#671324] transition-all group-hover:translate-x-2 flex items-center justify-center gap-3"
                    >
                      LANCER L'ESPACE <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  )}

                  {panel.id !== 'associations' && (
                    <Link
                      to={panel.submitLink}
                      className="py-4 px-6 border-2 border-black text-black text-[10px] font-black uppercase tracking-[0.3em] text-center hover:bg-black hover:text-white transition-all"
                    >
                      SOUMETTRE +
                    </Link>
                  )}
                </div>

                {/* Kinetic Glow Effect on Hover */}
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#DBA12D]/0 group-hover:bg-[#DBA12D]/10 blur-3xl transition-all duration-700 -z-10" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* MARQUEE STRIP (Hypebeast Vibes) */}
        <section className="bg-black text-white py-8 overflow-hidden border-y-4 border-[#DBA12D]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-20 whitespace-nowrap"
          >
            {Array(10).fill(['EUGENIA SCHOOL', 'NARRATIF', 'EXCELLENCE', 'VISION']).flat().map((text, i) => (
              <span key={i} className="text-6xl font-black tracking-tighter italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                {text} <span className="text-[#DBA12D]">•</span>
              </span>
            ))}
          </motion.div>
        </section>

        {/* HIGH-IMPACT FOOTER */}
        <footer className="bg-black text-white py-32 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(219,161,45,0.08),transparent_60%)]" />
          <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <h3 className="text-5xl font-black italic leading-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                Eugenia School <br /><span className="text-[#DBA12D]">Ecosystem.</span>
              </h3>
              <p className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">
                THE NARRATIVE ENGINE
              </p>
            </div>
            <div className="text-right">
              <span className="text-9xl font-black text-white/5 block leading-none">2026</span>
              <span className="text-[9px] font-black tracking-widest text-[#DBA12D] uppercase animate-pulse">
                Narrative Excellence — Synergized
              </span>
            </div>
          </div>
        </footer>

      </div>
    </PageLayout>
  );
}
