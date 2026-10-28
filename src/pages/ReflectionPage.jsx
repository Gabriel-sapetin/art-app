import { useInView } from '../hooks/useInView';
import './ReflectionPage.css';

export default function ReflectionPage() {
  const [headerRef, headerVisible] = useInView();
  const [contentRef, contentVisible] = useInView();

  return (
    <section id="reflection" className="reflection section">
      <div className="container">
        <div ref={headerRef} className={`fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Art Appreciation Reflection</h2>
          <p className="section-subtitle">A collective dialogue on memory, human expression, and historical continuity</p>
          <div className="section-divider" />
        </div>

        {/* Epigraph / Quotation */}
        <div className="reflection__quote-card paper-card">
          <blockquote className="reflection__quote">
            “Art does not reproduce what we see; rather, it makes us see.”
          </blockquote>
          <cite className="reflection__quote-author annotation">— Paul Klee, <em>Creative Credo</em> (1920)</cite>
        </div>

        <div ref={contentRef} className={`reflection__essay-grid fade-in ${contentVisible ? 'visible' : ''}`}>
          {/* Theme 1 */}
          <article className="reflection__card paper-card">
            <div className="reflection__card-number plate-label">Reflection 01</div>
            <h3>What We Discovered Across Historical Epochs</h3>
            <p>
              When our group began dissecting Module 3 on Western Art History, we initially anticipated a simple timeline of names, dates, and stylistic movements. However, working through the material revealed that art has never been a passive chronicle of events. Instead, it is an active testament to human consciousness.
            </p>
            <p>
              In the subterranean caverns of El Castillo, hand stencils blown across mineral pigments spoke not of primitive silence, but of an urgent primal statement: <em>“We were here, we observed the bison, we communed with this earth.”</em> Moving through the lithic reduction of Acheulean hand axes to the luminous tesserae of Byzantine mosaics and the mathematical clarity of Brunelleschi’s perspective, we realized that technique always develops in tandem with how societies view their place in the universe.
            </p>
          </article>

          {/* Theme 2 */}
          <article className="reflection__card paper-card">
            <div className="reflection__card-number plate-label">Reflection 02</div>
            <h3>Art as an Unfiltered Mirror of Beliefs and Society</h3>
            <p>
              One of the most profound lessons from our study was observing how artworks directly mirror the anxieties, spiritual aspirations, and daily realities of earlier peoples.
            </p>
            <p>
              In Classical Greece, pottery vessels such as the <em>krater</em> and <em>lebes gamikos</em> bridged practical domestic life and high mythology; every wine-mixing ceremony and wedding bath was consecrated with painted imagery of the gods and civic triumphs. In the medieval era, illuminated manuscripts and stained glass cathedrals functioned as monumental visual scriptures for communities where reading text was a rare privilege. The soaring verticality of Gothic naves and the shimmering gold grounds of Cimabue and Giotto were designed to orient mortal eyes toward the divine.
            </p>
          </article>

          {/* Theme 3 */}
          <article className="reflection__card paper-card">
            <div className="reflection__card-number plate-label">Reflection 03</div>
            <h3>Why Preserving and Studying Historical Art Matters</h3>
            <p>
              In our contemporary world, saturated by ephemeral digital imagery and algorithmically generated content, the tangible artifacts of Western art history remind us of patience, physical labor, and historical gravity.
            </p>
            <p>
              A 230-foot embroidered artifact like the Bayeux Tapestry or the delicate tempera paint on the cedar wood of the Pitsa Panel survive because human hands dedicated years of their lives to crafting them. Preserving these artifacts is not mere nostalgia — it is an ethical responsibility to keep humanity’s cultural memory intact. When we study the past, we develop visual literacy and cultural empathy, learning to read symbols that shaped civilization’s shared vocabulary.
            </p>
          </article>

          {/* Theme 4 */}
          <article className="reflection__card paper-card">
            <div className="reflection__card-number plate-label">Reflection 04</div>
            <h3>How Western Art Informs Modern Artistic Expression</h3>
            <p>
              Every contemporary discipline — from graphic design and web typography to cinematography and 3D architectural rendering — traces its roots back to the breakthroughs examined in this module.
            </p>
            <p>
              Leon Battista Alberti’s codification of single-point linear perspective in <em>De Pictura</em> provides the mathematical geometry that underpins modern computer graphics. Donatello’s daring naturalism and psychological weight in the bronze <em>David</em> paved the way for modern character modeling and emotive portraiture. By building this interactive sketchbook, our group did not just summarize historical facts; we engaged in the very same creative dialogue that connects the cave painters of Cantabria to the digital creators of tomorrow.
            </p>
          </article>
        </div>

        {/* Group Synthesis Banner */}
        <div className="reflection__synthesis paper-card">
          <div className="reflection__synthesis-header">
            <span className="plate-label">Group 3 Collective Consensus</span>
            <h4>The Living Sketchbook Takeaway</h4>
          </div>
          <p>
            Art appreciation is neither a luxury nor a dry academic exercise. It is the practice of looking deeply, asking questions, and recognizing our shared human experience across millennia. Whether shaped by a flint blade in Olduvai Gorge or drafted upon digital parchment in this interactive journal, human creativity remains our most resilient bridge across time.
          </p>
        </div>
      </div>
    </section>
  );
}
