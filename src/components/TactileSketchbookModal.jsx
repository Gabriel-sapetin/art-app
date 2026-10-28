import { useState, useEffect, useRef } from 'react';
import { artworks } from '../data/artworks';
import MagnifyingGlass from './MagnifyingGlass';
import './TactileSketchbookModal.css';

export default function TactileSketchbookModal({ isOpen, onClose, initialArtworkId = 1 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showLoupe, setShowLoupe] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [showIndex, setShowIndex] = useState(false);

  useEffect(() => {
    if (initialArtworkId) {
      const idx = artworks.findIndex(a => a.id === initialArtworkId);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [initialArtworkId, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const currentArtwork = artworks[currentIndex];

  const triggerFlip = (newIndex, direction) => {
    if (isFlipping) return;
    setFlipDirection(direction);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFlipping(false);
      setZoomLevel(1);
    }, 280);
  };

  const nextPage = () => {
    if (currentIndex < artworks.length - 1) {
      triggerFlip(currentIndex + 1, 'next');
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      triggerFlip(currentIndex - 1, 'prev');
    }
  };

  const jumpTo = (index) => {
    if (index === currentIndex) return;
    triggerFlip(index, index > currentIndex ? 'next' : 'prev');
    setShowIndex(false);
  };

  const handleZoomIn = () => setZoomLevel(z => Math.min(z + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel(z => Math.max(z - 0.3, 0.8));
  const handleZoomReset = () => setZoomLevel(1);

  return (
    <div className="sketchbook-modal__overlay" role="dialog" aria-modal="true" aria-label="Interactive Art History Sketchbook">
      <div className="sketchbook-modal__backdrop" onClick={onClose} />

      <div className="sketchbook-modal__container">
        {/* Top Control Bar */}
        <header className="sketchbook-modal__topbar">
          <div className="sketchbook-modal__brand">
            <span className="navbar__logo-icon">A</span>
            <div>
              <span className="sketchbook-modal__title">Atelier Occidental · Tactile Journal</span>
              <span className="sketchbook-modal__subtitle annotation">Archival Sketchbook & Curatorial Plates</span>
            </div>
          </div>

          <div className="sketchbook-modal__controls">
            {/* Zoom Controls */}
            <div className="sketchbook-modal__zoom-group">
              <button onClick={handleZoomOut} className="sketchbook-btn" aria-label="Zoom out artwork plate" title="Zoom Out">
                −
              </button>
              <span className="sketchbook-zoom-indicator">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleZoomIn} className="sketchbook-btn" aria-label="Zoom in artwork plate" title="Zoom In">
                +
              </button>
              <button onClick={handleZoomReset} className="sketchbook-btn sketchbook-btn--text" title="Reset Zoom">
                Reset
              </button>
            </div>

            {/* Magnifying Loupe Toggle */}
            <button 
              onClick={() => setShowLoupe(v => !v)} 
              className={`sketchbook-btn sketchbook-btn--pill ${showLoupe ? 'active' : ''}`}
              title="Toggle interactive magnifying loupe"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              {showLoupe ? 'Close Loupe' : 'Loupe Inspector'}
            </button>

            {/* Index Drawer Button */}
            <button 
              onClick={() => setShowIndex(v => !v)}
              className={`sketchbook-btn sketchbook-btn--pill ${showIndex ? 'active' : ''}`}
              title="Open editorial index of all 16 plates"
            >
              📖 Plate Index ({currentIndex + 1}/{artworks.length})
            </button>

            {/* Close Button */}
            <button onClick={onClose} className="sketchbook-modal__close-btn" aria-label="Close sketchbook journal">
              &times;
            </button>
          </div>
        </header>

        {/* The Two-Page Tactile Book Spread */}
        <main className={`sketchbook-book ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
          {/* Spine Binding Center Shadow */}
          <div className="sketchbook-spine" />
          <div className="sketchbook-ribbon" />

          {/* LEFT PAGE: Illustrated Artwork Plate */}
          <section className="sketchbook-page sketchbook-page--left">
            <div className="sketchbook-page__header">
              <span className="plate-label">Plate {currentArtwork.id} of {artworks.length}</span>
              <span className="sketchbook-page__period-tag">{currentArtwork.period}</span>
            </div>

            <div className="sketchbook-plate__canvas-wrap">
              {showLoupe ? (
                <MagnifyingGlass
                  src={currentArtwork.image}
                  alt={currentArtwork.title}
                  zoomLevel={2.6}
                />
              ) : (
                <div 
                  className="sketchbook-plate__image-container"
                  style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.25s ease' }}
                >
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    className="sketchbook-plate__img"
                  />
                  <div className="sketchbook-plate__emboss-stamp">
                    <span className="annotation">Archival Seal · Western History</span>
                  </div>
                </div>
              )}
            </div>

            <div className="sketchbook-page__footer">
              <span className="sketchbook-caption-handwritten annotation">
                “{currentArtwork.title}” · Curatorial specimen
              </span>
              <span className="sketchbook-page-num plate-label">Folio {currentArtwork.id * 2 - 1}</span>
            </div>
          </section>

          {/* RIGHT PAGE: Editorial Museum Notes & Annotations */}
          <section className="sketchbook-page sketchbook-page--right">
            <div className="sketchbook-page__header">
              <span className="plate-label">Historical Dossier</span>
              <span className="annotation sketchbook-handwritten-badge">Curator’s Desk</span>
            </div>

            <div className="sketchbook-editorial">
              <div className="sketchbook-editorial__heading">
                <span className="plate-label">{currentArtwork.period} Civilization</span>
                <h2 className="sketchbook-editorial__title">{currentArtwork.title}</h2>
                <p className="sketchbook-editorial__artist">{currentArtwork.artist}</p>
              </div>

              <div className="sketchbook-editorial__meta-table">
                <div className="sketchbook-meta-row">
                  <span className="plate-label">Historical Epoch:</span>
                  <span>{currentArtwork.date}</span>
                </div>
                <div className="sketchbook-meta-row">
                  <span className="plate-label">Medium & Method:</span>
                  <span>{currentArtwork.medium}</span>
                </div>
              </div>

              <div className="sketchbook-editorial__body">
                <h4 className="plate-label">Curatorial Commentary</h4>
                <p>{currentArtwork.description}</p>

                {currentArtwork.significance && (
                  <div className="sketchbook-editorial__note-box">
                    <span className="annotation sketchbook-note-title">Artistic & Cultural Significance:</span>
                    <p>{currentArtwork.significance}</p>
                  </div>
                )}
              </div>

              <div className="sketchbook-editorial__provenance">
                <p className="museum-caption">Source Archive: {currentArtwork.credit}</p>
              </div>
            </div>

            <div className="sketchbook-page__footer">
              <span className="plate-label">Module 3 · Group 3 Curation</span>
              <span className="sketchbook-page-num plate-label">Folio {currentArtwork.id * 2}</span>
            </div>
          </section>
        </main>

        {/* Bottom Turn Controls */}
        <footer className="sketchbook-modal__bottombar">
          <button 
            onClick={prevPage} 
            disabled={currentIndex === 0} 
            className="sketchbook-turn-btn prev"
            aria-label="Turn to previous sketchbook spread"
          >
            ← Previous Folio
          </button>

          <div className="sketchbook-scrubber">
            <span className="annotation">Browse Plates:</span>
            <div className="sketchbook-scrubber__dots">
              {artworks.map((art, idx) => (
                <button
                  key={art.id}
                  onClick={() => jumpTo(idx)}
                  className={`sketchbook-dot ${idx === currentIndex ? 'active' : ''}`}
                  title={`Plate ${art.id}: ${art.title}`}
                  aria-label={`Jump to Plate ${art.id}`}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={nextPage} 
            disabled={currentIndex === artworks.length - 1} 
            className="sketchbook-turn-btn next"
            aria-label="Turn to next sketchbook spread"
          >
            Next Folio →
          </button>
        </footer>

        {/* Editorial Index Drawer */}
        {showIndex && (
          <aside className="sketchbook-index-drawer" aria-label="Plate Index Drawer">
            <div className="sketchbook-index-drawer__header">
              <h3>Editorial Plate Index</h3>
              <button onClick={() => setShowIndex(false)} className="sketchbook-btn--close">&times;</button>
            </div>
            <p className="sketchbook-index-desc annotation">Select any illustrated folio to open directly:</p>

            <div className="sketchbook-index-list">
              {artworks.map((item, idx) => (
                <div 
                  key={item.id}
                  className={`sketchbook-index-item ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => jumpTo(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && jumpTo(idx)}
                >
                  <img src={item.image} alt={item.title} className="sketchbook-index-thumb" />
                  <div className="sketchbook-index-info">
                    <span className="plate-label">Plate {item.id} · {item.period}</span>
                    <h4>{item.title}</h4>
                    <span className="annotation">{item.artist} ({item.date})</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
