import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CheckSquare, AlertTriangle, Target, Users, TrendingUp, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function AdminPage({ school = 'eugenia' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminPath = school === 'eugenia' ? '/eugenia-school/admin' : '/albert-school/admin';
  const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';
  const schoolName = school === 'eugenia' ? 'Eugenia School' : 'Albert School';
  const primaryColor = school === 'eugenia' ? '#671324' : '#1E40AF';
  const accentColor = school === 'eugenia' ? '#DBA12D' : '#3461FF';

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_school');
    sessionStorage.removeItem('admin_email');
    const loginPath = school === 'eugenia' ? '/eugenia-school/login' : '/albert-school/login';
    navigate(loginPath);
  };

  const isActive = (path) => {
    if (path === adminPath) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: adminPath, icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: `${adminPath}/validate`, icon: CheckSquare, label: 'Validation' },
    { path: `${adminPath}/reports`, icon: AlertTriangle, label: 'Signalements' },
    { path: `${adminPath}/actions`, icon: Target, label: 'Types d\'actions' },
    { path: `${adminPath}/leaderboard`, icon: Users, label: 'Élèves' },
    { path: `${adminPath}/analytics`, icon: TrendingUp, label: 'Analytics' }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans selection:bg-black selection:text-white">

      {/* PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo & Title */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-8"
            >
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight font-serif">
                  Admin<span style={{ color: accentColor }}>.</span>
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {schoolName}
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? location.pathname === item.path
                  : isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-5 py-2.5 rounded-full transition-all duration-300 group"
                  >
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-200/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`relative flex items-center gap-2 z-10 ${active ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>
                      <Icon className={`w-4 h-4 transition-colors ${active ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                      <span className={`text-[11px] font-bold uppercase tracking-wide transition-colors`}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-red-600 transition-colors duration-300 group"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest">Déconnexion</span>
                <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white"
            >
              <nav className="px-6 py-6 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.exact
                    ? location.pathname === item.path
                    : isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center justify-between px-4 py-4 rounded-xl transition-all
                        ${active
                          ? 'bg-black text-white shadow-lg shadow-black/10'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          {item.label}
                        </span>
                      </div>
                      {active && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-4 mt-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Déconnexion</span>
                  </div>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="min-h-[calc(100vh-80px)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Système Opérationnel
              </span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
              UniSphere Admin v4.2 — {schoolName}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
