import { useState, useEffect } from 'react';
import Leaderboard from '../components/student/Leaderboard';
import LeaderboardStats from '../components/student/LeaderboardStats';
import PageLayout from '../components/shared/PageLayout';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { Trophy, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeaderboardPage({ school = 'eugenia' }) {
  const { student } = useStudentAuth();

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <PageLayout school={school} minimalFooter={true}>
      <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black font-sans overflow-hidden">

        {/* WOW HERO SECTION */}
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
                PERFORMANCE RANKINGS — LIVE BOARD
              </span>
            </div>

            <h1 className="text-8xl md:text-[160px] font-black leading-[0.85] tracking-tighter mb-16" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              HALL OF. <br />
              <span className="text-[#671324] italic tracking-tight">FAME.</span>
            </h1>

            <div className="flex flex-wrap items-center gap-8 mt-12 bg-black text-white px-10 py-5 rounded-none shadow-2xl skew-x-[-1deg] inline-flex group hover:skew-x-0 transition-transform duration-500">
              <div className="flex items-center gap-4">
                <Trophy className="w-6 h-6 text-[#DBA12D]" />
                <span className="text-lg font-black uppercase tracking-widest">CLASSEMENT EN TEMPS RÉEL</span>
              </div>
              <div className="w-[2px] h-6 bg-[#DBA12D]" />
              <div className="text-[11px] font-black tracking-[0.3em] text-[#DBA12D] uppercase">
                SESSION LIVE
              </div>
            </div>
          </motion.div>

          {/* Background Texture */}
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-t from-[#671324]/10 to-transparent blur-[200px] -z-10 animate-pulse" />
        </header>

        {/* STATS SECTION */}
        {student && (
          <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
            <div className="bg-white border-2 border-black p-12 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[25px_25px_0px_#DBA12D] transition-all duration-500">
              <LeaderboardStats school={school} />
            </div>
          </section>
        )}

        {/* LEADERBOARD TABLE */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black shadow-[30px_30px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-12 border-b-2 border-black flex flex-col md:flex-row justify-between items-center bg-black text-white gap-8">
              <h2 className="text-5xl font-black italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Leaderboard_Elite.</h2>
              <span className="text-[10px] font-black tracking-[0.4em] text-[#DBA12D]">FULL RANKING SYSTEM</span>
            </div>
            <div className="p-8">
              <Leaderboard school={school} />
            </div>
          </div>
        </section>

        {/* HIGH-IMPACT FOOTER */}
        <section className="bg-black text-white py-32 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(219,161,45,0.05),transparent_50%)]" />
          <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-black italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Eugenia Leaderboard.</h3>
              <p className="text-[10px] font-black tracking-[0.5em] text-white/20">THE ULTIMATE PERFORMANCE TRACKER</p>
            </div>
            <div className="text-right">
              <span className="text-8xl font-black text-white/5 block leading-none">2026</span>
              <span className="text-[9px] font-black tracking-widest text-[#DBA12D] animate-pulse uppercase">Ranking Mode — Synergized</span>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
