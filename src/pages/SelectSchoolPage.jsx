import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, GraduationCap, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function SelectSchoolPage() {
  const navigate = useNavigate();

  // NUCLEAR OPTION: Force scroll to top when this page mounts
  useEffect(() => {
    // Immediate
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Destroy Lenis
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true, force: true });
    }

    // RAF backup
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    // Timeout backups
    const timers = [0, 50, 100].map(delay =>
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const schools = [
    {
      id: 'eugenia',
      name: 'Eugenia School',
      shortName: 'EU',
      description: 'The narrative ecosystem where projects become legends.',
      color: '#671324',
      textColor: 'text-black',
      bgColor: 'bg-white',
      hoverBg: 'hover:bg-[#671324]',
      hoverText: 'group-hover:text-white',
      accentColor: 'group-hover:text-[#DBA12D]',
      loginPath: '/eugenia-school/login'
    },
    {
      id: 'albert',
      name: 'Albert School',
      shortName: 'AL',
      description: 'The data-driven forge where logic shapes the future.',
      color: '#3461FF',
      textColor: 'text-black',
      bgColor: 'bg-white',
      hoverBg: 'hover:bg-[#0A1128]',
      hoverText: 'group-hover:text-white',
      accentColor: 'group-hover:text-[#3461FF]',
      loginPath: '/albert-school/login'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black overflow-hidden font-sans">

      {/* 1. Minimalist High-End Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-10 flex justify-center">
        <Link to="/">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-12 py-4 border-2 border-black bg-white shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:shadow-[15px_15px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
          >
            <span className="text-xl font-bold tracking-tight text-black">
              UniSphere <span className="text-[#14F195]">.</span>
            </span>
          </motion.div>
        </Link>
      </header>

      {/* 2. Hero Section */}
      <main className="pt-60 px-6 lg:px-20 max-w-[1800px] mx-auto">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-12 h-[2px] bg-black" />
              <span className="text-[10px] font-black tracking-[0.5em] text-black/30 uppercase">GATEWAY SYSTEM v2.0</span>
              <div className="w-12 h-[2px] bg-black" />
            </div>
            <h1 className="text-8xl md:text-[180px] font-black leading-[0.8] tracking-tighter mb-12" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              CHOISISSEZ <br />
              <span className="italic text-black/5">VOTRE</span> <span className="italic text-black">ÉCOLE.</span>
            </h1>
          </motion.div>
        </div>

        {/* 3. Kinetic Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
          {schools.map((school, i) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, x: i === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 60, delay: i * 0.2 }}
              className={`group relative min-h-[600px] bg-white border-2 border-black p-16 cursor-pointer transition-all duration-700 ${school.hoverBg} shadow-[20px_20px_0px_rgba(0,0,0,0.05)] hover:shadow-[30px_30px_0px_rgba(0,0,0,1)] hover:-translate-y-4`}
              onClick={() => navigate(school.loginPath)}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-24">
                  <div className="w-24 h-24 border-2 border-black flex items-center justify-center bg-white group-hover:bg-transparent group-hover:border-white transition-all duration-500">
                    <span className={`text-3xl font-black ${school.id === 'eugenia' ? 'text-black group-hover:text-[#DBA12D]' : 'text-black group-hover:text-[#3461FF]'} transition-colors`}>
                      {school.shortName}
                    </span>
                  </div>
                  <div className={`px-6 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest group-hover:border-white group-hover:text-white transition-all`}>
                    SESSION: 2026/2027
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className={`text-6xl font-black mb-8 leading-none ${school.hoverText} transition-colors`} style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                    {school.name}.
                  </h2>
                  <p className={`text-black/40 ${school.hoverText} opacity-60 text-lg leading-relaxed max-w-sm font-bold uppercase tracking-tight transition-all`}>
                    {school.description}
                  </p>
                </div>

                <div className="mt-16 group/btn">
                  <div className={`flex items-center justify-between w-full py-8 px-10 border-2 border-black bg-black text-white group-hover:bg-white group-hover:text-black transition-all duration-500 text-xs font-black uppercase tracking-[0.4em]`}>
                    <span>Initialiser Connexion</span>
                    <ArrowUpRight className={`w-6 h-6 group-hover:rotate-45 transition-transform duration-500 ${school.id === 'eugenia' ? 'group-hover:text-[#DBA12D]' : 'group-hover:text-[#3461FF]'}`} />
                  </div>
                </div>
              </div>

              {/* School Specific Glimmer/Accent */}
              <div className={`absolute bottom-0 left-0 w-full h-[4px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700`} style={{ backgroundColor: school.color }} />
              <div className={`absolute top-0 right-0 p-20 opacity-0 group-hover:opacity-5 transition-opacity`}>
                <GraduationCap className="w-80 h-80" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* 4. High-Impact Tech Footer */}
      <footer className="bg-black text-white py-40 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(219,161,45,0.05),transparent_70%)]" />
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <h3 className="text-5xl font-black italic mb-4" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>UniSphere Engine.</h3>
            <p className="text-[10px] font-black tracking-[0.8em] text-white/20 uppercase">CENTRALIZED HUB INTERFACE</p>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Status</span>
              <span className="text-[11px] font-black text-[#DBA12D] animate-pulse">ALL SYSTEMS GO</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Version</span>
              <span className="text-[11px] font-black">X.887.01</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Kinetic Background elements */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[length:100%_8px] pointer-events-none -z-10" />

    </div>
  );
}
