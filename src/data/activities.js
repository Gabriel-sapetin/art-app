// Quiz, matching, and identification game data based on Module 3

export const quizQuestions = [
  {
    id: 1,
    question: "What is the term for images carved, scratched, or pecked into rock surfaces?",
    options: ["Pictographs", "Petroglyphs", "Frescoes", "Mosaics"],
    correct: 1,
    explanation: "Petroglyphs are pictures or patterns cut, scratched, or carved into rock, while pictographs are painted or drawn on surfaces."
  },
  {
    id: 2,
    question: "Who discovered El Castillo Cave in Spain in 1903?",
    options: ["Giorgio Vasari", "Hermilio Alcalde del Río", "Leon Battista Alberti", "Filippo Brunelleschi"],
    correct: 1,
    explanation: "Spanish archaeologist Hermilio Alcalde del Río discovered El Castillo Cave in 1903. The cave contains some of the oldest known European cave art."
  },
  {
    id: 3,
    question: "What are claviforms in prehistoric cave art?",
    options: ["Animal figures", "Hand stencils", "Club-shaped signs", "Spiral patterns"],
    correct: 2,
    explanation: "Claviforms are signs in prehistoric cave art that resemble a club or club-like shape. They appear in caves like El Castillo alongside hand stencils and disk markings."
  },
  {
    id: 4,
    question: "What is lithic reduction?",
    options: [
      "The process of melting stone to form tools",
      "The method of shaping stone by striking pieces off a larger stone",
      "A technique for polishing stone surfaces",
      "The chemical weathering of rock"
    ],
    correct: 1,
    explanation: "Lithic reduction is the method of shaping stone by striking pieces off a larger stone until a useful tool or blade is produced."
  },
  {
    id: 5,
    question: "Which Italian sculptor is credited with creating the first freestanding nude bronze statue since antiquity?",
    options: ["Lorenzo Ghiberti", "Filippo Brunelleschi", "Donatello", "Giotto di Bondone"],
    correct: 2,
    explanation: "Donatello's bronze David is often cited as the first freestanding nude statue since antiquity, marking a bold departure from medieval artistic conventions."
  },
  {
    id: 6,
    question: "What name did Michelangelo reportedly give to Ghiberti's bronze doors at the Florence Baptistery?",
    options: ["The Divine Portals", "The Gates of Paradise", "The Golden Entrance", "The Sacred Threshold"],
    correct: 1,
    explanation: "Michelangelo reportedly called Lorenzo Ghiberti's East doors of the Florence Baptistery the 'Gates of Paradise' because of their extraordinary beauty and craftsmanship."
  },
  {
    id: 7,
    question: "What is a krater in Classical Greek art?",
    options: [
      "A vessel for storing olive oil",
      "A shallow bowl with two handles",
      "A broad vessel for mixing wine with water",
      "A vessel associated with wedding rituals"
    ],
    correct: 2,
    explanation: "A krater is a broad, deep vessel with a wide mouth that ancient Greeks used for mixing wine with water at social gatherings called symposia."
  },
  {
    id: 8,
    question: "What painting technique involves applying pigment to wet plaster?",
    options: ["Tempera", "Encaustic", "Fresco", "Oil painting"],
    correct: 2,
    explanation: "Fresco is a wall-painting process that places pigment onto fresh, wet plaster so the color sets into the surface as it dries."
  },
  {
    id: 9,
    question: "The Bayeux Tapestry is approximately how long?",
    options: ["50 feet", "100 feet", "230 feet", "500 feet"],
    correct: 2,
    explanation: "The Bayeux Tapestry is approximately 230 feet long and 20 inches high, assembled from eight strips of linen stitched with colored wool."
  },
  {
    id: 10,
    question: "Who is considered a key founder of Renaissance architecture?",
    options: ["Donatello", "Giotto di Bondone", "Leon Battista Alberti", "Filippo Brunelleschi"],
    correct: 3,
    explanation: "Filippo Brunelleschi is widely regarded as a key founder of Renaissance architecture, known especially for engineering the dome of Florence Cathedral."
  }
];

