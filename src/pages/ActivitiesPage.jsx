import { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { quizQuestions, matchingPairs, guessTheArtwork } from '../data/activities';
import './ActivitiesPage.css';

/* ── Activity 1: Art History Quiz ── */
function QuizActivity() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = quizQuestions[current];

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const isCorrect = idx === q.correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, { qId: q.id, selected: idx, correct: q.correct, isCorrect }]);
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="quiz__result">
        <span className="plate-label">Assessment Result</span>
        <h3>Quiz Complete!</h3>
        <div className="quiz__score-circle">
          <span className="quiz__score-num">{score}/{quizQuestions.length}</span>
          <span className="quiz__score-pct">{pct}% Knowledge Score</span>
        </div>
        <p className="quiz__verdict">
          {pct >= 80 
            ? 'Outstanding scholarship! You demonstrate exceptional mastery of Western art history, from Paleolithic cave markings to Renaissance innovations.' 
            : pct >= 50 
            ? 'Commendable effort! You have a solid grasp of key concepts. Review the Greek pottery forms and medieval techniques to achieve mastery.' 
            : 'A worthwhile journey! Art appreciation deepens with repetition. Revisit the Explore and Artists sections to refresh your historical knowledge.'}
        </p>
        <div className="quiz__answers-review">
          <h4 className="annotation">Review of Questions:</h4>
          {answers.map((a, i) => (
            <div key={i} className={`quiz__review-item ${a.isCorrect ? 'correct' : 'wrong'}`}>
              <span className="quiz__review-num">Plate #{i + 1}</span>
              <span className="quiz__review-q">{quizQuestions[i].question}</span>
              <span className="quiz__review-badge">{a.isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
            </div>
          ))}
        </div>
        <button className="activity__btn" onClick={handleRetry}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Retake Examination
        </button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__progress">
        <div className="quiz__progress-bar" style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} />
      </div>
      <div className="quiz__header-meta">
        <span className="quiz__counter annotation">Item {current + 1} of {quizQuestions.length}</span>
        <span className="plate-label">Score: {score} pts</span>
      </div>
      <h3 className="quiz__question">{q.question}</h3>
      <div className="quiz__options">
        {q.options.map((opt, idx) => {
          let cls = 'quiz__option';
          if (showResult) {
            if (idx === q.correct) cls += ' quiz__option--correct';
            else if (idx === selected && idx !== q.correct) cls += ' quiz__option--wrong';
          } else if (idx === selected) {
            cls += ' quiz__option--selected';
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={showResult}>
              <span className="quiz__option-letter">{String.fromCharCode(65 + idx)}</span>
              <span className="quiz__option-text">{opt}</span>
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className={`quiz__feedback ${selected === q.correct ? 'quiz__feedback--correct' : 'quiz__feedback--wrong'}`}>
          <div className="quiz__feedback-header">
            <strong>{selected === q.correct ? '✓ Correct Answer' : '✗ Incorrect Selection'}</strong>
          </div>
          <p>{q.explanation}</p>
          <button className="activity__btn" onClick={handleNext}>
            {current < quizQuestions.length - 1 ? 'Next Question →' : 'View Final Evaluation'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Activity 2: Match the Masters & Terms ── */
function MatchingActivity() {
  const [filterCategory, setFilterCategory] = useState('all');
  const pool = filterCategory === 'all' 
    ? matchingPairs.slice(0, 8) 
    : matchingPairs.filter(p => p.category === filterCategory);

  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);

  // Deterministic shuffled match list per pool
  const matches = [...pool].sort((a, b) => a.match.localeCompare(b.match));

  const handleTermClick = (term) => {
    if (matched.includes(term)) return;
    setSelectedTerm(term);
    setWrongPair(null);
    if (selectedMatch) {
      checkMatch(term, selectedMatch);
    }
  };

  const handleMatchClick = (matchText) => {
    const pair = pool.find(p => p.match === matchText);
    if (pair && matched.includes(pair.term)) return;
    setSelectedMatch(matchText);
    setWrongPair(null);
    if (selectedTerm) {
      checkMatch(selectedTerm, matchText);
    }
  };

  const checkMatch = (term, matchText) => {
    const pair = pool.find(p => p.term === term);
    if (pair && pair.match === matchText) {
      setMatched(prev => [...prev, term]);
      setSelectedTerm(null);
      setSelectedMatch(null);
    } else {
      setWrongPair({ term, match: matchText });
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedMatch(null);
        setWrongPair(null);
      }, 750);
    }
  };

  const handleReset = () => {
    setSelectedTerm(null);
    setSelectedMatch(null);
    setMatched([]);
    setWrongPair(null);
  };

  const allMatched = matched.length === pool.length && pool.length > 0;

  return (
    <div className="matching">
      <div className="matching__top">
        <p className="matching__instructions">
          Pair each historical artist or archaeological term on the left with its accurate historical contribution or definition on the right.
        </p>
        <div className="matching__filter-pills">
          <button 
            className={`matching__pill ${filterCategory === 'all' ? 'active' : ''}`}
            onClick={() => { setFilterCategory('all'); handleReset(); }}
          >
            All Disciplines ({matchingPairs.slice(0, 8).length})
          </button>
          <button 
            className={`matching__pill ${filterCategory === 'artist' ? 'active' : ''}`}
            onClick={() => { setFilterCategory('artist'); handleReset(); }}
          >
            Western Masters (7)
          </button>
          <button 
            className={`matching__pill ${filterCategory === 'pottery' ? 'active' : ''}`}
            onClick={() => { setFilterCategory('pottery'); handleReset(); }}
          >
            Greek Pottery Vessels (4)
          </button>
        </div>
      </div>

      <div className="matching__board">
        <div className="matching__column">
          <h4 className="plate-label">Artists & Antiquities</h4>
          {pool.map(pair => (
            <button
              key={pair.term}
              className={`matching__item ${matched.includes(pair.term) ? 'matching__item--matched' : ''} ${selectedTerm === pair.term ? 'matching__item--selected' : ''} ${wrongPair?.term === pair.term ? 'matching__item--wrong' : ''}`}
              onClick={() => handleTermClick(pair.term)}
              disabled={matched.includes(pair.term)}
              aria-label={`Select term ${pair.term}`}
            >
              <span className="matching__term-text">{pair.term}</span>
              {matched.includes(pair.term) ? (
                <span className="matching__check">✓ Matched</span>
              ) : (
                <span className="matching__indicator">Select</span>
              )}
            </button>
          ))}
        </div>
        <div className="matching__column">
          <h4 className="plate-label">Contributions & Definitions</h4>
          {matches.map(pair => {
            const isMatched = matched.includes(pair.term);
            return (
              <button
                key={pair.match}
                className={`matching__item ${isMatched ? 'matching__item--matched' : ''} ${selectedMatch === pair.match ? 'matching__item--selected' : ''} ${wrongPair?.match === pair.match ? 'matching__item--wrong' : ''}`}
                onClick={() => handleMatchClick(pair.match)}
                disabled={isMatched}
                aria-label={`Select match description`}
              >
                <span className="matching__match-text">{pair.match}</span>
                {isMatched ? (
                  <span className="matching__check">✓</span>
                ) : (
                  <span className="matching__indicator">Pair</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {allMatched && (
        <div className="matching__complete">
          <span className="annotation">Excellence in Association</span>
          <p>🎉 <strong>All {pool.length} pairs successfully connected!</strong> You have demonstrated keen memory for artistic contributions and historical taxonomy.</p>
        </div>
      )}

      <div className="matching__actions">
        <button className="activity__btn activity__btn--secondary" onClick={handleReset}>
          Reset Associations
        </button>
        <span className="matching__stats annotation">
          Completed: {matched.length} of {pool.length} pairs
        </span>
      </div>
    </div>
  );
}

/* ── Activity 3: Guess the Artwork or Identify the Art Form ── */
function GuessActivity() {
  const [current, setCurrent] = useState(0);
  const [revealedClues, setRevealedClues] = useState(1);
  const [guess, setGuess] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);

  const item = guessTheArtwork[current];

  // Options for quick multiple-choice selection or manual typing
  const multipleChoiceOptions = [
    item.answer,
    current === 0 ? "Bayeux Tapestry" : current === 1 ? "Mosaics" : current === 2 ? "Bifacial Hand Axe" : current === 3 ? "Lekanis" : "Illuminated Manuscript",
    current === 0 ? "Fresco Painting" : current === 1 ? "Stained Glass" : current === 2 ? "Blade Tool" : current === 3 ? "Krater" : "Panel Painting",
    current === 0 ? "Pitsa Panel" : current === 1 ? "Encaustic Icon" : current === 2 ? "Flake Tool" : current === 3 ? "Lebes Gamikos" : "Megalithic Dolmen"
  ].filter((v, i, a) => a.indexOf(v) === i);

  const revealNext = () => {
    if (revealedClues < item.clues.length) {
      setRevealedClues(r => r + 1);
    }
  };

  const evaluateGuess = (submittedText) => {
    const cleanGuess = submittedText.trim().toLowerCase();
    const cleanAnswer = item.answer.toLowerCase();
    
    // Check if user answer matches keywords
    const keywords = cleanAnswer.split(/[\s,()]+/).filter(w => w.length > 3);
    const isCorrect = keywords.some(kw => cleanGuess.includes(kw)) || cleanGuess === cleanAnswer;

    setShowAnswer(true);
    setFeedback(isCorrect);
    setHistory(prev => [...prev, { id: item.id, guess: submittedText, isCorrect, answer: item.answer }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim()) return;
    evaluateGuess(guess);
  };

  const handleSelectOption = (opt) => {
    setGuess(opt);
    evaluateGuess(opt);
  };

  const handleNext = () => {
    if (current < guessTheArtwork.length - 1) {
      setCurrent(c => c + 1);
      setRevealedClues(1);
      setGuess('');
      setShowAnswer(false);
      setFeedback(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setRevealedClues(1);
    setGuess('');
    setShowAnswer(false);
    setFeedback(null);
    setHistory([]);
  };

  return (
    <div className="guess">
      <div className="guess__header">
        <p className="guess__instructions">
          Examine the archival plate and unravel the mystery artwork or artifact. Uncover incremental clues to test your visual deduction, then propose your identification.
        </p>
        <span className="plate-label">Plate {current + 1} of {guessTheArtwork.length}</span>
      </div>

      <div className="guess__content">
        <div className="guess__image-panel">
          <div className="guess__image-frame">
            <img src={item.image} alt="Mystery art plate from Western art history" loading="lazy" className="guess__image" />
            <div className="guess__watermark annotation">Archival Mystery #{item.id}</div>
          </div>
          <span className="museum-caption">Visual specimen under curatorial examination</span>
        </div>

        <div className="guess__deduction-panel">
          <div className="guess__clues-box">
            <div className="guess__clues-header">
              <h4 className="plate-label">Historical Clues Uncovered ({revealedClues}/{item.clues.length})</h4>
              {revealedClues < item.clues.length && !showAnswer && (
                <button className="activity__btn-link" onClick={revealNext}>
                  + Reveal Next Clue
                </button>
              )}
            </div>
            <ul className="guess__clues-list">
              {item.clues.slice(0, revealedClues).map((clue, idx) => (
                <li key={idx} className="guess__clue-item">
                  <span className="guess__clue-bullet">❧</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {!showAnswer ? (
            <div className="guess__input-area">
              <label className="annotation" htmlFor="guessInput">Quick Select or Enter Identification:</label>
              <div className="guess__quick-options">
                {multipleChoiceOptions.map((opt, i) => (
                  <button 
                    key={i} 
                    className="guess__opt-btn"
                    onClick={() => handleSelectOption(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="guess__form">
                <input
                  id="guessInput"
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Or type the specific artwork / tool / form..."
                  className="guess__input"
                  aria-label="Your identification"
                />
                <button type="submit" className="activity__btn">
                  Verify Deduction
                </button>
              </form>
            </div>
          ) : (
            <div className={`guess__answer-reveal ${feedback ? 'correct' : 'incorrect'}`}>
              <div className="guess__result-status">
                <span className="guess__status-badge">
                  {feedback ? '✓ Accurate Identification!' : '✗ Not Quite Correct'}
                </span>
                <span className="guess__actual-title"><strong>Official Identification:</strong> {item.answer}</span>
              </div>
              <p className="guess__explanation">{item.explanation}</p>
              
              <div className="guess__action-next">
                {current < guessTheArtwork.length - 1 ? (
                  <button className="activity__btn" onClick={handleNext}>
                    Proceed to Next Specimen →
                  </button>
                ) : (
                  <button className="activity__btn" onClick={handleRestart}>
                    Review All Deductions / Restart
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Activity 4: Western Art Appreciation Poll ── */
function PollActivity() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const options = [
    { id: 'prehistoric', label: 'Prehistoric Cave Art \u0026 Megaliths', desc: 'The mystical dawn of symbolic expression and primal human storytelling.' },
    { id: 'medieval', label: 'Medieval Sacred Arts \u0026 Tapestries', desc: 'The ethereal luminescence of stained glass, illuminated manuscripts, and mosaics.' },
    { id: 'greek', label: 'Classical Greek Painting \u0026 Vessels', desc: 'The triumph of naturalism, graceful mythology, and balanced pottery forms.' },
    { id: 'renaissance', label: 'Early Renaissance Humanism \u0026 Perspective', desc: 'Brunelleschi\u2019s dome, Donatello\u2019s bronze David, and revolutionary spatial depth.' }
  ];

  const handleVote = (id) => {
    if (hasVoted) return;
    setSelectedOption(id);
    setHasVoted(true);
  };

  const chosen = options.find(o => o.id === selectedOption);

  return (
    <div className="poll">
      {!hasVoted && (
        <div className="poll__header">
          <p className="poll__intro">
            Art appreciation is a deeply personal dialogue between the viewer and the past. Which epoch or visual philosophy of Western art resonates most profoundly with your creative spirit?
          </p>
        </div>
      )}

      {hasVoted ? (
        <div className="poll__thankyou">
          <div className="poll__thankyou-emblem">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#855b32" strokeWidth="1.6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h4 className="poll__thankyou-title">Thank you for contributing your voice to our class gallery survey!</h4>
          {chosen && (
            <p className="poll__thankyou-choice">
              Your selection: <em>{chosen.label}</em>
            </p>
          )}
        </div>
      ) : (
        <div className="poll__options-grid">
          {options.map(opt => (
            <div
              key={opt.id}
              className="poll__card paper-card"
              onClick={() => handleVote(opt.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleVote(opt.id)}
            >
              <div className="poll__card-header">
                <h4>{opt.label}</h4>
              </div>
              <p className="poll__card-desc">{opt.desc}</p>
              <button className="activity__btn activity__btn--small" tabIndex={-1}>
                Cast Your Vote
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


/* ── Interactive Zone Master Container ── */
export default function ActivitiesPage() {
  const [headerRef, headerVisible] = useInView();
  const [tabsRef, tabsVisible] = useInView({ threshold: 0.05 });
  const [activeTab, setActiveTab] = useState('quiz');
  const [clickedTab, setClickedTab] = useState(null);
  const [boardKey, setBoardKey] = useState(0);
  const boardRef = useRef(null);

  const handleTabSelect = (id) => {
    setActiveTab(id);
    setClickedTab(id);
    setBoardKey(k => k + 1);
    // Smooth scroll to board with a small delay so the tab highlight registers first
    setTimeout(() => {
      if (boardRef.current) {
        boardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const activities = [
    { 
      id: 'quiz', 
      title: 'Art History Quiz', 
      numeral: 'I',
      tag: '10 Questions',
      desc: 'Test your understanding across all five module topics with instant feedback.' 
    },
    { 
      id: 'matching', 
      title: 'Match the Masters & Terms', 
      numeral: 'II',
      tag: 'Tactile Pairs',
      desc: 'Pair historical figures, stone tools, and Greek pottery shapes with their definitions.' 
    },
    { 
      id: 'guess', 
      title: 'Guess the Specimen', 
      numeral: 'III',
      tag: 'Curatorial Clues',
      desc: 'Identify prehistoric tools, Greek vases, and medieval masterworks from mystery plates.' 
    },
    { 
      id: 'poll', 
      title: 'Appreciation Poll', 
      numeral: 'IV',
      tag: 'Class Sentiment',
      desc: 'Cast your vote for the Western Art movement that inspires you most.' 
    }
  ];

  return (
    <section id="activities" className="activities section">
      <div className="container">
        {/* Parchment Paper Header — matching Artists & Sections of Western Art style */}
        <div ref={headerRef} className={`activities__header scroll-ease-in ${headerVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.04s' }}>
          <div className="activities__paper-pad">
            <img
              src="/assets/parchment-paper.avif"
              alt="Parchment manuscript folio"
              className="activities__paper-img"
              loading="lazy"
            />
            <div className="activities__paper-overlay" />
            <div className="activities__header-content">
              <h2 className="section-title">Interactive Zone: Play, Solve, and Learn</h2>
              <p className="section-subtitle">Tactile digital engagement with Western Art History and Module 3 concepts</p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        {/* Activity Tab Cards */}
        <div ref={tabsRef} className="activities__tabs-strip" role="tablist" aria-label="Interactive learning activities">
          {activities.map((act, i) => (
            <button
              key={act.id}
              role="tab"
              aria-selected={activeTab === act.id}
              className={`activities__tab-card scroll-ease-in ${tabsVisible ? 'visible' : ''} ${activeTab === act.id ? 'active' : ''} ${clickedTab === act.id ? 'just-clicked' : ''}`}
              style={{ transitionDelay: `${0.08 * i}s` }}
              onClick={() => handleTabSelect(act.id)}
            >
              <div className="activities__tab-numeral">{act.numeral}</div>
              <div className="activities__tab-text">
                <div className="activities__tab-header">
                  <span className="activities__tab-title">{act.title}</span>
                  <span className="activities__tab-tag">{act.tag}</span>
                </div>
                <p className="activities__tab-desc">{act.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Activity Board */}
        <div className={`activities__board paper-card scroll-ease-in ${tabsVisible ? 'visible' : ''}`} role="tabpanel" ref={boardRef} key={boardKey} style={{ scrollMarginTop: '80px', transitionDelay: '0.36s' }}>
          {activeTab === 'quiz' && <QuizActivity />}
          {activeTab === 'matching' && <MatchingActivity />}
          {activeTab === 'guess' && <GuessActivity />}
          {activeTab === 'poll' && <PollActivity />}
        </div>
      </div>
    </section>
  );
}

