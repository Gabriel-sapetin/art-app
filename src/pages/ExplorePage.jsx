import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './ExplorePage.css';

const tabs = [
  { id: 'prehistoric', label: 'Prehistoric Art' },
  { id: 'stone-tools', label: 'Stone Tools' },
  { id: 'medieval', label: 'Medieval Art' },
  { id: 'artists-intro', label: 'Western Artists' },
  { id: 'greek', label: 'Greek Painting' },
];

function PrehistoricSection() {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`explore__content fade-in ${visible ? 'visible' : ''}`}>
      <div className="explore__text-block">
        <h3>What Is Prehistoric Art?</h3>
        <p>Prehistoric art refers to all visual works created before people began keeping written records. Since writing first appeared in ancient Mesopotamia before 3000 B.C.E., the term generally covers art produced earlier — cave paintings, carvings, early sculptures, and structures that early humans used to express ideas, beliefs, and experiences about their world.</p>
        <p>Some of the earliest known examples of decorative art have been found in Africa and are estimated to be around 100,000 years old. These works remind us that the impulse to create is deeply woven into what it means to be human.</p>
      </div>

      <div className="explore__grid-two">
        <div className="paper-card">
          <h4>Main Periods of Prehistoric Art</h4>
          <ul className="explore__list">
            <li><strong>Stone Age</strong> — The earliest period of human tool use and artistic creation</li>
            <li><strong>Neolithic Period</strong> — Marked by the development of agriculture, pottery, and permanent settlements</li>
            <li><strong>Bronze Age</strong> — Characterized by metalworking and more complex societies</li>
            <li><strong>Iron Age</strong> — The introduction of iron tools and weapons transformed daily life</li>
          </ul>
        </div>
        <div className="paper-card">
          <h4>Why Early People Made Art</h4>
          <p>Art likely helped prehistoric communities share messages, express spiritual beliefs, honor the natural world, and transmit knowledge across generations. Animals appear frequently — especially in communities dependent on hunting and herding. Prehistoric images were more than decoration: their meanings were deeply connected to the customs, values, and beliefs of their creators.</p>
        </div>
      </div>

      <div className="explore__grid-three">
        <div className="paper-card explore__term-card">
          <img src="/assets/petroglyphs.jpg" alt="Petroglyphs carved into rock" loading="lazy" />
          <h4>Petroglyphs</h4>
          <p>Pictures or patterns cut, scratched, or carved into rock surfaces — one of the earliest forms of visual communication.</p>
        </div>
        <div className="paper-card explore__term-card">
          <img src="/assets/pictographs.jpg" alt="Painted pictographs on rock" loading="lazy" />
          <h4>Pictographs</h4>
          <p>Images or signs painted or drawn on surfaces using natural pigments to communicate ideas and record stories.</p>
        </div>
        <div className="paper-card explore__term-card">
          <img src="/assets/ancient sculpture.jpeg" alt="Ancient sculpture" loading="lazy" />
          <h4>Ancient Sculpture</h4>
          <p>Three-dimensional objects shaped from stone, ivory, or bone, often serving symbolic or ceremonial purposes.</p>
        </div>
      </div>

      <div className="explore__grid-two">
        <div className="paper-card explore__term-card">
          <img src="/assets/megalithics.jpg" alt="Megalithic stone arrangement" loading="lazy" />
          <h4>Megalithic Art</h4>
          <p>Art connected with large stones — including carved stones and works created as part of stone arrangements or monuments. These structures required significant community effort.</p>
        </div>
        <div className="paper-card explore__term-card">
          <img src="/assets/El Castillo Cave Painting, Spain (the oldest European cave art, with hand stencils, claviforms and disks).jpg" alt="El Castillo Cave Painting" loading="lazy" />
          <h4>El Castillo Cave</h4>
          <p>Located in Spain, this cave contains some of the oldest European cave art — hand stencils, claviforms (club-shaped signs), and disk markings dated to at least 40,800 years ago. Discovered by archaeologist Hermilio Alcalde del Río in 1903.</p>
        </div>
      </div>

      <div className="paper-card explore__callout">
        <span className="annotation">Did You Know?</span>
        <p>Researchers have debated whether Neanderthals (<em>Homo neanderthalensis</em>) may have created some of the oldest cave images. If so, the origins of art may extend even further back in time than previously believed.</p>
        <img src="/assets/claviforms.jpg" alt="Claviforms — club-shaped signs in cave art" loading="lazy" className="explore__callout-img" />
        <span className="museum-caption">Claviforms — club-shaped signs found in prehistoric cave art</span>
      </div>
    </div>
  );
}

