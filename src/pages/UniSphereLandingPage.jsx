import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Preloader from '../components/shared/Preloader';
import UniSphereNavbar from '../components/sales/UniSphereNavbar';

// New Sections - Narrative Sequence
import EditorialHero from '../components/sales/sections/EditorialHero';
import VerticalManifestColumn from '../components/sales/sections/VerticalManifestColumn';
import NatureMagicSection from '../components/sales/sections/NatureMagicSection';
import FeatureGrid from '../components/sales/sections/FeatureGrid';
import AppMockups from '../components/sales/sections/AppMockups';
import AppExplainer from '../components/sales/sections/AppExplainer';
import StatsHighlight from '../components/sales/sections/StatsHighlight';
import ExpertiseList from '../components/sales/sections/ExpertiseList';
import CommunitySection from '../components/sales/sections/CommunitySection';
import CinematicFooter from '../components/sales/sections/CinematicFooter';

// Keeping only vital shared utils
import SectionFAQ from '../components/sales/SectionFAQ';

export default function UniSphereLandingPage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // Check if preloader has been shown before
    const hasVisited = sessionStorage.getItem('preloader-shown');
    if (hasVisited) {
      setShowPreloader(false);
      setPageReady(true);
    }
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setPageReady(true);
  };

  // Show preloader if needed
  if (showPreloader && !sessionStorage.getItem('preloader-shown')) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <UniSphereNavbar />

      {/* 1. Preloader (Handled above) */}

      {/* 2. Hero d'arrivée */}
      <EditorialHero />

      {/* 3. Grande colonne de texte vertical */}
      <VerticalManifestColumn />



      {/* 5. Section "inside lies nature's magic" */}
      <NatureMagicSection />

      {/* 6. Grille de features avec compteurs */}
      <FeatureGrid />

      {/* 7. Section application mobile (mockups) */}
      <div id="students">
        <AppMockups />
      </div>

      {/* 8. Texte explicatif app */}
      <AppExplainer />

      {/* 9. Section chiffres / data */}
      <StatsHighlight />

      {/* 10. Liste des expertises / métiers */}
      <ExpertiseList />

      {/* 11. Section communauté + témoignage */}
      <CommunitySection />

      {/* 12. Cinematic Footer */}
      <div id="faq">
        <SectionFAQ />
      </div>
      <CinematicFooter />
    </div>
  );
}
