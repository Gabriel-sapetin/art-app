import { useInView } from '../hooks/useInView';
import './HomePage.css';

export default function HomePage() {
  const [heroRef, heroVisible] = useInView();
  const [previewRef, previewVisible] = useInView();

  const periods = [
    { name: 'Prehistoric Art', desc: 'Cave paintings, petroglyphs, and the dawn of creativity', icon: '🪨' },
    { name: 'Stone Tools', desc: 'Early artmaking materials and techniques', icon: '🔨' },
    { name: 'Medieval Art', desc: 'Illuminated manuscripts, mosaics, and stained glass', icon: '⛪' },
    { name: 'Renaissance Artists', desc: 'Donatello, Giotto, Brunelleschi, and more', icon: '🎨' },
    { name: 'Classical Greek', desc: 'Pottery, painting, and the pursuit of naturalism', icon: '🏛️' },
  ];

  return (
    <section id="home" className="home">
      <div className="home__hero" ref={heroRef}>
        <div className={`home__hero-content fade-in ${heroVisible ? 'visible' : ''}`}>
          <div className="home__badge">Module 3 · Art Appreciation Midterm</div>
          <h1 className="home__title">
            <span className="home__title-line">Atelier</span>
            <span className="home__title-line home__title-accent">Occidental</span>
          </h1>
          <p className="home__subtitle annotation">An Interactive Journey Through Western Art History</p>
          <p className="home__intro">
            Step inside a living sketchbook where ancient cave paintings, medieval masterpieces, 
            and Renaissance innovations come alive. Explore artworks, meet the masters who shaped 
            Western art, and test your knowledge through interactive activities.
          </p>
          <div className="home__cta-group">
            <a href="#explore" className="home__cta home__cta--primary" onClick={(e) => { e.preventDefault(); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Begin Exploring
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
            <a href="#gallery" className="home__cta home__cta--secondary" onClick={(e) => { e.preventDefault(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View Art Plates
            </a>
          </div>
        </div>
        <div className={`home__hero-visual fade-in ${heroVisible ? 'visible' : ''}`}>
          <div className="home__sketchbook">
            <div className="home__sketch-page home__sketch-page--left">
              <img src="/assets/El Castillo Cave Painting, Spain (the oldest European cave art, with hand stencils, claviforms and disks).jpg" alt="El Castillo Cave Painting — one of the oldest European cave artworks" />
              <span className="home__sketch-caption annotation">El Castillo Cave, Spain · c. 40,800 years ago</span>
            </div>
            <div className="home__sketch-page home__sketch-page--right">
              <img src="/assets/illuminated manuscripts.jpg" alt="An illuminated manuscript from the Medieval period" />
              <span className="home__sketch-caption annotation">Illuminated Manuscript · Medieval Europe</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home__periods container" ref={previewRef}>
        <h2 className={`section-title fade-in ${previewVisible ? 'visible' : ''}`}>What You'll Discover</h2>
        <div className="section-divider" />
        <div className="home__period-grid">
          {periods.map((p, i) => (
            <div key={i} className={`home__period-card paper-card fade-in ${previewVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="home__period-icon">{p.icon}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
