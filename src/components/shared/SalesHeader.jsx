import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SalesHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 z-50 w-full px-4 sm:px-6 pt-4"
    >
      <div
        className={`
          mx-auto max-w-7xl
          rounded-full
          border border-[var(--color-border)]
          backdrop-blur-xl
          shadow-sm
          transition-all duration-500
          ${scrolled ? 'shadow-md bg-white/60' : 'bg-white/40'}
        `}
        style={{
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
          boxShadow: scrolled ? '0 10px 30px rgba(20, 241, 149, 0.15)' : '0 4px 12px rgba(20, 241, 149, 0.05)'
        }}
      >
        <div className="relative flex h-[76px] items-center justify-center px-4 sm:px-6">
          {/* CENTER: Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-semibold text-[var(--color-text-primary)] tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap editorial-heading"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              UniSphere
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
