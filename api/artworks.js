import { Redis } from '@upstash/redis';

const ARTWORKS_KEY = 'ochre_ember_community_artworks_list_v1';
const MAX_ARTWORKS = 300;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ── GET: Return community artworks from Upstash Redis ──────
  if (req.method === 'GET') {
    try {
      if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        return res.status(200).json({ ok: true, artworks: [] });
      }

      const stored = await redis.lrange(ARTWORKS_KEY, 0, MAX_ARTWORKS - 1);
      const artworks = stored.map(item => {
        try {
          return typeof item === 'string' ? JSON.parse(item) : item;
        } catch {
          return null;
        }
      }).filter(Boolean);

      return res.status(200).json({ ok: true, artworks });
    } catch (err) {
      console.error('GET /api/artworks error:', err);
      return res.status(200).json({ ok: true, artworks: [] });
    }
  }

  // ── POST: Publish a new community artwork ──────────────────
  if (req.method === 'POST') {
    try {
      const { title, author, marks, periodId, mode, technique } = req.body ?? {};

      const cleanTitle = sanitize(title);
      const cleanAuthor = sanitize(author);

      if (!cleanTitle || cleanTitle.length < 2) {
        return res.status(400).json({ ok: false, error: 'Artwork title must be at least 2 characters.' });
      }
      if (cleanTitle.length > 50) {
        return res.status(400).json({ ok: false, error: 'Artwork title cannot exceed 50 characters.' });
      }
      if (!cleanAuthor || cleanAuthor.length < 2) {
        return res.status(400).json({ ok: false, error: 'Artist name must be at least 2 characters.' });
      }
      if (cleanAuthor.length > 40) {
        return res.status(400).json({ ok: false, error: 'Artist name cannot exceed 40 characters.' });
      }
      if (!Array.isArray(marks) || marks.length === 0) {
        return res.status(400).json({ ok: false, error: 'No cave marks found to share.' });
      }
      if (marks.length > 400) {
        return res.status(400).json({ ok: false, error: 'Artwork has too many strokes (maximum 400).' });
      }

      // Format date
      const dateFormatted = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      const newArtwork = {
        id: `artwork_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        title: cleanTitle,
        author: cleanAuthor,
        periodId: periodId || 'paleolithic',
        periodName: periodId === 'mesolithic' ? 'Mesolithic' : 'Paleolithic',
        technique: technique || (mode === 'etch' ? 'Stone Tool Engraving' : 'Natural Ochre Pigment'),
        mode: mode || 'paint',
        date: dateFormatted,
        timestamp: Date.now(),
        likes: 1,
        marks: marks.slice(0, 400).map(m => ({
          d: String(m.d || '').slice(0, 10000),
          color: String(m.color || '#bd6540').slice(0, 30),
          width: Number(m.width) || 8,
          mode: m.mode === 'etch' ? 'etch' : 'paint',
        })),
      };

      if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        await redis.lpush(ARTWORKS_KEY, JSON.stringify(newArtwork));
        await redis.ltrim(ARTWORKS_KEY, 0, MAX_ARTWORKS - 1);
      }

      return res.status(201).json({ ok: true, artwork: newArtwork });
    } catch (err) {
      console.error('POST /api/artworks error:', err);
      return res.status(500).json({ ok: false, error: 'Failed to share artwork. Please try again.' });
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed.' });
}

