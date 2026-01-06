import React from 'react';

export default function Glass({ 
  children, 
  className = '',
  intensity = 'medium'
}) {
  const intensityClasses = {
    light: 'bg-white/20 backdrop-blur-md',
    medium: 'bg-white/30 backdrop-blur-lg',
    strong: 'bg-white/40 backdrop-blur-xl'
  };

  return (
    <div 
      className={`
        ${intensityClasses[intensity]}
        border border-white/20
        rounded-2xl
        shadow-lg
        ${className}
      `}
      style={{
        WebkitBackdropFilter: intensity === 'light' ? 'blur(12px)' : intensity === 'medium' ? 'blur(16px)' : 'blur(24px)',
      }}
    >
      {children}
    </div>
  );
}




