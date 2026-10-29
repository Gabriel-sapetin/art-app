import { Redis } from '@upstash/redis';

const COMMENTS_KEY = 'ochre_ember_comments_list_v1';
const LEGACY_COMMENTS_KEY = 'ochre_ember_comments_v1';
const MAX_COMMENTS = 500; // cap to prevent unbounded growth

// Redis runs this script atomically, so simultaneous posts cannot overwrite
// each other's updates. Existing JSON-array data is migrated on the first post.
const ADD_COMMENT_SCRIPT = `#!lua flags=allow-key-locking
  if redis.call('EXISTS', KEYS[1]) == 0 then
    local legacy = redis.call('GET', KEYS[2])
    if legacy then
      local ok, entries = pcall(cjson.decode, legacy)
      if ok and type(entries) == 'table' then
        for index = #entries, 1, -1 do
          redis.call('RPUSH', KEYS[1], cjson.encode(entries[index]))
        end
      end
      redis.call('DEL', KEYS[2])
    end
  end
  redis.call('LPUSH', KEYS[1], ARGV[1])
  redis.call('LTRIM', KEYS[1], 0, tonumber(ARGV[2]) - 1)
  return redis.call('LLEN', KEYS[1])
`;

function parseStoredComment(value) {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function parseStoredComments(value) {
  if (Array.isArray(value)) return value.map(parseStoredComment);
  const parsed = parseStoredComment(value);
  return Array.isArray(parsed) ? parsed.map(parseStoredComment) : [];
}

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
      const stored = await redis.lrange(COMMENTS_KEY, 0, MAX_COMMENTS - 1);
      // Older deployments stored the full array as a string. Serve it until
      // the first new comment migrates it atomically into the list.
      const legacy = stored.length === 0 ? await redis.get(LEGACY_COMMENTS_KEY) : null;
      const comments = stored.length > 0 ? parseStoredComments(stored) : parseStoredComments(legacy);
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

      // Atomic append prevents simultaneous requests from losing comments.
      const total = await redis.eval(
        ADD_COMMENT_SCRIPT,
        [COMMENTS_KEY, LEGACY_COMMENTS_KEY],
        [JSON.stringify(newComment), String(MAX_COMMENTS)],
      );

      return res.status(201).json({ ok: true, comment: newComment, total: Number(total) });
    } catch (err) {
      console.error('POST /api/comments error:', err);
      return res.status(500).json({ ok: false, error: 'Failed to save comment.' });
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed.' });
}

