import { Link } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import {
  Layout,
  Users,
  Briefcase,
  Trophy,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Plus,
  ExternalLink,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export default function AlbertSchoolPage() {
  const { student } = useStudentAuth();
  const firstName = student?.firstName || 'Étudiant';

  const schoolColor = '#1E40AF'; // Albert Blue

  return (
    <PageLayout school="albert" minimalFooter={true}>
      <div className="relative min-h-screen pb-20 px-6 lg:px-12 pt-10 overflow-hidden">
        {/* Subtle Watermark Globe - Now Blue */}
        <div className="fixed top-20 right-[-10%] opacity-[0.02] pointer-events-none rotate-12">
          <Globe className="w-[800px] h-[800px] text-[#1E40AF]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* 1. Header Section */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#1E40AF]/5 border border-[#1E40AF]/10 text-[#1E40AF] text-[10px] font-black uppercase tracking-widest rounded-full">
                Espace officiel — Albert School
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#1E40AF] tracking-tight leading-tight">
              Bienvenue, {firstName}.
            </h1>
            <p className="mt-2 text-[#1E40AF]/60 font-medium max-w-xl leading-relaxed">
              Projets • Associations • Missions — au même endroit.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-12">

              {/* 2. Three Main Pillars (Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pillar 1: Portfolio */}
                <div className="group bg-white rounded-[32px] p-8 shadow-2xl shadow-[#1E40AF]/[0.02] border border-[#1E40AF]/5 hover:border-[#1E40AF]/30 transition-all duration-500 flex flex-col h-full">
                  <div className="w-12 h-12 bg-[#1E40AF]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1E40AF] transition-colors duration-500">
                    <Layout className="w-5 h-5 text-[#1E40AF] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E40AF] mb-2">Portfolio</h3>
                  <p className="text-[#1E40AF]/40 text-sm mb-8 leading-relaxed flex-1">
                    Publie tes projets, montre tes compétences.
                  </p>
                  <div className="space-y-2">
                    <Link to="/albert-school/portfolio" className="block w-full py-3 bg-[#1E40AF] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-[#1E40AF]/20 transition-all text-center">
                      Voir le portfolio
                    </Link>
                    <Link to="/albert-school/submit?type=project" className="block w-full py-3 border border-[#1E40AF]/10 text-[#1E40AF]/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1E40AF]/5 hover:text-[#1E40AF] transition-all text-center">
                      + Soumettre un projet
                    </Link>
                  </div>
                </div>

                {/* Pillar 2: Associations */}
                <div className="group bg-white rounded-[32px] p-8 shadow-2xl shadow-[#1E40AF]/[0.02] border border-[#1E40AF]/5 hover:border-[#1E40AF]/30 transition-all duration-500 flex flex-col h-full">
                  <div className="w-12 h-12 bg-[#1E40AF]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1E40AF] transition-colors duration-500">
                    <Users className="w-5 h-5 text-[#1E40AF] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E40AF] mb-2">Associations</h3>
                  <p className="text-[#1E40AF]/40 text-sm mb-8 leading-relaxed flex-1">
                    Découvre les assos et les événements.
                  </p>
                  <div className="space-y-2">
                    <Link to="/albert-school/associations" className="block w-full py-3 bg-[#1E40AF] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-[#1E40AF]/20 transition-all text-center">
                      Explorer
                    </Link>
                    <Link to="/albert-school/associations/agenda" className="block w-full py-3 border border-[#1E40AF]/10 text-[#1E40AF]/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1E40AF]/5 hover:text-[#1E40AF] transition-all text-center">
                      Voir l'agenda
                    </Link>
                  </div>
                </div>

                {/* Pillar 3: Missions */}
                <div className="group bg-white rounded-[32px] p-8 shadow-2xl shadow-[#1E40AF]/[0.02] border border-[#1E40AF]/5 hover:border-[#1E40AF]/30 transition-all duration-500 flex flex-col h-full">
                  <div className="w-12 h-12 bg-[#1E40AF]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1E40AF] transition-colors duration-500">
                    <Briefcase className="w-5 h-5 text-[#1E40AF] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E40AF] mb-2">Missions</h3>
                  <p className="text-[#1E40AF]/40 text-sm mb-8 leading-relaxed flex-1">
                    Participe, gagne des points, progresse.
                  </p>
                  <div className="space-y-2">
                    <Link to="/albert-school/ambassadeurs" className="block w-full py-3 bg-[#1E40AF] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-[#1E40AF]/20 transition-all text-center">
                      Voir les missions
                    </Link>
                    <Link to="/albert-school/submit?type=mission" className="block w-full py-3 border border-[#1E40AF]/10 text-[#1E40AF]/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1E40AF]/5 hover:text-[#1E40AF] transition-all text-center">
                      Soumettre une preuve
                    </Link>
                  </div>
                </div>
              </div>

              {/* 5. à la une */}
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-black text-[#1E40AF]/30 uppercase tracking-[0.2em]">À la une</h2>
                  <Link to="#" className="text-[10px] font-black text-[#1E40AF] uppercase tracking-widest flex items-center gap-2 group">
                    Actualité complète <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Activity Item 1 */}
                  <div className="bg-white p-6 rounded-[24px] border border-[#1E40AF]/5 hover:border-[#1E40AF]/30 transition-all group">
                    <div className="aspect-square bg-[#1E40AF]/5 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                      <Layout className="w-10 h-10 text-[#1E40AF]/10 group-hover:text-[#1E40AF]/20 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <span className="text-[9px] font-black text-[#1E40AF]/40 uppercase tracking-widest">Portfolio</span>
                    <h4 className="text-sm font-bold text-[#1E40AF] mt-1 mb-3">Refonte UI UniSphere</h4>
                    <Link to="#" className="text-[10px] font-black text-[#1E40AF]/30 group-hover:text-[#1E40AF] flex items-center gap-1 transition-colors">
                      Détails <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {/* Activity Item 2 */}
                  <div className="bg-white p-6 rounded-[24px] border border-[#1E40AF]/5 hover:border-[#1E40AF]/30 transition-all group">
                    <div className="aspect-square bg-[#1E40AF]/5 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                      <Users className="w-10 h-10 text-[#1E40AF]/10 group-hover:text-[#1E40AF]/20 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <span className="text-[9px] font-black text-[#1E40AF]/40 uppercase tracking-widest">Association</span>
                    <h4 className="text-sm font-bold text-[#1E40AF] mt-1 mb-3">Afterwork Campus</h4>
                    <Link to="#" className="text-[10px] font-black text-[#1E40AF]/30 group-hover:text-[#1E40AF] flex items-center gap-1 transition-colors">
                      Agenda <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {/* Activity Item 3: Mini Ranking - Now Blue Gradient */}
                  <div className="bg-gradient-to-br from-[#1E40AF] to-[#1e3a8a] text-white p-6 rounded-[24px] flex flex-col justify-between shadow-xl shadow-[#1E40AF]/20">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Trophy className="w-5 h-5 text-white/40" />
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Top 3</span>
                      </div>
                      <h4 className="text-sm font-bold mb-4">Classement Général</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold opacity-40">01. Leo R.</span>
                          <span className="font-bold">450 pts</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-white">04. Toi</span>
                          <span className="font-bold text-white">310 pts</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/albert-school/leaderboard" className="mt-6 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                      Voir classement
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Widgets Stack */}
            <div className="lg:col-span-4 space-y-8">

              {/* 3. Progression Widget */}
              <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-[#1E40AF]/[0.02] border border-[#1E40AF]/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E40AF]/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                <h3 className="text-[10px] font-black text-[#1E40AF]/30 uppercase tracking-[0.2em] mb-8">Ma Progression</h3>

                <div className="flex items-end justify-between mb-10">
                  <div>
                    <span className="block text-[10px] font-black text-[#1E40AF]/20 uppercase mb-2">Points</span>
                    <span className="text-5xl font-black text-[#1E40AF] tracking-tight">{student?.totalPoints || 310}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-[#1E40AF]/20 uppercase mb-2">Rang</span>
                    <span className="text-3xl font-black text-[#1E40AF]">#04</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#1E40AF]/40" />
                      <span className="text-[#1E40AF]">Niveau: Bronze</span>
                    </div>
                    <span className="text-[#1E40AF]/30">Ligue Campus</span>
                  </div>
                  <div className="h-1.5 bg-[#1E40AF]/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1E40AF] rounded-full" style={{ width: '65%' }} />
                  </div>
                  <p className="text-[10px] text-[#1E40AF]/40 font-bold text-center italic">
                    Encore 190 pts pour le niveau suivant
                  </p>
                </div>

                <Link to="/albert-school/student/profile" className="w-full py-4 bg-[#1E40AF] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#1e3a8a] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#1E40AF]/10">
                  Ouvrir mon dashboard <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4. Bloc "À faire cette semaine" */}
              <div className="bg-white/50 backdrop-blur-sm rounded-[40px] p-8 border border-[#1E40AF]/5">
                <h3 className="text-[10px] font-black text-[#1E40AF]/30 uppercase tracking-[0.2em] mb-8">À faire cette semaine</h3>
                <div className="space-y-8">
                  {/* Item 1: Mission */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[#1E40AF]/5 flex items-center justify-center shrink-0 group-hover:bg-[#1E40AF] transition-all">
                      <CheckCircle2 className="w-4 h-4 text-[#1E40AF] group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-[#1E40AF] mb-1">JPO Janvier</h5>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-3 h-3 text-[#1E40AF]/20" />
                        <span className="text-[9px] font-black text-[#1E40AF]/30 uppercase tracking-widest">Samedi • 09:00</span>
                      </div>
                      <Link to="#" className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#1E40AF] hover:opacity-70 transition-colors">
                        Détails <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Item 2: Agenda */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[#1E40AF]/5 flex items-center justify-center shrink-0 group-hover:bg-[#1E40AF] transition-all">
                      <Calendar className="w-4 h-4 text-[#1E40AF] group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-[#1E40AF] mb-1">Conférence IA</h5>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-3 h-3 text-[#1E40AF]/20" />
                        <span className="text-[9px] font-black text-[#1E40AF]/30 uppercase tracking-widest">Mardi • 18:00</span>
                      </div>
                      <Link to="/albert-school/associations/agenda" className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#1E40AF] hover:opacity-70 transition-colors">
                        Voir l'agenda <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Item 3: Portfolio Reminder */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[#1E40AF]/5 flex items-center justify-center shrink-0 group-hover:bg-[#1E40AF] transition-all">
                      <Plus className="w-4 h-4 text-[#1E40AF] group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-[#1E40AF] mb-1">Projet BDD</h5>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-3 h-3 text-[#1E40AF]/20" />
                        <span className="text-[9px] font-black text-[#1E40AF]/30 uppercase tracking-widest">À terminer</span>
                      </div>
                      <Link to="/albert-school/submit?type=project" className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#1E40AF] hover:opacity-70 transition-colors">
                        Publier <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 6. Minimal Footer */}
      <footer className="max-w-7xl mx-auto px-12 py-12 border-t border-[#1E40AF]/10 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#1E40AF]/20">
            <Link to="#" className="hover:text-[#1E40AF] transition-colors">Mentions Légales</Link>
            <Link to="#" className="hover:text-[#1E40AF] transition-colors">Confidentialité</Link>
            <Link to="#" className="hover:text-[#1E40AF] transition-colors">Support</Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E40AF]/10 text-center md:text-right">
            © {new Date().getFullYear()} UniSphere. Tous droits réservés.
          </p>
        </div>
      </footer>
    </PageLayout>
  );
}
