import { Link } from 'react-router-dom';
import { useSchoolTheme } from '../../hooks/useSchoolTheme';
import EugeniaLogo from './EugeniaLogo';
import AlbertLogo from './AlbertLogo';

export default function Footer({ school = 'eugenia', minimal = false }) {
  const currentYear = new Date().getFullYear();
  const theme = useSchoolTheme(school);
  const schoolPath = school === 'eugenia' ? '/eugenia-school' : '/albert-school';
  const Logo = school === 'eugenia' ? EugeniaLogo : AlbertLogo;
  const isEugenia = school === 'eugenia';

  // Eugenia: Bordeaux Background (#671324), White Text, Gold Accents
  const footerBg = isEugenia ? 'bg-[#671324] border-t border-white/10' : 'bg-black/40 backdrop-blur-lg border-t border-white/10';
  const titleColor = isEugenia ? 'text-white' : 'text-white';
  const textColor = isEugenia ? 'text-white/80' : 'text-white/80';
  const subTextColor = isEugenia ? 'text-white/60' : 'text-white/60';
  const hoverColor = isEugenia ? 'hover:text-[#DBA12D]' : 'hover:text-yellow-300';
  const iconColor = isEugenia ? 'text-white/70 hover:text-[#DBA12D]' : 'text-white/70 hover:text-eugenia-yellow';

  if (minimal) {
    return (
      <footer className="py-8 px-4 border-t border-black/5 mt-auto bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-black/40">
          <p>© {currentYear} {school === 'eugenia' ? 'Eugenia' : 'Albert'} School — Tous droits réservés</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-black transition-colors">Mentions</Link>
            <Link to="/" className="hover:text-black transition-colors">Confidentialité</Link>
            <Link to="/" className="hover:text-black transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`${footerBg} mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Section Logo & Description */}
          <div className="text-center md:text-left">
            <Link to={schoolPath} className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
            <p className={`${textColor} text-sm mb-4`}>
              Le challenge gamifié du campus Eugenia School.
              Gagnez des points, montez dans le classement et remportez des récompenses !
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://www.eugenia-school.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconColor} transition-colors`}
                aria-label="Site web Eugenia School"
              >
                🌐
              </a>
              <a
                href="https://www.linkedin.com/school/eugenia-school"
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconColor} transition-colors`}
                aria-label="LinkedIn Eugenia School"
              >
                💼
              </a>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="text-center md:text-left">
            <h3 className={`${titleColor} font-bold text-lg mb-4`}>Navigation</h3>
            <nav className="flex flex-col gap-3">
              <Link
                to={`${schoolPath}/leaderboard`}
                className={`${textColor} ${hoverColor} transition-colors text-sm`}
                style={{ '--hover-color': theme.accent }}
              >
                📊 Classement
              </Link>
              <Link
                to={`${schoolPath}/submit`}
                className={`${textColor} ${hoverColor} transition-colors text-sm`}
                style={{ '--hover-color': theme.accent }}
              >
                ➕ Soumettre une action
              </Link>
            </nav>
          </div>

          {/* Section Informations */}
          <div className="text-center md:text-left">
            <h3 className={`${titleColor} font-bold text-lg mb-4`}>Informations</h3>
            <div className={`flex flex-col gap-3 text-sm ${textColor}`}>
              <div>
                <span className="font-semibold">📧 Contact:</span>
                <a
                  href="mailto:challenge@eugenia-school.com"
                  className={`block ${hoverColor} transition-colors`}
                >
                  challenge@eugenia-school.com
                </a>
              </div>
              <div>
                <span className="font-semibold">🏫 Campus:</span>
                <p>Eugenia School</p>
              </div>
              <div>
                <span className="font-semibold">📅 Challenge:</span>
                <p>2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t pt-6 ${isEugenia ? 'border-[#671324]/10' : 'border-white/10'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${subTextColor} text-sm text-center md:text-left`}>
              © {currentYear} Eugenia School. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/"
                className={`${subTextColor} ${hoverColor} transition-colors`}
              >
                Mentions légales
              </Link>
              <Link
                to="/"
                className={`${subTextColor} ${hoverColor} transition-colors`}
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