function StoneToolsSection() {
  const [ref, visible] = useInView();
  const tools = [
    { name: 'Pebble Tools', img: '/assets/pebble tool.jpg', desc: 'Rough cutting tools made by hitting a rounded stone with another stone to create a sharp edge. Among the earliest known tools, used for basic chopping and cutting.' },
    { name: 'Bifacial Tools & Hand Axes', img: '/assets/bifacial tool.jpg', desc: 'Tools worked on both sides, often shaped like an oval or almond. Their edges served for cutting, scraping, and as weapons. Strongly associated with the Acheulean tool tradition.' },
    { name: 'Flake Tools', img: '/assets/flake tool.jpg', desc: 'Made from pieces knocked off a larger stone. The detached flake could be used directly, while the remaining core could also be shaped. Small extra flakes were removed (retouch) to refine edges.' },
    { name: 'Blade Tools', img: '/assets/blade tools.jpg', desc: 'Long, narrow stone flakes that could be used alone or attached to handles. Produced through lithic reduction — striking pieces off a larger stone until a useful tool emerges.' },
  ];

  return (
    <div ref={ref} className={`explore__content fade-in ${visible ? 'visible' : ''}`}>
      <div className="explore__text-block">
        <h3>Stone Tools and Early Artmaking</h3>
        <p>Early humans worked with natural materials — primarily stone, but also wood, bone, ivory, and antlers — to create tools for survival and creative expression. Stone tools, known from roughly two million years ago, helped people cut, prepare materials, hunt, and carry out daily tasks.</p>
      </div>

      <div className="explore__grid-three">
        <div className="paper-card explore__term-card">
          <img src="/assets/igneous rock.jpg" alt="Igneous (volcanic) rock" loading="lazy" />
          <h4>Igneous (Volcanic) Rock</h4>
          <p>Formed when molten material cools and hardens. Part of the igneous-rock family, these rocks provided hard, fracture-predictable material for toolmaking.</p>
        </div>
        <div className="paper-card explore__term-card">
          <img src="/assets/sedimentary rocks.jpg" alt="Sedimentary rock" loading="lazy" />
          <h4>Sedimentary Rock</h4>
          <p>Created when layers of particles build up and become compacted over time. The layered structure affected how these stones could be shaped.</p>
        </div>
        <div className="paper-card explore__term-card">
          <img src="/assets/metamorphic rock.jpg" alt="Metamorphic rock" loading="lazy" />
          <h4>Metamorphic Rock</h4>
          <p>Changed from an earlier rock type after exposure to strong heat, pressure, or both. These transformations created new properties useful for different tools.</p>
        </div>
      </div>

      <h3 className="explore__sub-heading">The Four Paleolithic Tool Types</h3>
      <div className="explore__tools-grid">
        {tools.map((tool, i) => (
          <div key={i} className="paper-card explore__tool-card">
            <div className="explore__tool-img-wrap">
              <img src={tool.img} alt={tool.name} loading="lazy" />
              <span className="plate-label">Plate {i + 1}</span>
            </div>
            <div className="explore__tool-info">
              <h4>{tool.name}</h4>
              <p>{tool.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="paper-card explore__callout">
        <span className="annotation">Key Location</span>
        <img src="/assets/olduvai gorge.jpg" alt="Olduvai Gorge, Tanzania" loading="lazy" className="explore__callout-img" />
        <h4>Olduvai Gorge, Tanzania</h4>
        <p>An important archaeological site where researchers (paleoanthropologists) found very early stone tools, including simple chopping tools that are among the oldest evidence of human toolmaking.</p>
      </div>
    </div>
  );
}

function MedievalSection() {
  const [ref, visible] = useInView();
  const artForms = [
    { name: 'Illuminated Manuscripts', img: '/assets/illuminated manuscripts.jpg', desc: 'Handwritten books decorated with vivid colors, ornamental designs, and sometimes gold or silver details, created by skilled craftspeople known as illuminators.' },
    { name: 'Mosaics', img: '/assets/mosaics.jpg', desc: 'Images assembled from many small pieces of colored glass, stone, or ceramic called tesserae, used to decorate church walls and ceilings with shimmering scenes.' },
    { name: 'Stained Glass', img: '/assets/stained glass.jpg', desc: 'Colored glass pieces fitted together with lead strips to create luminous designs and biblical narratives in Gothic cathedrals.' },
    { name: 'Bayeux Tapestry', img: '/assets/bayeux tapestry.jpg', desc: 'A 230-foot-long embroidered linen artwork made of eight strips stitched with colored wool, narrating the Norman Conquest of 1066.' },
    { name: 'Fresco & Panel Painting', img: '/assets/Panel Painting.jpg', desc: 'Fresco applies pigment to wet plaster so it bonds permanently; panel painting uses tempera on flat wooden surfaces for religious images and altarpieces.' },
    { name: 'Ceramics', img: '/assets/ceramics.jpg', desc: 'Clay objects shaped and hardened by fire for practical and decorative purposes — pots, jars, tiles, and architectural ornaments.' },
    { name: 'Metalwork & Goldsmithing', img: '/assets/heraldry.jpg', desc: 'Specialists shaped silver and gold into church ornaments, jewelry, sculptures, and doors, creating some of the most treasured objects of the medieval world.' },
    { name: 'Heraldry', img: '/assets/heraldry.jpg', desc: 'The art of designing coats of arms using symbolic animals, geometric patterns, colors, and mottos to create recognizable visual identities.' },
  ];

  return (
    <div ref={ref} className={`explore__content fade-in ${visible ? 'visible' : ''}`}>
      <div className="explore__text-block">
        <h3>Medieval Arts in Europe</h3>
        <p>Medieval art, produced during the Middle Ages, drew on Roman artistic traditions, early Christian practices, and the art of northern European peoples. It encompassed a remarkable variety of forms — from the solemn beauty of Byzantine mosaics and Gothic cathedrals to the intricate detail of illuminated manuscripts and the narrative power of the Bayeux Tapestry.</p>
        <p>Three major traditions shaped medieval art: <strong>Early Christian art</strong> developed for worship and religious imagery; <strong>Byzantine art</strong> became known for its formal icons and golden mosaics; and <strong>Gothic art</strong> expressed itself in soaring cathedrals, sculpture, and colorful stained glass windows.</p>
      </div>

      <div className="explore__medieval-grid">
        {artForms.map((form, i) => (
          <div key={i} className="paper-card explore__medieval-card">
            <img src={form.img} alt={form.name} loading="lazy" />
            <div className="explore__medieval-info">
              <h4>{form.name}</h4>
              <p>{form.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtistsIntroSection() {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`explore__content fade-in ${visible ? 'visible' : ''}`}>
      <div className="explore__text-block">
        <h3>Important Artists of Western Europe</h3>
        <p>The transition from medieval to Renaissance art was shaped by remarkable individuals who challenged existing conventions and introduced new ways of seeing the world. These seven artists — spanning from the late 13th through the 15th century — collectively laid the foundations for the artistic revolution known as the Renaissance.</p>
        <p>Explore each artist in depth in the <a href="#artists" onClick={(e) => { e.preventDefault(); document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' }); }}>Artist Spotlight</a> section below.</p>
      </div>
      <div className="explore__grid-two">
        <div className="paper-card">
          <h4>Key Concepts</h4>
          <ul className="explore__list">
            <li><strong>Renaissance Man</strong> — Someone who develops knowledge and ability in many different areas, exemplified by Leon Battista Alberti</li>
            <li><strong>Italo-Byzantine Style</strong> — Italian religious art using visual conventions inherited from Byzantine painting</li>
            <li><strong>Metallurgy</strong> — The study and practice of extracting, preparing, and shaping metals</li>
            <li><strong>Gates of Paradise</strong> — The celebrated name Michelangelo gave to Ghiberti's bronze doors</li>
          </ul>
        </div>
        <div className="paper-card">
          <h4>Historical Context</h4>
          <p>Giorgio Vasari, an Italian artist and writer, documented these artists in his influential book <em>Lives of the Artists</em>, which remains a primary source for understanding Renaissance art history. The artists featured in our module worked primarily in Florence, which became the cradle of the Renaissance.</p>
        </div>
      </div>
    </div>
  );
}

function GreekSection() {
  const [ref, visible] = useInView();
  const vessels = [
    { name: 'Krater', img: '/assets/Krater.jpg', desc: 'A broad, deep vessel with a wide mouth used for mixing wine with water at social gatherings called symposia.' },
    { name: 'Lebes Gamikos', img: '/assets/Lebes Gamikos.jpg', desc: 'A vessel associated with wedding customs and the ritual bath of a bride, typically with a lid and raised handles.' },
    { name: 'Lekanis', img: '/assets/Lekanis.jpg', desc: 'A shallow bowl with a pair of horizontal handles and a low, wide base, used for various purposes.' },
    { name: 'Pelike', img: '/assets/pelike.jpg', desc: 'A pottery container used for holding or storing liquids such as wine, with a distinctive wide body.' },
  ];

  return (
    <div ref={ref} className={`explore__content fade-in ${visible ? 'visible' : ''}`}>
      <div className="explore__text-block">
        <h3>Classical Greek Painting</h3>
        <p>Classical Greek art appeared on pottery, wooden panels, tomb walls, and architectural surfaces. Artists depicted mythology, battles, and everyday activities while increasingly striving for naturalism — representing people, animals, and objects in believable, lifelike ways. They also developed linear perspective, arranging lines and forms to suggest depth on flat surfaces.</p>
      </div>

      <div className="explore__grid-two">
        <div className="paper-card explore__term-card">
          <img src="/assets/Kerch Vase Painting.jpg" alt="Kerch Vase Painting" loading="lazy" />
          <h4>Kerch Vase Painting</h4>
          <p>A form of Greek red-figure pottery named after Kerch, where many examples were found. Common subjects included women's lives and mythological scenes, representing the final flowering of the red-figure tradition.</p>
        </div>
        <div className="paper-card explore__term-card">
          <img src="/assets/Pitsa Panel.jpg" alt="The Pitsa Panel" loading="lazy" />
          <h4>The Pitsa Panel (c. 540–530 BCE)</h4>
          <p>One of the earliest surviving examples of Greek panel painting. It depicts a religious procession with figures bearing offerings, providing rare direct evidence of ancient Greek painting techniques.</p>
        </div>
      </div>

      <h3 className="explore__sub-heading">Greek Pottery Forms</h3>
      <div className="explore__vessels-grid">
        {vessels.map((v, i) => (
          <div key={i} className="paper-card explore__vessel-card">
            <img src={v.img} alt={v.name} loading="lazy" />
            <h4>{v.name}</h4>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="explore__grid-two">
        <div className="paper-card explore__term-card">
          <img src="/assets/Tomb Painting.jpg" alt="Tomb Painting" loading="lazy" />
          <h4>Tomb & Wall Painting</h4>
          <p>Images painted in burial spaces and on walls, depicting banquet scenes, athletics, myths, and religious rituals connected to beliefs about death and the afterlife.</p>
        </div>
        <div className="paper-card">
          <h4>Painting Techniques</h4>
          <ul className="explore__list">
            <li><strong>Tempera</strong> — Pigments mixed with a water-based binding material</li>
            <li><strong>Encaustic</strong> — Pigments mixed with heated wax for application</li>
            <li><strong>Fresco</strong> — Pigment placed on fresh wet plaster, bonding as it dries</li>
            <li><strong>Polychromy</strong> — The use of several colors together in a work of art</li>
            <li><strong>Red-Figure Pottery</strong> — Figures left in clay color while the background is painted dark</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('prehistoric');
  const [headerRef, headerVisible] = useInView();

  const renderContent = () => {
    switch (activeTab) {
      case 'prehistoric': return <PrehistoricSection />;
      case 'stone-tools': return <StoneToolsSection />;
      case 'medieval': return <MedievalSection />;
      case 'artists-intro': return <ArtistsIntroSection />;
      case 'greek': return <GreekSection />;
      default: return <PrehistoricSection />;
    }
  };

  return (
    <section id="explore" className="explore section">
      <div className="container">
        <div ref={headerRef} className={`fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Explore Western Art History</h2>
          <p className="section-subtitle">From cave walls to cathedral windows — a journey through five millennia of creativity</p>
          <div className="section-divider" />
        </div>

        <div className="explore__tabs" role="tablist" aria-label="Art history topics">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`explore__tab ${activeTab === tab.id ? 'explore__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="explore__panel" role="tabpanel">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
