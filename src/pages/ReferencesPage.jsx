import { useInView } from '../hooks/useInView';
import './ReferencesPage.css';

export const academicCitations = [
  {
    type: "Primary Curricular Module",
    citation: "Commission on Higher Education (CHED) / College Faculty Consortium. (2024). Module 3: The Western Art History [Course Study Guide and Reviewer]. Art Appreciation (GE-ART) Instructional Materials Repository."
  },
  {
    type: "Authoritative Scholarly Reference",
    citation: "Kleiner, F. S. (2020). Gardner's art through the ages: A global history (16th ed.). Cengage Learning."
  },
  {
    type: "Classical Art & Greek Pottery Authority",
    citation: "Boardman, J. (2001). The history of Greek vases: Potters, painters and pictures. Thames & Hudson."
  },
  {
    type: "Renaissance Art History Primary Document",
    citation: "Vasari, G. (1998). The lives of the artists (J. C. Bondanella & P. Bondanella, Trans.). Oxford World's Classics. (Original work published 1550/1568)."
  },
  {
    type: "Architectural & Perspective Theory",
    citation: "Alberti, L. B. (1991). On painting (C. Grayson, Trans.). Penguin Classics. (Original work written 1435)."
  },
  {
    type: "Prehistoric Archaeology & Cave Art Chronology",
    citation: "Pike, A. W. G., Hoffmann, D. L., García-Diez, M., Pettitt, P. B., Alcolea, J., De Balbín, R., ... & Zilhão, J. (2012). U-series dating of Paleolithic art in 11 caves in Spain. Science, 336(6087), 1409–1413."
  },
  {
    type: "Museum Curatorial Archives",
    citation: "The Metropolitan Museum of Art. (2000–present). Heilbrunn Timeline of Art History. https://www.metmuseum.org/toah/"
  }
];

export const imageAttributions = [
  {
    subject: "El Castillo Cave Paintings (Hand stencils, disks, claviforms)",
    source: "Cave of El Castillo, Puente Viesgo, Cantabria, Spain / Wikimedia Commons",
    license: "Public Domain / Educational fair use for instructional evaluation"
  },
  {
    subject: "Donatello (Donato di Niccolò di Betto Bardi) Portrait & Bronze Works",
    source: "Galleria degli Uffizi & Museo Nazionale del Bargello, Florence, Italy",
    license: "Public Domain (Artworks predate 1928 / PD-Art)"
  },
  {
    subject: "Giotto di Bondone — Fresco Details (Scrovegni Chapel)",
    source: "Cappella degli Scrovegni, Padua, Italy / Wikimedia Commons",
    license: "Public Domain (Created c. 1305 / PD-Art)"
  },
  {
    subject: "Leon Battista Alberti Portrait & Architectural Ensembles",
    source: "Palazzo Rucellai & Santa Maria Novella Archives, Florence",
    license: "Public Domain (PD-Art)"
  },
  {
    subject: "Giovanni Cimabue — Maestà & Crucifix Details",
    source: "Basilica of San Francesco, Assisi & Uffizi Gallery, Florence",
    license: "Public Domain (Created c. 1280–1290 / PD-Art)"
  },
  {
    subject: "Filippo Brunelleschi — Portrait & Florence Cathedral Dome",
    source: "Opera di Santa Maria del Fiore, Florence, Italy",
    license: "Public Domain (Created 1420–1436 / PD-Art)"
  },
  {
    subject: "Fra Angelico — Annunciation & San Marco Frescoes",
    source: "Museo di San Marco, Florence, Italy",
    license: "Public Domain (Created c. 1440–1442 / PD-Art)"
  },
  {
    subject: "Lorenzo Ghiberti — Gates of Paradise (Florence Baptistery)",
    source: "Battistero di San Giovanni, Florence / Museo dell'Opera del Duomo",
    license: "Public Domain (Created 1425–1452 / PD-Art)"
  },
  {
    subject: "The Bayeux Tapestry (Embroidery on Linen)",
    source: "Musée de la Tapisserie de Bayeux, Normandy, France",
    license: "Public Domain (Created c. 1070s / PD-Art)"
  },
  {
    subject: "The Pitsa Panel (Painted Archaic Wood)",
    source: "National Archaeological Museum, Athens, Greece",
    license: "Public Domain (Created c. 540–530 BCE / PD-Old-100)"
  },
  {
    subject: "Classical Greek Vessels (Krater, Lebes Gamikos, Lekanis, Pelike)",
    source: "The British Museum & The Metropolitan Museum of Art Open Access",
    license: "Creative Commons Zero (CC0) / Public Domain"
  },
  {
    subject: "Paleolithic Stone Tools (Acheulean Hand Axe, Blade & Flake Tools)",
    source: "Olduvai Gorge Archaeological Repository / Wikimedia Commons",
    license: "Creative Commons Attribution-ShareAlike (CC BY-SA 4.0)"
  }
];

