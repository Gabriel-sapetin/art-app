import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { artists } from '../data/artists';
import './ArtistsPage.css';

export default function ArtistsPage() {
  const [headerRef, headerVisible] = useInView();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="artists" className="artists section">
      <div className="container">
        <div ref={headerRef} className={`fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Meet the Masters</h2>
          <p className="section-subtitle">Seven artists who shaped the course of Western art</p>
          <div className="section-divider" />
        </div>

        <div className="artists__timeline">
          {artists.map((artist, i) => {
            const isExpanded = expandedId === artist.id;
            return (
              <article
                key={artist.id}
                className={`artists__entry paper-card ${isExpanded ? 'artists__entry--expanded' : ''}`}
              >
                <div className="artists__entry-header" onClick={() => toggleExpand(artist.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleExpand(artist.id)} aria-expanded={isExpanded}>
                  <div className="artists__entry-portrait">
                    <img src={artist.image} alt={`Portrait of ${artist.name}`} loading="lazy" />
                  </div>
                  <div className="artists__entry-summary">
                    <span className="plate-label">{artist.period} · {artist.born}–{artist.died}</span>
                    <h3>{artist.name}</h3>
                    <p className="artists__entry-fullname">{artist.fullName}</p>
                    <p className="artists__entry-preview">{artist.bio.substring(0, 150)}…</p>
                  </div>
                  <div className="artists__entry-toggle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="artists__entry-detail">
                    <div className="artists__detail-grid">
                      <div className="artists__detail-bio">
                        <h4>Biography</h4>
                        <p>{artist.bio}</p>

                        <h4>Artistic Contribution</h4>
                        <p>{artist.contribution}</p>

                        <h4>Techniques & Innovations</h4>
                        <p>{artist.technique}</p>
                      </div>
                      <div className="artists__detail-works">
                        <h4>Notable Works</h4>
                        <ul>
                          {artist.notableWorks.map((work, j) => (
                            <li key={j}>{work}</li>
                          ))}
                        </ul>
                        <div className="artists__detail-meta">
                          <p><strong>Nationality:</strong> {artist.nationality}</p>
                          <p><strong>Active Period:</strong> {artist.period}</p>
                          <p><strong>Born:</strong> {artist.born}</p>
                          <p><strong>Died:</strong> {artist.died}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
