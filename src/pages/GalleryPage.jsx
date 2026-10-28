import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { artworks } from '../data/artworks';
import MagnifyingGlass from '../components/MagnifyingGlass';
import './GalleryPage.css';

const periodFilters = ['All', 'Prehistoric', 'Medieval', 'Classical Greek'];

export default function GalleryPage() {
  const [headerRef, headerVisible] = useInView();
  const [activePeriod, setActivePeriod] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 6;

  const filtered = activePeriod === 'All'
    ? artworks
    : artworks.filter(a => a.period === activePeriod);

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice(currentPage * perPage, (currentPage + 1) * perPage);

  const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setCurrentPage(p => Math.max(p - 1, 0));

  const handleFilterChange = (period) => {
    setActivePeriod(period);
    setCurrentPage(0);
  };

  const openDetail = (artwork) => setSelectedArtwork(artwork);
  const closeDetail = () => setSelectedArtwork(null);

  const navigateArtwork = (dir) => {
    if (!selectedArtwork) return;
    const idx = filtered.findIndex(a => a.id === selectedArtwork.id);
    const next = idx + dir;
    if (next >= 0 && next < filtered.length) {
      setSelectedArtwork(filtered[next]);
    }
  };

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div ref={headerRef} className={`fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">The Art Plates</h2>
          <p className="section-subtitle">A curated collection of illustrated plates from the history of Western art</p>
          <div className="section-divider" />
        </div>

        {/* Index / Filters */}
        <div className="gallery__index">
          <span className="gallery__index-label plate-label">Editorial Index</span>
          <div className="gallery__filters">
            {periodFilters.map(p => (
              <button
                key={p}
                className={`gallery__filter ${activePeriod === p ? 'gallery__filter--active' : ''}`}
                onClick={() => handleFilterChange(p)}
              >
                {p}
                <span className="gallery__filter-count">
                  {p === 'All' ? artworks.length : artworks.filter(a => a.period === p).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery__grid">
          {displayed.map((artwork, i) => (
            <article
              key={artwork.id}
              className="gallery__plate paper-card"
              onClick={() => openDetail(artwork)}
              onKeyDown={(e) => e.key === 'Enter' && openDetail(artwork)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${artwork.title}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="gallery__plate-img">
                <img src={artwork.image} alt={artwork.title} loading="lazy" />
                <span className="plate-label gallery__plate-number">Plate {artwork.id}</span>
              </div>
              <div className="gallery__plate-info">
                <h3 className="gallery__plate-title">{artwork.title}</h3>
                <p className="gallery__plate-artist">{artwork.artist}</p>
                <p className="gallery__plate-date">{artwork.date}</p>
                <span className="gallery__plate-period">{artwork.period}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Page Navigation */}
        {totalPages > 1 && (
          <div className="gallery__pagination">
            <button onClick={goPrev} disabled={currentPage === 0} className="gallery__page-btn" aria-label="Previous page">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <span className="gallery__page-info annotation">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button onClick={goNext} disabled={currentPage === totalPages - 1} className="gallery__page-btn" aria-label="Next page">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedArtwork && (
        <div className="gallery__modal-overlay" onClick={closeDetail} role="dialog" aria-modal="true" aria-label={`Detail view: ${selectedArtwork.title}`}>
          <div className="gallery__modal" onClick={(e) => e.stopPropagation()}>
            <button className="gallery__modal-close" onClick={closeDetail} aria-label="Close detail view">&times;</button>

            <div className="gallery__modal-content">
              <div className="gallery__modal-image">
                <MagnifyingGlass src={selectedArtwork.image} alt={selectedArtwork.title} />
              </div>

              <div className="gallery__modal-info">
                <span className="plate-label">Plate {selectedArtwork.id} · {selectedArtwork.period}</span>
                <h2>{selectedArtwork.title}</h2>
                <p className="gallery__modal-artist">{selectedArtwork.artist}</p>

                <div className="gallery__modal-meta">
                  <div><strong>Date:</strong> {selectedArtwork.date}</div>
                  <div><strong>Medium:</strong> {selectedArtwork.medium}</div>
                </div>

                <p className="gallery__modal-desc">{selectedArtwork.description}</p>

                {selectedArtwork.significance && (
                  <div className="gallery__modal-significance">
                    <span className="annotation">Significance</span>
                    <p>{selectedArtwork.significance}</p>
                  </div>
                )}

                <p className="museum-caption">Image: {selectedArtwork.credit}</p>

                <div className="gallery__modal-nav">
                  <button onClick={() => navigateArtwork(-1)} disabled={filtered.findIndex(a => a.id === selectedArtwork.id) === 0}>
                    ← Previous
                  </button>
                  <button onClick={() => navigateArtwork(1)} disabled={filtered.findIndex(a => a.id === selectedArtwork.id) === filtered.length - 1}>
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
