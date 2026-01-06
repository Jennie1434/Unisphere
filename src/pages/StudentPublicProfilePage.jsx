import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import PageLayout from '../components/shared/PageLayout';
import LeaderboardStats from '../components/student/LeaderboardStats';
import BadgesDisplay from '../components/student/BadgesDisplay';
import { motion } from 'framer-motion';

export default function StudentPublicProfilePage() {
  const { slug } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get current user to check permissions
  const { student: currentUser } = useStudentAuth();

  useEffect(() => {
    loadStudentData();
  }, [slug]);

  const loadStudentData = async () => {
    try {
      // Fetch leaderboard using the main API
      const leaderboard = await api.get('/leaderboard');

      // Ensure leaderboard is an array
      const students = Array.isArray(leaderboard) ? leaderboard : [];

      // Try to find by slug (firstname-lastname) or email part
      let foundStudent = students.find(s => {
        const studentSlug = `${s.firstName?.toLowerCase() || ''}-${s.lastName?.toLowerCase() || ''}`.replace(/\s+/g, '-');
        const emailSlug = s.email.split('@')[0].replace('.', '-');
        return studentSlug === slug || emailSlug === slug || s.email.split('@')[0] === slug;
      });

      if (foundStudent) {
        setStudent(foundStudent);
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isOwnProfile = currentUser && student && currentUser.email === student.email;

  if (loading) {
    return (
      <PageLayout minimalFooter={true}>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </PageLayout>
    );
  }

  if (!student) {
    return (
      <PageLayout minimalFooter={true}>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md border-2 border-black p-8 shadow-[10px_10px_0px_black] bg-white">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-black uppercase text-black mb-4">
              INTROUVABLE
            </h2>
            <p className="text-black/60 mb-8 font-bold text-sm uppercase">
              L'étudiant demandé n'existe pas dans la base de données.
            </p>
            <Link to="/" className="inline-block px-8 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-[#671324] transition-colors">
              RETOUR ACCUEIL
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout minimalFooter={true}>
      <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black font-sans overflow-hidden">

        {/* WOW HERO SECTION */}
        <header className="relative pt-20 pb-20 px-6 lg:px-20 max-w-[1800px] mx-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-5xl relative z-10"
          >
            <div className="flex items-center gap-2 mb-8">
              <Link to="/eugenia-school/leaderboard" className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black hover:text-[#DBA12D] hover:border-[#DBA12D] transition-colors">
                ← RETOUR AU LEADERBOARD
              </Link>
            </div>

            <h1 className="text-6xl md:text-[100px] font-black leading-[0.9] tracking-tighter mb-8" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              PROFIL <br />
              <span className="text-[#671324] italic">PUBLIC.</span>
            </h1>

            <div className="flex items-center gap-8 mt-12 bg-white/50 backdrop-blur-sm p-6 rounded-none border-l-4 border-black">
              <div className="w-24 h-24 rounded-full border-4 border-black flex items-center justify-center text-4xl bg-white">
                👤
              </div>
              <div>
                <p className="text-3xl font-black mb-2 uppercase tracking-tight">
                  {student.firstName} {student.lastName}
                </p>
                <div className="flex gap-4">
                  <p className="text-xs text-black/40 font-black uppercase tracking-[0.3em]">{student.classe || 'N/A'}</p>
                  {isOwnProfile && <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase">C'EST VOUS</span>}
                </div>
              </div>
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-6 mt-10">
              <div className="bg-black text-white px-8 py-4 rounded-none border-2 border-black shadow-[8px_8px_0px_#DBA12D]">
                <span className="text-[10px] font-black tracking-[0.3em] block text-[#DBA12D] mb-1">IMPACT POWER</span>
                <span className="text-4xl font-black">{student.totalPoints || 0}</span>
              </div>
              <div className="bg-white text-black px-8 py-4 rounded-none border-2 border-black shadow-[8px_8px_0px_black]">
                <span className="text-[10px] font-black tracking-[0.3em] block text-black/40 mb-1">ACTIONS</span>
                <span className="text-4xl font-black">{student.actionsCount || 0}</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* SECURITY SECTION - ONLY FOR OWNER */}
        {isOwnProfile && (
          <section className="px-6 lg:px-20 mb-20 max-w-[1800px] mx-auto">
            <div className="bg-black text-white p-8 border-2 border-black shadow-[10px_10px_0px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black italic mb-2" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Paramètres de sécurité</h2>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Zone privée - Visible uniquement par vous</p>
                </div>
                <Link to="/eugenia-school/student/profile" className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-[#DBA12D] transition-colors">
                  GÉRER MON PROFIL &gt;
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* STATS SECTION */}
        <section className="px-6 lg:px-20 mb-20 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black p-12 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[22px_22px_0px_#DBA12D] transition-all duration-300">
            <h2 className="text-4xl font-black mb-12" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Performance Metrics.</h2>
            <LeaderboardStats student={student} />
          </div>
        </section>

        {/* BADGES SECTION */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black p-12 shadow-[20px_20px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl font-black mb-12" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Hall of Fame.</h2>
            <BadgesDisplay studentEmail={student.email} />
          </div>
        </section>

      </div>
    </PageLayout>
  );
}

