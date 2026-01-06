import { useState, useEffect } from 'react';
import { useStudentAuth } from '../../contexts/StudentAuthContext';
import LevelProgress from './LevelProgress';
import BadgeCollection from './BadgeCollection';
import StreakCounter from './StreakCounter';
import { api } from '../../services/api';
import { Trophy, Target, Zap, TrendingUp, AlertCircle, Loader } from 'lucide-react';

export default function LeaderboardStats({ school = 'eugenia', student: propStudent }) {
  const { student: authStudent } = useStudentAuth();
  const student = propStudent || authStudent;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      if (!student?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const encodedEmail = encodeURIComponent(student.email);
        const endpoint = `/leaderboard/student/${encodedEmail}/stats`;

        const data = await api.get(endpoint);

        if (data && data.error) {
          if (data.error === 'Student not found' || data.error.includes('not found')) {
            setStats({
              student: { ...student, totalPoints: 0, actionsCount: 0 },
              ranks: { global: null, class: null },
              level: { current: 1, progress: 0, name: 'Novice', nextLevelPoints: 50 },
              streak: { current: 0, longest: 0 },
              badges: [],
              recentActions: [],
            });
            return;
          }
          throw new Error(data.error);
        }

        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        let errorMessage = 'Erreur lors du chargement des statistiques';
        if (err.message) errorMessage = err.message;

        setError(errorMessage);

        // Fallback stats
        setStats({
          student: { ...student, totalPoints: 0, actionsCount: 0 },
          ranks: { global: null, class: null },
          level: { current: 1, progress: 0, name: 'Novice', nextLevelPoints: 50 },
          streak: { current: 0, longest: 0 },
          badges: [],
          recentActions: [],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [student]);

  if (!student) return null;

  if (loading) {
    return (
      <div className="bg-white rounded-[24px] p-8 border border-black/5 flex justify-center">
        <Loader className="w-6 h-6 animate-spin text-black" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* En-tête avec rangs */}
      <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-6">Mes Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-6 bg-gray-50 rounded-[20px] border border-black/5">
            <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Rang Global</div>
            <div className="text-4xl font-black text-black">
              {stats.ranks?.global ? `#${stats.ranks.global}` : 'N/A'}
            </div>
          </div>
          {stats.student?.classe && (
            <div className="text-center p-6 bg-gray-50 rounded-[20px] border border-black/5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Rang Classe</div>
              <div className="text-4xl font-black text-black">
                {stats.ranks?.class ? `#${stats.ranks.class}` : 'N/A'}
              </div>
            </div>
          )}
          <div className="text-center p-6 bg-[#10B981]/10 rounded-[20px] border border-[#10B981]/20">
            <div className="text-xs font-black uppercase tracking-widest text-[#10B981] mb-2">Points Totaux</div>
            <div className="text-4xl font-black text-[#10B981]">{stats.student?.totalPoints || 0}</div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2 text-red-600 text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Niveau et progression */}
      <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm">
        <h3 className="text-lg font-bold text-black mb-6">Progression</h3>
        <LevelProgress
          points={stats.student?.totalPoints || 0}
          currentLevel={stats.level?.current}
          levelProgress={stats.level?.progress}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streak */}
        <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm">
          <h3 className="text-lg font-bold text-black mb-6">Série en cours</h3>
          <StreakCounter
            currentStreak={stats.streak?.current || 0}
            longestStreak={stats.streak?.longest || 0}
          />
        </div>

        {/* Badges */}
        <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm">
          <BadgeCollection earnedBadges={stats.badges || []} showLocked={true} />
        </div>
      </div>

      {/* Actions récentes */}
      {stats.recentActions && stats.recentActions.length > 0 && (
        <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm">
          <h3 className="text-lg font-bold text-black mb-6">Activités récentes</h3>
          <div className="space-y-3">
            {stats.recentActions.slice(0, 5).map((action, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">
                      Action validée
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {new Date(action.validated_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className="font-black text-[#10B981]">
                  +{action.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
