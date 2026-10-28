import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useLocalStorage } from '../hooks/useInView';
import './CommentsSection.css';

// Initial pre-seeded peer comments for authentic sketchbook dialogue
const initialComments = [
  {
    id: 1,
    name: "Clara M. (Art History Student)",
    topic: "El Castillo Cave Paintings",
    comment: "The detail on the hand stencils at El Castillo really made me pause. To think that 40,800 years ago someone placed their palm against cold limestone and blew pigment across their fingers — that need to declare 'I exist' is timeless.",
    date: "October 27, 2026 · 3:42 PM",
    likes: 12
  },
  {
    id: 2,
    name: "Julian Rivera",
    topic: "Donatello's Bronze David",
    comment: "Studying Donatello's transition from medieval stiff figures to freestanding contrapposto was fascinating. The emotional vulnerability in his David contrasts so sharply with the later colossal confidence of Michelangelo's marble version.",
    date: "October 28, 2026 · 11:15 AM",
    likes: 8
  },
  {
    id: 3,
    name: "Elena Vance (Architecture Major)",
    topic: "Brunelleschi & Linear Perspective",
    comment: "Brunelleschi's double-shell dome engineering in Florence is still one of the greatest technical triumphs. Codifying linear perspective didn't just change painting; it revolutionized how architects conceptualize space.",
    date: "October 28, 2026 · 1:20 PM",
    likes: 15
  },
  {
    id: 4,
    name: "Marcus Tan",
    topic: "Greek Pottery Vessels",
    comment: "The matching activity helped me finally distinguish a krater (for wine and water mixing) from a lebes gamikos (for bridal ritual baths). The physical shapes were dictated completely by social custom!",
    date: "October 28, 2026 · 4:05 PM",
    likes: 6
  }
];

