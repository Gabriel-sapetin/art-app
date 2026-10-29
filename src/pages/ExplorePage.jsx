import { useState, useEffect, useRef } from 'react';
import { exploreSections } from '../data/exploreSections';
import './ExplorePage.css';

const topicList = [
  {
    id: 'prehistoric',
    label: 'Prehistoric Art',
    tag: 'c. 40,000 to 1,000 BCE',
    bg: '/assets/prehistoric bg.jpg',
    lead: 'The dawn of human creative expression before written history, including cave paintings, rock carvings, and the four great prehistoric ages.'
  },
  {
    id: 'stone-tools',
    label: 'Stone Tools',
    tag: 'Lithic Technology',
    bg: '/assets/stone tools bg.jpg',
    lead: 'How early humans shaped natural rock into tools for survival and aesthetic mastery across Oldowan, Acheulean, and blade traditions.'
  },
  {
    id: 'medieval',
    label: 'Medieval Art',
    tag: '5th to 15th Century',
    bg: '/assets/medieval bg.jpg',
    lead: 'Sacred grandeur, luminous stained glass, golden mosaics, and royal craftsmanship of the Middle Ages in Western Europe.'
  },
  {
    id: 'artists-intro',
    label: 'Western Artists',
    tag: 'Renaissance Pioneers',
    bg: '/assets/donatello bg.jpg',
    lead: 'The pioneers of the Italian Renaissance, including Giotto, Brunelleschi, Donatello, and Alberti, who reshaped Western art through perspective.'
  },
  {
    id: 'greek',
    label: 'Greek Painting',
    tag: 'Classical Hellenic',
    bg: '/assets/classical greek bg.jpg',
    lead: 'Masterpieces of vase painting, red-figure technique, the archaic Pitsa wooden panel, and ceremonial vessel typologies.'
  },
];

