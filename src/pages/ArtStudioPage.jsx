import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './ArtStudioPage.css';

const palette = ['#a64d34', '#d49b45', '#526d68', '#d4c39d', '#795547', '#efe3c7'];

function PerspectiveStudy({ point, guides }) {
  const vanishingX = 300 + point * 3.4;
  return (
    <svg className="studio-artwork studio-artwork--perspective" viewBox="0 0 800 500" role="img" aria-label="A Renaissance street scene with buildings arranged around a movable vanishing point">
      <defs>
        <linearGradient id="studio-sky" x2="0" y2="1"><stop stopColor="#d8c9a9" /><stop offset="1" stopColor="#f4e6c5" /></linearGradient>
        <linearGradient id="studio-ground" x2="0" y2="1"><stop stopColor="#c6aa7e" /><stop offset="1" stopColor="#927454" /></linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#studio-sky)" />
      <path d={`M0 230 L${vanishingX} 205 L800 230 V500 H0Z`} fill="url(#studio-ground)" />
      <path d={`M0 230 L${vanishingX} 205 L${vanishingX + 70} 500 H0Z`} fill="#b9986a" />
      <path d={`M${vanishingX} 205 L800 230 V500 H${vanishingX + 70}Z`} fill="#aa8a61" />
      <g stroke="#6d5140" strokeWidth="4" strokeLinejoin="round">
        <path d={`M0 82 L${vanishingX - 18} 140 V300 H0Z`} fill="#a66e4d" />
        <path d={`M0 82 L145 35 L${vanishingX - 18} 140Z`} fill="#85533e" />
        <path d={`M145 35 V270 L${vanishingX - 18} 300 V140Z`} fill="#c48a5d" />
        <path d={`M800 94 L${vanishingX + 18} 145 V300 H800Z`} fill="#c39b6d" />
        <path d={`M800 94 L670 47 L${vanishingX + 18} 145Z`} fill="#845944" />
        <path d={`M670 47 V276 L${vanishingX + 18} 300 V145Z`} fill="#a77a53" />
      </g>
      <g fill="#493b31" opacity=".9">
        {[70, 178, 276].map((x, i) => <path key={`l${x}`} d={`M${x} ${155 + i * 25} q22 -30 44 0 v${70 - i * 12} h-44z`} />)}
        {[730, 630, 535].map((x, i) => <path key={`r${x}`} d={`M${x} ${164 + i * 23} q-20 -29 -40 0 v${64 - i * 11} h40z`} />)}
      </g>
      <g stroke="#e6d3aa" strokeWidth="2" opacity=".7">
        <path d={`M${vanishingX} 205 L0 500 M${vanishingX} 205 L800 500`} />
        <path d={`M${vanishingX} 205 L0 230 M${vanishingX} 205 L800 230`} />
        <path d={`M${vanishingX} 205 L0 82 M${vanishingX} 205 L145 35 M${vanishingX} 205 L800 94 M${vanishingX} 205 L670 47`} />
      </g>
      <g fill="#f2dfb7" stroke="#765c43" strokeWidth="2">
        <circle cx={vanishingX} cy="205" r="7" />
      </g>
      {guides && <g stroke="#fff7df" strokeWidth="1.5" strokeDasharray="7 7" opacity=".85"><path d={`M${vanishingX} 0 V500 M0 205 H800`} /></g>}
      <text x="26" y="468" className="studio-svg-caption">STUDY IN LINEAR PERSPECTIVE</text>
    </svg>
  );
}

function MosaicStudy({ tiles, onTileClick }) {
  return (
    <div className="studio-mosaic" role="group" aria-label="Mosaic tile arrangement">
      {tiles.map((color, index) => (
        <button key={index} className="studio-mosaic__tile" style={{ '--tile-color': color }} onClick={() => onTileClick(index)} aria-label={`Mosaic tile ${index + 1}; current color ${palette.findIndex(item => item === color) + 1}`} title="Change tile color" />
      ))}
    </div>
  );
}

