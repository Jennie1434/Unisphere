import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function BadgesDisplay({ studentEmail, school = 'eugenia' }) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentEmail) {
      loadBadges();
    }
  }, [studentEmail]);

  const loadBadges = async () => {
    try {
      const response = await fetch(`${API_URL}/badges/student/${encodeURIComponent(studentEmail)}`);
      const data = await response.json();
      setBadges(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-eugenia-burgundy"></div>
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">🏆</div>
        <p>Aucun badge obtenu pour le moment</p>
        <p className="text-sm mt-2">Continuez à participer pour débloquer des badges !</p>
      </div>
    );
  }

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-300 to-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="bg-white rounded-none p-4 shadow-[4px_4px_0px_black] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#DBA12D] transition-all border-2 border-black group relative"
          title={`${badge.name} - ${badge.description || ''}`}
        >
          <div className={`text-4xl mb-3 text-center`}>
            {badge.emoji || '🏆'}
          </div>
          <div className="text-xs font-black text-black uppercase tracking-wider text-center line-clamp-2">
            {badge.name}
          </div>
          {badge.rarity !== 'common' && (
            <div className="absolute top-0 right-0">
              <span className={`text-[8px] px-1 py-0.5 font-black uppercase text-white border-l-2 border-b-2 border-black ${badge.rarity === 'legendary' ? 'bg-[#DBA12D]' :
                  badge.rarity === 'epic' ? 'bg-[#671324]' :
                    'bg-black'
                }`}>
                {badge.rarity}
              </span>
            </div>
          )}
          {badge.earned_at && (
            <div className="text-[9px] font-bold text-black/40 text-center mt-2 uppercase tracking-widest border-t-2 border-black/5 pt-2">
              {new Date(badge.earned_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}










