import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageLayout from '../../components/shared/PageLayout';
import ProjectCard from '../../components/portfolio/ProjectCard';
import { Search, Plus, Filter, Globe, Sparkles, X, ChevronRight, User, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const CURRENT_USER_ID = 101;

const PROJECTS = [
    {
        id: 1,
        title: "EcoTrack Mobile App",
        author: { name: "Sarah Meyer", initials: "SM", promo: "M2" },
        authorId: 201,
        tags: ["UX/UI", "Figma", "Mobile"],
        coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        featured: true,
        type: "design",
        status: "published"
    },
    {
        id: 2,
        title: "SaaS Finance Dashboard",
        author: { name: "Thomas Levin", initials: "TL", promo: "M1" },
        authorId: 202,
        tags: ["React", "Data", "Frontend"],
        coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        featured: true,
        type: "dev",
        status: "published"
    },
    {
        id: 3,
        title: "Lume Branding Identity",
        author: { name: "Emma B.", initials: "EB", promo: "B3" },
        authorId: 203,
        tags: ["Branding", "Identity"],
        coverUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
        featured: true,
        type: "design",
        status: "published"
    },
    {
        id: 101,
        title: "Mon Projet Innovant",
        author: { name: "Moi", initials: "JD", promo: "M1" },
        authorId: CURRENT_USER_ID,
        tags: ["Next.js", "AI"],
        coverUrl: "https://images.unsplash.com/photo-1531297420497-0b86953ec049",
        featured: false,
        type: "dev",
        status: "published"
    }
];

const FILTERS = [
    { id: 'all', label: 'Tout voir' },
    { id: 'featured', label: 'À la une' },
    { id: 'design', label: 'Design & UX' },
    { id: 'dev', label: 'Développement' },
    { id: 'data', label: 'Data & IA' }
];

export default function PortfolioHome() {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState('all');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'mine') setViewMode('mine');
        else setViewMode('all');
    }, [searchParams]);

    const filteredProjects = PROJECTS.filter(p => {
        if (viewMode === 'mine' && p.authorId !== CURRENT_USER_ID) return false;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.author.name.toLowerCase().includes(searchQuery.toLowerCase());
        let matchesFilter = true;
        if (activeFilter === 'featured') matchesFilter = p.featured === true;
        else if (activeFilter !== 'all') matchesFilter = p.type === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <PageLayout school="eugenia" minimalFooter={true}>
            <div className="min-h-screen bg-white text-black selection:bg-[#14F195] selection:text-black overflow-hidden font-sans">

                {/* 1. WOW HERO SECTION */}
                <header className="relative pt-40 pb-20 px-6 lg:px-20 max-w-[1800px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="relative z-10"
                    >
                        <div className="flex items-center gap-4 mb-10 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 60 }}
                                className="h-[2px] bg-black"
                            />
                            <span className="text-[10px] font-black tracking-[0.5em] text-black/30 uppercase">
                                TALENT ARCHIVE — {viewMode === 'mine' ? 'OWNER VIEW' : 'COLLECTIVE FEED'}
                            </span>
                        </div>

                        <h1 className="text-8xl md:text-[180px] font-black leading-[0.8] tracking-tighter mb-16" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                            PORTFOLIO <br />
                            <span className="text-[#671324] italic">ENGINE.</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-10 mt-12">
                            <div className="inline-flex p-1 bg-black border border-black rounded-full shadow-2xl">
                                <button
                                    onClick={() => setViewMode('all')}
                                    className={`px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'all' ? 'bg-[#DBA12D] text-black shadow-inner shadow-black/20' : 'text-white/40 hover:text-white'}`}
                                >
                                    EXPLORER L'ÉCOSYSTÈME
                                </button>
                                <button
                                    onClick={() => setViewMode('mine')}
                                    className={`px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'mine' ? 'bg-[#DBA12D] text-black shadow-inner shadow-black/20' : 'text-white/40 hover:text-white'}`}
                                >
                                    MON HÉRITAGE
                                </button>
                            </div>

                            <Link
                                to="/eugenia-school/portfolio/submit"
                                className="group px-10 py-5 bg-white border-2 border-black text-black rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-[#671324] hover:text-white transition-all flex items-center gap-3 shadow-2xl"
                            >
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> PUBLIER UNE ŒUVRE
                            </Link>
                        </div>
                    </motion.div>

                    {/* Background Visuals */}
                    <div className="absolute top-10 right-0 w-[800px] h-[800px] bg-gradient-to-l from-[#671324]/10 to-transparent blur-[150px] -z-10 animate-pulse" />
                </header>

                {/* 2. KINETIC DISCOVERY BAR */}
                <div className="sticky top-0 z-40 bg-white border-b-2 border-black py-4 px-6 lg:px-20 overflow-visible">
                    <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center gap-10 justify-between">
                        <div className="relative w-full md:w-[500px] group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-focus-within:text-[#DBA12D] transition-colors" />
                            <input
                                type="text"
                                placeholder="IDENTIFIER UN TALENT OU UNE TECHNO..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 bg-black/[0.03] border-2 border-black rounded-2xl text-[10px] font-black tracking-widest focus:outline-none focus:bg-white focus:border-[#DBA12D] transition-all text-black placeholder:text-black/20 uppercase"
                            />
                        </div>

                        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
                            {FILTERS.map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setActiveFilter(f.id)}
                                    className={`px-8 py-3 rounded-none text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeFilter === f.id ? 'bg-black text-[#DBA12D] border-black scale-105 shadow-xl' : 'bg-transparent text-black border-black/10 hover:border-black active:scale-95'}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. HIGH-IMPACT GRID */}
                <main className="max-w-[1800px] mx-auto px-6 lg:px-20 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30, rotate: -2 }}
                                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 100, delay: i * 0.05 }}
                                    layout
                                >
                                    <ProjectCard
                                        project={project}
                                        isOwner={viewMode === 'mine' || project.authorId === CURRENT_USER_ID}
                                    />
                                </motion.div>
                            ))}

                            {viewMode === 'mine' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="aspect-[4/5] border-2 border-dashed border-black rounded-[3rem] flex flex-col items-center justify-center p-12 hover:bg-black hover:border-[#DBA12D] group transition-all duration-500 cursor-pointer shadow-2xl"
                                >
                                    <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-8 group-hover:border-[#DBA12D] group-hover:rotate-90 transition-all duration-700 bg-white">
                                        <Plus className="w-10 h-10 text-black group-hover:text-[#DBA12D]" />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-black group-hover:text-white mb-4">CRÉER L'HÉRITAGE</h3>
                                    <Link to="/eugenia-school/portfolio/submit" className="text-[10px] font-black py-3 px-8 bg-black text-[#DBA12D] group-hover:bg-white group-hover:text-black transition-all">
                                        START NODE.EXE
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="py-80 text-center">
                            <h2 className="text-8xl font-black text-black/5 mb-10" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>NULL DATA.</h2>
                            <p className="text-black/30 font-black uppercase tracking-[0.5em] text-xs">Awaiting collective synchronization...</p>
                        </div>
                    )}
                </main>

                {/* 4. KINETIC SCANLINE MARQUEE */}
                <section className="py-40 border-t-2 border-black overflow-hidden bg-black text-white relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(219,161,45,0.05)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
                    <div className="flex whitespace-nowrap">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="flex gap-40 items-center pr-40"
                        >
                            {["PROTOTYPING", "DATA MINING", "VISUAL LOGIC", "SYSTEM CORE", "UX ENGINE", "LEADERSHIP"].map((tag, i) => (
                                <div key={i} className="flex items-center gap-10">
                                    <span className="text-[180px] font-black text-[#DBA12D] opacity-20 hover:opacity-100 transition-opacity cursor-default leading-none" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                        {tag}
                                    </span>
                                    <div className="w-8 h-8 rounded-full border-4 border-[#DBA12D]" />
                                </div>
                            ))}
                            {["PROTOTYPING", "DATA MINING", "VISUAL LOGIC", "SYSTEM CORE", "UX ENGINE", "LEADERSHIP"].map((tag, i) => (
                                <div key={i + 10} className="flex items-center gap-10">
                                    <span className="text-[180px] font-black text-[#DBA12D] opacity-20 hover:opacity-100 transition-opacity cursor-default leading-none" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                        {tag}
                                    </span>
                                    <div className="w-8 h-8 rounded-full border-4 border-[#DBA12D]" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Footer Sync */}
                <div className="p-20 bg-black text-white text-center">
                    <div className="text-[10px] font-black tracking-[0.8em] text-white/10 uppercase mb-4">EUGENIA PORTFOLIO ENGINE — ARCHIVE.X</div>
                    <div className="text-[9px] font-black tracking-widest text-[#DBA12D]">MODE: SYNCED.77</div>
                </div>

            </div>
        </PageLayout>
    );
}