function FrescoStudy({ color, painted, onPaint }) {
  const areas = [
    { label: 'Sky', path: 'M0 0H800V145H0Z', fill: '#d9c79f' },
    { label: 'Cloak', path: 'M282 187 Q400 117 518 187 L563 470 H239Z', fill: '#9a4836' },
    { label: 'Tunic', path: 'M350 230 Q400 196 450 230 L478 470 H322Z', fill: '#d3ad62' },
    { label: 'Left sleeve', path: 'M300 197 L230 252 L279 316 L341 255Z', fill: '#55716a' },
    { label: 'Right sleeve', path: 'M500 197 L570 252 L521 316 L459 255Z', fill: '#55716a' },
  ];
  return (
    <svg className="studio-artwork studio-artwork--fresco" viewBox="0 0 800 500" role="group" aria-label="Fresco figure. Select a painted area to apply the chosen pigment.">
      <rect width="800" height="500" fill="#d9c79f" />
      <path d="M0 0H800V500H0Z" fill="#d9c79f" />
      <path d="M0 0H800V500H0Z" fill="none" stroke="#8d7455" strokeWidth="18" />
      <path d="M38 38H762V462H38Z" fill="none" stroke="#b18d5b" strokeWidth="3" />
      <g stroke="#725846" strokeWidth="5" strokeLinejoin="round">
        {areas.map((area, index) => <path key={area.label} d={area.path} fill={painted[index] || area.fill} onClick={() => onPaint(index, color)} className="studio-fresco-area" tabIndex="0" role="button" aria-label={`Paint ${area.label}`} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onPaint(index, color); } }} />)}
        <path d="M358 123 Q400 87 442 123 L457 194 Q400 224 343 194Z" fill="#c88e64" />
        <path d="M350 121 Q400 64 450 121 L444 137 Q400 105 356 137Z" fill="#75533d" />
        <path d="M385 158 q7 5 14 0 M414 158 q7 5 14 0 M393 180 q7 5 14 0" fill="none" stroke="#493a30" strokeWidth="4" />
      </g>
      <text x="28" y="472" className="studio-svg-caption">FRESCO STUDY · PIGMENT ON PLASTER</text>
    </svg>
  );
}

