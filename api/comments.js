import { Redis } from '@upstash/redis';

const COMMENTS_KEY = 'ochre_ember_comments_v1';
const MAX_COMMENTS = 500; // cap to prevent unbounded growth

// Upstash Redis client — env vars set automatically by Vercel integration
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function sanitize(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  // CORS headers — allow the Vercel deployment origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ── GET: return all comments ──────────────────────────────
  if (req.method === 'GET') {
    try {
      const raw = await redis.get(COMMENTS_KEY);
      const comments = raw ? (Array.isArray(raw) ? raw : JSON.parse(raw)) : [];
      return res.status(200).json({ ok: true, comments });
    } catch (err) {
      console.error('GET /api/comments error:', err);
      return res.status(500).json({ ok: false, error: 'Failed to load comments.' });
    }
  }

  // ── POST: add a new comment ───────────────────────────────
  if (req.method === 'POST') {
    try {
      const { name, comment } = req.body ?? {};

      // Validate
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ ok: false, error: 'Name is required.' });
      }
      if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
        return res.status(400).json({ ok: false, error: 'Comment is required.' });
      }
      if (name.trim().length > 60) {
        return res.status(400).json({ ok: false, error: 'Name must not exceed 60 characters.' });
      }
      if (comment.trim().length < 5) {
        return res.status(400).json({ ok: false, error: 'Comment is too short (minimum 5 characters).' });
      }
      if (comment.trim().length > 600) {
        return res.status(400).json({ ok: false, error: 'Comment exceeds 600 characters.' });
      }

      const now = new Date();
      const formattedDate =
        now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) +
        ' at ' +
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

      const newComment = {
        id: Date.now(),
        name: sanitize(name.trim()),
        comment: sanitize(comment.trim()),
        date: formattedDate,
      };

      // Load existing, prepend new, trim to cap
      const raw = await redis.get(COMMENTS_KEY);
      const existing = raw ? (Array.isArray(raw) ? raw : JSON.parse(raw)) : [];
      const updated = [newComment, ...existing].slice(0, MAX_COMMENTS);

      await redis.set(COMMENTS_KEY, JSON.stringify(updated));

      return res.status(201).json({ ok: true, comment: newComment, total: updated.length });
    } catch (err) {
      console.error('POST /api/comments error:', err);
      return res.status(500).json({ ok: false, error: 'Failed to save comment.' });
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed.' });
}

