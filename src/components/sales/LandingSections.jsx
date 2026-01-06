import React from 'react';

export function Section({ children, className = '' }) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Heading({ level = 2, children, className = '' }) {
  const Tag = `h${level}`;
  const baseClasses = level === 1 
    ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900'
    : level === 2
    ? 'text-3xl md:text-4xl font-bold text-gray-900'
    : 'text-2xl font-bold text-gray-900';
  
  return <Tag className={`${baseClasses} ${className}`}>{children}</Tag>;
}

export function CTAButton({ primary = false, children, onClick, href, className = '' }) {
  const baseClasses = primary
    ? 'px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors'
    : 'px-8 py-4 bg-white text-black border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors';
  
  const button = (
    <button className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className} inline-block text-center`}>
        {children}
      </a>
    );
  }

  return button;
}