export default function CommentsSection() {
  const [headerRef, headerVisible] = useInView();
  const [comments, setComments] = useLocalStorage('atelier_occidental_comments_v1', initialComments);

  // Form states
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('General Reflection');
  const [text, setText] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [filterTopic, setFilterTopic] = useState('All');
  const [likedIds, setLikedIds] = useState([]);

  // XSS sanitization helper
  const sanitizeText = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    // Validation
    if (!trimmedName) {
      setStatus({ type: 'error', message: 'Please provide your name or pen name.' });
      return;
    }
    if (trimmedName.length > 50) {
      setStatus({ type: 'error', message: 'Name must not exceed 50 characters.' });
      return;
    }
    if (!trimmedText) {
      setStatus({ type: 'error', message: 'Please write a comment or reflection before submitting.' });
      return;
    }
    if (trimmedText.length < 10) {
      setStatus({ type: 'error', message: 'Please provide a more substantive comment (minimum 10 characters).' });
      return;
    }
    if (trimmedText.length > 800) {
      setStatus({ type: 'error', message: 'Comment exceeds maximum allowed length (800 characters).' });
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' · ' + now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });

    const newComment = {
      id: Date.now(),
      name: sanitizeText(trimmedName),
      topic: topic,
      comment: sanitizeText(trimmedText),
      date: formattedDate,
      likes: 0
    };

    try {
      const updated = [newComment, ...comments];
      setComments(updated);
      setName('');
      setText('');
      setStatus({ 
        type: 'success', 
        message: 'Your reflection has been successfully inked onto the exhibition guestbook!' 
      });
      // Clear success banner after 6 seconds
      setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to record entry in local storage. Please check browser storage permissions.' 
      });
    }
  };

  const handleLike = (id) => {
    if (likedIds.includes(id)) return;
    setLikedIds(prev => [...prev, id]);
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  const topicOptions = [
    'General Reflection',
    'Prehistoric Cave Art',
    'Stone Tools & Lithic Reduction',
    'Medieval Illuminated Manuscripts',
    'Byzantine Mosaics & Stained Glass',
    'Bayeux Tapestry',
    'Western Artists & Innovations',
    'Donatello\'s Sculpture',
    'Brunelleschi & Architecture',
    'Classical Greek Pottery & Painting',
    'Interactive Activities Experience'
  ];

  const filteredComments = filterTopic === 'All'
    ? comments
    : comments.filter(c => c.topic === filterTopic);

  return (
    <section id="comments" className="comments section">
      <div className="container">
        <div ref={headerRef} className={`fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Visitor Guestbook & Reflections</h2>
          <p className="section-subtitle">Share your insights, critique artworks, and leave your mark on our sketchbook</p>
          <div className="section-divider" />
        </div>

        <div className="comments__layout">
          {/* Submission Form */}
          <div className="comments__form-container paper-card">
            <div className="comments__form-header">
              <span className="plate-label">Leave an Inscription</span>
              <h3>Inscribe Your Thoughts</h3>
              <p>Add your interpretation or constructive feedback to our Art Appreciation midterm sketchbook.</p>
            </div>

            {status.message && (
              <div className={`comments__status-banner ${status.type === 'success' ? 'success' : 'error'}`}>
                {status.type === 'success' ? '✓ ' : '⚠ '}
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="comments__form" noValidate>
              <div className="comments__field">
                <label htmlFor="visitorName" className="comments__label">
                  Your Full Name or Student Handle <span className="req">*</span>
                </label>
                <input
                  id="visitorName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Santos (Group 2) or Prof. Visitor"
                  className="comments__input"
                  maxLength={50}
                  required
                />
              </div>

              <div className="comments__field">
                <label htmlFor="visitorTopic" className="comments__label">
                  Topic or Featured Plate of Interest
                </label>
                <select
                  id="visitorTopic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="comments__select"
                >
                  {topicOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="comments__field">
                <div className="comments__label-row">
                  <label htmlFor="visitorText" className="comments__label">
                    Your Reflection or Feedback <span className="req">*</span>
                  </label>
                  <span className="comments__char-count annotation">{text.length}/800</span>
                </div>
                <textarea
                  id="visitorText"
                  rows={5}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share how a specific artwork, period, or activity shaped your understanding of Western Art History..."
                  className="comments__textarea"
                  maxLength={800}
                  required
                />
              </div>

              <button type="submit" className="activity__btn comments__submit-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>
                Publish Inscription
              </button>

              <div className="comments__storage-note">
                <span className="annotation">💾 Archival Storage Notice:</span>
                <p>
                  Entries are stored persistently in your local browser storage (HTML5 LocalStorage). They persist seamlessly across sessions and page reloads on this machine.
                </p>
              </div>
            </form>
          </div>

          {/* Guestbook Feed */}
          <div className="comments__feed-container">
            <div className="comments__feed-header">
              <div>
                <span className="plate-label">Archival Guestbook</span>
                <h3>Community Inscriptions ({comments.length})</h3>
              </div>
              <div className="comments__feed-filter">
                <label htmlFor="filterTopicSelect" className="plate-label">Filter:</label>
                <select
                  id="filterTopicSelect"
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="comments__filter-select"
                >
                  <option value="All">All Topics ({comments.length})</option>
                  {topicOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="comments__feed-list">
              {filteredComments.length === 0 ? (
                <div className="comments__empty paper-card">
                  <p>No inscriptions recorded under this topic yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                filteredComments.map((item) => (
                  <article key={item.id} className="comments__card paper-card">
                    <div className="comments__card-top">
                      <div className="comments__author-meta">
                        <span className="comments__author-avatar">
                          {item.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <h4 className="comments__author-name">{item.name}</h4>
                          <span className="plate-label comments__topic-pill">{item.topic}</span>
                        </div>
                      </div>
                      <span className="comments__date annotation">{item.date}</span>
                    </div>

                    <p className="comments__body">{item.comment}</p>

                    <div className="comments__card-actions">
                      <button 
                        className={`comments__like-btn ${likedIds.includes(item.id) ? 'liked' : ''}`}
                        onClick={() => handleLike(item.id)}
                        disabled={likedIds.includes(item.id)}
                        aria-label={`Like this comment by ${item.name}`}
                      >
                        <span className="comments__heart">♥</span>
                        <span>{item.likes} {item.likes === 1 ? 'Endorsement' : 'Endorsements'}</span>
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
