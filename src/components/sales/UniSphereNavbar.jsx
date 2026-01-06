import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Pill from '../ui/Pill';

export default function UniSphereNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -100 });
      } else {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const navItems = [
    { label: 'Universités', action: () => scrollToSection('universities') },
    { label: 'Étudiants', action: () => scrollToSection('students') },
    { label: 'FAQ', action: () => scrollToSection('faq') },
  ];

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
          border border-premium-border
          backdrop-blur-xl
          transition-all duration-500
          ${scrolled ? 'bg-white/90 shadow-sm border-black/5' : 'bg-white/40 border-black/5'}
        `}
        style={{
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
          boxShadow: scrolled ? '0 10px 30px rgba(20, 241, 149, 0.15)' : 'none'
        }}
      >
        <div className="relative flex h-[76px] items-center justify-between px-4 sm:px-6 gap-3">
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap text-black"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              UniSphere <span style={{ color: 'var(--eugenia-green)' }}>.</span>
            </Link>
          </div>

          {/* CENTER: Menu pills */}
          <nav
            className="
              absolute left-1/2 -translate-x-1/2
              hidden md:flex items-center gap-1
              px-2
            "
          >
            {navItems.map((item, index) => (
              <Pill
                key={item.label}
                onClick={item.action}
                index={index}
                className="text-black/60 hover:text-black transition-colors"
              >
                {item.label}
              </Pill>
            ))}
          </nav>

          {/* RIGHT: CTA */}
          <div className="flex-shrink-0 min-w-0">
            <Link
              to="/select-school"
              className="
                inline-flex items-center gap-2
                rounded-full px-6 py-3
                text-sm font-bold
                transition-all duration-300
                hover:scale-105 active:scale-95
              "
              style={{
                background: 'var(--eugenia-green)',
                color: '#000000',
                boxShadow: '0 0 20px rgba(20, 241, 149, 0.3)'
              }}
            >
              Connexion
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
