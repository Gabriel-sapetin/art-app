import { useState, useRef, useCallback } from 'react';
import './BookCover.css';

export default function BookCover({ onOpen, isOpening = false }) {
  const coverRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, lightX: 50, lightY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth, subtle 3D parallax on mouse move (within natural physical limits)
  const handleMouseMove = useCallback((e) => {
    if (isOpening || !coverRef.current) return;
    const rect = coverRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    // Max tilt: 4 degrees X, 5 degrees Y for dignified, heavy leather book feel
    const tiltX = (relY - 0.5) * -7;
    const tiltY = (relX - 0.5) * 9;

    setTilt({
      x: tiltX,
      y: tiltY,
      lightX: Math.round(relX * 100),
      lightY: Math.round(relY * 100),
    });
    setIsHovered(true);
  }, [isOpening]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, lightX: 50, lightY: 50 });
    setIsHovered(false);
  }, []);

  return (
    <div className={`book-cover-stage${isOpening ? ' book-cover-stage--opening' : ''}`}>
      <div className="book-cover__cast-shadow" aria-hidden="true" />

      {/* Exposed parchment page edge with natural paper wind motion */}
      <div className="book-cover__page-deckle" aria-hidden="true">
        <span className="book-cover__paper-breeze" />
      </div>

      {/* Inner parchment leaves that flip in rapid cascade after the cover opens */}
      <div className="book-cover__inner-leaf book-cover__inner-leaf--4" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>
      <div className="book-cover__inner-leaf book-cover__inner-leaf--3" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>
      <div className="book-cover__inner-leaf book-cover__inner-leaf--2" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>
      <div className="book-cover__inner-leaf book-cover__inner-leaf--1" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>

      {/* The leather hardcover itself */}
      <div
        ref={coverRef}
        className={`book-cover${isHovered && !isOpening ? ' book-cover--hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isOpening
            ? undefined
            : `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        aria-hidden={isOpening ? 'true' : undefined}
      >
        <button
          type="button"
          className="book-cover__face book-cover__face--front"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Open the Book: Ochre & Ember, A Journey Through Western Art"
        >
          {/* Authentic antique leather book cover photograph */}
          <img
            src="/assets/book-cover.jpg"
            alt=""
            className="book-cover__bg"
            draggable="false"
          />

          {/* Dynamic ambient leather sheen (moves subtly with mouse position) */}
          <span
            className="book-cover__leather-sheen"
            style={{
              background: `radial-gradient(circle 280px at ${tilt.lightX}% ${tilt.lightY}%, rgba(255, 235, 185, 0.12), transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {/* Spine depth shadow overlay */}
          <span className="book-cover__shadow-overlay" aria-hidden="true" />

          {/* Gold-embossed debossed typography */}
          <span className="book-cover__content">
            <span className="book-cover__edition">Illustrated Art History</span>
            <span className="book-cover__title">OCHRE &amp; EMBER</span>
            <span className="book-cover__tagline">A Journey Through Western Art</span>
            <span className="book-cover__gold-rule" aria-hidden="true" />
            <span className="book-cover__topic">
              Prehistoric · Medieval · Renaissance · Classical
            </span>
            <span className="book-cover__academic-tag">Group 3 · Art Appreciation</span>
            <span className="book-cover__open-prompt">
              Open the Book
            </span>
          </span>
        </button>

        <span className="book-cover__inside" aria-hidden="true" />
      </div>
    </div>
  );
}
