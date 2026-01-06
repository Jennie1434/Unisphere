import { useEffect, useState } from 'react';
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
    <div className="w-full">
      {/* Filtres */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100 w-fit">
            <button
              onClick={() => setFilter('general')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'general'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              Général
            </button>
            <button
              onClick={() => setFilter('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'monthly'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setFilter('class')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'class'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              Par classe
            </button>
          </div>

          {filter === 'class' && (
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-black/10 rounded-xl text-sm font-bold outline-none focus:border-black transition-colors bg-white text-black"
            >
              <option value="all">Toutes les classes</option>
              {classes.map(classe => (
                <option key={classe} value={classe}>{classe}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Position de l'étudiant connecté */}
      {studentData && studentRank && (
        <div className="mb-8 p-6 bg-black rounded-[24px] text-white flex items-center justify-between shadow-xl shadow-black/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center text-black font-black text-lg">
              #{studentRank}
            </div>
            <div>
              <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Votre position</div>
              <div className="text-2xl font-bold text-white">
                {studentData.firstName} {studentData.lastName}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Points</div>
            <div className="text-3xl font-black text-[#10B981]">{studentData.totalPoints}</div>
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="hidden md:flex bg-gray-50/50 border-b border-gray-100 px-6 py-4 rounded-t-2xl">
        <div className="w-20 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Rang</div>
        <div className="flex-1 text-xs font-black text-gray-400 uppercase tracking-widest">Étudiant</div>
        <div className="w-32 text-right text-xs font-black text-gray-400 uppercase tracking-widest">
          {filter === 'monthly' ? 'Points (mois)' : 'Points'}
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {leaderboard.map((user, index) => {
          const isTopThree = user.rank <= 3;
          const isCurrentUser = student && user.email === student.email;

          return (
            <div
              key={user.email}
              className={`flex flex-col md:flex-row items-center p-6 hover:bg-gray-50 transition-all group ${isCurrentUser ? 'bg-gray-50/50' : ''
                }`}
            >
              {/* Rank */}
              <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                <div className="w-20 text-center flex-shrink-0 flex justify-center">
                  {user.rank === 1 && <Trophy className="w-6 h-6 text-[#10B981]" />}
                  {user.rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
                  {user.rank === 3 && <Medal className="w-6 h-6 text-gray-400" />}
                  {user.rank > 3 && (
                    <span className="text-gray-400 text-sm font-bold">#{user.rank}</span>
                  )}
                </div>

                {/* Mobile only info */}
                <div className="md:hidden flex-1">
                  <div className="font-bold text-lg text-black">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {user.classe}
                  </div>
                </div>

                <div className="md:hidden text-right">
                  <span className="block text-xl font-black text-[#10B981]">
                    {filter === 'monthly' ? user.monthlyPoints || 0 : user.totalPoints}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">pts</span>
                </div>
              </div>

              {/* Desktop info */}
              <div className="hidden md:flex flex-1 items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-[#10B981] transition-colors">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-base text-black flex items-center gap-2">
                    {user.firstName} {user.lastName}
                    {isCurrentUser && (
                      <span className="text-[10px] px-2 py-0.5 bg-black text-white rounded-full uppercase tracking-wider">Vous</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{user.classe || 'N/A'}</span>
                    {user.badges && user.badges.length > 0 && (
                      <div className="flex gap-1">
                        {user.badges.slice(0, 3).map((b, i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#10B981]" title="Badge gagné" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Points */}
              <div className="hidden md:block w-32 text-right">
                <div className="text-2xl font-black text-[#10B981]">
                  {filter === 'monthly' ? user.monthlyPoints || 0 : user.totalPoints}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">points</div>
              </div>
            </div>
          );
        })}
      </div>

      {leaderboard.length === 0 && !loading && (
        <div className="text-center py-20">
          <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">
            Aucun participant pour le moment. Soyez le premier !
          </p>
        </div>
      )}
    </div>
  );
}