export default function ReferencesPage() {
  const [headerRef, headerVisible] = useInView();

  return (
    <section id="references" className="references section">
      <div className="container">
        <div ref={headerRef} className={`fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">References and Image Credits</h2>
          <p className="section-subtitle">Scholarly bibliography, curriculum alignment, and archival licensing documentation</p>
          <div className="section-divider" />
        </div>

        {/* Curriculum Alignment Notice */}
        <div className="references__banner paper-card">
          <div className="references__banner-badge">
            <span className="plate-label">Academic Integrity & Alignment</span>
          </div>
          <h4>Curricular Alignment Statement</h4>
          <p>
            In strict compliance with the midterm project requirements for Art Appreciation, this interactive digital sketchbook is anchored directly in <strong>Module 3: The Western Art History</strong> provided by our instructor. All historical explanations, terminology definitions (such as lithic reduction, claviforms, polychromy, and the Italo-Byzantine tradition), artist biographies, and pottery classifications have been synthesized and re-explained in our own words to demonstrate comprehensive student understanding.
          </p>
        </div>

        {/* APA 7th Edition Citations */}
        <div className="references__section-block">
          <h3 className="references__section-title">
            <span className="plate-label">Section I</span>
            Academic Bibliography (APA 7th Edition)
          </h3>
          <div className="references__citations-list paper-card">
            {academicCitations.map((item, index) => (
              <div key={index} className="references__citation-entry">
                <span className="plate-label references__citation-type">{item.type}</span>
                <p className="references__apa-text">{item.citation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Material Attributions & Licensing */}
        <div className="references__section-block">
          <h3 className="references__section-title">
            <span className="plate-label">Section II</span>
            Curated Visual Material & Image Rights
          </h3>
          <div className="references__credits-table-wrap paper-card">
            <table className="references__table">
              <thead>
                <tr>
                  <th scope="col">Artwork / Historical Artifact</th>
                  <th scope="col">Curatorial Archive / Source</th>
                  <th scope="col">Licensing / Copyright Status</th>
                </tr>
              </thead>
              <tbody>
                {imageAttributions.map((row, i) => (
                  <tr key={i}>
                    <td className="references__table-subject">
                      <strong>{row.subject}</strong>
                    </td>
                    <td className="references__table-source">{row.source}</td>
                    <td className="references__table-license">
                      <span className="references__license-pill">{row.license}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Original Creative Work Notice */}
        <div className="references__originality paper-card">
          <h4>Original Creative Contributions</h4>
          <p>
            The website identity <strong>Atelier Occidental</strong>, editorial layout, interactive ThreeUI-inspired tactile sketchbook viewer, dynamic magnifying loupe component, quiz and matching game design, educational synthesis diagrams, and student reflections are the original creative outputs of <strong>Group 3</strong> for the Midterm Project in Art Appreciation (October 2026).
          </p>
        </div>
      </div>
    </section>
  );
}
