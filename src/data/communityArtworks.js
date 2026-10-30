/**
 * Community Cave Paintings Data & Storage Manager
 * Supports both local storage and Upstash Redis synchronization
 */

export const INITIAL_COMMUNITY_ARTWORKS = [
  {
    id: 'feline-spirit',
    title: 'The Feline Spirit',
    author: 'Gabriel L. Sapetin',
    periodId: 'paleolithic',
    periodName: 'Paleolithic',
    technique: 'Ochre Pigment & Pebble Chopper',
    mode: 'paint',
    date: 'October 30, 2026',
    timestamp: 1793352200000,
    likes: 24,
    description: 'An ancient guardian cat etched and painted with natural ochre, featuring prominent ears and ritual tooth markings.',
    marks: [
      // Outer face contour
      { d: 'M 240 160 L 310 85 L 385 155 L 425 155 L 500 85 L 570 160 L 580 270 L 510 330 L 300 330 L 230 270 Z', color: '#bd6540', width: 9, mode: 'paint' },
      // Inner face contour
      { d: 'M 265 175 L 320 115 L 380 170 L 430 170 L 490 115 L 545 175 L 550 260 L 490 310 L 320 310 L 255 260 Z', color: '#bd6540', width: 7, mode: 'paint' },
      // Left eye
      { d: 'M 315 200 C 285 200 270 235 305 250 C 340 265 355 220 320 200', color: '#bd6540', width: 8, mode: 'paint' },
      // Right eye
      { d: 'M 495 200 C 465 200 450 235 485 250 C 520 265 535 220 500 200', color: '#bd6540', width: 8, mode: 'paint' },
      // Tooth smile (engraved / ochre mixed)
      { d: 'M 320 295 L 345 270 L 370 295 L 395 270 L 420 295 L 445 270 L 470 295 L 495 270 L 520 295', color: '#c2a881', width: 6, mode: 'etch' },
      // Whisker accents
      { d: 'M 230 220 L 160 210', color: '#bd6540', width: 7, mode: 'paint' },
      { d: 'M 230 240 L 155 250', color: '#bd6540', width: 7, mode: 'paint' },
      { d: 'M 580 220 L 650 210', color: '#bd6540', width: 7, mode: 'paint' },
      { d: 'M 580 240 L 655 250', color: '#bd6540', width: 7, mode: 'paint' },
    ]
  },
  {
    id: 'bison-altamira',
    title: 'Great Steppe Bison',
    author: 'Hermilio Alcalde',
    periodId: 'paleolithic',
    periodName: 'Paleolithic',
    technique: 'Ochre Pigment & Chipped Stone',
    mode: 'paint',
    date: 'October 29, 2026',
    timestamp: 1793265600000,
    likes: 19,
    description: 'A robust bison silhouette honoring the polychrome beasts of northern Spanish caves.',
    marks: [
      // Hump and back
      { d: 'M 210 240 Q 250 160 360 145 Q 470 145 560 210 Q 600 250 590 285', color: '#bd6540', width: 10, mode: 'paint' },
      // Curved horns
      { d: 'M 210 185 Q 170 130 150 155 M 225 180 Q 195 125 180 140', color: '#c2a881', width: 6, mode: 'etch' },
      // Head, muzzle & chest
      { d: 'M 210 185 L 165 240 L 205 270 L 235 275 L 250 355 M 275 275 L 290 350', color: '#bd6540', width: 9, mode: 'paint' },
      // Hind legs & belly
      { d: 'M 590 285 L 575 365 M 545 285 L 535 360 L 510 285 Q 400 285 295 275', color: '#bd6540', width: 9, mode: 'paint' },
      // Tail & eye
      { d: 'M 590 285 Q 610 320 600 350', color: '#bd6540', width: 6, mode: 'paint' },
      { d: 'M 195 215 L 205 220', color: '#c2a881', width: 5, mode: 'etch' },
    ]
  },
  {
    id: 'hand-stencil-castillo',
    title: 'Ritual Hand Stencil',
    author: 'Elena of El Castillo',
    periodId: 'paleolithic',
    periodName: 'Paleolithic',
    technique: 'Natural Mineral Stencil',
    mode: 'paint',
    date: 'October 28, 2026',
    timestamp: 1793179200000,
    likes: 31,
    description: 'A negative hand contour created by blowing red iron-oxide powder against rock.',
    marks: [
      // Hand contour
      { d: 'M 355 370 L 355 295 Q 335 285 315 235 Q 305 195 320 188 Q 335 188 340 225 L 345 155 Q 355 142 370 147 Q 380 158 380 215 L 392 135 Q 402 122 418 128 Q 428 138 422 215 L 438 165 Q 448 152 462 158 Q 472 168 462 235 L 472 225 Q 492 235 478 265 L 440 305 L 440 370', color: '#bd6540', width: 8, mode: 'paint' },
      // Stippled halo / spray dots
      { d: 'M 290 190 L 292 192', color: '#bd6540', width: 14, mode: 'paint' },
      { d: 'M 330 120 L 332 122', color: '#bd6540', width: 16, mode: 'paint' },
      { d: 'M 370 100 L 372 102', color: '#bd6540', width: 15, mode: 'paint' },
      { d: 'M 420 85 L 422 87', color: '#bd6540', width: 18, mode: 'paint' },
      { d: 'M 470 110 L 472 112', color: '#bd6540', width: 16, mode: 'paint' },
      { d: 'M 510 170 L 512 172', color: '#bd6540', width: 14, mode: 'paint' },
      { d: 'M 520 240 L 522 242', color: '#bd6540', width: 14, mode: 'paint' },
      { d: 'M 280 270 L 282 272', color: '#bd6540', width: 12, mode: 'paint' },
    ]
  },
  {
    id: 'running-ibex',
    title: 'The Mountain Ibex',
    author: 'Maria Sanz',
    periodId: 'mesolithic',
    periodName: 'Mesolithic',
    technique: 'Stone Blade Engraving',
    mode: 'etch',
    date: 'October 27, 2026',
    timestamp: 1793092800000,
    likes: 15,
    description: 'A swift mountain ibex rendered with delicate stone tool scoring into limestone.',
    marks: [
      // Sweeping arching horns
      { d: 'M 330 215 Q 260 115 180 110', color: '#c2a881', width: 6, mode: 'etch' },
      { d: 'M 335 215 Q 290 135 220 130', color: '#c2a881', width: 5, mode: 'etch' },
      // Head, muzzle & jaw
      { d: 'M 330 215 L 365 240 L 350 260 L 320 240', color: '#c2a881', width: 5, mode: 'etch' },
      // Back and torso
      { d: 'M 320 240 Q 420 230 480 260 L 485 350 M 460 265 L 460 345', color: '#c2a881', width: 5, mode: 'etch' },
      // Front legs
      { d: 'M 345 260 L 340 345 M 325 250 L 315 340', color: '#c2a881', width: 5, mode: 'etch' },
      // Ground contour
      { d: 'M 180 360 Q 380 345 580 365', color: '#c2a881', width: 4, mode: 'etch' },
    ]
  }
];

const STORAGE_KEY = 'ochre_ember_community_artworks_v1';
const LIKES_KEY = 'ochre_ember_artwork_likes_v1';

export function getLocalArtworks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalArtwork(artwork) {
  try {
    const existing = getLocalArtworks();
    const updated = [artwork, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('saveLocalArtwork error:', err);
    return [];
  }
}

export function getLikedArtworkIds() {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleArtworkLike(artworkId) {
  try {
    const liked = getLikedArtworkIds();
    let updated;
    const isLiked = liked.includes(artworkId);
    if (isLiked) {
      updated = liked.filter(id => id !== artworkId);
    } else {
      updated = [...liked, artworkId];
    }
    localStorage.setItem(LIKES_KEY, JSON.stringify(updated));
    return { isLiked: !isLiked, countDelta: !isLiked ? 1 : -1 };
  } catch {
    return { isLiked: false, countDelta: 0 };
  }
}
