import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import AssociationCardRich from '../components/associations/AssociationCardRich';
import FindAssoQuiz from '../components/associations/FindAssoQuiz';
import EventsListWeek from '../components/associations/EventsListWeek';
import AssociationEmptyState from '../components/associations/AssociationEmptyState';
import { getAllAssociations } from '../services/associationsApi';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { Search, Plus, Sparkles, ChevronRight, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssociationsPage({ school = 'eugenia' }) {
  const { student } = useStudentAuth();
  const navigate = useNavigate();
  const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showQuiz, setShowQuiz] = useState(false);

  const CATEGORIES = [
    { id: 'all', label: 'Tout voir' },
    { id: 'Sport', label: 'Sport' },
    { id: 'Culture', label: 'Culture' },
    { id: 'Tech', label: 'Tech & Innovation' },
    { id: 'Humanitaire', label: 'Humanitaire' },
    { id: 'BDE', label: 'Vie idéale' }
  ];

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getAllAssociations();
        const list = Array.isArray(data) ? data : (data?.associations || []);
        setAssociations(list.map(a => ({
          ...a,
          isRecruiting: Math.random() > 0.7,
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredAssociations = associations.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isAdmin = student?.role === 'admin' || student?.role === 'bde';

  return (
    <PageLayout school={school} minimalFooter={true}>
      <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black font-sans overflow-hidden">

        {/* 1. WOW HERO SECTION */}
        <header className="relative pt-40 pb-24 px-6 lg:px-20 max-w-[1800px] mx-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-5xl relative z-10"
          >
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                className="h-[2px] bg-black"
              />
              <span className="text-[10px] font-black tracking-[0.4em] text-black/30 uppercase">
                COMMUNITY HUB — ECOSYSTÈME CAMPUS
              </span>
            </div>

            <h1 className="text-8xl md:text-[160px] font-black leading-[0.85] tracking-tighter mb-16" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              LE CŒUR <br />
              <span className="text-[#671324] italic">BATTANT.</span>
            </h1>

            <p className="text-xl text-black/50 max-w-2xl mb-16 leading-relaxed font-bold uppercase tracking-tight">
              Rejoignez les clubs qui façonnent la culture Eugenia. <br />
              Engagez-vous, collaborez et laissez votre empreinte indélébile.
            </p>

            <div className="flex flex-wrap items-center gap-10 mt-12 px-2">
              <button
                onClick={() => setShowQuiz(true)}
                className="px-12 py-5 bg-black text-white rounded-none font-black text-[12px] uppercase tracking-widest hover:bg-[#DBA12D] hover:text-black transition-all flex items-center gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] group"
              >
                <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" /> TROUVE TON ASSO
              </button>
              {isAdmin && (
                <button
                  onClick={() => navigate(`${schoolPath}/associations/create`)}
                  className="px-12 py-4 bg-white border-2 border-black text-black font-black text-[12px] uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl"
                >
                  <Plus className="w-5 h-5" /> CRÉER UN CLUB
                </button>
              )}
            </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute top-20 right-0 w-[900px] h-[900px] bg-[#671324]/10 blur-[200px] -z-10 animate-pulse" />
        </header>

        {/* 2. DISCOVERY & FILTER BAR (Pure High Contrast) */}
        <div className="sticky top-0 z-40 bg-white border-y-2 border-black py-6 px-6 lg:px-20 overflow-visible">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center gap-10 justify-between">
            <div className="relative w-full md:w-[450px] group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-focus-within:text-[#DBA12D] transition-colors" />
              <input
                type="text"
                placeholder="FILTRER L'ÉCOSYSTÈME..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-black/[0.03] border-2 border-black rounded-none text-[10px] font-black tracking-[0.2em] focus:outline-none focus:bg-white focus:border-[#DBA12D] transition-all text-black placeholder:text-black/20 uppercase"
              />
            </div>

            <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-8 py-3 rounded-none text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeCategory === cat.id ? 'bg-black text-[#DBA12D] border-black shadow-xl scale-105' : 'bg-transparent text-black border-black/10 hover:border-black active:scale-95'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. MAIN GALLERY GRID */}
        <main className="max-w-[1800px] mx-auto px-6 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

            {/* Associations Feed (8 cols) */}
            <div className="lg:col-span-8">
              {loading ? (
                <div className="py-40 flex flex-col items-center gap-10">
                  <div className="w-16 h-16 border-[4px] border-black border-t-[#DBA12D] rounded-full animate-spin" />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em]">SYNCING...</span>
                </div>
              ) : filteredAssociations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <AnimatePresence mode="popLayout">
                    {filteredAssociations.map((asso, i) => (
                      <motion.div
                        key={asso.id}
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, delay: i * 0.05 }}
                        layout
                      >
                        <AssociationCardRich association={asso} school={school} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <AssociationEmptyState
                  school={school}
                  searchQuery={searchQuery}
                  onShowQuiz={() => setShowQuiz(true)}
                />
              )}
            </div>

            {/* Sidebar Tools (4 cols) - HIGH CONTRAST */}
            <aside className="lg:col-span-4 space-y-16">

              {/* Global Agenda Preview */}
              <div className="bg-white border-2 border-black p-10 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-[-10px] hover:translate-y-[-10px] hover:shadow-[30px_30px_0px_rgba(219,161,45,1)] transition-all duration-500">
                <h3 className="text-3xl font-black mb-10 flex items-center gap-4" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                  <div className="w-4 h-4 rounded-full bg-[#DBA12D] shadow-[0_0_20px_#DBA12D]" />
                  AGENDA.
                </h3>
                <EventsListWeek school={school} />
              </div>

              {/* Manifesto Callout (Vibrant Black) */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="bg-black text-white p-12 relative overflow-hidden group cursor-pointer shadow-2xl border-4 border-black"
              >
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Globe className="w-48 h-48 text-[#DBA12D]" />
                </div>
                <h3 className="text-5xl font-black mb-6 relative z-10 leading-[0.9]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                  CRÉEZ <br /><span className="text-[#DBA12D] italic">VOTRE</span> HUB.
                </h3>
                <p className="text-white/40 text-sm mb-12 leading-relaxed relative z-10 font-bold uppercase tracking-tight">
                  Propulsez vos idées. Le BDE vous donne les outils pour structurer et financer vos projets les plus fous.
                </p>
                <button
                  onClick={() => alert('La création de projets sera bientôt disponible ! En attendant, contactez le BDE pour soumettre votre idée.')}
                  className="flex items-center gap-5 text-xs font-black uppercase tracking-[0.3em] text-[#DBA12D] group-hover:gap-10 transition-all border-b-2 border-[#DBA12D] pb-2"
                >
                  SOUMETTRE UN PROJET <ArrowUpRight className="w-5 h-5" />
                </button>
              </motion.div>

            </aside>
          </div>
        </main>

        {/* Wow Footer */}
        <section className="bg-black text-white py-40 px-6 lg:px-20 text-center">
          <h3 className="text-8xl md:text-[180px] font-black tracking-tighter opacity-5 mb-10 pointer-events-none" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>COMMUNITY</h3>
          <div className="text-[10px] font-black tracking-[0.8em] text-white/20 uppercase">CAMPUS ECOSYSTEM INTERFACE v4.2</div>
        </section>

        {/* Quiz Modal */}
        {showQuiz && <FindAssoQuiz school={school} onClose={() => setShowQuiz(false)} />}

      </div>
    </PageLayout>
  );
}
