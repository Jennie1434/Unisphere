import { useEffect, useState } from 'react';
import { calculateLevel, getLevelColor, getLevelName } from '../../services/gamificationService';

export default function LevelProgress({ points, currentLevel, levelProgress, animated = true }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const levelInfo = calculateLevel(points || 0);
  const progress = levelProgress !== undefined ? levelProgress : levelInfo.progress;
  const level = currentLevel || levelInfo.level;
  const levelName = getLevelName(level);
  const levelColor = getLevelColor(level);

  useEffect(() => {
    if (animated) {
      // Animation de la barre de progression
      const duration = 1000;
      const steps = 60;
      const increment = progress / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= progress) {
          setDisplayProgress(progress);
          clearInterval(timer);
        } else {
          setDisplayProgress(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  // Calculate points within current level range
  const getLevelThresholds = (level) => {
    if (level === 1) return { min: 0, max: 50 };
    if (level === 2) return { min: 50, max: 150 };
    if (level === 3) return { min: 150, max: 300 };
    if (level === 4) return { min: 300, max: 500 };
    if (level === 5) return { min: 500, max: 750 };
    if (level === 6) return { min: 750, max: 1000 };
    return { min: 1000 + (level - 7) * 250, max: 1000 + (level - 6) * 250 };
  };

  const thresholds = getLevelThresholds(level);
  const pointsInCurrentLevel = Math.max(0, points - thresholds.min);
  const pointsNeededForLevel = thresholds.max - thresholds.min;
  const pointsNeededForNext = Math.max(0, thresholds.max - points);

  return (
    <div className="w-full">
      {/* Niveau et nom */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-lg font-bold text-white text-sm"
            style={{ backgroundColor: levelColor }}
          >
            Niveau {level}
          </div>
          <span className="text-gray-700 font-semibold">{levelName}</span>
        </div>
        <div className="text-sm text-gray-600 font-bold">
          {pointsInCurrentLevel} / {pointsNeededForLevel} pts
        </div>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${displayProgress}%`,
            backgroundColor: levelColor,
          }}
        >
          {/* Effet de brillance animé */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
            style={{
              animation: animated ? 'shimmer 2s infinite' : 'none'
            }}
          />
        </div>
      </div>

      {/* Points restants */}
      <div className="text-xs text-gray-500 text-right">
        {pointsNeededForNext > 0 ? (
          <span>{pointsNeededForNext} points pour le niveau {level + 1}</span>
        ) : (
          <span className="text-green-600 font-semibold">Niveau maximum atteint !</span>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

