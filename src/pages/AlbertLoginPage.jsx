import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AlbertLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useStudentAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password, 'albert');

    if (result.success) {
      navigate('/albert-school');
    } else if (result.error === 'ADMIN_REDIRECT') {
      navigate(result.redirectPath);
    } else {
      setError(result.error || 'Erreur de connexion');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

      {/* Normalized Floating Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-10 flex justify-center">
        <Link to="/">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-12 py-4 border-2 border-black bg-white shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:shadow-[15px_15px_0px_rgba(52,97,255,1)] hover:-translate-y-1 transition-all cursor-pointer"
          >
            <span className="text-xl font-bold tracking-tight text-black">
              UniSphere <span className="text-[#3461FF]">.</span>
            </span>
          </motion.div>
        </Link>
      </header>

      {/* WOW Edition Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 w-full max-w-lg mt-20"
      >
        <div className="bg-white border-2 border-black p-12 shadow-[30px_30px_0px_rgba(0,0,0,1)] md:p-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-4 italic tracking-tighter" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              CONNEXION.
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">
              ALBERT PRIVATE ACCESS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label className="block text-[10px] font-black text-black mb-4 uppercase tracking-[0.3em]">
                EMAIL PROFESSIONNEL
              </label>
              <div className="relative group">
                <input
                  type="email"
                  className="w-full pl-6 pr-4 py-5 bg-white border-2 border-black rounded-none focus:border-[#3461FF] transition-all outline-none text-black font-bold uppercase placeholder:text-black/10 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="NOM@ALBERTSCHOOL.COM"
                  required
                />
                <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/10 group-focus-within:text-[#3461FF]" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-black mb-4 uppercase tracking-[0.3em]">
                MOT DE PASSE
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-6 pr-12 py-5 bg-white border-2 border-black rounded-none focus:border-[#3461FF] transition-all outline-none text-black font-bold uppercase placeholder:text-black/10 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-black/10 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[9px] text-black/20 mt-4 uppercase tracking-widest font-black flex items-center gap-2">
                <span className="w-2 h-[1px] bg-black/20" /> INDICE DE RECOUVREMENT: 1234
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                className="p-6 bg-black text-[#3461FF] border-2 border-[#3461FF] text-[11px] font-black uppercase tracking-widest italic"
              >
                ERR_AUTH: {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-6 bg-black text-white hover:bg-[#3461FF] hover:text-black transition-all duration-500 font-black text-xs uppercase tracking-[0.5em] shadow-[15px_15px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
              disabled={loading}
            >
              {loading ? 'SYNCHRONISATION...' : 'INITIALISER'}
            </button>
          </form>
        </div>

        <div className="mt-16 text-center">
          <Link to="/select-school" className="inline-flex items-center gap-4 text-black/40 hover:text-black font-black text-[10px] uppercase tracking-[0.4em] transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            RETOUR AU CHOIX DE L'UNITÉ
          </Link>
        </div>
      </motion.div>

      {/* Decorative scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
    </div>
  );
}