export const matchingPairs = [
  { term: "Donatello", match: "Bronze sculptor of David", category: "artist" },
  { term: "Giotto di Bondone", match: "Painter who prepared the way for the Renaissance", category: "artist" },
  { term: "Leon Battista Alberti", match: "Multitalented Renaissance Man and theorist", category: "artist" },
  { term: "Giovanni Cimabue", match: "Florentine painter who moved beyond Byzantine conventions", category: "artist" },
  { term: "Filippo Brunelleschi", match: "Key founder of Renaissance architecture", category: "artist" },
  { term: "Fra Angelico", match: "Painter of religious frescoes at San Marco", category: "artist" },
  { term: "Lorenzo Ghiberti", match: "Creator of the Florence Baptistery bronze doors", category: "artist" },
  { term: "Krater", match: "Vessel for mixing wine and water", category: "pottery" },
  { term: "Lebes Gamikos", match: "Vessel associated with a bride's ritual bath", category: "pottery" },
  { term: "Lekanis", match: "Shallow bowl with two horizontal handles", category: "pottery" },
  { term: "Pelike", match: "Greek liquid-storage vessel", category: "pottery" },
];

export const guessTheArtwork = [
  {
    id: 1,
    image: "/assets/illuminated manuscripts.jpg",
    clues: [
      "This is a handwritten medieval creation",
      "It features vivid colors and ornamental designs",
      "Craftspeople called illuminators made these",
      "Sometimes decorated with gold or silver details"
    ],
    answer: "Illuminated Manuscript",
    explanation: "Illuminated manuscripts are handwritten books decorated with vivid colors, ornamental designs, and sometimes gold or silver details. They were created by skilled craftspeople called illuminators throughout the Middle Ages."
  },
  {
    id: 2,
    image: "/assets/stained glass.jpg",
    clues: [
      "This medieval art form uses colored materials fitted together",
      "Lead strips hold the pieces in place",
      "It transforms light entering a building",
      "Commonly found in Gothic cathedrals"
    ],
    answer: "Stained Glass",
    explanation: "Stained glass windows are created by fitting together pieces of colored glass held in place by lead strips. In medieval churches, they served as luminous visual narratives depicting biblical stories."
  },
  {
    id: 3,
    image: "/assets/pebble tool.jpg",
    clues: [
      "This is one of the earliest types of human-made tools",
      "It was made by hitting a rounded stone with another stone",
      "The blows create a rough sharp edge",
      "Used for basic chopping or cutting tasks"
    ],
    answer: "Pebble Tool (Pebble Chopper)",
    explanation: "Pebble tools are rough cutting tools made by hitting a rounded stone with another stone. The blows create a rough sharp edge for chopping or cutting. They are among the earliest known stone tools."
  },
  {
    id: 4,
    image: "/assets/Kerch Vase Painting.jpg",
    clues: [
      "This Greek pottery style features figures left in the natural clay color",
      "Named after a location where many examples were found",
      "Common subjects include women's lives and myths",
      "Represents the final phase of a major pottery tradition"
    ],
    answer: "Kerch Vase Painting",
    explanation: "Kerch vase painting is a form of Greek red-figure pottery named after Kerch in Crimea. These vases depicted scenes from women's daily lives and mythology, representing the late phase of the red-figure tradition."
  },
  {
    id: 5,
    image: "/assets/bayeux tapestry.jpg",
    clues: [
      "This artwork is approximately 230 feet long",
      "It was made with colored wool on linen",
      "It tells the story of a famous 1066 event",
      "Assembled from eight separate strips"
    ],
    answer: "Bayeux Tapestry",
    explanation: "The Bayeux Tapestry is a long embroidered linen artwork about 230 feet long, stitched with colored wool. It narrates the events surrounding the Norman Conquest of England in 1066."
  }
];

