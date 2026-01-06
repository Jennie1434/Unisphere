import React from 'react';

/**
 * Logo Eugenia School
 * Cercle doré avec cercle burgundy qui se chevauche, suivi du texte EUGENIASCHOOL
 */
export default function EugeniaLogo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Emblem: Modern geometric design */}
      <div className="relative flex items-center justify-center">
        {/* Main circle with gradient effect */}
        <div
          className="w-14 h-14 md:w-16 md:h-16 rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #671324 0%, #450d18 100%)',
            boxShadow: '0 4px 16px rgba(103, 19, 36, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
        {/* Overlapping accent circle - Gold for Eugenia Brand */}
        <div
          className="absolute w-6 h-6 md:w-7 md:h-7 rounded-full -left-3 top-1 md:-left-3.5 md:top-1.5"
          style={{
            background: 'linear-gradient(135deg, #DBA12D 0%, #F4C430 100%)',
            boxShadow: '0 2px 8px rgba(219, 161, 45, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.4)'
          }}
        />
      </div>
    </div>
  );
}

