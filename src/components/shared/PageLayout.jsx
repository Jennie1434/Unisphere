import Header from './AnimatedHeader';
import Footer from './Footer';

/**
 * Layout avec sidebar pour les pages étudiantes
 */
export default function PageLayout({ school = 'eugenia', minimalFooter = false, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5]">
      {/* Topbar Navigation */}
      <Header school={school} />

      {/* Contenu principal - Full Width */}
      <div className="flex-1 flex flex-col">
        {/* Contenu de la page */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        {/* Footer */}
        <Footer school={school} minimal={minimalFooter} />
      </div>
    </div>
  );
}