export default function ArtStudioPage() {
  const [headerRef, headerVisible] = useInView();
  const [activeStudy, setActiveStudy] = useState('perspective');
  const [point, setPoint] = useState(50);
  const [guides, setGuides] = useState(true);
  const [tiles, setTiles] = useState(() => Array.from({ length: 36 }, (_, index) => palette[(Math.floor(index / 6) + index % 6) % palette.length]));
  const [pigment, setPigment] = useState(palette[0]);
  const [painted, setPainted] = useState({});
  const [reflection, setReflection] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  const resetStudy = () => {
    setPoint(50);
    setGuides(true);
    setTiles(Array.from({ length: 36 }, (_, index) => palette[(Math.floor(index / 6) + index % 6) % palette.length]));
    setPainted({});
    setReflection('');
    setShowReflection(false);
  };

  const changeTile = (index) => setTiles(current => current.map((color, tileIndex) => {
    if (tileIndex !== index) return color;
    const colorIndex = palette.indexOf(color);
    return palette[(colorIndex + 1) % palette.length];
  }));

  const title = activeStudy === 'perspective' ? 'Build a street in perspective' : activeStudy === 'mosaic' ? 'Compose a small mosaic' : 'Paint a fresco figure';

  return (
    <section id="studio" className="art-studio section">
      <div className="container">
        {/* Parchment Paper Header — matching Masters & Activities style */}
        <div ref={headerRef} className={`art-studio__header scroll-ease-in ${headerVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.04s' }}>
          <div className="art-studio__paper-pad">
            <img
              src="/assets/parchment-paper.avif"
              alt="Parchment manuscript folio"
              className="art-studio__paper-img"
              loading="lazy"
            />
            <div className="art-studio__paper-overlay" />
            <div className="art-studio__header-content">
              <span className="plate-label">A hands-on interlude</span>
              <h2 className="section-title">The Art Studio</h2>
              <p className="section-subtitle">Try a technique, make a few choices, and see how they shape an artwork.</p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        <div className="studio-workbench">
          <div className="studio-workbench__intro">
            <div>
              <span className="plate-label">Choose a study</span>
              <h3>{title}</h3>
            </div>
            <button className="studio-reset" type="button" onClick={resetStudy}>Reset study</button>
          </div>

          <div className="studio-tabs" role="tablist" aria-label="Art technique studies">
            <button type="button" role="tab" aria-selected={activeStudy === 'perspective'} className={activeStudy === 'perspective' ? 'active' : ''} onClick={() => setActiveStudy('perspective')}><span className="studio-tabs__number">01</span><span><strong>Perspective</strong><small>Brunelleschi and Alberti</small></span></button>
            <button type="button" role="tab" aria-selected={activeStudy === 'mosaic'} className={activeStudy === 'mosaic' ? 'active' : ''} onClick={() => setActiveStudy('mosaic')}><span className="studio-tabs__number">02</span><span><strong>Mosaic</strong><small>Color and pattern</small></span></button>
            <button type="button" role="tab" aria-selected={activeStudy === 'fresco'} className={activeStudy === 'fresco' ? 'active' : ''} onClick={() => setActiveStudy('fresco')}><span className="studio-tabs__number">03</span><span><strong>Fresco</strong><small>Pigment on wet plaster</small></span></button>
          </div>

          <div className="studio-workbench__body">
            <div className={`studio-canvas studio-canvas--${activeStudy}`}>
              {activeStudy === 'perspective' && <PerspectiveStudy point={point} guides={guides} />}
              {activeStudy === 'mosaic' && <MosaicStudy tiles={tiles} onTileClick={changeTile} />}
              {activeStudy === 'fresco' && <FrescoStudy color={pigment} painted={painted} onPaint={(index, color) => setPainted(current => ({ ...current, [index]: color }))} />}
            </div>
            <div className="studio-controls">
              {activeStudy === 'perspective' && <>
                <span className="plate-label">Your choices</span>
                <label className="studio-control" htmlFor="vanishing-point"><span>Move the vanishing point</span><input id="vanishing-point" type="range" min="0" max="100" value={point} onChange={event => setPoint(Number(event.target.value))} /><small>Notice how the street and buildings respond.</small></label>
                <label className="studio-check"><input type="checkbox" checked={guides} onChange={event => setGuides(event.target.checked)} /><span>Show the horizon and alignment guides</span></label>
                <div className="studio-note"><strong>Look closely</strong><p>In linear perspective, parallel lines appear to meet at a vanishing point. Renaissance artists used this system to suggest depth on a flat surface.</p></div>
              </>}
              {activeStudy === 'mosaic' && <>
                <span className="plate-label">Arrange the surface</span>
                <p className="studio-instruction">Select a tile to cycle through the palette. Build a repeating pattern or break it up with a different color.</p>
                <div className="studio-palette" aria-label="Mosaic colors">{palette.map((color, index) => <span key={color} className={tiles.includes(color) ? 'used' : ''} style={{ '--swatch': color }} aria-label={`Palette color ${index + 1}`} />)}</div>
                <div className="studio-note"><strong>Look closely</strong><p>Mosaic artists set small pieces of stone, glass, or ceramic into a surface. Repeated colors can guide the eye and bring a larger image together.</p></div>
              </>}
              {activeStudy === 'fresco' && <>
                <span className="plate-label">Mix a fresco palette</span>
                <p className="studio-instruction">Choose a pigment, then select an area of the figure to repaint it.</p>
                <div className="studio-palette studio-palette--buttons" role="group" aria-label="Choose a fresco pigment">{palette.map((color, index) => <button key={color} type="button" className={pigment === color ? 'selected' : ''} style={{ '--swatch': color }} onClick={() => setPigment(color)} aria-label={`Choose pigment ${index + 1}`} />)}</div>
                <div className="studio-note"><strong>Look closely</strong><p>In buon fresco, pigment is applied to wet plaster. As the plaster dries, the color becomes part of the wall surface.</p></div>
              </>}
            </div>
          </div>

          <div className="studio-reflection">
            {!showReflection ? <div className="studio-reflection__prompt"><div><span className="plate-label">A note from the studio</span><p>What changed when you adjusted the composition or materials?</p></div><button type="button" className="studio-reflection__button" onClick={() => setShowReflection(true)}>Add a reflection</button></div> : <label className="studio-reflection__field"><span className="plate-label">Your observation</span><textarea value={reflection} onChange={event => setReflection(event.target.value)} placeholder="Write a sentence about what you noticed..." rows="2" /><span className="studio-reflection__hint">This note stays in this page while you explore.</span></label>}
          </div>
        </div>

        <p className="studio-next">When you are ready, continue to the Interactive Zone below.</p>
      </div>
    </section>
  );
}
