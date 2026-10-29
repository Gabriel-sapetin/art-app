import React from 'react';

/**
 * Vintage engraved botanical illustrations styled like Victorian & antique
 * natural history pop-up books (inspired by the wildflowers reference).
 */

export function BotanicalBackdrop({ period = 'Prehistoric' }) {
  return (
    <div className="popup-botanical__backdrop" aria-hidden="true">
      {/* Left tall foliage cluster (Ferns, Thistle, Wild Yarrow) */}
      <svg className="popup-botanical__stem popup-botanical__stem--left-back" viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wild Thistle Head */}
        <g className="popup-botanical__thistle">
          <path d="M45 45 C35 30, 25 25, 20 18 C30 20, 42 28, 48 38 C52 24, 60 16, 70 12 C65 24, 62 34, 58 45" fill="#7d526e" opacity="0.85"/>
          <path d="M35 50 C28 40, 18 36, 12 32 C22 36, 32 44, 38 54 C42 42, 50 35, 62 30 C56 40, 52 48, 48 58" fill="#9b698a" opacity="0.9"/>
          <ellipse cx="48" cy="56" rx="16" ry="12" fill="#586c48" stroke="#3d4c32" strokeWidth="1"/>
          {/* Spiky bracts */}
          <path d="M32 54 L26 48 L34 52 L28 44 L36 50 L32 40 L40 48 L38 38 L44 48 L46 36 L48 48 L52 36 L52 48 L58 38 L56 48 L64 40 L60 50 L68 44 L62 52 L70 48 L64 54" stroke="#485b3a" strokeWidth="1.2" fill="none"/>
          {/* Stem */}
          <path d="M48 68 C47 110, 42 160, 36 240" stroke="#4a5d3b" strokeWidth="3.5" strokeLinecap="round"/>
          {/* Serrated spiky leaves */}
          <path d="M44 110 C30 95, 12 100, 2 92 C14 105, 26 112, 42 118" fill="#5c7249" stroke="#3d4c32" strokeWidth="1"/>
          <path d="M42 145 C24 135, 8 142, 0 136 C12 148, 26 152, 40 154" fill="#627a4e" stroke="#3d4c32" strokeWidth="1"/>
          <path d="M46 128 C60 115, 78 120, 88 114 C76 126, 62 130, 44 134" fill="#5c7249" stroke="#3d4c32" strokeWidth="1"/>
        </g>
        {/* Wild Yarrow / Sedum Cluster */}
        <g className="popup-botanical__yarrow" transform="translate(65, 30)">
          <path d="M45 42 C45 90, 42 140, 38 210" stroke="#536742" strokeWidth="2.8" strokeLinecap="round"/>
          {/* Pinkish umbrella dome */}
          <ellipse cx="45" cy="40" rx="32" ry="18" fill="#bc7784" opacity="0.88"/>
          <ellipse cx="32" cy="34" rx="16" ry="10" fill="#cf8d9a" opacity="0.95"/>
          <ellipse cx="58" cy="36" rx="18" ry="11" fill="#d89aa6" opacity="0.9"/>
          <ellipse cx="46" cy="28" rx="20" ry="11" fill="#e2adb7" opacity="0.85"/>
          {/* Tiny florets */}
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={22 + (i % 6) * 9 + ((i % 2) * 3)} cy={26 + Math.floor(i / 6) * 7} r="2.2" fill="#fff5ea" stroke="#b86f7c" strokeWidth="0.8"/>
          ))}
          {/* Fern-like feathery leaves */}
          <path d="M42 90 C25 80, 15 72, 8 68 C16 82, 28 92, 40 98" fill="#576d44"/>
          <path d="M44 125 C60 115, 72 108, 80 102 C72 118, 58 128, 42 133" fill="#576d44"/>
        </g>
      </svg>

      {/* Center Tall Queen Anne's Lace (bursting above book) */}
      <svg className="popup-botanical__stem popup-botanical__stem--center-back" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(15, 0)">
          {/* Stem */}
          <path d="M90 60 C88 120, 85 180, 80 270" stroke="#5a7147" strokeWidth="3.2" strokeLinecap="round"/>
          {/* Umbel rays */}
          {[-45, -35, -25, -15, -5, 5, 15, 25, 35, 45].map((deg, i) => (
            <line key={i} x1="90" y1="60" x2={90 + Math.sin(deg * Math.PI / 180) * 58} y2={60 - Math.cos(deg * Math.PI / 180) * 35} stroke="#688352" strokeWidth="1.2"/>
          ))}
          {/* Lacy white head */}
          <ellipse cx="90" cy="28" rx="58" ry="18" fill="#faf6ed" opacity="0.95" stroke="#d5c8b2" strokeWidth="1"/>
          <ellipse cx="65" cy="24" rx="22" ry="12" fill="#ffffff" opacity="0.92"/>
          <ellipse cx="115" cy="25" rx="24" ry="12" fill="#ffffff" opacity="0.92"/>
          <ellipse cx="90" cy="18" rx="26" ry="10" fill="#fcf9f2" opacity="0.98"/>
          {/* Lace texture dots */}
          {Array.from({ length: 28 }).map((_, i) => (
            <circle key={i} cx={42 + (i % 8) * 13 + ((i % 3) * 2)} cy={16 + Math.floor(i / 8) * 8} r="1.8" fill="#755a39" opacity="0.45"/>
          ))}
          {/* Dark purple solitary center floret (characteristic of Queen Anne's lace!) */}
          <circle cx="90" cy="22" r="2.8" fill="#4a2238"/>
          {/* Graceful pinnate leaves */}
          <path d="M88 140 C60 120, 35 125, 15 118 C38 138, 62 145, 86 148" fill="#5c7448" opacity="0.9"/>
          <path d="M86 175 C115 155, 140 160, 160 152 C135 174, 110 180, 84 183" fill="#536941" opacity="0.9"/>
        </g>
      </svg>

      {/* Right tall foliage cluster (Wild Chamomile, Fern frond, Goldenrod) */}
      <svg className="popup-botanical__stem popup-botanical__stem--right-back" viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 10)">
          {/* Fern Frond curving outward */}
          <path d="M30 240 C50 170, 75 100, 120 30" stroke="#485c37" strokeWidth="3" strokeLinecap="round"/>
          {/* Fern pinnae */}
          {[0.2, 0.35, 0.5, 0.65, 0.8, 0.92].map((t, idx) => {
            const x = 30 + t * 90;
            const y = 240 - t * 210;
            return (
              <g key={idx}>
                <path d={`M${x} ${y} C${x + 18} ${y - 10}, ${x + 28} ${y - 8}, ${x + 36} ${y - 4} C${x + 22} ${y + 2}, ${x + 10} ${y + 6}, ${x} ${y}`} fill="#587044" stroke="#3b4d2c" strokeWidth="0.8"/>
                <path d={`M${x} ${y} C${x - 14} ${y - 8}, ${x - 24} ${y - 6}, ${x - 30} ${y - 2} C${x - 18} ${y + 2}, ${x - 8} ${y + 5}, ${x} ${y}`} fill="#647d4e" stroke="#3b4d2c" strokeWidth="0.8"/>
              </g>
            );
          })}
          {/* Golden Wildflower (like in reference picture) */}
          <g transform="translate(90, 60)">
            <path d="M15 15 C10 65, 0 120, -15 170" stroke="#50643c" strokeWidth="2.4"/>
            <circle cx="16" cy="14" r="9" fill="#d99b26"/>
            {/* Golden petals */}
            {Array.from({ length: 12 }).map((_, i) => {
              const ang = (i * 30) * Math.PI / 180;
              const px = 16 + Math.cos(ang) * 16;
              const py = 14 + Math.sin(ang) * 16;
              return (
                <ellipse key={i} cx={px} cy={py} rx="6" ry="3.5" transform={`rotate(${i * 30} ${px} ${py})`} fill="#f2b738" stroke="#bd7f18" strokeWidth="0.6"/>
              );
            })}
            <circle cx="16" cy="14" r="6" fill="#7d5012"/>
          </g>
        </g>
      </svg>
    </div>
  );
}

