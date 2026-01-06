import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckSquare, AlertTriangle, Target, Users, TrendingUp, LogOut } from 'lucide-react';

export default function AdminPage({ school = 'eugenia' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const adminPath = school === 'eugenia' ? '/eugenia-school/admin' : '/albert-school/admin';
  const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';
  const schoolName = school === 'eugenia' ? 'Eugenia School' : 'Albert School';
  const primaryColor = school === 'eugenia' ? '#671324' : '#3461FF';
  const accentColor = school === 'eugenia' ? '#DBA12D' : '#60A5FA';

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
    <div className="min-h-screen bg-white text-black flex font-sans selection:bg-[#DBA12D] selection:text-black">

      {/* SIDEBAR WOW EDITION */}
      <aside className="w-80 bg-black text-white border-r-4 border-white flex-shrink-0 flex flex-col relative overflow-hidden">

        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)'
        }} />

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 border-b-2 border-white/20 relative z-10"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, #000)` }}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-white rounded-none flex items-center justify-center text-2xl shadow-lg">
              ⚙️
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                ADMIN.
              </h2>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                CONTROL PANEL
              </p>
            </div>
          </div>
          <div className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-none">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>
              {schoolName}
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 relative z-10 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = item.exact
              ? location.pathname === item.path
              : isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group flex items-center gap-4 px-6 py-4 rounded-none transition-all duration-300 relative overflow-hidden
                  ${active
                    ? 'bg-white text-black shadow-[5px_5px_0px_rgba(255,255,255,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 w-1 h-full"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
                <Icon className={`w-5 h-5 ${active ? 'text-black' : 'group-hover:scale-110 transition-transform'}`} />
                <span className={`text-sm font-black uppercase tracking-widest ${active ? 'text-black' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t-2 border-white/20 relative z-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-none bg-red-600 hover:bg-red-700 text-white transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-[-5px] transition-transform" />
            <span className="text-sm font-black uppercase tracking-widest">Déconnexion</span>
          </button>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-[100px] opacity-20" style={{ backgroundColor: accentColor }} />
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-white">
          <div className="max-w-[1800px] mx-auto px-10 py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
