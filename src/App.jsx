import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import GalleryPage from './pages/GalleryPage';
import ArtistsPage from './pages/ArtistsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ReflectionPage from './pages/ReflectionPage';
import TeamPage from './pages/TeamPage';
import CommentsSection from './pages/CommentsSection';
import ReferencesPage from './pages/ReferencesPage';
import TactileSketchbookModal from './components/TactileSketchbookModal';
import './App.css';

export default function App() {
  const [sketchbookOpen, setSketchbookOpen] = useState(false);
  const [activeArtworkId, setActiveArtworkId] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openJournalAt = (id = 1) => {
    setActiveArtworkId(id);
    setSketchbookOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Navigation */}
      <Navbar />

      {/* Floating Tactile Sketchbook Quick Button */}
      <aside className="sketchbook-floating-pill-wrap" aria-label="Quick launch sketchbook">
        <button
          onClick={() => openJournalAt(1)}
          className="sketchbook-floating-pill"
          title="Open the interactive tactile sketchbook journal"
        >
          <span className="sketchbook-floating-pill__icon">📖</span>
          <span className="sketchbook-floating-pill__label">Open Sketchbook</span>
        </button>
      </aside>

      {/* Main Educational Journey */}
      <main>
        {/* 1. Homepage & Hero */}
        <HomePage />

        {/* Tactile Sketchbook Feature Banner */}
        <section className="sketchbook-banner-strip">
          <div className="container sketchbook-banner-strip__inner">
            <div className="sketchbook-banner-strip__text">
              <span className="plate-label">Interactive Experience</span>
              <h3>Open the Two-Page Tactile Journal</h3>
              <p>
                Browse our curated collection of illustrated plates in a bound sketchbook format with paper textures, page flips, and a movable curatorial loupe.
              </p>
            </div>
            <button 
              onClick={() => openJournalAt(1)} 
              className="activity__btn sketchbook-banner-strip__btn"
            >
              📖 Open Bound Folio
            </button>
          </div>
        </section>

        {/* 2. Explore Western Art History */}
        <ExplorePage />

        {/* 3. Interactive Art Gallery — The Art Plates */}
        <GalleryPage />

        {/* 4. Artist Spotlight — Meet the Masters */}
        <ArtistsPage />

        {/* 5. Interactive Zone — Play, Solve, and Learn */}
        <ActivitiesPage />

        {/* 6. Art Appreciation Reflection */}
        <ReflectionPage />

        {/* 7. Visitor Comments and Feedback */}
        <CommentsSection />

        {/* 8. Meet the Creators — Our Team & Instructor */}
        <TeamPage />

        {/* 9. References and Image Credits */}
        <ReferencesPage />
      </main>

      {/* Tactile Sketchbook Modal (Inspired by ThreeUI) */}
      <TactileSketchbookModal
        isOpen={sketchbookOpen}
        onClose={() => setSketchbookOpen(false)}
        initialArtworkId={activeArtworkId}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
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

      {/* Editorial Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__col brand">
            <div className="footer__logo">
              <span className="navbar__logo-icon">A</span>
              <div>
                <span className="footer__logo-title">Atelier Occidental</span>
                <span className="footer__logo-sub annotation">An Interactive Western Art History Sketchbook</span>
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
              <li><a href="#gallery">Illustrated Art Plates</a></li>
              <li><a href="#activities">Art History Quiz (10 Items)</a></li>
              <li><a href="#activities">Match Masters & Definitions</a></li>
              <li><a href="#activities">Guess Mystery Specimen</a></li>
              <li><a href="#comments">Visitor Inscription Guestbook</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="plate-label">Curatorial Governance</h4>
            <ul className="footer__links">
              <li><a href="#reflection">Student Reflections</a></li>
              <li><a href="#team">Meet Group 3 & Instructor</a></li>
              <li><a href="#references">APA 7th Citations & Credits</a></li>
              <li><a href="#home">Back to Folio Cover</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <span className="annotation">
              “Art does not reproduce the visible; rather, it makes visible.” — Paul Klee
            </span>
            <span className="footer__copy">
              © 2026 Group 3 · All educational materials aligned with CHED Art Appreciation Curriculum
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
