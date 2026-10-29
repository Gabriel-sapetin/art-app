import { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import './ReflectionPage.css';

/* ── 7 member polaroids ── */
const members = [
  { name: 'Robert',   photo: '/assets/robert.jpg',   rotate: '-6deg', x: '1%',   y: '6px',   z: 2 },
  { name: 'Marian',   photo: '/assets/marian.jpg',   rotate: '4deg',  x: '14%',  y: '-14px', z: 4 },
  { name: 'Ruby',     photo: '/assets/ruby.jpg',     rotate: '-3deg', x: '27%',  y: '8px',   z: 3 },
  { name: 'Gab',      photo: '/assets/gab.jpg',      rotate: '6deg',  x: '40%',  y: '-10px', z: 5 },
  { name: 'Kerstine', photo: '/assets/kerstine.jpg', rotate: '-4deg', x: '53%',  y: '10px',  z: 3 },
  { name: 'Ann',      photo: '/assets/ann.jpg',      rotate: '5deg',  x: '66%',  y: '-12px', z: 4 },
  { name: 'Sam',      photo: '/assets/sam.jpg',      rotate: '-6deg', x: '79%',  y: '4px',   z: 2 },
];

export default function ReflectionPage() {
  const [headerRef, headerVisible] = useInView();
  const [galleryRef, galleryVisible] = useInView({ threshold: 0.05 });
  const [quoteInViewRef, quoteInViewVisible] = useInView({ threshold: 0.05 });
  const [showReflection, setShowReflection] = useState(false);
  const panelRef = useRef(null);
  const quoteRef = useRef(null);

  const handleOpenReflection = () => {
    setShowReflection(true);
    setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleCloseReflection = () => {
    setShowReflection(false);
    setTimeout(() => {
      if (quoteRef.current) {
        quoteRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
  };

  return (
    <section id="reflection" className="reflection section">
      <div className="container">

        {/* ── Parchment Paper Header ── */}
        <div ref={headerRef} className={`reflection__header scroll-ease-in ${headerVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.04s' }}>
          <div className="reflection__paper-pad">
            <img
              src="/assets/parchment-paper.avif"
              alt="Parchment manuscript folio"
              className="reflection__paper-img"
              loading="lazy"
            />
            <div className="reflection__paper-overlay" />
            <div className="reflection__header-content">
              <h2 className="section-title">Art Appreciation Reflection</h2>
              <p className="section-subtitle">A collective dialogue on memory, human expression, and historical continuity</p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        {/* ── Scattered Polaroid Gallery ── */}
        <div
          ref={galleryRef}
          className={`reflection__gallery scroll-ease-in ${galleryVisible ? 'visible' : ''}`}
          aria-label="Group 3 members"
        >
          <div className="reflection__gallery-stage">
            {members.map((m, i) => (
              <div
                key={i}
                className={`reflection__polaroid ${m.photo ? 'has-photo' : 'empty'}`}
                style={{
                  '--rot': m.rotate,
                  '--tx':  m.x,
                  '--ty':  m.y,
                  zIndex:  m.z,
                  animationDelay: `${0.08 * i}s`,
                }}
              >
                <div className="reflection__polaroid-photo">
                  {m.photo
                    ? <img src={m.photo} alt={m.name} loading="lazy" />
                    : <span className="reflection__polaroid-placeholder">&#43;</span>
                  }
                </div>
                <div className="reflection__polaroid-caption">
                  {m.name ?? <em>Coming soon</em>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Inline Quote (bare text, no box) ── */}
        <div
          ref={(node) => {
            quoteRef.current = node;
            if (typeof quoteInViewRef === 'function') {
              quoteInViewRef(node);
            } else if (quoteInViewRef) {
              quoteInViewRef.current = node;
            }
          }}
          className={`reflection__quote-inline scroll-ease-in ${quoteInViewVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.08s' }}
        >
          <blockquote className="reflection__quote">
            &ldquo;Art does not reproduce what we see; rather, it makes us see.&rdquo;
          </blockquote>
          <cite className="reflection__quote-author annotation">Paul Klee, <em>Creative Credo</em> (1920)</cite>
        </div>

        {/* ── View Reflection Button / Reflection Panel ── */}
        {!showReflection ? (
          <div className={`reflection__cta scroll-ease-in ${quoteInViewVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.18s' }}>
            <button
              className="reflection__view-btn"
              onClick={handleOpenReflection}
              aria-label="View the collective reflection essay"
            >
              <span>View Reflection</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="reflection__panel paper-card" ref={panelRef}>
            <button
              className="reflection__panel-back"
              onClick={handleCloseReflection}
              aria-label="Return to reflection overview"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <span className="plate-label reflection__panel-label">Group 3 &mdash; Collective Reflection</span>

            <h3 className="reflection__panel-title">What Art History Taught Us</h3>

            <p className="reflection__panel-p1">
              Studying Module 3 on Western Art History revealed that art has never been a passive chronicle of events, but an active testament to human consciousness. From the hand stencils of El Castillo cave, blown across mineral pigments 40,000 years ago, to the mathematical precision of Brunelleschi's dome and the luminous gold grounds of Cimabue's panel paintings, each work carries the fingerprints of a society struggling to make meaning. Technique, we discovered, always evolves in tandem with how people understand their place in the universe.
            </p>
            <p className="reflection__panel-p2">
              As a group, this module deepened our conviction that art appreciation is neither a luxury nor a dry academic exercise. It is the practice of looking carefully, asking questions, and recognizing our shared humanity across millennia. By building this interactive sketchbook, we did not simply summarize historical facts; we participated in the same creative dialogue that connects the prehistoric cave painters of Cantabria to the digital storytellers of today.
            </p>

            <div className="reflection__panel-footer">
              <span className="annotation">Art Appreciation &mdash; Midterm Project &mdash; Group 3</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
