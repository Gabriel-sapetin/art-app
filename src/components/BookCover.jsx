import './BookCover.css';

export default function BookCover({ onOpen, isOpening = false }) {
  return (
    <div className={`book-cover-stage${isOpening ? ' book-cover-stage--opening' : ''}`}>
      <div className="book-cover__cast-shadow" aria-hidden="true" />

      {/* Inner parchment leaves that flip in rapid cascade after the cover opens */}
      <div className="book-cover__inner-leaf book-cover__inner-leaf--4" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>
      <div className="book-cover__inner-leaf book-cover__inner-leaf--3" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>
      <div className="book-cover__inner-leaf book-cover__inner-leaf--2" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>
      <div className="book-cover__inner-leaf book-cover__inner-leaf--1" aria-hidden="true">
        <span className="book-cover__leaf-front" />
        <span className="book-cover__leaf-back" />
      </div>

      {/* The leather hardcover itself */}
      <div className="book-cover" aria-hidden={isOpening ? 'true' : undefined}>
        <button
          type="button"
          className="book-cover__face book-cover__face--front"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Open the Book: Ochre & Ember, A Journey Through Western Art"
        >
          <img
            src="/assets/book-cover.jpg"
            alt=""
            className="book-cover__bg"
            draggable="false"
          />
          <span className="book-cover__shadow-overlay" aria-hidden="true" />
          <span className="book-cover__content">
            <span className="book-cover__edition">Illustrated Art History</span>
            <span className="book-cover__title">OCHRE &amp; EMBER</span>
            <span className="book-cover__tagline">A Journey Through Western Art</span>
            <span className="book-cover__gold-rule" aria-hidden="true" />
            <span className="book-cover__topic">
              Prehistoric · Medieval · Renaissance · Classical
            </span>
            <span className="book-cover__academic-tag">Group 3 · Art Appreciation</span>
            <span className="book-cover__open-prompt">Open the Book</span>
          </span>
        </button>

        <span className="book-cover__inside" aria-hidden="true" />
      </div>
    </div>
  );
}