export function BotanicalForeground({ period = 'Prehistoric' }) {
  return (
    <div className="popup-botanical__foreground" aria-hidden="true">
      {/* Left lower cluster: Wild Chamomile & Clover */}
      <svg className="popup-botanical__sprout popup-botanical__sprout--left" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wild Daisy 1 */}
        <g transform="translate(30, 35)">
          <circle cx="20" cy="20" r="7.5" fill="#e0a328"/>
          {Array.from({ length: 14 }).map((_, i) => {
            const ang = (i * 25.7) * Math.PI / 180;
            const px = 20 + Math.cos(ang) * 14;
            const py = 20 + Math.sin(ang) * 14;
            return (
              <ellipse key={i} cx={px} cy={py} rx="5" ry="2.6" transform={`rotate(${i * 25.7} ${px} ${py})`} fill="#fffdfa" stroke="#d2c4b0" strokeWidth="0.6"/>
            );
          })}
          <circle cx="20" cy="20" r="4.5" fill="#8c6114"/>
        </g>
        {/* Wild Daisy 2 (smaller) */}
        <g transform="translate(68, 48)">
          <circle cx="14" cy="14" r="5" fill="#e0a328"/>
          {Array.from({ length: 11 }).map((_, i) => {
            const ang = (i * 32.7) * Math.PI / 180;
            const px = 14 + Math.cos(ang) * 10;
            const py = 14 + Math.sin(ang) * 10;
            return (
              <ellipse key={i} cx={px} cy={py} rx="3.8" ry="2" transform={`rotate(${i * 32.7} ${px} ${py})`} fill="#fffdfa" stroke="#d2c4b0" strokeWidth="0.5"/>
            );
          })}
          <circle cx="14" cy="14" r="3" fill="#8c6114"/>
        </g>
        {/* Clover Leaves */}
        <path d="M22 75 C10 65, 8 50, 18 48 C28 46, 28 62, 22 75" fill="#587342"/>
        <path d="M22 75 C12 85, 2 78, 6 68 C10 58, 22 68, 22 75" fill="#4d6639"/>
        <path d="M22 75 C32 85, 42 78, 38 68 C34 58, 24 68, 22 75" fill="#617e49"/>
      </svg>

      {/* Right lower cluster: Bellflower / Bluebell & Ivy leaf */}
      <svg className="popup-botanical__sprout popup-botanical__sprout--right" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bellflowers (pink/violet) */}
        <g transform="translate(45, 25)">
          <path d="M30 15 C18 10, 10 24, 18 36 C24 44, 38 38, 42 26 C45 18, 38 12, 30 15" fill="#8e5e7e" stroke="#5c3851" strokeWidth="0.8"/>
          <path d="M12 28 L6 26 L10 34 L4 36 L12 40" fill="#a47293"/>
          <path d="M30 15 C34 35, 40 60, 45 75" stroke="#485c37" strokeWidth="2"/>
        </g>
        {/* Ivy/Maple leaf */}
        <path d="M85 70 C75 55, 65 52, 60 58 C55 64, 68 74, 85 70 Z" fill="#536b3f"/>
        <path d="M85 70 C95 55, 105 52, 110 58 C115 64, 102 74, 85 70 Z" fill="#475c35"/>
        <path d="M85 70 C88 50, 85 40, 85 35 C82 45, 82 55, 85 70 Z" stroke="#374829" strokeWidth="1.2"/>
      </svg>
    </div>
  );
}

