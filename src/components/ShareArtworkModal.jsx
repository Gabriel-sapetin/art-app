import { useState } from 'react';
import CavePaintingView from './CavePaintingView';
import { saveLocalArtwork } from '../data/communityArtworks';
import './ShareArtworkModal.css';

export default function ShareArtworkModal({
  isOpen,
  onClose,
  marks = [],
  periodId = 'paleolithic',
  mode = 'paint',
  onArtworkShared
}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(() => {
    try {
      return localStorage.getItem('ochre_ember_author_name') || '';
    } catch {
      return '';
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sharedArtwork, setSharedArtwork] = useState(null);

  if (!isOpen) return null;

  const techniqueText = periodId === 'mesolithic'
    ? 'Mesolithic · Stone Blade Engraving'
    : mode === 'etch'
      ? 'Paleolithic · Pebble Chopper Etching'
      : 'Paleolithic · Natural Ochre Pigment';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanAuthor = author.trim();

    if (!cleanTitle) {
      setError('Please provide a title for your cave painting.');
      return;
    }
    if (cleanTitle.length < 2) {
      setError('Title must be at least 2 characters long.');
      return;
    }
    if (!cleanAuthor) {
      setError('Please enter your name or artist alias.');
      return;
    }
    if (cleanAuthor.length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }
    if (!marks || marks.length === 0) {
      setError('No cave marks found to share. Please paint something on the cave wall first!');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      localStorage.setItem('ochre_ember_author_name', cleanAuthor);
    } catch {
      // ignore local storage errors
    }

    const dateFormatted = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newArtwork = {
      id: `artwork_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title: cleanTitle,
      author: cleanAuthor,
      periodId,
      periodName: periodId === 'mesolithic' ? 'Mesolithic' : 'Paleolithic',
      technique: techniqueText,
      mode,
      date: dateFormatted,
      timestamp: Date.now(),
      likes: 1,
      marks: [...marks],
    };

    // 1. Immediately save to localStorage (reliable on localhost & offline)
    saveLocalArtwork(newArtwork);

    // 2. Attempt remote save via Upstash Redis API
    try {
      const res = await fetch('/api/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: cleanTitle,
          author: cleanAuthor,
          marks,
          periodId,
          mode,
          technique: techniqueText
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.artwork) {
          newArtwork.id = data.artwork.id;
        }
      }
    } catch (err) {
      console.warn('API sync deferred to local storage (e.g. running localhost without serverless proxy):', err);
    }

    setSubmitting(false);
    setSharedArtwork(newArtwork);
    if (onArtworkShared) {
      onArtworkShared(newArtwork);
    }
  };

  const handleScrollToCommunity = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('community');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <div className="share-modal__overlay" role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
      <div className="share-modal__card">
        <button
          type="button"
          className="share-modal__close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        {!sharedArtwork ? (
          <>
            <div className="share-modal__header">
              <span className="plate-label">Prehistoric Community Gallery</span>
              <h2 id="share-modal-title" className="share-modal__title">Share to Cave Wall Community</h2>
              <p className="share-modal__subtitle">Publish your original marks to the public gallery alongside other explorers.</p>
            </div>

            <div className="share-modal__preview-wrapper">
              <CavePaintingView marks={marks} id="share-preview" />
            </div>

            <form className="share-modal__form" onSubmit={handleSubmit}>
              <div className="share-modal__meta-strip">
                <span>Medium &amp; Era:</span>
                <span className="share-modal__meta-badge">{techniqueText}</span>
              </div>

              <div className="share-modal__field">
                <label htmlFor="artwork-title">Artwork Title <span>*</span></label>
                <input
                  id="artwork-title"
                  type="text"
                  className="share-modal__input"
                  placeholder="e.g. The Sacred Feline, Running Ibex, Hand of the Clan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  autoFocus
                />
              </div>

              <div className="share-modal__field">
                <label htmlFor="author-name">Your Name or Moniker <span>*</span></label>
                <input
                  id="author-name"
                  type="text"
                  className="share-modal__input"
                  placeholder="e.g. Gabriel S., Nomad Explorer, Elena"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  maxLength={40}
                />
              </div>

              {error && <div className="share-modal__error">{error}</div>}

              <div className="share-modal__actions">
                <button
                  type="button"
                  className="share-modal__cancel-btn"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="share-modal__submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Publishing...' : 'Carve into Community Wall'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="share-modal__success">
            <div className="share-modal__success-icon">&#10003;</div>
            <h3>Carved into History!</h3>
            <p>
              Your cave painting <strong>"{sharedArtwork.title}"</strong> has been preserved in the community gallery for all visitors to explore.
            </p>
            <div className="share-modal__success-buttons">
              <button
                type="button"
                className="share-modal__view-btn"
                onClick={handleScrollToCommunity}
              >
                View on Community Wall &rarr;
              </button>
              <button
                type="button"
                className="share-modal__cancel-btn"
                onClick={onClose}
              >
                Keep Painting
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
