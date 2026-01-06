import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { getLeaderboard } from '../services/googleSheets';
import {
  Sparkles,
  Users,
  Zap,
  Target,
  Trophy,
  Linkedin,
  GraduationCap,
  MessageCircle,
  UserPlus,
  PenTool,
  ArrowRight,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AmbassadeursPage({ school = 'eugenia' }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmbassadors: 0,
    totalPoints: 0,
    totalMissions: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getLeaderboard();
      const activeAmbassadors = data.filter(ambassador =>
        (ambassador.totalPoints || 0) > 0 || (ambassador.actionsCount || 0) > 0
      );
      activeAmbassadors.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
      setLeaderboard(activeAmbassadors);
      const totalPoints = activeAmbassadors.reduce((sum, user) => sum + (user.totalPoints || 0), 0);
      const totalMissions = activeAmbassadors.reduce((sum, user) => sum + (user.actionsCount || 0), 0);

      setStats({
        totalAmbassadors: activeAmbassadors.length,
        totalPoints,
        totalMissions
      });
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const missions = [
    { id: 1, title: 'Post LinkedIn', description: 'Portez haut les couleurs d’Eugenia sur votre réseau professionnel.', points: 10, icon: Linkedin, category: 'SOCIAL MEDIA' },
    { id: 2, title: 'Participation JPO', description: 'Le visage de l’école pour les futurs talents.', points: 15, icon: GraduationCap, category: 'CAMPUS' },
    { id: 3, title: 'Témoignage Étudiant', description: 'Partagez votre parcours narratif unique.', points: 20, icon: MessageCircle, category: 'CONTENT' },
    { id: 4, title: 'Parrainage Elite', description: 'Introduisez les leaders de demain.', points: 25, icon: UserPlus, category: 'GROWTH' },
    { id: 5, title: 'Compétition Hackathon', description: 'Défiez les limites et gagnez du prestige.', points: 30, icon: Trophy, category: 'ACCOLADES' },
    { id: 6, title: 'Édito & Blog', description: 'Rédigez l’histoire d’Eugenia.', points: 35, icon: PenTool, category: 'EDITORIAL' }
  ];

  return (
    <PageLayout school={school} minimalFooter={true}>
      <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black font-sans overflow-hidden">

        {/* 1. WOW HERO SECTION */}
        <header className="relative pt-40 pb-20 px-6 lg:px-20 max-w-[1800px] mx-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-5xl relative z-10"
          >
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                className="h-[2px] bg-black"
              />
              <span className="text-[10px] font-black tracking-[0.4em] text-black/40 uppercase">
                PRESTIGE — PROGRAMME AMBASSADEURS
              </span>
            </div>

            <h1 className="text-8xl md:text-[160px] font-black leading-[0.85] tracking-tighter mb-16" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              RAYONNEZ. <br />
              <span className="text-[#671324] italic tracking-tight">IMPACT.</span>
            </h1>

            <div className="flex flex-wrap items-center gap-8 mt-12 bg-black text-white px-10 py-5 rounded-none shadow-2xl skew-x-[-1deg] inline-flex group hover:skew-x-0 transition-transform duration-500">
              <div className="flex items-center gap-4">
                <Trophy className="w-6 h-6 text-[#DBA12D]" />
                <span className="text-lg font-black uppercase tracking-widest">{new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="w-[2px] h-6 bg-[#DBA12D]" />
              <div className="text-[11px] font-black tracking-[0.3em] text-[#DBA12D] uppercase">
                SESSION ELITE ACTIVE
              </div>
            </div>
          </motion.div>

          {/* Background Texture */}
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-t from-[#671324]/10 to-transparent blur-[200px] -z-10 animate-pulse" />
        </header>

        {/* 2. GLOWING STATS (Punchy Grid) */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'MEMBRES ACTIFS', value: stats.totalAmbassadors, icon: <Users />, color: 'black' },
              { label: 'FORCE D\'IMPACT', value: stats.totalPoints, icon: <Zap />, color: '#DBA12D' },
              { label: 'QUESTS CLEAR', value: stats.totalMissions, icon: <Target />, color: 'black' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", delay: i * 0.1 }}
                className="bg-white border-2 border-black p-12 flex flex-col items-center text-center group hover:bg-black hover:scale-105 transition-all duration-500 shadow-[15px_15px_0px_rgba(0,0,0,1)] hover:shadow-[20px_20px_0px_#671324]"
              >
                <div className="mb-8 w-20 h-20 border-2 border-black flex items-center justify-center group-hover:border-[#DBA12D] group-hover:bg-transparent bg-white transition-all">
                  {stat.icon && <stat.icon.type {...stat.icon.props} className="w-10 h-10 group-hover:text-[#DBA12D] transition-colors" />}
                </div>
                <div className="text-7xl font-black mb-4 tracking-tighter group-hover:text-white" style={{ color: stat.color === 'black' ? 'inherit' : stat.color }}>
                  {stat.value}
                </div>
                <div className="text-black group-hover:text-[#DBA12D] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. MISSIONS CAROUSEL (Auto-Scroll) */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto overflow-hidden">
          <div className="flex items-end justify-between mb-20">
            <div>
              <span className="text-[#DBA12D] font-black text-[11px] tracking-[0.5em] mb-4 block uppercase transition-all hover:tracking-[0.8em] cursor-default">ACTIVE MISSIONS ENGINE</span>
              <h2 className="text-6xl font-black tracking-tighter" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>MISSIONS.</h2>
            </div>
            <Link to={`/${school}-school/submit`} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-black hover:text-[#DBA12D] transition-all border-b-2 border-black pb-2">
              ALL QUESTS <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <motion.div
              className="flex gap-12"
              animate={{
                x: [0, -((missions.length * 450) / 2)]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }}
            >
              {/* Duplicate missions for seamless loop */}
              {[...missions, ...missions].map((mission, i) => (
                <div key={`mission-${i}`} className="flex-shrink-0 w-[420px]">
                  <MissionCard mission={mission} school={school} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. CINEMATIC LEADERBOARD (Elite Grid) */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black shadow-[30px_30px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-12 border-b-2 border-black flex flex-col md:flex-row justify-between items-center bg-black text-white gap-8">
              <h2 className="text-5xl font-black italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Leaderboard_Elite.</h2>
              <Link to={`/${school}-school/leaderboard`} className="px-10 py-4 bg-[#DBA12D] text-black text-[11px] font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-xl">
                VIEW FULL RANKING
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="px-12 py-8 text-[11px] font-black text-black uppercase tracking-[0.3em]">RANK</th>
                    <th className="px-12 py-8 text-[11px] font-black text-black uppercase tracking-[0.3em]">OPERATIVE</th>
                    <th className="px-12 py-8 text-[11px] font-black text-black uppercase tracking-[0.3em]">NODE</th>
                    <th className="px-12 py-8 text-[11px] font-black text-black uppercase tracking-[0.3em] text-right">IMPACT POWER</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/5">
                  {leaderboard.slice(0, 5).map((ambassador, index) => (
                    <tr key={ambassador.email} className="group hover:bg-[#DBA12D]/5 transition-colors">
                      <td className="px-12 py-10">
                        <div className="text-4xl font-black">
                          {index === 0 ? <span className="text-[#DBA12D]">#01</span> : <span className="text-black/10 group-hover:text-black/40">#{String(index + 1).padStart(2, '0')}</span>}
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-8">
                          <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center font-black text-sm group-hover:bg-black group-hover:text-white transition-all">
                            {ambassador.firstName.charAt(0)}{ambassador.lastName.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <Link
                              to={`/profile/${ambassador.firstName.toLowerCase()}-${ambassador.lastName.toLowerCase()}`}
                              className="font-black text-2xl group-hover:tracking-wider transition-all uppercase hover:text-[#DBA12D]"
                            >
                              {ambassador.firstName} {ambassador.lastName}
                            </Link>
                            <span className="text-[9px] font-black text-black/40 uppercase tracking-widest">RANK: ELITE_AGENT</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <span className="px-6 py-2 border-2 border-black text-[10px] font-black text-black uppercase tracking-widest bg-white group-hover:bg-black group-hover:text-[#DBA12D] transition-all">
                          {ambassador.classe || 'N/A'}
                        </span>
                      </td>
                      <td className="px-12 py-10 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-5xl font-black text-black group-hover:text-[#DBA12D] transition-colors">{ambassador.totalPoints || 0}</span>
                          <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.3em]">UNITS COLLECTED</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. IMMERSIVE CTAS */}
        <section className="px-6 lg:px-20 pb-40 max-w-[1800px] mx-auto">
          <div className="bg-black text-white p-20 md:p-32 text-center relative overflow-hidden group shadow-[40px_40px_0px_#DBA12D]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,161,45,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10">
              <h2 className="text-6xl md:text-[100px] font-black mb-16 leading-tight tracking-tighter" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>ÉCRIVEZ <br />L'HISTOIRE.</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                <Link
                  to={`/${school}-school/submit`}
                  className="px-16 py-6 bg-[#DBA12D] text-black rounded-none font-black text-sm uppercase tracking-[0.3em] hover:scale-110 active:scale-95 transition-all shadow-2xl"
                >
                  INITIALIZE ACTION
                </Link>
                <Link to={`/${school}-school/leaderboard`} className="text-[12px] font-black uppercase tracking-[0.4em] hover:text-[#DBA12D] transition-all flex items-center gap-5 border-b-2 border-white/20 pb-2">
                  EXPLORE HALL OF FAME <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>

            {/* Decorative scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(219,161,45,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
          </div>
        </section>

        <div className="p-20 text-center bg-white border-t-2 border-black">
          <div className="text-[10px] font-black tracking-[0.8em] text-black/10 uppercase mb-4">EUGENIA AMBASSADOR ENGINE // OPERATIONAL MODE</div>
          <div className="text-[9px] font-black tracking-widest text-[#DBA12D] animate-pulse">SYSTEM.OPERATIVE_STATUS: OPTIMAL</div>
        </div>

      </div>
    </PageLayout>
  );
}

function MissionCard({ mission, school = 'eugenia' }) {
  const Icon = mission.icon;
  return (
    <div className="bg-white border-2 border-black p-12 transition-all duration-700 flex flex-col relative group hover:bg-black hover:shadow-[20px_20px_0px_#DBA12D] min-h-[450px]">
      <div className="flex items-start justify-between mb-16">
        <div className="w-20 h-20 border-2 border-black flex items-center justify-center group-hover:border-[#DBA12D] group-hover:rotate-6 transition-all duration-500 bg-white group-hover:bg-transparent">
          <Icon className="w-10 h-10 text-black group-hover:text-[#DBA12D] transition-colors" />
        </div>
        <div className="bg-black text-white group-hover:bg-[#DBA12D] group-hover:text-black px-6 py-3 text-[11px] font-black uppercase tracking-widest border-2 border-black transition-all">
          +{mission.points} POWER
        </div>
      </div>

      <span className="text-black/30 font-black text-[10px] tracking-[0.4em] mb-6 block group-hover:text-[#DBA12D]/60 transition-colors uppercase">
        NODE: {mission.category}
      </span>

      <h3 className="text-4xl font-black text-black group-hover:text-white mb-6 group-hover:translate-x-3 transition-all duration-500 leading-none" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{mission.title}.</h3>
      <p className="text-black/40 group-hover:text-white/60 mb-16 text-sm leading-relaxed flex-1 font-bold uppercase tracking-tight">{mission.description}</p>

      <Link
        to={`/${school}-school/submit`}
        className="flex items-center justify-between w-full py-6 px-10 bg-black text-white group-hover:bg-white group-hover:text-black transition-all duration-500 text-xs font-black uppercase tracking-widest border-2 border-black"
      >
        LANCER LA QUÊTE <ArrowUpRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
