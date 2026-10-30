import { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useInView } from '../hooks/useInView';
import CavePaintingView from '../components/CavePaintingView';
import {
  INITIAL_COMMUNITY_ARTWORKS,
  getLocalArtworks,
  getLikedArtworkIds,
  toggleArtworkLike
} from '../data/communityArtworks';
import './CommunityPage.css';

export default function CommunityPage({ newArtwork = null }) {
  const [headerRef, headerVisible] = useInView();
  const [contentRef, contentVisible] = useInView({ threshold: 0.05 });
  const [remoteArtworks, setRemoteArtworks] = useState([]);
  const [localArtworks, setLocalArtworks] = useState(() => getLocalArtworks());
  const [likedIds, setLikedIds] = useState(() => getLikedArtworkIds());
  const [likeCounts, setLikeCounts] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [inspectingArtwork, setInspectingArtwork] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setInspectingArtwork(null);
      }
    };
    if (inspectingArtwork) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectingArtwork]);

  // Fetch from Upstash Redis API on mount
  useEffect(() => {
    let isMounted = true;
    async function loadRemote() {
      try {
        const res = await fetch('/api/artworks');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.ok && Array.isArray(data.artworks)) {
            setRemoteArtworks(data.artworks);
          }
        }
      } catch (err) {
        console.warn('Could not fetch remote community artworks:', err);
      }
    }
    loadRemote();
    return () => { isMounted = false; };
  }, []);

  // Sync whenever a new artwork is shared locally
  useEffect(() => {
    if (newArtwork) {
      setLocalArtworks(prev => {
        if (prev.some(a => a.id === newArtwork.id)) return prev;
        return [newArtwork, ...prev];
      });
    }
  }, [newArtwork]);

  // Combine and deduplicate all artworks (newest first)
  const allArtworks = useMemo(() => {
    const map = new Map();

    // 1. Local artworks (highest priority for user's own immediate uploads)
    localArtworks.forEach(art => {
      if (art && art.id) map.set(art.id, art);
    });

    // 2. Remote artworks from Upstash Redis
    remoteArtworks.forEach(art => {
      if (art && art.id && !map.has(art.id)) map.set(art.id, art);
    });

    // 3. Initial baseline masterpieces
    INITIAL_COMMUNITY_ARTWORKS.forEach(art => {
      if (art && art.id && !map.has(art.id)) map.set(art.id, art);
    });

    return Array.from(map.values()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }, [localArtworks, remoteArtworks]);

  // Filter artworks
  const filteredArtworks = useMemo(() => {
    if (activeFilter === 'ochre') {
      return allArtworks.filter(a => a.mode === 'paint' || a.technique?.toLowerCase().includes('ochre'));
    }
    if (activeFilter === 'etch') {
      return allArtworks.filter(a => a.mode === 'etch' || a.technique?.toLowerCase().includes('engrav') || a.technique?.toLowerCase().includes('blade'));
    }
    return allArtworks;
  }, [allArtworks, activeFilter]);

  const handleLike = (id, baseLikes) => {
    const { isLiked, countDelta } = toggleArtworkLike(id);
    setLikedIds(getLikedArtworkIds());
    setLikeCounts(prev => ({
      ...prev,
      [id]: (prev[id] ?? baseLikes ?? 0) + countDelta
    }));
  };

  const handleDownloadSvg = (artwork) => {
    const svgElem = document.getElementById(`community-modal-svg-${artwork.id}`);
    if (!svgElem) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElem);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artwork.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_cave_art.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="community" className="community section">
      <div className="container">
        
        {/* Parchment Paper Header Pad (Matching Masters, Studio & Reflection) */}
        <div
          ref={headerRef}
          className={`community__header scroll-ease-in ${headerVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.04s' }}
        >
          <div className="community__paper-pad">
            <img
              src="/assets/parchment-paper.avif"
              alt="Parchment manuscript folio"
              className="community__paper-img"
              loading="lazy"
            />
            <div className="community__paper-overlay" />
            <div className="community__header-content">
              <span className="plate-label">Visitors' Prehistoric Folio</span>
              <h2 className="section-title">Community Cave Wall</h2>
              <p className="section-subtitle">
                Original marks, beasts, and engravings contributed by explorers across the world
              </p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div ref={contentRef} className={`community__content scroll-ease-in ${contentVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div className="community__toolbar">
            <div className="community__filters" role="group" aria-label="Filter community artworks">
              <button
                type="button"
                className={`community__filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Works ({allArtworks.length})
              </button>
              <button
                type="button"
                className={`community__filter-btn ${activeFilter === 'ochre' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ochre')}
              >
                Ochre Pigments
              </button>
              <button
                type="button"
                className={`community__filter-btn ${activeFilter === 'etch' ? 'active' : ''}`}
                onClick={() => setActiveFilter('etch')}
              >
                Stone Engravings
              </button>
            </div>

            <div className="community__actions">
              <span className="community__count-badge">
                {filteredArtworks.length} {filteredArtworks.length === 1 ? 'Painting' : 'Paintings'} preserved
              </span>
              <a
                href="#stone-age"
                className="community__paint-cta"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('stone-age');
                  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>Paint on Cave Wall</span>
                <span>&uarr;</span>
              </a>
            </div>
          </div>

          {/* Artworks Grid */}
          <div className="community__grid">
            {filteredArtworks.map((item) => {
              const isLiked = likedIds.includes(item.id);
              const currentLikes = likeCounts[item.id] ?? item.likes ?? 0;

              return (
                <article key={item.id} className="community__card">
                  <div
                    className="community__card-canvas-wrap"
                    onClick={() => setInspectingArtwork(item)}
                    title="Click to inspect and enlarge this cave painting"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setInspectingArtwork(item); }}
                  >
                    <span className="community__card-badge">
                      {item.periodName || 'Paleolithic'}
                    </span>
                    <span className="community__card-inspect-hint">
                      Click to inspect &middot; Zoom
                    </span>
                    <div id={`community-svg-${item.id}`}>
                      <CavePaintingView
                        marks={item.marks || []}
                        id={`card-${item.id}`}
                      />
                    </div>
                  </div>

                  <div className="community__card-content">
                    <div className="community__card-header">
                      <h3
                        className="community__card-title"
                        onClick={() => setInspectingArtwork(item)}
                        title="Click to inspect"
                        style={{ cursor: 'pointer' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="community__card-author">
                      Carved by <strong>{item.author}</strong>
                    </p>

                    <div className="community__card-technique">
                      {item.technique}
                    </div>

                    <div className="community__card-footer">
                      <span className="community__card-date">{item.date}</span>

                      <div className="community__card-actions">
                        <button
                          type="button"
                          className="community__inspect-btn"
                          onClick={() => setInspectingArtwork(item)}
                          title="Inspect and zoom artwork"
                        >
                          Inspect &middot; Zoom
                        </button>

                        <button
                          type="button"
                          className={`community__like-btn ${isLiked ? 'liked' : ''}`}
                          onClick={() => handleLike(item.id, item.likes)}
                          aria-label={`Ignite ember. Current count: ${currentLikes}`}
                        >
                          <span aria-hidden="true">&#9733;</span>
                          <span>{currentLikes} Embers</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>

      {/* Lightbox Modal Rendered Directly to Body via Portal */}
      {inspectingArtwork && typeof document !== 'undefined' && createPortal(
        <div
          className="community-lightbox__overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setInspectingArtwork(null)}
        >
          <div
            className="community-lightbox__box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="community-lightbox__close"
              onClick={() => setInspectingArtwork(null)}
              aria-label="Close preview"
            >
              &times;
            </button>

            <div className="community-lightbox__canvas">
              <CavePaintingView
                marks={inspectingArtwork.marks || []}
                id={`modal-${inspectingArtwork.id}`}
              />
              {/* Invisible full SVG for download reference */}
              <div style={{ display: 'none' }} id={`community-modal-svg-${inspectingArtwork.id}`}>
                <CavePaintingView
                  marks={inspectingArtwork.marks || []}
                  id={`export-${inspectingArtwork.id}`}
                />
              </div>
            </div>

            <div className="community-lightbox__info">
              <div className="community-lightbox__info-main">
                <h2>{inspectingArtwork.title}</h2>
                <p>
                  Carved by <strong>{inspectingArtwork.author}</strong> &middot; {inspectingArtwork.technique} &middot; {inspectingArtwork.date}
                </p>
                {inspectingArtwork.description && (
                  <p style={{ marginTop: '8px', fontStyle: 'italic', color: '#7a6450' }}>
                    "{inspectingArtwork.description}"
                  </p>
                )}
              </div>

              <div className="community-lightbox__actions">
                <button
                  type="button"
                  className="community-lightbox__download-btn"
                  onClick={() => handleDownloadSvg(inspectingArtwork)}
                >
                  Download SVG Artwork
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
