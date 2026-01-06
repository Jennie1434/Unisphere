import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useStudentAuth } from '../../contexts/StudentAuthContext';
import { getLevelColor, getLevelName, getBadgeInfo } from '../../services/gamificationService';
import BadgeCollection from './BadgeCollection';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';

export default function Leaderboard({ school = 'eugenia' }) {
  const { student } = useStudentAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('general'); // 'general', 'class', 'monthly'
  const [selectedClass, setSelectedClass] = useState('all');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, [filter, selectedClass]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      let data;

      if (filter === 'class' && selectedClass !== 'all') {
        data = await api.get(`/leaderboard/class/${encodeURIComponent(selectedClass)}`);
      } else if (filter === 'monthly') {
        data = await api.get('/leaderboard/monthly');
      } else {
        data = await api.get('/leaderboard');
      }

      setLeaderboard(Array.isArray(data) ? data : []);

      if (Array.isArray(data)) {
        const uniqueClasses = [...new Set(data.map(u => u.classe).filter(Boolean))];
        setClasses(uniqueClasses.sort());
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  const studentRank = student ? leaderboard.findIndex(u => u.email === student.email) + 1 : null;
  const studentData = student ? leaderboard.find(u => u.email === student.email) : null;

  return (
    <div className="w-full font-sans">
      {/* Filtres */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex gap-4">
            {['general', 'monthly', 'class'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all border-2 border-black ${filter === f
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-black hover:text-white'
                  }`}
              >
                {f === 'general' ? 'Général' : f === 'monthly' ? 'Mensuel' : 'Par classe'}
              </button>
            ))}
          </div>

          {filter === 'class' && (
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="appearance-none pl-6 pr-12 py-3 bg-white border-2 border-black text-xs font-black uppercase tracking-widest focus:outline-none cursor-pointer hover:bg-black hover:text-white transition-colors"
              >
                <option value="all">TOUTES LES CLASSES</option>
                {classes.map(classe => (
                  <option key={classe} value={classe}>{classe}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-current" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Position de l'étudiant connecté */}
      {studentData && studentRank && (
        <div className="mb-12 border-2 border-black">
          <div className="bg-black text-white p-8 px-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="text-6xl font-black italic text-[#DBA12D]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                #{studentRank.toString().padStart(2, '0')}
              </div>
              <div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2">VOTRE POSITION</div>
                <div className="text-3xl font-black uppercase tracking-tight">
                  {studentData.firstName} {studentData.lastName}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2">TOTAL POINTS</div>
              <div className="text-5xl font-black text-white">{studentData.totalPoints}</div>
            </div>
          </div>
          {/* Decorative strip to match "Leaderboard_Elite." aesthetic if needed, or simple footer for this card */}
        </div>
      )}

      {/* Table Header */}
      <div className="hidden md:flex border-y-2 border-black py-6 px-10 bg-white">
        <div className="w-24 text-[10px] font-black text-black uppercase tracking-[0.3em]">RANK</div>
        <div className="flex-1 text-[10px] font-black text-black uppercase tracking-[0.3em]">OPERATIVE</div>
        <div className="w-40 text-[10px] font-black text-black uppercase tracking-[0.3em] text-center">CLASSE</div>
        <div className="w-40 text-right text-[10px] font-black text-black uppercase tracking-[0.3em]">IMPACT POWER</div>
      </div>

      <div className="border-b-2 border-black">
        {leaderboard.map((user, index) => {
          const isCurrentUser = student && user.email === student.email;

          return (
            <div
              key={user.email}
              className={`flex flex-col md:flex-row items-center px-10 py-6 border-b border-black/10 transition-all hover:bg-black hover:text-white group ${isCurrentUser ? 'bg-black/5' : 'bg-white'
                }`}
            >
              {/* Rank */}
              <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                <div className="w-24 flex-shrink-0 font-black text-2xl italic group-hover:text-[#DBA12D]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                  #{user.rank.toString().padStart(2, '0')}
                </div>

                {/* Mobile only info */}
                <div className="md:hidden flex-1">
                  <div className="font-black text-lg uppercase tracking-tight">
                    <Link to={`/profile/${user.id || user.email}`} className="hover:underline">
                      {user.firstName} {user.lastName}
                    </Link>
                  </div>
                  <div className="text-xs font-bold opacity-60 mt-1 uppercase">
                    {user.classe}
                  </div>
                </div>

                <div className="md:hidden text-right">
                  <span className="block text-xl font-black text-[#DBA12D]">
                    {filter === 'monthly' ? user.monthlyPoints || 0 : user.totalPoints}
                  </span>
                </div>
              </div>

              {/* Desktop info */}
              <div className="hidden md:flex flex-1 items-center gap-6">
                <div className={`w-12 h-12 border-2 border-black flex items-center justify-center text-sm font-black uppercase group-hover:border-white group-hover:bg-white group-hover:text-black ${isCurrentUser ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-black text-lg uppercase tracking-tight flex items-center gap-3">
                    <Link to={`/profile/${user.id || user.email}`} className="hover:underline decoration-2 underline-offset-4 decoration-[#DBA12D]">
                      {user.firstName} {user.lastName}
                    </Link>
                    {isCurrentUser && (
                      <span className="text-[9px] px-2 py-1 bg-black text-white group-hover:bg-white group-hover:text-black font-black uppercase tracking-widest border border-current">Vous</span>
                    )}
                  </div>
                  <div className="text-[10px] font-bold opacity-50 uppercase tracking-wider mt-1">
                    {user.badges?.length > 0 ? `${user.badges.length} BADGES UNLOCKED` : 'NO BADGES'}
                  </div>
                </div>
              </div>

              {/* Class Column */}
              <div className="hidden md:block w-40 text-center">
                <div className="inline-block border-2 border-black px-3 py-1 text-xs font-black uppercase group-hover:border-white">
                  {user.classe || 'N/A'}
                </div>
              </div>

              {/* Points Column */}
              <div className="hidden md:block w-40 text-right">
                <div className="text-3xl font-black group-hover:text-[#DBA12D]">
                  {filter === 'monthly' ? user.monthlyPoints || 0 : user.totalPoints}
                </div>
                <div className="text-[9px] font-black opacity-40 uppercase tracking-[0.3em]">
                  UNITS COLLECTED
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {leaderboard.length === 0 && !loading && (
        <div className="py-40 text-center border-b-2 border-black bg-white">
          <TrendingUp className="w-16 h-16 text-black/20 mx-auto mb-6" />
          <p className="text-black/40 font-black text-xl uppercase tracking-widest">
            Aucun participant pour le moment.
          </p>
        </div>
      )}
    </div>
  );
}
