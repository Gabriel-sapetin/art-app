import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ArtistsPage from './pages/ArtistsPage';
import ArtStudioPage from './pages/ArtStudioPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ReflectionPage from './pages/ReflectionPage';
import TeamPage from './pages/TeamPage';
import ReferencesPage from './pages/ReferencesPage';
import './App.css';

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(() => {
    // If user opens a direct section link like #explore, #artists, open directly
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash !== '#home' && window.location.hash !== '#') {
      return true;
    }
    return false;
  });
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBook = () => {
    if (isOpening || isBookOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsBookOpen(true);
      return;
    }
    setIsOpening(true);
    const openingDuration = 2200;
    setTimeout(() => {
      setIsBookOpen(true);
      setIsOpening(false);
    }, openingDuration);
  };

  const handleCloseToCover = () => {
    setIsBookOpen(false);
    setIsOpening(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Navigation: Only visible when book is opened */}
      {isBookOpen && <Navbar className="navbar--slide-in" />}

      {/* Main Educational Journey */}
      <main>
        {/* 1. Homepage & Hero (Handles Sole Book Cover or Opened Spread) */}
        <HomePage
          isBookOpen={isBookOpen}
          isOpening={isOpening}
          onOpenBook={handleOpenBook}
          onCloseToCover={handleCloseToCover}
        />

        {/* Subsequent Sections: Animated into view when book is opened */}
        {isBookOpen && (
          <div className="app__revealed-content">
            {/* 2. Explore Western Art History */}
            <ExplorePage />

            {/* 3. Artist Spotlight: Meet the Masters */}
            <ArtistsPage />

            {/* 4. Art Studio: experiment with historical techniques */}
            <ArtStudioPage />

            {/* 5. Interactive Zone: Play, Solve, and Learn */}
            <ActivitiesPage />

            {/* 5. Art Appreciation Reflection */}
            <ReflectionPage />

            {/* 6. Meet the Creators: Our Team & Instructor */}
            <TeamPage />

            {/* 8. References and Image Credits */}
            <ReferencesPage />

            {/* Editorial Footer */}
            <footer className="footer">
              <div className="container footer__inner">
                <div className="footer__col brand">
                  <div className="footer__logo">
                    <img src="/assets/logo-emblem.png" alt="Ochre & Ember Emblem" className="navbar__logo-img" />
                    <div>
                      <span className="footer__logo-title">Ochre & Ember</span>
                      <span className="footer__logo-sub annotation">A Journey Through Western Art</span>
                    </div>
                  </div>
                  <p className="footer__desc">
                    Developed for the Art Appreciation (GE-ART) Midterm Examination Project. Grounded in Module 3: The Western Art History, celebrating artistic expression across millennia.
                  </p>
                  <span className="plate-label footer__group">Group 3 Academic Project · October 2026</span>
                </div>

                <div className="footer__col">
                  <h4 className="plate-label">Historical Epochs</h4>
                  <ul className="footer__links">
                    <li><a href="#explore">Prehistoric Art & Cave Marks</a></li>
                    <li><a href="#explore">Stone Tools & Lithic Reduction</a></li>
                    <li><a href="#explore">Medieval Arts & Manuscripts</a></li>
                    <li><a href="#artists">Western Masters & Innovations</a></li>
                    <li><a href="#explore">Classical Greek Vessels & Paintings</a></li>
                  </ul>
                </div>

                <div className="footer__col">
                  <h4 className="plate-label">Interactive Modules</h4>
                  <ul className="footer__links">
                    <li><a href="#artists">Master Artists Spotlight</a></li>
                    <li><a href="#studio">Art Studio Techniques</a></li>
                    <li><a href="#activities">Art History Quiz (10 Items)</a></li>
                    <li><a href="#activities">Match Masters & Definitions</a></li>
                    <li><a href="#activities">Guess Mystery Specimen</a></li>
                  </ul>
                </div>

                <div className="footer__col">
                  <h4 className="plate-label">Curatorial Governance</h4>
                  <ul className="footer__links">
                    <li><a href="#reflection">Student Reflections</a></li>
                    <li><a href="#team">Meet Group 3 & Instructor</a></li>
                    <li><a href="#references">APA 7th Citations & Credits</a></li>
                    <li><button onClick={handleCloseToCover} className="footer__link-btn">Return to Book Cover</button></li>
                  </ul>
                </div>
              </div>

              <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                  <span className="annotation">
                    “Art does not reproduce the visible; rather, it makes visible.” (Paul Klee)
                  </span>
                  <span className="footer__copy">
                    © 2026 Group 3 · All educational materials aligned with CHED Art Appreciation Curriculum
                  </span>
                </div>
              </div>
            </footer>
          </div>
        )}
      </main>

      {/* Back to Top Button */}
      {showBackToTop && isBookOpen && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top of page"
          title="Return to folio top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
}
