// Guided storytelling data for Explore Western Art History
// Grounded in Module 3: The Western Art History
import blankImage from '../../assets/blank.jpg';

export const exploreSections = {
  prehistoric: {
    id: 'prehistoric',
    title: 'Prehistoric Art',
    tag: 'c. 40,000 to 1,000 BCE',
    bg: '/assets/prehistoric bg.jpg',
    summary: 'The dawn of human creative expression before written history.',
    steps: [
      {
        id: 'intro',
        title: 'What Is Prehistoric Art?',
        subtitle: 'The Dawn of Human Creativity',
        badge: 'Introduction · Step 1 of 5',
        type: 'intro',
        paragraphs: [
          'Prehistoric art refers to all visual works created before people began keeping written records. Since writing first appeared in ancient Mesopotamia before 3000 B.C.E., the term covers art produced earlier, such as cave paintings, carvings, early sculptures, and structures that early humans used to express ideas, beliefs, and experiences about their world.',
          'Some of the earliest known examples of decorative art have been found in Africa and are estimated to be around 100,000 years old. These works remind us that the impulse to create is deeply woven into what it means to be human.'
        ],
        image: '/assets/El Castillo Cave Painting, Spain (the oldest European cave art, with hand stencils, claviforms and disks).jpg',
        imageCaption: 'El Castillo Cave, Spain: Hand stencils and red disk markings dated to at least 40,800 years ago.',
        imageMeta: 'Hermilio Alcalde del Río Discovery (1903)'
      },
      {
        id: 'periods',
        title: 'Main Periods of Prehistoric Art',
        subtitle: 'Chronological Progression of Early Human Culture',
        badge: 'Historical Epochs · Step 2 of 5',
        type: 'interactive-periods',
        lead: 'Prehistoric human development is traditionally divided into major epochs, each marked by monumental breakthroughs in materials, technology, and artistic ambition:',
        items: [
          {
            name: 'Stone Age',
            period: 'c. 2.5 Million to 3,000 BCE',
            desc: 'The earliest and longest era of human tool use and artistic creation, spanning the Paleolithic and Mesolithic eras. Early humans pioneered cave painting, rock engraving, and portable animal figurines.',
            img: '/assets/stone age.jpg'
          },
          {
            name: 'Neolithic Period',
            period: 'c. 10,000 to 4,500 BCE',
            desc: 'Marked by the development of agriculture, animal domestication, pottery, and permanent stone settlements. Societies engineered monumental megalithic architecture and refined ceramics.',
            img: '/assets/neolithic age.jpg'
          },
          {
            name: 'Bronze Age',
            period: 'c. 3,300 to 1,200 BCE',
            desc: 'Characterized by copper-tin metallurgy, urban civilizations, and elaborate ceremonial metalwork. Visual motifs became symbols of leadership, warfare, and cosmological rituals.',
            img: '/assets/bronze age.jpg'
          },
          {
            name: 'Iron Age',
            period: 'c. 1,200 to 500 BCE',
            desc: 'The widespread adoption of smelted iron transformed tools, weapons, and artistic craft, fostering intricate Celtic metalwork, geometric pottery, and monumental hillforts.',
            img: '/assets/iron age.jpg'
          }
        ]
      },
      {
        id: 'purpose',
        title: 'Why Early People Made Art',
        subtitle: 'Spiritual Beliefs, Survival & Community Memory',
        badge: 'Cultural Meaning · Step 3 of 5',
        type: 'split',
        paragraphs: [
          'Art in prehistoric times was far more than simple aesthetic decoration. In communities dependent upon hunting, foraging, and early pastoralism, images were vital conduits of survival and spiritual belief.',
          'Animals appear frequently, including bison, horses, mammoths, and deer, often painted deep inside dark cave recesses where ceremonies likely took place. These images may have served hunting magic, tribal identity, or ancestor veneration.',
          'Hand stencils created by blowing powdered pigment over a hand pressed against stone served as enduring personal signatures across millennia, asserting: "We were here."'
        ],
        bulletTitle: 'Core Functions of Prehistoric Imagery',
        bullets: [
          'Visual Communication long before written text existed',
          'Hunting Rituals & spiritual respect for quarry animals',
          'Astronomical Observation & seasonal fertility ceremonies',
          'Intergenerational Knowledge transmission across nomadic clans'
        ],
        image: blankImage,
        fallbackImage: '/assets/El Castillo Cave Painting, Spain (the oldest European cave art, with hand stencils, claviforms and disks).jpg',
        imageCaption: 'Polychrome fauna and symbolic marks painted deep within European cave chambers.',
        imageMeta: 'Parietal Cave Art Traditions'
      },
      {
        id: 'forms',
        title: 'Early Art Forms & Rock Markings',
        subtitle: 'Petroglyphs, Pictographs, Sculpture & Megaliths',
        badge: 'Artistic Media · Step 4 of 5',
        type: 'interactive-items',
        lead: 'Early peoples expressed their worldview across distinct durable physical mediums:',
        items: [
          {
            name: 'Petroglyphs',
            category: 'Rock Engraving',
            desc: 'Pictures or patterns carved, scratched, or pecked directly into natural stone surfaces. Found on every continent, they recorded hunts and tribal emblems.',
            img: '/assets/petroglyphs.jpg'
          },
          {
            name: 'Pictographs',
            category: 'Painted Stone',
            desc: 'Images painted or drawn on rock surfaces using natural mineral pigments, charcoal, or ochre mixed with water or animal fat.',
            img: '/assets/pictographs.jpg'
          },
          {
            name: 'Ancient Sculpture',
            category: 'Three-Dimensional Art',
            desc: 'Small portable figures carved from stone, ivory, bone, or modelled in clay. Many represented fertility totems or guardian spirits.',
            img: '/assets/ancient sculpture.jpeg'
          },
          {
            name: 'Megalithic Art',
            category: 'Monumental Architecture',
            desc: 'Monumental structures of dressed stone, including dolmens, passage graves, and stone circles decorated with geometric spirals and cupules.',
            img: '/assets/megalithics.jpg'
          }
        ]
      },
      {
        id: 'discoveries',
        title: 'El Castillo Cave & Neanderthal Research',
        subtitle: 'Pushing Back the Origins of Human Creativity',
        badge: 'Archaeological Frontier · Step 5 of 5',
        type: 'split',
        paragraphs: [
          'Located in Cantabria, Spain, El Castillo Cave contains some of the oldest European cave artworks discovered. In 1903, Spanish archaeologist Hermilio Alcalde del Río recognized its extraordinary paleolithic paintings.',
          'Modern uranium-thorium dating established that red disk markings and negative hand stencils inside El Castillo date back to at least 40,800 years ago, coinciding with the arrival of early Homo sapiens in Europe.',
          'Crucially, this early date raises the fascinating hypothesis that Neanderthals (Homo neanderthalensis) may have contributed to some of the oldest European wall paintings, fundamentally reshaping our understanding of hominid cognitive capability.'
        ],
        didYouKnow: 'Claviforms are enigmatic club-shaped signs found carved and painted in Cantabrian caves whose exact ceremonial or heraldic purpose remains one of archaeology\'s greatest mysteries.',
        image: '/assets/claviforms.jpg',
        imageCaption: 'Claviform (club-shaped) signs and discs at El Castillo Cave, Cantabria, Spain.',
        imageMeta: 'Uranium-Thorium Dating: ~40,800 BP'
      }
    ]
  },

  'stone-tools': {
    id: 'stone-tools',
    title: 'Stone Tools & Early Artmaking',
    tag: 'Lithic Technology',
    bg: '/assets/stone tools bg.jpg',
    summary: 'How early humans shaped natural rock into tools for survival and aesthetic mastery.',
    steps: [
      {
        id: 'intro',
        title: 'Stone Tools and Early Artmaking',
        subtitle: 'The Material Foundations of Human Culture',
        badge: 'Raw Materials · Step 1 of 5',
        type: 'split',
        paragraphs: [
          'Early humans worked with natural materials, primarily stone, but also wood, bone, ivory, and antler, to develop implements for survival and creative expression. Stone tools, appearing over 2.5 million years ago, enabled early humans to butcher game, scrape hides, engrave bones, and shape their world.',
          'The choice of rock was paramount: early knappers sought stones that fractured predictably through conchoidal breakage, yielding razor-sharp edges.'
        ],
        bulletTitle: 'The Three Geological Rock Families',
        bullets: [
          'Igneous Rocks: Formed when molten lava or magma cools and solidifies (basalt, obsidian, granite)',
          'Sedimentary Rocks: Formed from compressed sediments over millennia (flint, chert, limestone, sandstone)',
          'Metamorphic Rocks: Transformed under extreme heat and pressure (quartzite, slate, marble)'
        ],
        image: '/assets/igneous rock.jpg',
        imageCaption: 'Fracture-predictable rock specimens selected by paleolithic toolmakers.',
        imageMeta: 'Lithic Raw Material Selection'
      },
      {
        id: 'pebble-tools',
        title: 'Pebble Tools & Pebble Choppers',
        subtitle: 'Oldowan Tradition · The Earliest Implements',
        badge: 'Lithic Stage I · Step 2 of 5',
        type: 'split',
        paragraphs: [
          'Pebble tools represent humanity\'s earliest deliberate tool manufacturing tradition. By striking a rounded river cobble with another hammerstone, early hominids detached a few sharp flakes to create a single jagged cutting edge.',
          'The remaining stone pebble served as an effective hand-held chopper used for breaking marrow bones and severing tough fibrous plants.',
          'This Oldowan tool tradition, discovered in the lower beds of Olduvai Gorge, represents the cognitive leap from utilizing found objects to deliberately engineering purposeful shapes.'
        ],
        bulletTitle: 'Key Characteristics of Pebble Choppers',
        bullets: [
          'Manufactured from water-worn river cobbles (basalt or quartz)',
          'Unifacial percussion flaking along one primary margin',
          'Associated with early hominids including Homo habilis (Handy Man)',
          'Dating from approximately 2.6 to 1.7 million years ago'
        ],
        image: '/assets/pebble tool.jpg',
        imageCaption: 'Oldowan pebble chopper with flaked cutting edge, Olduvai Gorge tradition.',
        imageMeta: 'Oldowan Industrial Complex'
      },
      {
        id: 'bifacial-tools',
        title: 'Bifacial Tools & Acheulean Hand Axes',
        subtitle: 'Symmetry, Balance & Aesthetic Emergence',
        badge: 'Lithic Stage II · Step 3 of 5',
        type: 'split',
        paragraphs: [
          'Bifacial tools represent a revolutionary advance in human craftsmanship: knappers worked both faces of a stone core to produce a balanced, teardrop or almond-shaped cutting edge all the way around.',
          'Known as Acheulean hand axes (after Saint-Acheul in France), these multi-purpose tools were used for slicing, piercing, wood-working, and defensive weapons.',
          'Archaeologists observe that many Acheulean hand axes exhibit symmetrical beauty far beyond utilitarian necessity, signaling the birth of an aesthetic sensibility in our ancestors.'
        ],
        bulletTitle: 'The Acheulean Breakthrough',
        bullets: [
          'Bifacial reduction: worked evenly across two opposing surfaces',
          'Teardrop and ovate profiles requiring mental predetermination',
          'Soft-hammer percussion using bone or antler batons for refined flaking',
          'Associated with Homo erectus across Africa, Europe, and western Asia'
        ],
        image: '/assets/bifacial tool.jpg',
        imageCaption: 'Acheulean bifacial hand axe exhibiting sophisticated bilateral symmetry.',
        imageMeta: 'Acheulean Tradition (~1.7M to 200,000 BP)'
      },
      {
        id: 'flake-tools',
        title: 'Flake Tools & The Retouching Technique',
        subtitle: 'Levallois Prepared-Core Technology',
        badge: 'Lithic Stage III · Step 4 of 5',
        type: 'split',
        paragraphs: [
          'Rather than relying on the heavy central core, Middle Paleolithic craftspeople developed prepared-core techniques (such as the Levallois technique). A flint nodule was meticulously shaped so that a single decisive strike detached a pre-planned, razor-sharp flake.',
          'The detached flake was then refined through retouching by pressing off tiny secondary chips along the periphery to produce specialized scrapers, burins, awls, and spear points.',
          'This allowed Neanderthals and early modern humans to manufacture lighter, hafted hunting tools and tailored hide garments.'
        ],
        bulletTitle: 'Technical Advancements in Flake Production',
        bullets: [
          'Predetermined flake geometry struck from carefully faceted tortoiseshell cores',
          'Secondary pressure retouching to hone steep scraping angles',
          'Mousterian tool industry characteristic of Neanderthal communities',
          'First evidence of compound tools bound with resin and sinew to wooden shafts'
        ],
        image: '/assets/flake tool.jpg',
        imageCaption: 'Flake tool with delicate secondary marginal retouching along the cutting margin.',
        imageMeta: 'Levallois / Mousterian Technology'
      },
      {
        id: 'blade-tools',
        title: 'Blade Tools & Olduvai Gorge Significance',
        subtitle: 'Upper Paleolithic Mastery & Great Discoveries',
        badge: 'Lithic Stage IV · Step 5 of 5',
        type: 'split',
        paragraphs: [
          'Blade tools are long, narrow stone flakes whose length is at least twice their width, possessing parallel edges. Produced through sophisticated lithic reduction, a single flint core could yield dozens of uniform, surgical-grade blades.',
          'These blades were inserted into grooved bone, antler, or wooden handles to create composite harpoons, sickles, and fine engraving burins used to carve portable art.',
          'Olduvai Gorge in Tanzania stands as one of the most celebrated paleoanthropological sites on Earth. Pioneered by Louis and Mary Leakey, the gorge\'s stratified volcanic ash beds provided the world with definitive chronologies of stone tool evolution.'
        ],
        bulletTitle: 'Legacy of Olduvai Gorge',
        bullets: [
          'Stratified sequence documenting Oldowan, Acheulean, and blade industries',
          'Confirmed eastern Africa as the evolutionary cradle of human technology',
          'Direct correlation between stone tool refinement and expanded hominid cranial capacity'
        ],
        image: '/assets/blade tools.jpg',
        imageCaption: 'Slender Upper Paleolithic prismatic blade tools struck from prepared flint cores.',
        imageMeta: 'Prismatic Blade Technology · Olduvai Gorge'
      }
    ]
  },

  medieval: {
    id: 'medieval',
    title: 'Medieval Art in Europe',
    tag: '5th to 15th Century CE',
    bg: '/assets/medieval bg.jpg',
    summary: 'Sacred grandeur, luminous stained glass, and royal craftsmanship of the Middle Ages.',
    steps: [
      {
        id: 'intro',
        title: 'Medieval Art in Europe',
        subtitle: 'Roman Heritage, Christian Faith & Northern Traditions',
        badge: 'Historical Overview · Step 1 of 5',
        type: 'split',
        paragraphs: [
          'Medieval art, produced over a thousand-year span between the fall of the Western Roman Empire and the dawn of the Renaissance, wove together Greco-Roman artistic traditions, early Christian theology, and the vibrant decorative arts of northern European and Celtic peoples.',
          'Art in the Middle Ages was overwhelmingly sacred in purpose, created to honor the divine, inspire reverent awe, and visually communicate biblical stories to largely non-literate congregations.'
        ],
        bulletTitle: 'Three Great Traditions of the Middle Ages',
        bullets: [
          'Early Christian Art: Catacomb frescoes, sarcophagi, and the establishment of Christian iconography',
          'Byzantine Art: Hieratic golden mosaics, painted wooden icons, and dome architectures of Constantinople',
          'Gothic Art: Soaring ribbed vaults, pointed arches, expressive stone sculptures, and stained glass windows'
        ],
        image: '/assets/byzantine art.jpg',
        imageCaption: 'The sacred majesty and golden illumination characteristic of medieval European art.',
        imageMeta: 'Christian Medieval Traditions'
      },
      {
        id: 'manuscripts',
        title: 'Illuminated Manuscripts',
        subtitle: 'The Scriptorium Masterpieces of Monastic Scribes',
        badge: 'Bookmaking Art · Step 2 of 5',
        type: 'split',
        paragraphs: [
          'Illuminated manuscripts are lavish handwritten books penned on animal parchment or vellum, decorated with vivid mineral pigments, intricate marginalia, and burnished gold and silver leaf.',
          'Created by dedicated scribes and illuminators inside monastic scriptoriums, each book required months or even years of painstaking labor.',
          'These sacred volumes preserved biblical texts, philosophical treatises, and Classical literature through centuries when the printing press was yet unknown.'
        ],
        bulletTitle: 'Craftsmanship of the Medieval Book',
        bullets: [
          'Vellum and parchment prepared from scraped calf, sheep, or goat skins',
          'Pigments derived from crushed lapis lazuli (ultramarine), malachite, cinnabar, and gold leaf',
          'Elaborate historiated initial capitals opening important scriptural passages',
          'Invaluable historical records of medieval costume, flora, fauna, and daily life'
        ],
        image: '/assets/illuminated manuscripts.jpg',
        imageCaption: 'Folio with gilded illumination, historiated initials, and intricate border foliage.',
        imageMeta: 'Scriptorium Manuscript Tradition'
      },
      {
        id: 'mosaics',
        title: 'Byzantine Mosaics',
        subtitle: 'Tesserae, Light & Celestial Majesty',
        badge: 'Architectural Splendor · Step 3 of 5',
        type: 'split',
        paragraphs: [
          'Byzantine mosaics transformed stone church interiors into shimmering celestial realms. Artisans assembled millions of miniature tesserae (cubes of colored glass, polished marble, and gold leaf sandwiched between glass plates) onto fresh plaster.',
          'By angling each tessera slightly, medieval mosaicists ensured that flickering candlelight would catch the glass and create a living, shimmering sacred ambiance.',
          'The golden backgrounds symbolized the uncreated heavenly light, divorcing the sacred figures from mundane earthly space into timeless spiritual eternity.'
        ],
        bulletTitle: 'Techniques of the Byzantine Mosaicists',
        bullets: [
          'Gold glass tesserae created by fusing thin gold foil between dual glass layers',
          'Hieratic scale: Christ Pantocrator, the Virgin Mary, and saints sized according to spiritual rank',
          'Majestic imperial examples survive at Ravenna, Hagia Sophia, and Venice\'s St. Mark\'s Basilica'
        ],
        image: '/assets/mosaics.jpg',
        imageCaption: 'Radiant Byzantine golden mosaic depicting sacred figures against celestial light.',
        imageMeta: 'Glass & Stone Tesserae Curation'
      },
      {
        id: 'stained-glass',
        title: 'Stained Glass Windows',
        subtitle: 'Cathedrals as Kaleidoscopes of Sacred Light',
        badge: 'Gothic Transcendence · Step 4 of 5',
        type: 'split',
        paragraphs: [
          'The development of Gothic architecture, featuring pointed arches, ribbed vaults, and flying buttresses, liberated church walls from bearing heavy loads, allowing master builders to replace solid masonry with towering expanses of stained glass.',
          'Glaziers cut pieces of glass colored with metallic oxides (cobalt for royal blue, gold for ruby red) and joined them using grooved lead strips (cames) secured into iron armatures.',
          'Sunlight streaming through stained glass transformed cathedrals like Chartres, Notre-Dame, and Sainte-Chapelle into "bibles of light," teaching holy scriptures to worshippers who could not read.'
        ],
        bulletTitle: 'Artistry of the Master Glazier',
        bullets: [
          'Pot metal glass colored directly in crucibles using metallic salts',
          'Grisaille vitreous paint fired onto glass to detail facial expressions and drapery folds',
          'The Rose Window: massive circular mandala-like rose windows symbolizing divine cosmic order'
        ],
        image: '/assets/stained glass.jpg',
        imageCaption: 'Gothic cathedral stained glass filtering daylight into luminous sacred hues.',
        imageMeta: 'High Gothic Glazing Tradition'
      },
      {
        id: 'heraldry-crafts',
        title: 'Textiles, Heraldry, Metalwork & Panel Painting',
        subtitle: 'Bayeux Tapestry, Chivalric Emblems & Civic Arts',
        badge: 'Secular & Devotional Arts · Step 5 of 5',
        type: 'interactive-items',
        lead: 'Beyond churches, medieval society fostered a rich tapestry of civic, military, and domestic arts:',
        items: [
          {
            name: 'The Bayeux Tapestry',
            category: 'Narrative Textile (c. 1070s)',
            desc: 'A 230-foot embroidered linen banner detailing the Norman Conquest of 1066 across 58 continuous narrative scenes in colored wool.',
            img: '/assets/bayeux tapestry.jpg'
          },
          {
            name: 'Medieval Heraldry',
            category: 'Visual Identity System',
            desc: 'The chivalric system of coats of arms combining symbolic lions, eagles, geometric chevrons, and heraldic tinctures for knightly recognition.',
            img: '/assets/heraldry.jpg'
          },
          {
            name: 'Medieval Ceramics',
            category: 'Fired Clay Arts',
            desc: 'Utilitarian storage jars, decorated tiles, and lead-glazed pottery illuminating trade routes and everyday social life across the continent.',
            img: '/assets/ceramics.jpg'
          },
          {
            name: 'Panel Painting',
            category: 'Devotional Altarpieces',
            desc: 'Tempera on seasoned poplar panels prepared with gesso grounds, serving as altarpieces and private devotional icons.',
            img: '/assets/Panel Painting.jpg'
          }
        ]
      }
    ]
  },

  'artists-intro': {
    id: 'artists-intro',
    title: 'Important Western Artists',
    tag: '13th to 15th Century',
    bg: '/assets/donatello bg.jpg',
    summary: 'The pioneers of the Italian Renaissance who reshaped the course of Western art history.',
    steps: [
      {
        id: 'intro',
        title: 'The Great Renaissance Awakening',
        subtitle: 'From Byzantine Rigidity to Humanist Naturalism',
        badge: 'Pioneering Revolution · Step 1 of 5',
        type: 'split',
        paragraphs: [
          'The transition from medieval to Renaissance art in Western Europe was driven by a bold generation of artists who broke away from flat, stylized Byzantine conventions in favor of empirical observation, human emotion, and mathematical spatial depth.',
          'Centered in the prosperous city of Florence, these masters revived Classical antiquity, elevated the social status of the artist from anonymous craftsman to intellectual creator, and laid the foundations for the High Renaissance.'
        ],
        bulletTitle: 'Foundational Concepts of the Epoch',
        bullets: [
          'Humanism: The intellectual movement emphasizing human potential, philosophy, and classical study',
          'Linear Perspective: Mathematical system creating the illusion of three-dimensional depth on flat surfaces',
          'Chiaroscuro: Subtle graduation of light and shadow to model lifelike three-dimensional volume',
          'Vasari\'s Lives of the Artists: Giorgio Vasari\'s landmark historical biography celebrating Florentine genius'
        ],
        image: '/assets/Giotto di Bondone.jpg',
        imageCaption: 'The birth of humanism and expressive figurative volume in Renaissance Florence.',
        imageMeta: 'The Proto-Renaissance Awakening'
      },
      {
        id: 'giotto-cimabue',
        title: 'Cimabue & Giotto di Bondone',
        subtitle: 'The Fathers of Modern Western Painting',
        badge: 'Painting Revolution · Step 2 of 5',
        type: 'split',
        paragraphs: [
          'Giovanni Cimabue was the last great master of the Italo-Byzantine tradition, who began introducing naturalism, softer drapery, and anatomical weight into his monumental crucifixes and Maestà altarpieces.',
          'His legendary pupil, Giotto di Bondone, took a revolutionary leap forward: Giotto painted figures with genuine sculptural bulk, ground-level gravity, and poignant human psychology.',
          'Inside Padua\'s Scrovegni (Arena) Chapel, Giotto\'s frescoes of the Lamentation showed mourning angels and sorrowing disciples weeping real tears, effectively founding modern Western painting.'
        ],
        bulletTitle: 'Artistic Milestones',
        bullets: [
          'Cimabue: Santa Trinita Maestà and dramatic Assisi basilica frescoes',
          'Giotto: Arena Chapel frescoes (c. 1305) and the Ognissanti Madonna',
          'Breakthrough: Replacement of flat gold backgrounds with atmospheric blue skies and earthly landscape settings'
        ],
        image: '/assets/Giovanni Cimabue.jpg',
        imageCaption: 'Cimabue and Giotto broke free from Byzantine icon conventions to depict real human emotional weight.',
        imageMeta: 'Florentine School of Painting'
      },
      {
        id: 'brunelleschi-ghiberti',
        title: 'Brunelleschi & Ghiberti',
        subtitle: 'Architectural Genius & The Gates of Paradise',
        badge: 'Geometry & Bronze · Step 3 of 5',
        type: 'split',
        paragraphs: [
          'Filippo Brunelleschi was an architectural genius who engineered the majestic dome of Santa Maria del Fiore in Florence, a double-shelled masonry dome built without wooden centering scaffolds that remains the largest brick dome on Earth.',
          'Brunelleschi also mathematically formulated linear one-point perspective, demonstrating how all parallel lines converge at a single vanishing point on the viewer\'s horizon.',
          'His contemporary Lorenzo Ghiberti triumphed in the 1401 Florence Baptistery door competition, spending decades crafting gilded bronze reliefs so stunningly atmospheric that Michelangelo called them the "Gates of Paradise."',
        ],
        bulletTitle: 'Enduring Masterworks',
        bullets: [
          'Brunelleschi\'s Dome: 143-foot span constructed with herringbone brickwork',
          'Mathematical Perspective: Transforming European painting, drawing, and city planning forever',
          'Ghiberti\'s Gates of Paradise: Ten gilded relief panels integrating low and high relief to simulate deep architectural space'
        ],
        image: '/assets/Filippo Brunelleschi.jpg',
        imageCaption: 'Architectural mastery and sculptural relief transformed Florence into the capital of Renaissance art.',
        imageMeta: 'Linear Perspective & Monumental Bronze'
      },
      {
        id: 'donatello',
        title: 'Donatello (Donato di Niccolò)',
        subtitle: 'The Master of Expressive Renaissance Sculpture',
        badge: 'Sculptural Mastery · Step 4 of 5',
        type: 'split',
        paragraphs: [
          'Donatello was the most influential sculptor of the early Renaissance. He revived classical contrapposto (the natural shifting of weight in the human body) and was the first artist since antiquity to cast a free-standing nude statue in bronze, creating his celebrated David.',
          'Beyond youthful bronze elegance, Donatello demonstrated peerless psychological intensity in late works like his Mary Magdalene, carved from wood with gaunt, ascetic sorrow.',
          'He also pioneered rilievo schiacciato (flattened relief), achieving painterly atmospheric depth in stone reliefs barely millimeters thick.'
        ],
        bulletTitle: 'Donatello\'s Key Innovations',
        bullets: [
          'Bronze David (c. 1440): First unsupported standing bronze nude since the Roman Empire',
          'St. George: Monumental stone figure conveying inner courage and alert readiness',
          'Equestrian Statue of Gattamelata in Padua: First life-sized bronze equestrian monument of the Renaissance',
          'Rilievo Schiacciato: Extremely low-relief carving creating subtle illusions of infinite spatial background'
        ],
        image: '/assets/Donatello (Donato di Niccolo di Betto Bardi).jpg',
        imageCaption: 'Donatello\'s mastery of bronze casting, human anatomy, and dramatic psychological realism.',
        imageMeta: 'Early Florentine Sculpture'
      },
      {
        id: 'alberti-angelico',
        title: 'Leon Battista Alberti & Fra Angelico',
        subtitle: 'The Universal Polymath & The Devout Friar',
        badge: 'Theory & Piety · Step 5 of 5',
        type: 'split',
        paragraphs: [
          'Leon Battista Alberti was the quintessential "Renaissance Man", serving as author, architect, mathematician, and philosopher. In his seminal treatises On Painting (De pictura) and On Architecture (De re aedificatoria), Alberti provided European artists with theoretical principles for perspective, composition, and harmony.',
          'Fra Angelico, a Dominican friar of Fiesole and Florence, combined late Gothic lyricism with Renaissance linear perspective. His radiant frescoes at the Convent of San Marco, including his famed Annunciation, captured sublime contemplative grace.',
          'Together, these masters embodied the dual soul of the Italian Renaissance: intellectual rigor matched with profound spiritual devotion.'
        ],
        bulletTitle: 'Contributions to Humanist Art',
        bullets: [
          'Alberti\'s Treatises: Codifying linear perspective and elevating painting to a liberal art',
          'Alberti\'s Architecture: Palazzo Rucellai and the facade of Santa Maria Novella',
          'Fra Angelico\'s San Marco Frescoes: Luminous colors and meditative simplicity designed for friars\' contemplation'
        ],
        image: '/assets/Leon Battista Alberti.jpg',
        imageCaption: 'The synthesis of humanist architectural theory and celestial devotional painting.',
        imageMeta: 'Humanism & The Florentine Renaissance'
      }
    ]
  },

  greek: {
    id: 'greek',
    title: 'Classical Greek Painting',
    tag: '6th to 4th Century BCE',
    bg: '/assets/classical greek bg.jpg',
    summary: 'Masterpieces of vase painting, naturalism, panel art, and monumental vessel forms.',
    steps: [
      {
        id: 'intro',
        title: 'Classical Greek Painting',
        subtitle: 'The Hellenic Quest for Naturalism and Harmony',
        badge: 'Classical Principles · Step 1 of 5',
        type: 'split',
        paragraphs: [
          'Classical Greek art represents one of the foundational peaks of Western culture. While most freestanding wooden panel paintings and monumental wall murals have perished due to time and climate, Greek painting survives in stunning abundance upon painted terracotta pottery.',
          'Greek painters depicted Olympian mythology, heroic epic battles from Homer, and intimate vignettes of daily life, banquets, and athletic contests with a relentless pursuit of naturalism, representing the human body in believable, dynamic space.'
        ],
        bulletTitle: 'Key Technical Breakthroughs',
        bullets: [
          'Foreshortening: Depicting limbs extending toward or away from the viewer to create depth',
          'Linear Perspective (Skiagraphia): The Greek art of shading and optical projection',
          'Polychromy: The expressive combination of varied mineral pigments and gold leaf',
          'Harmonic Proportions: Mathematical ratios applied to figurative composition and vessel design'
        ],
        image: '/assets/Kerch Vase Painting.jpg',
        imageCaption: 'Harmonious figurative compositions and naturalistic drapery on Classical Greek vessels.',
        imageMeta: 'Classical Hellenic Painting Tradition'
      },
      {
        id: 'pottery-styles',
        title: 'Red-Figure Pottery & Kerch Vase Painting',
        subtitle: 'The Evolution of Attic Ceramic Painting',
        badge: 'Ceramic Masterpieces · Step 2 of 5',
        type: 'split',
        paragraphs: [
          'Invented in Athens around 530 BCE, red-figure pottery inverted the older black-figure technique: artists painted the background with black slip while leaving the human figures in the warm natural orange-red color of the fired terracotta clay.',
          'This allowed painters to draw internal muscle contours, facial expressions, and drapery folds using fine brushes rather than incising with metal needles, ushering in unprecedented naturalistic fluidity.',
          'Kerch vase painting (named after Kerch in Crimea, where many specimens were unearthed) represents the final, exquisite flowering of red-figure pottery in the 4th century BCE, noted for slender graceful figures and added pastel colors.'
        ],
        bulletTitle: 'Features of Kerch Style Painting',
        bullets: [
          'Elaborate depictions of wedding rituals, women\'s quarters, and Dionysian processions',
          'Addition of white, yellow, and gilded relief details alongside black glaze',
          'Soft, rhythmic outlines emphasizing movement, emotion, and windblown garments'
        ],
        image: '/assets/Kerch Vase Painting.jpg',
        imageCaption: 'Kerch style red-figure vessel with added white pigment and delicate linear contours.',
        imageMeta: '4th Century BCE Kerch Ware'
      },
      {
        id: 'pitsa-panel',
        title: 'The Pitsa Panel & Panel Painting',
        subtitle: 'Extremely Rare Surviving Archaic Wooden Painting',
        badge: 'Rare Artifact · Step 3 of 5',
        type: 'split',
        paragraphs: [
          'Discovered in a cave near Pitsa, Greece, the Pitsa Panel (c. 540 to 530 BCE) is one of only four surviving examples of ancient Greek wooden panel paintings on Earth. Preserved by the cave\'s unique microclimate, it offers rare direct evidence of Greek painting outside pottery.',
          'Painted on a thin piece of cypress wood surfaced with white gesso, it depicts a solemn religious procession of family members leading a lamb to be sacrificed at an altar of the nymphs.',
          'The figures are painted in tempera using vibrant mineral pigments: red, blue, ochre, and black, demonstrating the lively polychrome world of ancient Greece.'
        ],
        bulletTitle: 'Significance of the Pitsa Panel',
        bullets: [
          'Oldest surviving painted wooden panel in Western art history',
          'Painted inscriptions identify the donors, nymphs, and the Corinthian artist',
          'Proves that ancient Greek painting featured vibrant, delicate flat color fields bounded by dark outlines'
        ],
        image: '/assets/Pitsa Panel.jpg',
        imageCaption: 'The Pitsa Panel (c. 540 to 530 BCE): Rare painted wooden votive tablet found near Corinth.',
        imageMeta: 'Archaic Wooden Panel Painting'
      },
      {
        id: 'vessel-forms',
        title: 'Classical Greek Pottery Forms',
        subtitle: 'Specialized Vessels for Symposia, Rituals & Daily Life',
        badge: 'Vessel Typology · Step 4 of 5',
        type: 'interactive-items',
        lead: 'Ancient Greek pottery was carefully engineered for specific social and ceremonial rituals:',
        items: [
          {
            name: 'Krater',
            category: 'Wine & Water Mixing Bowl',
            desc: 'A massive, wide-mouthed vessel used at social banquets (symposia) to mix wine with water before serving.',
            img: '/assets/Krater.jpg'
          },
          {
            name: 'Lebes Gamikos',
            category: 'Bridal Nuptial Basin',
            desc: 'A distinct two-handled vessel with a domed lid used in traditional wedding ceremonies for the bride\'s ritual bath.',
            img: '/assets/Lebes Gamikos.jpg'
          },
          {
            name: 'Lekanis',
            category: 'Cosmetic & Jewelry Dish',
            desc: 'A low, broad, shallow dish with horizontal handles and a fitted lid, gifted to brides for storing oils and jewelry.',
            img: '/assets/Lekanis.jpg'
          },
          {
            name: 'Pelike',
            category: 'Liquid Storage Jar',
            desc: 'A pear-shaped storage container with a low center of gravity and two sturdy handles, used for oil, wine, and water.',
            img: '/assets/pelike.jpg'
          }
        ]
      },
      {
        id: 'tomb-painting',
        title: 'Tomb Painting & Classical Media',
        subtitle: 'Fresco, Tempera & Encaustic in Ancient Burial Chambers',
        badge: 'Burial Chambers & Media · Step 5 of 5',
        type: 'split',
        paragraphs: [
          'Classical Greek and Hellenistic wall painting survives within subterranean tombs, most famously the Tomb of the Diver in Paestum and the Royal Macedonian Tombs at Vergina (such as the Tomb of Philip II).',
          'These murals depicted banquets, chariot races, heroic lion hunts, and symbolic journeys into the underworld with dynamic naturalism and expressive brushwork.',
          'Ancient Greek painters worked with three primary media: Tempera (pigments bound with egg or gum), Fresco (painting on wet lime plaster so the color bonds permanently), and Encaustic (pigments dissolved in hot beeswax applied with heated spatulas).'
        ],
        bulletTitle: 'Ancient Painting Techniques',
        bullets: [
          'Encaustic: Molten beeswax creating radiant, weather-resistant, jewel-like portraits',
          'Buon Fresco: Rapid painting on fresh damp plaster that chemically crystallizes with the wall',
          'Tomb of the Diver: Celebrated ceiling fresco representing the leap between mortal life and the afterlife'
        ],
        image: '/assets/Tomb Painting.jpg',
        imageCaption: 'Subterranean tomb mural depicting banquet revelers and the journey to the afterlife.',
        imageMeta: 'Classical Tomb Mural Tradition'
      }
    ]
  }
};
