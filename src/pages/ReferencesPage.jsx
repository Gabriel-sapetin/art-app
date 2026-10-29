import { useInView } from '../hooks/useInView';
import CommentsSection from './CommentsSection';
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

export default function ReferencesPage() {
  const [sec1Ref, sec1Visible] = useInView({ threshold: 0.05 });

  return (
    <>
    <section id="references" className="references section">
      <div className="container">
        {/* Academic Bibliography */}
        <div ref={sec1Ref} className={`references__section-block scroll-ease-in ${sec1Visible ? 'visible' : ''}`} style={{ transitionDelay: '0.04s' }}>
          <h3 className="references__section-title">
            Academic Bibliography
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
      </div>
    </section>

    <CommentsSection />
  </>
  );
}

