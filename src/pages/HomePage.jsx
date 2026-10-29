import { useInView } from '../hooks/useInView';
import TactileSketchbookModal from '../components/TactileSketchbookModal';
import './HomePage.css';

export default function HomePage({ isBookOpen = false, isOpening = false, onOpenBook, onCloseToCover }) {
  const [previewRef, previewVisible] = useInView();

  const periods = [
    {
      id: 'prehistoric',
      name: 'Prehistoric Art',
      subtitle: 'Dawn of Visual Culture (c. 40,000 BCE)',
      desc: 'Cave paintings, petroglyphs, ancient sculpture, and early symbolic expression.',
      bg: '/assets/prehistoric bg.jpg',
      tag: 'Period 01',
    },
    {
      id: 'stone-tools',
      name: 'Stone Tools',
      subtitle: 'Lithic Reduction & Early Technology',
      desc: 'Pebble tools, bifacial hand axes, flake tools, and blade techniques from Olduvai Gorge.',
      bg: '/assets/stone tools bg.jpg',
      tag: 'Period 02',
    },
    {
      id: 'medieval',
      name: 'Medieval Art',
      subtitle: 'Sacred Splendor & Illumination',
      desc: 'Illuminated manuscripts, Byzantine mosaics, Gothic stained glass, and the Bayeux Tapestry.',
      bg: '/assets/medieval bg.jpg',
      tag: 'Period 03',
    },
    {
      id: 'artists-intro',
      name: 'Renaissance Masters',
      subtitle: 'Western European Innovations',
      desc: 'Donatello, Giotto, Brunelleschi, Alberti, Cimabue, Fra Angelico, and Ghiberti.',
      bg: '/assets/donatello bg.jpg',
      tag: 'Period 04',
    },
    {
      id: 'greek',
      name: 'Classical Greek',
      subtitle: 'Vessels, Naturalism & Polychromy',
      desc: 'Kerch vase painting, red-figure pottery, the Pitsa panel, and classic Greek pottery forms.',
      bg: '/assets/classical greek bg.jpg',
      tag: 'Period 05',
    },
  ];

  const handlePeriodClick = (tabId) => {
    window.dispatchEvent(new CustomEvent('select-explore-tab', { detail: tabId }));
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBeginExploring = (e) => {
    e.preventDefault();
    const periodsSection = document.getElementById('periods');
    if (periodsSection) {
      periodsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keep the real spread beneath its front cover so the cover reveals the actual pages.
  if (!isBookOpen) {
    return (
      <section id="home" className="home home--sole-cover">
        <div className="home__sole-cover-container">
          <TactileSketchbookModal
            key="cover-opening-sketchbook"
            inline
            initialArtworkId={1}
            showCover
            isBookOpening={isOpening}
            onOpenBook={onOpenBook}
            onCloseToCover={onCloseToCover}
          />
        </div>
      </section>
    );
  }

  // Opened Book & Full Homepage Experience
  return (
    <section id="home" className="home">
      <div className="home__book-stage">
        <div className="home__open-book-wrap">
          <TactileSketchbookModal
            key="open-sketchbook"
            inline
            initialArtworkId={1}
            onCloseToCover={onCloseToCover}
          />
        </div>

        <div className="home__cta-group">
          <a
            href="#periods"
            className="home__cta home__cta--primary"
            onClick={handleBeginExploring}
          >
            Begin Exploring
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      <div id="periods" className="home__periods" ref={previewRef}>
        {/* Header with the Parchment Paper as Padding */}
        <div className={`home__periods-header scroll-ease-in ${previewVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.04s' }}>
          <div className="home__periods-paper-pad">
            <img
              src="/assets/parchment-paper.avif"
              alt="Parchment manuscript folio"
              className="home__periods-paper-img"
              loading="lazy"
            />
            <div className="home__periods-paper-overlay" />
            <div className="home__periods-header-content">
              <h2 className="section-title">Sections of Western Art</h2>
              <p className="section-subtitle">Select any historical section to explore its artistic traditions, techniques, and artifacts</p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        {/* 5-Column Period Cards */}
        <div className="home__period-grid">
          {periods.map((p, i) => (
            <article
              key={p.id}
              className={`home__period-card paper-card scroll-ease-in ${previewVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.12 + i * 0.08}s` }}
              onClick={() => handlePeriodClick(p.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePeriodClick(p.id)}
              aria-label={`Explore ${p.name}`}
            >
              {/* UPPER PART: ONLY THE PICTURE */}
              <div className="home__period-img-wrap">
                <img
                  src={p.bg}
                  alt={p.name}
                  className="home__period-img"
                  loading="lazy"
                />
                <div className="home__period-img-overlay" />
              </div>

              {/* UNDERNEATH ON THE PADDING: TITLE & DETAILS */}
              <div className="home__period-body">
                <div className="home__period-meta">
                  <span className="plate-label">{p.tag}</span>
                  <span className="annotation">{p.subtitle}</span>
                </div>

                <h3 className="home__period-title">{p.name}</h3>
                <p className="home__period-desc">{p.desc}</p>

                <div className="home__period-footer">
                  <span className="home__period-link">
                    Explore Section
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
