import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckSquare, AlertTriangle, Target, Users, TrendingUp, LogOut, Menu, X } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F7F7F5] text-black font-sans">

      {/* MODERN TOP HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-[2000px] mx-auto px-6 lg:px-20 py-6">
          <div className="flex items-center justify-between">

            {/* Logo & Title */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-6"
            >
              <Link
                to={schoolPath}
                className="px-6 py-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[5px_5px_0px_rgba(0,0,0,1)]"
              >
                <span className="text-sm font-black tracking-tight">
                  ← RETOUR
                </span>
              </Link>

              <div className="hidden md:block w-[2px] h-12 bg-black/10" />

              <div>
                <h1 className="text-3xl font-black tracking-tighter" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                  ADMIN<span style={{ color: accentColor }}>.</span>
                </h1>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40">
                  {schoolName} — Control Panel
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? location.pathname === item.path
                  : isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      group flex items-center gap-3 px-6 py-3 rounded-none transition-all border-2
                      ${active
                        ? 'bg-black text-white border-black shadow-[5px_5px_0px_rgba(0,0,0,0.2)]'
                        : 'bg-white text-black border-black/10 hover:border-black hover:shadow-[3px_3px_0px_rgba(0,0,0,0.1)]'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-6 py-3 bg-black text-white hover:bg-red-600 transition-all border-2 border-black group"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Déconnexion</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 bg-black text-white border-2 border-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="lg:hidden mt-6 pb-6 border-t-2 border-black/10 pt-6 space-y-2"
            >
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
                      flex items-center gap-4 px-6 py-4 rounded-none transition-all border-2
                      ${active
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black/10 hover:border-black'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 bg-red-600 text-white border-2 border-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Déconnexion</span>
              </button>
            </motion.nav>
          )}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="min-h-[calc(100vh-120px)]">
        <div className="max-w-[2000px] mx-auto px-6 lg:px-20 py-12">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-black bg-white">
        <div className="max-w-[2000px] mx-auto px-6 lg:px-20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20">
              UniSphere Admin Panel v4.2 — {schoolName}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: accentColor }}>
                SYSTÈME ACTIF
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
