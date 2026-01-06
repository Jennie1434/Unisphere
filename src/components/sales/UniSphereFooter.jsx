import React from 'react';
import { Link } from 'react-router-dom';

export default function UniSphereFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-black/5 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <Link
              to="/"
              className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap text-black"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              UniSphere <span style={{ color: 'var(--eugenia-green)' }}>.</span>
            </Link>
            <p className="text-sm mt-1 text-gray-500">
              © {currentYear} UniSphere. Tous droits réservés.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm transition-colors text-black/40 hover:text-black"
            >
              Confidentialité
            </a>
            <a
              href="#"
              className="text-sm transition-colors text-black/40 hover:text-black"
            >
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
