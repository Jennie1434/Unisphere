import { useState, useEffect } from 'react';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import PageLayout from '../components/shared/PageLayout';
import LeaderboardStats from '../components/student/LeaderboardStats';
import BadgesDisplay from '../components/student/BadgesDisplay';
import { Lock, Eye, EyeOff, Shield, ArrowUpRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentProfilePage({ school = 'eugenia' }) {
  const { student } = useStudentAuth();
  const [associations, setAssociations] = useState([]);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const savedAssociations = localStorage.getItem(`associations_${student.email}`);
    if (savedAssociations) {
      setAssociations(JSON.parse(savedAssociations));
    }
  }, [student]);

  const handleJoinAssociation = (assoId) => {
    if (!associations.find(a => a.id === assoId)) {
      const associationsList = [
        { id: 1, name: 'Eugenia Théâtre', emoji: '🎭' },
        { id: 2, name: 'Eugenia Music', emoji: '🎵' },
        { id: 3, name: 'Eugenia Sport', emoji: '⚽' },
        { id: 4, name: 'Eugenia Art', emoji: '🎨' },
        { id: 5, name: 'Eugenia Solidarité', emoji: '🌍' },
        { id: 6, name: 'Eugenia Innovation', emoji: '💡' }
      ];
      const asso = associationsList.find(a => a.id === assoId);
      if (asso) {
        const updated = [...associations, asso];
        setAssociations(updated);
        localStorage.setItem(`associations_${student.email}`, JSON.stringify(updated));
        alert(`Vous avez rejoint ${asso.name} !`);
      }
    }
  };

  const handleLeaveAssociation = (assoId) => {
    const updated = associations.filter(a => a.id !== assoId);
    setAssociations(updated);
    localStorage.setItem(`associations_${student.email}`, JSON.stringify(updated));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas' });
      return;
    }

    if (newPassword.length < 4) {
      setPasswordMessage({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 4 caractères' });
      return;
    }

    const storedPassword = localStorage.getItem(`password_${student.email}`);
    const defaultPassword = '1234';

    if (currentPassword !== (storedPassword || defaultPassword)) {
      setPasswordMessage({ type: 'error', text: 'Mot de passe actuel incorrect' });
      return;
    }

    try {
      localStorage.setItem(`password_${student.email}`, newPassword);
      setPasswordMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);

      setTimeout(() => {
        setPasswordMessage({ type: '', text: '' });
      }, 3000);
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'Erreur lors de la modification du mot de passe' });
    }
  };

  return (
    <PageLayout school={school} minimalFooter={true}>
      <div className="min-h-screen bg-white text-black selection:bg-[#DBA12D] selection:text-black font-sans overflow-hidden">

        {/* WOW HERO SECTION */}
        <header className="relative pt-40 pb-20 px-6 lg:px-20 max-w-[1800px] mx-auto overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-5xl relative z-10"
          >
            <h1 className="text-8xl md:text-[140px] font-black leading-[0.85] tracking-tighter mb-8" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              PROFIL <br />
              <span className="text-[#671324] italic">AGENT.</span>
            </h1>

            <div className="flex items-center gap-8 mt-12">
              <div className="w-32 h-32 rounded-full border-4 border-black flex items-center justify-center text-6xl bg-white shadow-[15px_15px_0px_rgba(0,0,0,1)]">
                👤
              </div>
              <div>
                <p className="text-3xl font-black mb-2 uppercase tracking-tight">
                  {student.firstName && student.lastName
                    ? `${student.firstName} ${student.lastName}`
                    : student.firstName || student.lastName || student.email?.split('@')[0] || 'Étudiant'}
                </p>
                <p className="text-sm text-black/40 font-black uppercase tracking-[0.3em]">{student.email}</p>
                <p className="text-sm text-black/40 font-black uppercase tracking-[0.3em] mt-1">NODE: {student.classe || 'N/A'}</p>
              </div>
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-6 mt-10">
              <div className="bg-black text-white px-8 py-4 rounded-none border-2 border-black hover:bg-[#671324] transition-all">
                <span className="text-[10px] font-black tracking-[0.3em] block text-[#DBA12D] mb-1">IMPACT POWER</span>
                <span className="text-4xl font-black">{student.totalPoints || 0}</span>
              </div>
              <div className="bg-black text-white px-8 py-4 rounded-none border-2 border-black hover:bg-[#671324] transition-all">
                <span className="text-[10px] font-black tracking-[0.3em] block text-[#DBA12D] mb-1">ACTIONS DEPLOYED</span>
                <span className="text-4xl font-black">{student.actionsCount || 0}</span>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-t from-[#DBA12D]/10 to-transparent blur-[200px] -z-10" />
        </header>

        {/* SECURITY SECTION */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black p-12 md:p-16 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[25px_25px_0px_#DBA12D] transition-all duration-500">
            <div className="flex items-center gap-6 mb-12">
              <Shield className="w-12 h-12 text-[#671324]" />
              <h2 className="text-4xl font-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Sécurité.</h2>
            </div>

            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="px-10 py-5 bg-black text-white hover:bg-[#671324] transition-all font-black text-xs uppercase tracking-[0.3em] border-2 border-black shadow-[10px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
              >
                <Lock className="w-4 h-4 inline mr-3" />
                MODIFIER LE MOT DE PASSE
              </button>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-8 max-w-2xl">
                <div>
                  <label className="block text-[10px] font-black text-black mb-4 uppercase tracking-[0.3em]">
                    MOT DE PASSE ACTUEL
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="w-full pl-6 pr-14 py-5 bg-white border-2 border-black rounded-none focus:border-[#DBA12D] transition-all outline-none text-black font-bold uppercase text-sm"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black mb-4 uppercase tracking-[0.3em]">
                    NOUVEAU MOT DE PASSE
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className="w-full pl-6 pr-14 py-5 bg-white border-2 border-black rounded-none focus:border-[#DBA12D] transition-all outline-none text-black font-bold uppercase text-sm"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black mb-4 uppercase tracking-[0-3em]">
                    CONFIRMER LE NOUVEAU MOT DE PASSE
                  </label>
                  <input
                    type="password"
                    className="w-full pl-6 pr-6 py-5 bg-white border-2 border-black rounded-none focus:border-[#DBA12D] transition-all outline-none text-black font-bold uppercase text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {passwordMessage.text && (
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    className={`p-6 border-2 text-[11px] font-black uppercase tracking-widest ${passwordMessage.type === 'success'
                      ? 'bg-black text-[#DBA12D] border-[#DBA12D]'
                      : 'bg-black text-red-400 border-red-400'
                      }`}
                  >
                    {passwordMessage.text}
                  </motion.div>
                )}

                <div className="flex gap-6">
                  <button
                    type="submit"
                    className="px-10 py-5 bg-black text-white hover:bg-[#671324] transition-all font-black text-xs uppercase tracking-[0.3em]"
                  >
                    VALIDER
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setPasswordMessage({ type: '', text: '' });
                    }}
                    className="px-10 py-5 bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-all font-black text-xs uppercase tracking-[0.3em]"
                  >
                    ANNULER
                  </button>
                </div>
              </form>
            )}
          </div>


        </section>

        {/* BADGES SECTION */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black p-12 md:p-16 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[25px_25px_0px_#DBA12D] transition-all duration-500">
            <div className="flex items-center gap-6 mb-12">
              <Award className="w-12 h-12 text-[#671324]" />
              <h2 className="text-4xl font-black" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Hall of Fame.</h2>
            </div>
            <BadgesDisplay studentEmail={student.email} school={school} />
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black p-12 shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[25px_25px_0px_#DBA12D] transition-all duration-500">
            <h2 className="text-4xl font-black mb-12" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Performance Metrics.</h2>
            <LeaderboardStats school={school} />
          </div>
        </section>

        {/* ASSOCIATIONS SECTION */}
        <section className="px-6 lg:px-20 mb-40 max-w-[1800px] mx-auto">
          <div className="bg-white border-2 border-black p-12 md:p-16 shadow-[20px_20px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl font-black mb-12" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              Mes Associations.
            </h2>
            {associations.length === 0 ? (
              <p className="text-black/40 text-center py-12 text-sm font-black uppercase tracking-wide">
                Aucune association rejointe
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {associations.map(asso => (
                  <div key={asso.id} className="bg-white border-2 border-black p-8 hover:bg-black hover:text-white group transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{asso.emoji}</span>
                        <span className="font-black text-lg uppercase">{asso.name}</span>
                      </div>
                      <button
                        onClick={() => handleLeaveAssociation(asso.id)}
                        className="px-6 py-3 bg-black text-white group-hover:bg-white group-hover:text-black border-2 border-black text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        QUITTER
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* HIGH-IMPACT FOOTER */}
        <section className="bg-black text-white py-32 px-6 lg:px-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(219,161,45,0.05),transparent_50%)]" />
          <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-black italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>Student Profile Engine.</h3>
              <p className="text-[10px] font-black tracking-[0.5em] text-white/20">YOUR DIGITAL IDENTITY</p>
            </div>
            <div className="text-right">
              <span className="text-8xl font-black text-white/5 block leading-none">2026</span>
              <span className="text-[9px] font-black tracking-widest text-[#DBA12D] animate-pulse uppercase">Profile Mode — Synchronized</span>
            </div>
          </div>
        </section>

      </div>
    </PageLayout >
  );
}
