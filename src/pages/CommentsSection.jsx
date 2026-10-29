import { useState, useEffect, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import './CommentsSection.css';

const RATE_KEY = 'ochre_ember_rate_limit_v1';
const RATE_LIMIT = 2;
const WINDOW_MS = 30 * 60 * 1000; // 30 minutes

// Use relative URL so it works both locally (if proxied) and on Vercel
const API_URL = '/api/comments';

// ── Rate limit helpers (localStorage, device-only) ──────────
function getRateTimes() {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRateTimes(times) {
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify(times));
  } catch { /* ignore */ }
}

function minutesUntilNext(times) {
  const now = Date.now();
  const recent = times.filter(t => now - t < WINDOW_MS).sort((a, b) => a - b);
  if (recent.length < RATE_LIMIT) return 0;
  const oldest = recent[recent.length - RATE_LIMIT];
  return Math.ceil((WINDOW_MS - (now - oldest)) / 60000);
}

export default function CommentsSection() {
  const [headerRef, headerVisible] = useInView();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  // ── Fetch comments from API ──────────────────────────────
  const fetchComments = useCallback(async () => {
    try {
      setFetchError('');
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      if (data.ok) setComments(data.comments);
      else throw new Error(data.error || 'Unknown error');
    } catch (err) {
      setFetchError('Could not load comments. Please refresh the page.');
      console.error('fetchComments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // ── Submit handler ───────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    // Client-side validation
    if (!trimmedName) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return;
    }
    if (trimmedName.length > 60) {
      setStatus({ type: 'error', message: 'Name must not exceed 60 characters.' });
      return;
    }
    if (!trimmedText) {
      setStatus({ type: 'error', message: 'Please write a comment before submitting.' });
      return;
    }
    if (trimmedText.length < 5) {
      setStatus({ type: 'error', message: 'Comment is too short (minimum 5 characters).' });
      return;
    }
    if (trimmedText.length > 600) {
      setStatus({ type: 'error', message: 'Comment exceeds the 600 character limit.' });
      return;
    }

    // Rate limit check (client-side, per device)
    const now = Date.now();
    const times = getRateTimes();
    const recent = times.filter(t => now - t < WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
      const wait = minutesUntilNext(times);
      setStatus({
        type: 'error',
        message: `You have reached the limit of ${RATE_LIMIT} comments per 30 minutes. Please wait ${wait} minute${wait !== 1 ? 's' : ''} before posting again.`
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, comment: trimmedText }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({ type: 'error', message: data.error || 'Failed to post comment.' });
        return;
      }

      // Record this submission in rate-limit log
      saveRateTimes([...recent, now]);

      // Prepend the new comment locally (instant feedback)
      setComments(prev => [data.comment, ...prev]);
      setName('');
      setText('');
      setStatus({ type: 'success', message: 'Your comment has been posted.' });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
      console.error('handleSubmit:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="comments" className="comments-section section">
      <div className="container">
        <div ref={headerRef} className={`cs__header fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="cs__title">Leave a Comment</h2>
          <p className="cs__subtitle">Share your thoughts on this project. Comments are visible to all visitors.</p>
          <div className="section-divider" />
        </div>

        <div className="cs__layout">
          {/* ── Form ── */}
          <div className="cs__form-wrap paper-card">
            <h3 className="cs__form-heading">Post a Comment</h3>
            <p className="cs__form-note">Limit: {RATE_LIMIT} comments per 30 minutes per device.</p>

            {status.message && (
              <div className={`cs__status ${status.type}`} role="alert">
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="cs__form" noValidate>
              <div className="cs__field">
                <label htmlFor="csName" className="cs__label">
                  Name <span className="cs__req">*</span>
                </label>
                <input
                  id="csName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="cs__input"
                  maxLength={60}
                  disabled={submitting}
                  required
                />
              </div>

              <div className="cs__field">
                <div className="cs__label-row">
                  <label htmlFor="csText" className="cs__label">
                    Comment <span className="cs__req">*</span>
                  </label>
                  <span className="cs__char-count">{text.length}/600</span>
                </div>
                <textarea
                  id="csText"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your comment here..."
                  className="cs__textarea"
                  maxLength={600}
                  disabled={submitting}
                  required
                />
              </div>

              <button type="submit" className="cs__submit-btn" disabled={submitting}>
                {submitting ? 'Posting...' : 'Submit Comment'}
              </button>
            </form>
          </div>

          {/* ── Feed ── */}
          <div className="cs__feed">
            <h3 className="cs__feed-heading">
              Comments {!loading && <span className="cs__count">({comments.length})</span>}
            </h3>

            {loading && (
              <div className="cs__loading paper-card">
                <p>Loading comments...</p>
              </div>
            )}

            {!loading && fetchError && (
              <div className="cs__fetch-error paper-card">
                <p>{fetchError}</p>
                <button className="cs__retry-btn" onClick={fetchComments}>Retry</button>
              </div>
            )}

            {!loading && !fetchError && comments.length === 0 && (
              <div className="cs__empty paper-card">
                <p>No comments yet. Be the first to leave one.</p>
              </div>
            )}

            {!loading && !fetchError && comments.length > 0 && (
              <div className="cs__list">
                {comments.map((item) => (
                  <article key={item.id} className="cs__card paper-card">
                    <div className="cs__card-top">
                      <span className="cs__author">{item.name}</span>
                      <span className="cs__date">{item.date}</span>
                    </div>
                    <p className="cs__body">{item.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
