# Atelier Occidental — An Interactive Western Art History Sketchbook

> **Midterm Project in Art Appreciation (GE-ART)**  
> **Assigned Topic:** Group 3 — The Western Art History  
> **Primary Curriculum Foundation:** Art Appreciation Module 3: The Western Art History  
> **Visual Reference Concept:** Tactile, illustrated sketchbook journal inspired by [ThreeUI Sketchbook](https://threeui.com/landing-pages/meng-to-sketchbook-landing-page)  
> **Submission Deadline:** October 29, 2026

---

## 🏛️ Project Overview

**Atelier Occidental** is an original, interactive educational website and living digital art journal designed for our Art Appreciation midterm project. Moving decisively beyond a generic school report or static slide presentation, this website invites visitors into an illustrated sketchbook of Western art history spanning five millennia.

The website synthesizes all core lessons and concepts from **Module 3: The Western Art History**, freshly articulated in our own student voice, and bridges academic rigor with tactile, museum-grade user interactions.

---

## 🎨 Visual Identity & ThreeUI Design Inspiration

- **Website Identity:** *Atelier Occidental* (“The Western Workshop / Studio”)
- **Atmosphere:** An archival, hand-bound art historian’s journal combining parchment textures, warm ivory, muted sienna, and restrained historical accents.
- **Typography:** Expressive serif display titles (*Playfair Display*) paired with clean body text (*Inter*) and handwritten curatorial marginalia (*Caveat*).
- **Tactile Sketchbook Viewer:** A bound two-page journal format featuring spine shading, bookmark ribbon, page-turn transitions, and folio numbering.
- **Curatorial Loupe:** An interactive, movable magnifying glass enabling visitors to inspect brushwork and pigment texture on historical plates.
- **Editorial Index:** A quick-jump directory enabling direct browsing of all 16 curated plates across prehistoric, medieval, and classical Greek civilizations.

---

## 📚 Module 3 Academic Curriculum Coverage

The website directly covers the required subjects outlined in the course module:

1. **Prehistoric Art & Civilizations**
   - Definition of prehistoric art and early decorative discoveries (~100,000 BP).
   - Major epochs: Stone Age, Neolithic, Bronze Age, and Iron Age.
   - Petroglyphs (carved/pecked) vs. Pictographs (painted).
   - Ancient sculpture, totem figures, and Megalithic monuments.
   - Cantabrian cave art: El Castillo Cave (Spain), discovered by Hermilio Alcalde del Río in 1903, featuring hand stencils, disks, and claviforms dated to >40,800 BP.
   - Neanderthal (*Homo neanderthalensis*) artistic authorship debates.

2. **Stone Tools & Early Artmaking**
   - Rock classifications: Sedimentary, Metamorphic, and Igneous (volcanic).
   - Archaeological significance of Olduvai Gorge (Tanzania).
   - Four Paleolithic tool traditions:
     - Pebble tools / pebble choppers.
     - Bifacial tools and Acheulean hand axes.
     - Flake tools and the retouche process.
     - Blade tools and lithic reduction.
   - Distinguishing natural eoliths from deliberate human knapping.

3. **Medieval Arts in Europe**
   - Synthesis of Roman, Early Christian, Byzantine, and Northern traditions.
   - Disciplines covered with dedicated visual plates:
     - Illuminated Manuscripts & craft of the illuminator.
     - Byzantine Mosaics & gold tesserae.
     - Gothic Stained Glass and lead came structures.
     - The Bayeux Tapestry (continuous 230-foot embroidered linen).
     - Fresco and panel painting (tempera on wood).
     - Ceramics, metallurgy, goldsmithing, and heraldic coat of arms.

4. **Important Artists in Western Europe (Meet the Masters)**
   - **Donatello (Donato di Niccolò di Betto Bardi):** Revolutionized sculpture; bronze *David* (first freestanding nude since antiquity); *schiacciato* relief technique.
   - **Giotto di Bondone:** Proto-Renaissance pioneer; human emotional weight and foreshortening in Scrovegni Chapel frescoes.
   - **Leon Battista Alberti:** Epitome of the *Renaissance Man*; architectural theorist and author of *De Pictura* (codifying linear perspective).
   - **Giovanni Cimabue (Cenni di Pepo):** Transitional master bridging the Italo-Byzantine style with emergent naturalism.
   - **Filippo Brunelleschi:** Key founder of Renaissance architecture; double-shell dome of Santa Maria del Fiore (Florence).
   - **Fra Angelico:** Early Renaissance spiritual master; frescoes at the convent of San Marco in Florence.
   - **Lorenzo Ghiberti:** Sculptor and goldsmith; Florence Baptistery bronze doors (*Gates of Paradise*).
   - Vasari's *Lives of the Artists* as the historical recording foundation.

5. **Classical Greek Painting & Pottery**
   - Kerch vase painting and late red-figure developments.
   - Naturalism, polychromy, and spatial representation.
   - Surviving wooden panel painting: *The Pitsa Panel* (c. 540–530 BCE).
   - Tomb and wall painting rituals.
   - Medium comparison: Tempera vs. Encaustic vs. Fresco.
   - Four distinguished Greek pottery forms:
     - **Krater:** Broad vessel for mixing wine and water.
     - **Lebes Gamikos:** Wedding vessel for bridal ritual baths.
     - **Lekanis:** Shallow bowl with horizontal handles and low base.
     - **Pelike:** Pear-shaped container for wine and oil storage.

---

## 🕹️ Interactive Learning Zone (4 Distinct Activities)

1. **Art History Quiz:** 10-item comprehensive assessment covering all 5 topics with immediate feedback, detailed explanations, and score review.
2. **Match the Masters & Terms:** Tactile pairing activity with filtering categories (Western Masters, Greek Pottery Vessels, and All Antiquities) and visual success states.
3. **Guess the Specimen:** Mystery plate identification activity featuring incremental clue reveals and instant curatorial verification.
4. **Western Art Appreciation Poll:** Interactive live tally capturing visitor sentiment across historical epochs.

---

## 💬 Visitor Inscription Guestbook

- Persistent local storage via HTML5 LocalStorage (`atelier_occidental_comments_v1`).
- Input validation (name, topic selection, minimum/maximum character checks).
- XSS defense sanitization against malicious input.
- Real-time guestbook feed with category filtering and peer endorsement likes.

---

## 👥 Curatorial Committee & Mentorship

- **Group 3 Working Team:** Complete roles assigned across Content Architecture, Interactive Engineering, Antiquities Research, Medieval History, and Pedagogy.
- **Academic Mentorship:** Course instructor profile with official privacy disclosures.

---

## 📖 Scholarly References & Image Rights

- APA 7th edition bibliography listing primary curricular module, Gardner's *Art Through the Ages*, Boardman, Vasari, Alberti, and Metropolitan Museum of Art archives.
- Complete image rights table specifying archives and Public Domain / CC BY-SA licenses.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Development
```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

