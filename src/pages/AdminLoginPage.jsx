import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHOOLS, SCHOOL_EMAIL_DOMAINS } from '../constants/routes';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Détecte l'école à partir de l'email
   */
  const detectSchool = (email) => {
    const emailLower = email.toLowerCase();
    if (emailLower.includes(SCHOOL_EMAIL_DOMAINS[SCHOOLS.EUGENIA])) {
      return SCHOOLS.EUGENIA;
    }
    if (emailLower.includes(SCHOOL_EMAIL_DOMAINS[SCHOOLS.ALBERT])) {
      return SCHOOLS.ALBERT;
    }
    return null;
  };

  /**
   * Vérifie si l'email est un email admin
   */
  const isAdminEmail = (email) => {
    const emailLower = email.toLowerCase();
    return emailLower === 'admin@eugeniaschool.com' || emailLower === 'admin@albertschool.com';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Vérifier que c'est un email admin
    if (!isAdminEmail(credentials.email)) {
      setError('Seuls les emails admin@eugeniaschool.com ou admin@albertschool.com sont acceptés');
      setLoading(false);
      return;
    }

    // Vérifier le mot de passe (1234 pour tous les admins)
    if (credentials.password !== '1234') {
      setError('Mot de passe incorrect');
      setLoading(false);
      return;
    }

    // Détecter l'école depuis l'email
    const school = detectSchool(credentials.email);
    if (!school) {
      setError('Impossible de détecter l\'école depuis l\'email');
      setLoading(false);
      return;
    }

    // Sauvegarder la session
    sessionStorage.setItem('admin_authenticated', 'true');
    sessionStorage.setItem('admin_email', credentials.email);
    sessionStorage.setItem('admin_school', school);

    // Rediriger vers le dashboard admin de l'école détectée
    const adminPath = school === SCHOOLS.EUGENIA ? '/eugenia-school/admin' : '/albert-school/admin';
    navigate(adminPath);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[100px] opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white mb-6 shadow-lg shadow-black/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
              Admin Portal
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Accès sécurisé à l'administration UniSphere
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 ml-1">
                Email administrateur
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@ecole.com"
                  required
                  autoFocus
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 ml-1">
                Mot de passe
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <span className="text-xs font-bold uppercase">Cacher</span>
                  ) : (
                    <span className="text-xs font-bold uppercase">Voir</span>
                  )}
                </button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-3 font-medium">
                Mot de passe par défaut : <span className="text-gray-600 font-bold bg-gray-100 px-1.5 py-0.5 rounded">1234</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Retour à l'accueil
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            UniSphere Admin v4.2
          </p>
        </div>
      </motion.div>
    </div>
  );
}

