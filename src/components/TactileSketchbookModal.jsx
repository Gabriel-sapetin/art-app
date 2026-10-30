import { useState, useEffect, useRef, useCallback } from 'react';
import { artworks } from '../data/artworks';
import MagnifyingGlass from './MagnifyingGlass';
import BookCover from './BookCover';
import './TactileSketchbookModal.css';

export default function TactileSketchbookModal({
  isOpen = true,
  onClose,
  onCloseToCover,
  initialArtworkId = 1,
  inline = false,
  showCover = false,
  isBookOpening = false,
  onOpenBook,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showLoupe, setShowLoupe] = useState(false);
  const [flip, setFlip] = useState(null);
  const [showIndex, setShowIndex] = useState(false);
  const [popupReady, setPopupReady] = useState(true);
  const [hasHoveredArtwork, setHasHoveredArtwork] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const editorialRef = useRef(null);
  const coverTouchStart = useRef(null);
  const prefetchedArtworkImages = useRef(new Map());

  useEffect(() => {
    if (initialArtworkId) {
      const idx = artworks.findIndex(a => a.id === initialArtworkId);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [initialArtworkId, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || inline) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inline, currentIndex]);

  useEffect(() => {
    if (editorialRef.current) editorialRef.current.scrollTop = 0;
  }, [currentIndex, flip]);

  useEffect(() => {
    setHasHoveredArtwork(false);
    const adjacentArtworks = [artworks[currentIndex - 1], artworks[currentIndex + 1]].filter(Boolean);
    const adjacentUrls = new Set(adjacentArtworks.map(artwork => artwork.image));
    for (const url of prefetchedArtworkImages.current.keys()) {
      if (!adjacentUrls.has(url)) prefetchedArtworkImages.current.delete(url);
    }
    adjacentArtworks.forEach(({ image: url }) => {
      if (prefetchedArtworkImages.current.has(url)) return;
      const image = new Image();
      image.decoding = 'async';
      image.src = url;
      prefetchedArtworkImages.current.set(url, image);
      if (image.decode) image.decode().catch(() => prefetchedArtworkImages.current.delete(url));
    });
  }, [currentIndex]);

  // Interactive 3D mouse parallax on the pop-up page
  const handleMouseMove = useCallback((e) => {
    if (showLoupe) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setTilt({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    setIsHovering(true);
    setHasHoveredArtwork(true);
  }, [showLoupe]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  if (!inline && !isOpen) return null;

  const currentArtwork = artworks[currentIndex];

  // When flipping forward ('next'), the right page is being lifted, so underneath it is
  // ALREADY the next page's editorial dossier (flip.to). The left page remains the current artwork
  // until the turning leaf covers it.
  // When flipping backward ('prev'), the left page is being lifted, so underneath it is
  // ALREADY the previous page's artwork (flip.to). The right page remains the current dossier.
  const leftPageArtwork = (flip && flip.direction === 'prev') ? flip.to : currentArtwork;
  const rightPageArtwork = (flip && flip.direction === 'next') ? flip.to : currentArtwork;

  const triggerFlip = (newIndex, direction) => {
    if (flip || newIndex < 0 || newIndex >= artworks.length) return;
    setFlip({
      direction,
      from: currentArtwork,
      to: artworks[newIndex],
      targetIndex: newIndex,
    });
  };

  const finishFlip = (event) => {
    if (event.target !== event.currentTarget || !flip) return;
    setCurrentIndex(flip.targetIndex);
    setZoomLevel(1);
    setFlip(null);
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

  // Re-trigger the pop-up unfolding animation
  const replayPopUp = () => {
    setPopupReady(false);
    setTimeout(() => setPopupReady(true), 50);
  };

  // Period-specific badges
  const periodDecorations = {
    'Prehistoric': { icon: '🪨', motif: 'Paleolithic Art' },
    'Medieval': { icon: '⛪', motif: 'Gothic & Byzantine' },
    'Classical Greek': { icon: '🏛️', motif: 'Hellenic Era' },
  };

  const deco = periodDecorations[leftPageArtwork.period] || periodDecorations['Prehistoric'];

  const handleCoverWheel = (event) => {
    if (showCover && !isBookOpening && Math.abs(event.deltaY) > 12) onOpenBook?.();
  };

  const handleCoverTouchStart = (event) => {
    const touch = event.touches[0];
    coverTouchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleCoverTouchEnd = (event) => {
    if (!showCover || isBookOpening || !coverTouchStart.current) return;
    const touch = event.changedTouches[0];
    const moved = Math.abs(touch.clientY - coverTouchStart.current.y) + Math.abs(touch.clientX - coverTouchStart.current.x);
    coverTouchStart.current = null;
    if (moved > 28) onOpenBook?.();
  };

  // Calculate dynamic 3D tilt style
  const stageRotationStyle = {
    transform: isHovering && popupReady && !showLoupe
      ? `perspective(1200px) rotateX(${7 - tilt.y * 10}deg) rotateY(${tilt.x * 12}deg)`
      : `perspective(1200px) rotateX(7deg) rotateY(0deg)`,
    transition: isHovering ? 'transform 0.12s ease-out' : 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  return (
    <div
      className={`sketchbook-modal__overlay${inline ? ' sketchbook-modal__overlay--inline sketchbook-modal__overlay--homepage' : ''}${showCover ? ' sketchbook-modal__overlay--cover-state' : ''}${isBookOpening ? ' sketchbook-modal__overlay--cover-opening' : ''}`}
      role={inline ? 'region' : 'dialog'}
      aria-modal={inline ? undefined : 'true'}
      aria-label="Interactive Art History Sketchbook"
    >
      {!inline && <div className="sketchbook-modal__backdrop" onClick={onClose} />}

      <div className="sketchbook-modal__container">
        {!inline && <header className="sketchbook-modal__topbar">
          <div className="sketchbook-modal__brand">
            <img src="/assets/logo-emblem.png" alt="Ochre & Ember" className="navbar__logo-img" style={{ width: 32, height: 32, objectFit: 'contain' }} />
            <div>
              <span className="sketchbook-modal__title">Ochre & Ember · Pop-Up Sketchbook</span>
              <span className="sketchbook-modal__subtitle annotation">Tactile Art Journal &amp; Curatorial Folios</span>
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

            {/* Replay Pop-up Unfold */}
            <button
              onClick={replayPopUp}
              className="sketchbook-btn sketchbook-btn--pill"
              title="Watch the 3D pop-up book unfold again"
            >
              📖 Pop-Up
            </button>

            {/* Magnifying Loupe Toggle */}
            <button
              onClick={() => setShowLoupe(v => !v)}
              className={`sketchbook-btn sketchbook-btn--pill ${showLoupe ? 'active' : ''}`}
              title="Toggle interactive magnifying loupe"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              {showLoupe ? 'Close Loupe' : 'Loupe Inspector'}
            </button>

            {/* Index Drawer Button */}
            <button
              onClick={() => setShowIndex(v => !v)}
              className={`sketchbook-btn sketchbook-btn--pill ${showIndex ? 'active' : ''}`}
              title="Open editorial index of all 16 plates"
            >
              📑 Index ({currentIndex + 1}/{artworks.length})
            </button>

            {/* Return to Front Cover Button if inline */}
            {inline && onCloseToCover && (
              <button
                onClick={onCloseToCover}
                className="sketchbook-btn sketchbook-btn--pill sketchbook-btn--cover"
                title="Close book and return to front cover"
              >
                📕 Cover
              </button>
            )}

            {/* Close Button */}
            {!inline && (
              <button onClick={onClose} className="sketchbook-modal__close-btn" aria-label="Close sketchbook journal">
                &times;
              </button>
            )}
          </div>
        </header>}

        {/* The Two-Page Tactile Book Spread */}
        <main
          className="sketchbook-book"
          onWheel={showCover ? handleCoverWheel : undefined}
          onTouchStart={showCover ? handleCoverTouchStart : undefined}
          onTouchEnd={showCover ? handleCoverTouchEnd : undefined}
        >
          {/* Spine Binding Center Shadow */}
          <div className="sketchbook-spine" />

          {/* LEFT PAGE: 3D Pop-Up Book Artwork Spread */}
          <section
            className="sketchbook-page sketchbook-page--left"
          >
            <div className="sketchbook-plate__canvas-wrap">
              {showLoupe ? (
                <MagnifyingGlass
                  src={leftPageArtwork.image}
                  alt={leftPageArtwork.title}
                  zoomLevel={2.6}
                />
              ) : (
                <div 
                  className={`popup-book__stage ${popupReady ? 'popup-book__stage--open' : ''}`}
                  style={stageRotationStyle}
                >
                  {/* Cast shadow spreading on the paper page below */}
                  <div className="popup-book__shadow" />

                  {/* Decorative Architectural/Archival Base Mount */}
                  <div className="popup-book__layer popup-book__layer--mount">
                    <div className="popup-book__back-panel">
                      <div className="popup-book__back-ornament popup-book__back-ornament--tl" />
                      <div className="popup-book__back-ornament popup-book__back-ornament--tr" />
                      <div className="popup-book__back-ornament popup-book__back-ornament--bl" />
                      <div className="popup-book__back-ornament popup-book__back-ornament--br" />
                    </div>
                  </div>

                  {/* Origami / Paper Engineering V-fold Hinges that mechanically hold the plate */}
                  <div className="popup-book__struts" aria-hidden="true">
                    <div className="popup-book__strut popup-book__strut--left" />
                    <div className="popup-book__strut popup-book__strut--right" />
                  </div>

                  {/* The Primary Artwork Plate Specimen (pops upright in 3D) */}
                  <div
                    className="popup-book__main-image"
                    style={{ transform: `scale(${zoomLevel})` }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="popup-book__plate-frame">
                      {/* Photo corners (antique album style) */}
                      <span className="popup-book__corner popup-book__corner--tl" />
                      <span className="popup-book__corner popup-book__corner--tr" />
                      <span className="popup-book__corner popup-book__corner--bl" />
                      <span className="popup-book__corner popup-book__corner--br" />

                      <img
                        src={leftPageArtwork.image}
                        alt={leftPageArtwork.title}
                        className="popup-book__img"
                      />
                    </div>

                    {/* Paper tabs holding the plate */}
                    <div className="popup-book__tab popup-book__tab--left" />
                    <div className="popup-book__tab popup-book__tab--right" />

                    {!hasHoveredArtwork && popupReady && !showLoupe && (
                      <div className="popup-book__cursor-cue">
                        <span>Move your cursor here to feel the artwork</span>
                        <span className="popup-book__cursor-arrow" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  {/* Pop-Up Curatorial Cutout Flaps */}
                  <div className="popup-book__flap popup-book__flap--left">
                    <span className="popup-book__flap-icon">{deco.icon}</span>
                    <span className="popup-book__flap-label annotation">{deco.motif}</span>
                  </div>

                  <div className="popup-book__flap popup-book__flap--right">
                    <span className="popup-book__flap-label annotation">{leftPageArtwork.date.slice(0, 16)}</span>
                  </div>

                  {/* Archival Embossed Seal Stamp */}
                  <div className="popup-book__stamp">
                    <span className="annotation">Archival Seal · Western History</span>
                  </div>
                </div>
              )}
            </div>

            <div className="sketchbook-page__footer">
              <span className="sketchbook-page-num plate-label">Folio {leftPageArtwork.id * 2 - 1}</span>
            </div>
          </section>

          {/* RIGHT PAGE: Editorial Museum Notes & Annotations */}
          <section className="sketchbook-page sketchbook-page--right">
            <div className="sketchbook-page__header">
              <span className="plate-label">Historical Dossier</span>
              <span className="annotation sketchbook-handwritten-badge">Curator's Desk</span>
            </div>

            <div className="sketchbook-editorial" ref={editorialRef}>
              <div className="sketchbook-editorial__heading">
                <span className="plate-label">{rightPageArtwork.period} Civilization</span>
                <h2 className="sketchbook-editorial__title">{rightPageArtwork.title}</h2>
                <p className="sketchbook-editorial__artist">{rightPageArtwork.artist}</p>
              </div>

              <div className="sketchbook-editorial__body">
                <h4 className="plate-label">Curatorial Commentary</h4>
                <p>
                  {rightPageArtwork.description}{' '}
                  <span className="sketchbook-editorial__inline-facts">
                    ({rightPageArtwork.date}; {rightPageArtwork.medium})
                  </span>
                  {rightPageArtwork.significance && <> {rightPageArtwork.significance}</>}
                </p>
              </div>

              <div className="sketchbook-editorial__provenance">
                <p className="museum-caption">Source Archive: {rightPageArtwork.credit}</p>
              </div>
            </div>

            <div className="sketchbook-page__footer">
              <span className="sketchbook-page-num plate-label">Folio {rightPageArtwork.id * 2}</span>
            </div>
          </section>

          {flip && (
            <div
              key={`${flip.direction}-${flip.from.id}-${flip.to.id}`}
              className={`sketchbook-turn-leaf sketchbook-turn-leaf--${flip.direction}`}
              onAnimationEnd={finishFlip}
              aria-hidden="true"
            >
              <div className="sketchbook-turn-leaf__slice">
                {flip.direction === 'next' ? (
                  <>
                    {/* NEXT: Front face shows old right page (Dossier) lifting away */}
                    <div className="sketchbook-turn-leaf__face sketchbook-turn-leaf__face--front">
                      <span className="plate-label">Historical Dossier</span>
                      <h3>{flip.from.title}</h3>
                      <p>{flip.from.artist}</p>
                      <div className="sketchbook-turn-leaf__rule" />
                      <span className="annotation">Ochre &amp; Ember · Folio {flip.from.id * 2}</span>
                    </div>
                    {/* NEXT: Back face shows new left page (Artwork) landing on the left */}
                    <div className="sketchbook-turn-leaf__face sketchbook-turn-leaf__face--back">
                      <img src={flip.to.image} alt="" />
                      <span className="plate-label">Plate {flip.to.id} · {flip.to.period}</span>
                      <h3>{flip.to.title}</h3>
                      <span className="annotation">{flip.to.date}</span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* PREV: Front face shows old left page (Artwork) lifting away */}
                    <div className="sketchbook-turn-leaf__face sketchbook-turn-leaf__face--front">
                      <img src={flip.from.image} alt="" />
                      <span className="plate-label">Plate {flip.from.id} · {flip.from.period}</span>
                      <h3>{flip.from.title}</h3>
                      <span className="annotation">{flip.from.date}</span>
                    </div>
                    {/* PREV: Back face shows new right page (Dossier) landing on the right */}
                    <div className="sketchbook-turn-leaf__face sketchbook-turn-leaf__face--back">
                      <span className="plate-label">Historical Dossier</span>
                      <h3>{flip.to.title}</h3>
                      <p>{flip.to.artist}</p>
                      <div className="sketchbook-turn-leaf__rule" />
                      <span className="annotation">Ochre &amp; Ember · Folio {flip.to.id * 2}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {showCover && <BookCover onOpen={onOpenBook} isOpening={isBookOpening} />}
        </main>

        {/* Bottom Turn Controls */}
        <footer className="sketchbook-modal__bottombar">
          <button
            onClick={prevPage}
            disabled={currentIndex === 0}
            className="sketchbook-turn-btn prev"
            aria-label="Turn to previous page"
          >
            ← Back
          </button>

          <div className="sketchbook-scrubber" aria-label="Page navigation dots">
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
            aria-label="Turn to next page"
          >
            Next →
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
