import React from 'react';

/**
 * Renders an authentic cave wall surface with stroke marks.
 * Uses a unique instanceId so SVG gradient IDs never collide across multiple cards.
 */
export default function CavePaintingView({ marks = [], id = 'default', className = '' }) {
  const wallId = `cave-wall-${id}`;
  const lightId = `cave-light-${id}`;
  const grainId = `cave-grain-${id}`;

  return (
    <svg
      className={`cave-painting-view ${className}`}
      viewBox="0 0 800 430"
      role="img"
      aria-label="Cave wall painting"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={wallId} x2="0.2" y2="1">
          <stop stopColor="#6c5949" />
          <stop offset=".52" stopColor="#4b3d33" />
          <stop offset="1" stopColor="#332b27" />
        </linearGradient>
        <radialGradient id={lightId}>
          <stop stopColor="#8d7054" stopOpacity=".55" />
          <stop offset="1" stopColor="#302923" stopOpacity="0" />
        </radialGradient>
        <pattern id={grainId} width="42" height="38" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="7" r="1.2" fill="#d0b991" opacity=".2" />
          <circle cx="28" cy="23" r="1" fill="#dbc8a6" opacity=".15" />
          <path d="M12 33l5-2" stroke="#241f1c" opacity=".18" />
        </pattern>
      </defs>

      {/* Rock base */}
      <rect width="800" height="430" fill={`url(#${wallId})`} />
      {/* Torchlight glow */}
      <ellipse cx="410" cy="190" rx="390" ry="260" fill={`url(#${lightId})`} />
      {/* Natural cave crevice shadows */}
      <path
        d="M0 0H122 Q86 73 104 125 Q61 172 89 228 Q42 298 96 430 H0Z M800 0H685 Q719 79 700 128 Q749 183 709 244 Q757 319 702 430 H800Z"
        fill="#282320"
        opacity=".6"
      />
      {/* Stone grain texture */}
      <rect width="800" height="430" fill={`url(#${grainId})`} />
      {/* Cave rock ridge */}
      <path d="M102 374 Q212 346 322 373 T548 372 T800 365" fill="none" stroke="#241e1a" strokeWidth="28" opacity=".42" />

      {/* The Painted / Etched Marks */}
      {marks.map((mark, index) => (
        <path
          key={index}
          d={mark.d}
          fill="none"
          stroke={mark.color}
          strokeWidth={mark.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={mark.mode === 'etch' ? '2 2' : undefined}
          opacity={mark.mode === 'etch' ? '.85' : '.94'}
        />
      ))}
    </svg>
  );
}
