import React from 'react';

/**
 * Logo Albert School
 * Cercle bleu avec cercle blanc qui se chevauche, suivi du texte ALBERTSCHOOL
 */
export default function AlbertLogo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Emblem: Modern geometric design */}
      <div className="relative flex items-center justify-center">
        {/* Main circle with gradient effect */}
        <div 
          className="w-14 h-14 md:w-16 md:h-16 rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
            boxShadow: '0 4px 16px rgba(30, 64, 175, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Inner highlight */}
          <div 
            className="absolute top-1 left-1 w-4 h-4 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              filter: 'blur(4px)'
            }}
          />
        </div>
        {/* Overlapping accent circle - positioned elegantly */}
        <div 
          className="absolute w-6 h-6 md:w-7 md:h-7 rounded-full -left-3 top-1 md:-left-3.5 md:top-1.5"
          style={{
            background: 'var(--color-text-primary)',
            boxShadow: '0 2px 8px rgba(11, 18, 32, 0.3), inset 0 1px 2px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    </div>
  );
}

