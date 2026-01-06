import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSchoolTheme } from '../../hooks/useSchoolTheme';
import EugeniaLogo from './EugeniaLogo';
import AlbertLogo from './AlbertLogo';
import UniSphereLogo from './UniSphereLogo';
import { useStudentAuth } from '../../contexts/StudentAuthContext';
import NotificationCenter from './NotificationCenter';
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Plus,
  Briefcase,
  Layout,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';

export default function SchoolHeader({ school = 'eugenia' }) {
  const location = useLocation();
  const { student, logout } = useStudentAuth();
  const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const submitRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (submitRef.current && !submitRef.current.contains(event.target)) {
        setIsSubmitOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'Accueil', path: schoolPath },
    { label: 'Portfolio', path: `${schoolPath}/portfolio` },
    { label: 'Associations', path: `${schoolPath}/associations` },
    { label: 'Missions', path: `${schoolPath}/ambassadeurs` },
    { label: 'Classement', path: `${schoolPath}/leaderboard` }
  ];

  const isActive = (path) => {
    if (path === schoolPath) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const accentColor = '#14F195'; // UniSphere Green

  return (
    <header className="sticky top-0 z-[100] bg-[#F7F7F5]/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* Left Section: Logo + Badge */}
        <div className="flex items-center gap-8">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <UniSphereLogo size="small" />
          </Link>
          <div className="hidden xl:flex items-center">
            <span className="h-4 w-[1px] bg-black/10 mr-4" />
            <span
              className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border"
              style={{
                backgroundColor: school === 'eugenia' ? 'rgba(103, 19, 36, 0.05)' : 'rgba(30, 64, 175, 0.05)',
                color: school === 'eugenia' ? '#671324' : '#1E40AF',
                borderColor: 'transparent'
              }}
            >
              Espace Officiel — {school === 'eugenia' ? 'Eugenia' : 'Albert'} School
            </span>
          </div>
        </div>

        {/* Center Section: Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                ${isActive(item.path)
                  ? (school === 'eugenia' ? 'bg-[#671324] text-white shadow-lg shadow-[#671324]/20' : 'bg-[#1E40AF] text-white shadow-lg shadow-[#1E40AF]/20')
                  : (school === 'eugenia' ? 'text-[#671324]/40 hover:text-[#671324] hover:bg-[#671324]/5' : 'text-[#1E40AF]/40 hover:text-[#1E40AF] hover:bg-[#1E40AF]/5')}
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-4">
          {/* Search (Desktop) */}
          <button className={`hidden sm:flex p-2 ${school === 'eugenia' ? 'text-[#671324]/40 hover:text-[#671324]' : 'text-[#1E40AF]/40 hover:text-[#1E40AF]'} transition-colors`}>
            <Search className="w-5 h-5 stroke-[1.5px]" />
          </button>

          {/* Notifications */}
          {student && <NotificationCenter studentEmail={student.email} />}

          {/* User Profile Dropdown */}
          {student ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 p-1 pl-3 bg-white border ${school === 'eugenia' ? 'border-[#671324]/10' : 'border-[#1E40AF]/10'} rounded-full hover:shadow-md transition-all group`}
              >
                <span className={`hidden sm:inline text-xs font-bold ${school === 'eugenia' ? 'text-[#671324]/60' : 'text-[#1E40AF]/60'} group-hover:text-black transition-colors`}>
                  {student.firstName}
                </span>
                <div className={`w-8 h-8 rounded-full ${school === 'eugenia' ? 'bg-[#671324]/5' : 'bg-[#1E40AF]/5'} flex items-center justify-center overflow-hidden`}>
                  <User className={`w-4 h-4 ${school === 'eugenia' ? 'text-[#671324]/40' : 'text-[#1E40AF]/40'}`} />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-black/5 p-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Link
                    to={`${schoolPath}/student/profile`}
                    onClick={() => setIsProfileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-bold ${school === 'eugenia' ? 'text-[#671324]/60 hover:text-[#671324] hover:bg-[#671324]/5' : 'text-[#1E40AF]/60 hover:text-[#1E40AF] hover:bg-[#1E40AF]/5'} rounded-xl transition-all`}
                  >
                    <Settings className="w-4 h-4" /> Mon Profil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4" /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={`${schoolPath}/login`}
              className={`px-6 py-2 ${school === 'eugenia' ? 'bg-[#671324]' : 'bg-[#1E40AF]'} text-white text-xs font-black uppercase tracking-widest rounded-full hover:opacity-90 transition-all`}
            >
              Connexion
            </Link>
          )}

          {/* Primary Action Button: Soumettre */}
          <div className="relative" ref={submitRef}>
            <button
              onClick={() => setIsSubmitOpen(!isSubmitOpen)}
              className={`px-5 py-2.5 ${school === 'eugenia' ? 'bg-[#671324]' : 'bg-[#1E40AF]'} text-white text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-lg ${school === 'eugenia' ? 'shadow-[#671324]/20' : 'shadow-[#1E40AF]/20'}`}
            >
              Soumettre <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSubmitOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSubmitOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-black/20 border border-black/5 p-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Link
                  to={`${schoolPath}/submit?type=project`}
                  onClick={() => setIsSubmitOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 text-sm font-bold ${school === 'eugenia' ? 'text-[#671324]' : 'text-[#1E40AF]'} group hover:bg-black/5 rounded-xl transition-all`}
                >
                  <div className={`w-10 h-10 ${school === 'eugenia' ? 'bg-[#671324]/5 text-[#671324] group-hover:bg-[#671324] group-hover:text-white' : 'bg-[#1E40AF]/5 text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white'} rounded-lg flex items-center justify-center transition-all`}>
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm">Soumettre un projet</div>
                    <div className={`text-[10px] ${school === 'eugenia' ? 'text-[#671324]/40' : 'text-[#1E40AF]/40'} font-medium`}>Portfolio & Créations</div>
                  </div>
                </Link>
                <Link
                  to={`${schoolPath}/submit?type=mission`}
                  onClick={() => setIsSubmitOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 text-sm font-bold ${school === 'eugenia' ? 'text-[#671324]' : 'text-[#1E40AF]'} group hover:bg-black/5 rounded-xl transition-all`}
                >
                  <div className={`w-10 h-10 bg-[#671324]/5 text-[#671324] rounded-lg flex items-center justify-center group-hover:bg-[#671324] group-hover:text-white transition-all`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm">Soumettre une preuve</div>
                    <div className={`text-[10px] ${school === 'eugenia' ? 'text-[#671324]/40' : 'text-[#1E40AF]/40'} font-medium`}>Missions & Engagement</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black/40 hover:text-black transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white/95 backdrop-blur-xl z-[90] p-6 animate-in fade-in slide-in-from-right duration-500">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  px-6 py-4 rounded-2xl text-lg font-bold transition-all
                  ${isActive(item.path)
                    ? (school === 'eugenia' ? 'bg-[#671324] text-white' : 'bg-[#1E40AF] text-white')
                    : (school === 'eugenia' ? 'text-[#671324]/60 hover:bg-[#671324]/5 hover:text-[#671324]' : 'text-[#1E40AF]/60 hover:bg-[#1E40AF]/5 hover:text-[#1E40AF]')}
                `}
              >
                {item.label}
              </Link>
            ))}
            <div className={`h-[1px] ${school === 'eugenia' ? 'bg-[#671324]/10' : 'bg-[#1E40AF]/10'} my-4`} />
            <button className={`flex items-center justify-between px-6 py-4 font-bold transition-colors ${school === 'eugenia' ? 'text-[#671324]/60 hover:text-[#671324]' : 'text-[#1E40AF]/60 hover:text-[#1E40AF]'}`}>
              Recherche <Search className="w-5 h-5" />
            </button>
            {student && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-6 py-4 text-red-500 font-bold"
              >
                Déconnexion <LogOut className="w-5 h-5" />
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

