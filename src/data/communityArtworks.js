/**
 * Community Cave Paintings Data & Storage Manager
 * Only displays genuine artworks shared by users (local storage & Upstash Redis)
 */

export const INITIAL_COMMUNITY_ARTWORKS = [];

// Legacy sample IDs to purge if previously cached in user's browser
const SAMPLE_IDS = new Set(['feline-spirit', 'bison-altamira', 'hand-stencil-castillo', 'running-ibex']);

const STORAGE_KEY = 'ochre_ember_community_artworks_v1';
const LIKES_KEY = 'ochre_ember_artwork_likes_v1';

export function getLocalArtworks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Filter out any generated sample artworks
    const filtered = parsed.filter(art => art && art.id && !SAMPLE_IDS.has(art.id));
    if (filtered.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    return filtered;
  } catch {
    return [];
  }
}

export function saveLocalArtwork(artwork) {
  try {
    const existing = getLocalArtworks();
    const updated = [artwork, ...existing.filter(a => a.id !== artwork.id)];
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