export default function ExplorePage() {
  const [activeTopicId, setActiveTopicId] = useState('prehistoric');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [viewMode, setViewMode] = useState('portrayal'); // 'portrayal' or 'hub'
  const stageRef = useRef(null);

  // Listen for navigation events from Homepage cards
  useEffect(() => {
    const handleTopicSelect = (e) => {
      if (e.detail && exploreSections[e.detail]) {
        setActiveTopicId(e.detail);
        setCurrentStepIndex(0);
        setSelectedItemIndex(0);
        setViewMode('portrayal');
        if (stageRef.current) {
          stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    window.addEventListener('select-explore-tab', handleTopicSelect);
    return () => window.removeEventListener('select-explore-tab', handleTopicSelect);
  }, []);

  // Reset step index and item index whenever the active topic changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setSelectedItemIndex(0);
  }, [activeTopicId]);

  // Reset selected item when switching steps within the topic
  useEffect(() => {
    setSelectedItemIndex(0);
  }, [currentStepIndex]);

  const currentSection = exploreSections[activeTopicId] || exploreSections['prehistoric'];
  const steps = currentSection.steps;
  const currentStep = steps[currentStepIndex] || steps[0];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Advance to next topic if at the end of current topic
      const topicKeys = Object.keys(exploreSections);
      const currentIdx = topicKeys.indexOf(activeTopicId);
      if (currentIdx < topicKeys.length - 1) {
        setActiveTopicId(topicKeys[currentIdx + 1]);
        setCurrentStepIndex(0);
      } else {
        // Return to topic hub when finished with all epochs
        setViewMode('hub');
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const jumpToStep = (index) => {
    setCurrentStepIndex(index);
  };

  const selectTopicAndEnter = (id) => {
    setActiveTopicId(id);
    setCurrentStepIndex(0);
    setSelectedItemIndex(0);
    setViewMode('portrayal');
  };

  // Determine current image and caption for interactive steps (like Main Periods)
  let displayImage = currentStep.image || currentSection.bg;
  let displayCaption = currentStep.imageCaption || currentStep.title;
  let displayMeta = currentStep.imageMeta || currentSection.tag;

  if (currentStep.items && currentStep.items.length > 0) {
    const activeItem = currentStep.items[selectedItemIndex] || currentStep.items[0];
    displayImage = activeItem.img || displayImage;
    displayCaption = `${activeItem.name}${activeItem.period ? ` (${activeItem.period})` : ''}${activeItem.category ? ` (${activeItem.category})` : ''}`;
    displayMeta = activeItem.period
      ? `Archival Epoch Specimen · ${activeItem.period}`
      : (activeItem.category ? `Artistic Medium · ${activeItem.category}` : `Archival Plate · ${currentSection.title}`);
  }

  return (
    <section id="explore" className="explore section" ref={stageRef}>
      <div className="container">
        {/* Unified Folio Stage: One Whole Padding Container */}
        <div className="explore__stage-container">
          {viewMode === 'hub' ? (
            /* HUB VIEW: Section selection grid when user chooses to exit */
            <div className="explore__hub-view">
              <div className="explore__hub-header">
                <span className="plate-label">Historical Epochs · Module 3</span>
                <h3 className="explore__hub-title">Select an Epoch to Begin Portrayal</h3>
                <p className="explore__hub-subtitle">
                  Each historical section provides a guided portrayal with progressive descriptions, specific artifacts, and individual step-by-step illustrations.
                </p>
              </div>

              <div className="explore__hub-grid">
                {topicList.map((t) => (
                  <div
                    key={t.id}
                    className="explore__hub-card"
                    onClick={() => selectTopicAndEnter(t.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectTopicAndEnter(t.id); }}
                  >
                    <div className="explore__hub-card-img-wrap">
                      <img src={t.bg} alt={t.label} className="explore__hub-card-img" />
                    </div>
                    <div className="explore__hub-card-body">
                      <span className="plate-label">{t.tag}</span>
                      <h4 className="explore__hub-card-title">{t.label}</h4>
                      <p className="explore__hub-card-lead">{t.lead}</p>
                      <button className="explore__hub-card-btn" tabIndex={-1}>
                        Enter Portrayal →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* PORTRAYAL VIEW: Individual portrayal inside one unified padding */
            <>
              {/* Top Bar: Exit Button + Topic Switcher + Dot Progress Indicator */}
              <div className="explore__stage-topbar">
                {/* Exit button so the user can exit and choose other */}
                <button
                  type="button"
                  className="explore__exit-btn"
                  onClick={() => setViewMode('hub')}
                  title="Exit this section and choose another historical epoch"
                  aria-label="Exit section"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Exit Section
                </button>

                {/* Section Switcher Tabs */}
                <div className="explore__topic-tabs" role="tablist" aria-label="Western Art Sections">
                  {topicList.map(t => (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={activeTopicId === t.id}
                      className={`explore__topic-tab ${activeTopicId === t.id ? 'active' : ''}`}
                      onClick={() => selectTopicAndEnter(t.id)}
                    >
                      <img src={t.bg} alt="" className="explore__topic-tab-thumb" />
                      <span className="explore__topic-tab-text">{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Step Dot Progress Indicator */}
                <div className="explore__step-indicator" aria-label={`Step ${currentStepIndex + 1} of ${steps.length}`}>
                  <span className="explore__step-counter plate-label">
                    Part {currentStepIndex + 1} of {steps.length}
                  </span>
                  <div className="explore__step-dots">
                    {steps.map((st, idx) => (
                      <button
                        key={st.id}
                        className={`explore__step-dot ${idx === currentStepIndex ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}`}
                        onClick={() => jumpToStep(idx)}
                        title={`Go to: ${st.title}`}
                        aria-label={`Jump to Part ${idx + 1}: ${st.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Portrayal Area: Split Layout with Left Description & Right Picture */}
              <div
                className="explore__portrayal-stage"
                key={`${activeTopicId}-${currentStepIndex}`}
              >
                {/* LEFT SIDE: Description, Titles & Interactive Content */}
                <div className="explore__portrayal-left">
                  <span className="plate-label explore__step-era">{currentSection.tag}</span>

                  <h3 className="explore__step-title">{currentStep.title}</h3>
                  <h4 className="explore__step-subtitle">{currentStep.subtitle}</h4>

                  {/* Standard Paragraphs with animated entrance */}
                  {currentStep.paragraphs && (
                    <div className="explore__paragraphs">
                      {currentStep.paragraphs.map((para, i) => (
                        <p
                          key={i}
                          className="explore__paragraph"
                          style={{ animationDelay: `${0.1 + i * 0.12}s` }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Bullet Points if present */}
                  {currentStep.bullets && (
                    <div className="explore__bullets-card">
                      {currentStep.bulletTitle && (
                        <h5 className="explore__bullets-title">{currentStep.bulletTitle}</h5>
                      )}
                      <ul className="explore__bullets-list">
                        {currentStep.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="explore__bullet-item"
                            style={{ animationDelay: `${0.22 + i * 0.08}s` }}
                          >
                            <span className="explore__bullet-bullet" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interactive Items (e.g., Main Periods: Stone Age, Neolithic, Bronze Age, Iron Age) */}
                  {currentStep.items && (
                    <div className="explore__items-container">
                      {currentStep.lead && <p className="explore__items-lead">{currentStep.lead}</p>}

                      <div className="explore__items-tabs">
                        {currentStep.items.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`explore__item-btn ${selectedItemIndex === idx ? 'active' : ''}`}
                            onClick={() => setSelectedItemIndex(idx)}
                          >
                            <span className="explore__item-btn-name">{item.name}</span>
                            {item.period && <span className="explore__item-btn-date">{item.period}</span>}
                            {item.category && <span className="explore__item-btn-date">{item.category}</span>}
                          </button>
                        ))}
                      </div>

                      {/* Active Item Description Box */}
                      <div className="explore__item-detail-box" key={selectedItemIndex}>
                        <div className="explore__item-detail-header">
                          <h4>{currentStep.items[selectedItemIndex].name}</h4>
                          <span className="plate-label">
                            {currentStep.items[selectedItemIndex].period || currentStep.items[selectedItemIndex].category}
                          </span>
                        </div>
                        <p>{currentStep.items[selectedItemIndex].desc}</p>
                      </div>
                    </div>
                  )}

                  {/* Historical Curatorial Note if present */}
                  {currentStep.didYouKnow && (
                    <div className="explore__curator-note">
                      <span className="plate-label">Historical Note</span>
                      <p>{currentStep.didYouKnow}</p>
                    </div>
                  )}
                </div>

                {/* RIGHT SIDE: Dedicated Picture & Archival Specimen Plate */}
                <div className="explore__portrayal-right">
                  <div className="explore__specimen-plate">
                    <div className="explore__specimen-img-wrap">
                      <img
                        src={displayImage}
                        alt={displayCaption}
                        className="explore__specimen-img"
                        key={displayImage}
                        loading="lazy"
                      />
                      <div className="explore__specimen-overlay" />
                      <span className="plate-label explore__specimen-tag">
                        Archival Plate: {currentSection.title}
                      </span>
                    </div>

                    <div className="explore__specimen-caption">
                      <p className="explore__specimen-title">{displayCaption}</p>
                      <p className="museum-caption">{displayMeta}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Back Button, Progress Dots, Continue Button */}
              <div className="explore__stage-bottombar">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="explore__nav-btn explore__nav-btn--prev"
                  aria-label="Previous step"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="explore__nav-btn explore__nav-btn--next"
                  aria-label="Continue to next part"
                >
                  {currentStepIndex < steps.length - 1 ? (
                    <>
                      Continue
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Next Section →
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}