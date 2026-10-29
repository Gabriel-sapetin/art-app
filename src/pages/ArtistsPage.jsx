import { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { artists } from '../data/artists';
import './ArtistsPage.css';

export default function ArtistsPage() {
  const [headerRef, headerVisible] = useInView();
  const [timelineRef, timelineVisible] = useInView({ threshold: 0.05 });
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const sectionRef = useRef(null);

  const openMaster = (id) => {
    setSelectedArtistId(id);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeMaster = () => {
    setSelectedArtistId(null);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentIdx = artists.findIndex(a => a.id === selectedArtistId);
  const currentArtist = currentIdx !== -1 ? artists[currentIdx] : null;

  const handlePrevMaster = () => {
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : artists.length - 1;
    setSelectedArtistId(artists[prevIdx].id);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextMaster = () => {
    const nextIdx = currentIdx < artists.length - 1 ? currentIdx + 1 : 0;
    setSelectedArtistId(artists[nextIdx].id);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="artists" className="artists section" ref={sectionRef}>
      <div className="container">
        {/* Header with Parchment Paper Pad (Matching Sections of Western Art) */}
        <div ref={headerRef} className={`artists__header scroll-ease-in ${headerVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.04s' }}>
          <div className="artists__paper-pad">
            <img
              src="/assets/parchment-paper.avif"
              alt="Parchment manuscript folio"
              className="artists__paper-img"
              loading="lazy"
            />
            <div className="artists__paper-overlay" />
            <div className="artists__header-content">
              <h2 className="section-title">Meet the Masters</h2>
              <p className="section-subtitle">Seven artists who shaped the course of Western art</p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        {/* ── CASE 1: SOLE DEDICATED MASTER PAGE ── */}
        {currentArtist ? (
          <div className="artists__sole-page paper-card" key={currentArtist.id}>
            {/* Top Navigation Bar */}
            <div className="artists__sole-topbar">
              <button
                type="button"
                className="artists__sole-back-btn"
                onClick={closeMaster}
                aria-label="Return to all masters"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to All Masters</span>
              </button>

              {/* Master Switcher Pills */}
              <div className="artists__sole-switcher" role="tablist" aria-label="Switch artist folio">
                {artists.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    role="tab"
                    aria-selected={a.id === currentArtist.id}
                    className={`artists__sole-pill ${a.id === currentArtist.id ? 'active' : ''}`}
                    onClick={() => openMaster(a.id)}
                    title={`View ${a.name}`}
                  >
                    <img src={a.image} alt="" className="artists__sole-pill-img" />
                    <span className="artists__sole-pill-name">{a.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Stage: Left Description Dossier & Right Archival Specimen Plate */}
            <div className="artists__sole-stage">
              {/* LEFT COLUMN: Editorial Dossier */}
              <div className="artists__sole-left">
                <div className="artists__sole-meta-header">
                  <span className="plate-label">{currentArtist.period} · {currentArtist.nationality}</span>
                  <h3 className="artists__sole-title">{currentArtist.name}</h3>
                  <p className="artists__sole-fullname">{currentArtist.fullName}</p>
                  <div className="artists__sole-dates-badge">
                    <span className="annotation">Lifespan: {currentArtist.born} – {currentArtist.died}</span>
                  </div>
                </div>

                <div className="artists__sole-body">
                  <div className="artists__sole-section">
                    <h4 className="plate-label">Biography</h4>
                    <p className="artists__sole-paragraph">{currentArtist.bio}</p>
                  </div>

                  <div className="artists__sole-section">
                    <h4 className="plate-label">Artistic Contribution</h4>
                    <p className="artists__sole-paragraph">{currentArtist.contribution}</p>
                  </div>

                  <div className="artists__sole-section">
                    <h4 className="plate-label">Techniques &amp; Innovations</h4>
                    <p className="artists__sole-paragraph">{currentArtist.technique}</p>
                  </div>

                  <div className="artists__sole-section">
                    <h4 className="plate-label">Notable Masterpieces</h4>
                    <ul className="artists__sole-works-list">
                      {currentArtist.notableWorks.map((work, idx) => (
                        <li key={idx} className="artists__sole-work-item">
                          <span className="artists__sole-work-bullet">◆</span>
                          <span>{work}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Archival Museum Specimen Portrait Plate */}
              <div className="artists__sole-right">
                <div className="artists__sole-specimen-plate">
                  <div className="artists__sole-portrait-wrap">
                    <img
                      src={currentArtist.image}
                      alt={`Historical portrait of ${currentArtist.name}`}
                      className="artists__sole-portrait-img"
                      loading="lazy"
                    />
                    <div className="artists__sole-portrait-overlay" />
                    <span className="plate-label artists__sole-plate-tag">
                      Master Folio · Plate 0{currentIdx + 1}
                    </span>
                  </div>

                  <div className="artists__sole-placard">
                    <h4 className="artists__sole-placard-title">{currentArtist.name}</h4>
                    <p className="artists__sole-placard-subtitle">{currentArtist.fullName}</p>
                    <div className="artists__sole-placard-meta">
                      <div className="artists__sole-meta-row">
                        <span className="plate-label">Nationality</span>
                        <span>{currentArtist.nationality}</span>
                      </div>
                      <div className="artists__sole-meta-row">
                        <span className="plate-label">Movement</span>
                        <span>{currentArtist.period}</span>
                      </div>
                      <div className="artists__sole-meta-row">
                        <span className="plate-label">Born</span>
                        <span>{currentArtist.born}</span>
                      </div>
                      <div className="artists__sole-meta-row">
                        <span className="plate-label">Died</span>
                        <span>{currentArtist.died}</span>
                      </div>
                    </div>
                    <p className="museum-caption">Source Archive: Educational use / Historical Public Domain</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Prev / Next Navigation */}
            <div className="artists__sole-bottombar">
              <button
                type="button"
                className="artists__sole-nav-btn"
                onClick={handlePrevMaster}
                aria-label="Previous artist"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Previous Master</span>
              </button>

              <div className="artists__sole-counter plate-label">
                Master {currentIdx + 1} of {artists.length}
              </div>

              <button
                type="button"
                className="artists__sole-nav-btn artists__sole-nav-btn--next"
                onClick={handleNextMaster}
                aria-label="Next artist"
              >
                <span>Next Master</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* ── CASE 2: 2-COLUMN DIRECTORY GRID ── */
          <div ref={timelineRef} className="artists__timeline">
            {artists.map((artist, i) => (
              <article
                key={artist.id}
                className={`artists__entry paper-card scroll-ease-in ${timelineVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${0.08 * i}s` }}
                onClick={() => openMaster(artist.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openMaster(artist.id)}
                aria-label={`Open folio for ${artist.name}`}
              >
                <div className="artists__entry-header">
                  <div className="artists__entry-portrait">
                    <img src={artist.image} alt={`Portrait of ${artist.name}`} loading="lazy" />
                  </div>
                  <div className="artists__entry-summary">
                    <span className="plate-label">{artist.period} · {artist.born} to {artist.died}</span>
                    <h3>{artist.name}</h3>
                    <p className="artists__entry-fullname">{artist.fullName}</p>
                    <p className="artists__entry-preview">{artist.bio.substring(0, 140)}…</p>
                  </div>
                  <div className="artists__entry-action">
                    <span className="artists__entry-link">
                      View Master
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
