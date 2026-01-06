import { useState, useEffect } from 'react';
import { getAllBadges, getBadgeInfo, calculateEarnedBadges } from '../../services/gamificationService';

const API_URL = import.meta.env.VITE_API_URL;

export default function BadgesDisplay({ studentEmail, school = 'eugenia', student }) {
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const allBadgesIds = getAllBadges();

  useEffect(() => {
    loadBadges();
  }, [studentEmail, student]);

  const loadBadges = async () => {
    try {
      setLoading(true);
      let loadedEarned = [];

      // 1. Try API first
      if (studentEmail) {
        try {
          const response = await fetch(`${API_URL}/badges/student/${encodeURIComponent(studentEmail)}`);
          if (response.ok) {
            const data = await response.json();
            const badgesData = Array.isArray(data) ? data : (data.data || []);
            // Map full badge objects to just IDs for comparison
            loadedEarned = badgesData.map(b => b.id);
          }
        } catch (err) {
          // Silent fail on API
        }
      }

      // 2. Fallback: Calculate locally if API empty and student data available
      if (loadedEarned.length === 0 && student) {
        loadedEarned = calculateEarnedBadges(student);
      }

      setEarnedBadges(loadedEarned);
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (badgeId) => {
    // Simple mock rarity based on ID for visual flair
    if (badgeId.includes('champion') || badgeId.includes('level_10')) return 'from-yellow-400 via-orange-500 to-red-500'; // Legendary
    if (badgeId.includes('top_') || badgeId.includes('streak_30')) return 'from-purple-400 to-pink-500'; // Epic
    return 'from-blue-400 to-cyan-500'; // Rare/Common
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {allBadgesIds.map((badgeId) => {
          const badge = getBadgeInfo(badgeId);
          const isEarned = earnedBadges.includes(badgeId);

          return (
            <div
              key={badgeId}
              className={`relative group bg-white rounded-xl p-4 border-2 transition-all duration-300 ${isEarned
                  ? 'border-black hover:shadow-[8px_8px_0px_#DBA12D] hover:-translate-y-1'
                  : 'border-gray-100 opacity-60 grayscale hover:opacity-100 hover:grayscale-0'
                }`}
              title={badge.description}
            >
              {/* Icon */}
              <div className={`text-4xl mb-4 text-center transform transition-transform group-hover:scale-110 ${isEarned ? '' : 'opacity-50'}`}>
                {badge.icon || '🏆'}
              </div>

              {/* Name */}
              <div className={`text-[10px] font-black uppercase tracking-wider text-center line-clamp-2 leading-tight ${isEarned ? 'text-black' : 'text-gray-400'}`}>
                {badge.name}
              </div>

              {/* Locked Overlay Icon */}
              {!isEarned && (
                <div className="absolute top-2 right-2 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              )}

              {/* Checkmark if earned */}
              {isEarned && (
                <div className="absolute top-2 right-2 text-[#10B981]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 flex items-center justify-between gap-4 px-1">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden border border-black/5">
          <div
            className="h-full bg-black transition-all duration-1000 ease-out"
            style={{ width: `${(earnedBadges.length / allBadgesIds.length) * 100}%` }}
          />
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-black/50">
          {earnedBadges.length} / {allBadgesIds.length} DÉBLOQUÉS
        </div>
      </div>
    </div>
  );
}










