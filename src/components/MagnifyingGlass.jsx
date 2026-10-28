import { useState, useRef, useEffect } from 'react';
import './MagnifyingGlass.css';

export default function MagnifyingGlass({ src, alt, width = '100%', zoomLevel = 2.5 }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [glassPos, setGlassPos] = useState({ x: 100, y: 100 });
  const imgRef = useRef(null);
  const glassRef = useRef(null);
  const glassSize = 150;

  const handleToggle = () => setShow(prev => !prev);

  const handleMouseDown = (e) => {
    if (!glassRef.current) return;
    const rect = glassRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => {
      if (!imgRef.current) return;
      const imgRect = imgRef.current.getBoundingClientRect();
      let nx = e.clientX - imgRect.left - dragOffset.x;
      let ny = e.clientY - imgRect.top - dragOffset.y;
      nx = Math.max(-glassSize/2, Math.min(imgRect.width - glassSize/2, nx));
      ny = Math.max(-glassSize/2, Math.min(imgRect.height - glassSize/2, ny));
      setGlassPos({ x: nx, y: ny });

      const cx = nx + glassSize / 2;
      const cy = ny + glassSize / 2;
      setPos({ x: cx / imgRect.width, y: cy / imgRect.height });
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', (e) => handleMove(e.touches[0]), { passive: false });
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging, dragOffset]);

  return (
    <div className="magnifier-wrap" style={{ width }}>
      <div className="magnifier-container" ref={imgRef}>
        <img src={src} alt={alt} className="magnifier-img" loading="lazy" />
        {show && (
          <div
            ref={glassRef}
            className={`magnifier-glass ${dragging ? 'dragging' : ''}`}
            style={{
              left: glassPos.x,
              top: glassPos.y,
              width: glassSize,
              height: glassSize,
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
              backgroundPosition: `${pos.x * 100}% ${pos.y * 100}%`,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={(e) => handleMouseDown(e.touches[0])}
            role="img"
            aria-label={`Magnified view of ${alt}`}
          >
            <div className="magnifier-crosshair" />
          </div>
        )}
      </div>
      <button className="magnifier-toggle" onClick={handleToggle} aria-label={show ? 'Hide magnifying glass' : 'Show magnifying glass'}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        {show ? 'Hide Lens' : 'Inspect Detail'}
      </button>
    </div>
  );
}

