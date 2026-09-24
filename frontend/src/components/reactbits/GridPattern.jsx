import React from 'react';

export default function GridPattern({
  width = 36,
  height = 36,
  strokeDasharray = '0',
  className = '',
  gridColor = 'rgba(255, 255, 255, 0.05)',
  ...props
}) {
  const patternId = 'grid-pattern-' + Math.random().toString(36).substring(2, 9);

  return (
    <svg
      aria-hidden="true"
      className={`position-absolute inset-0 w-100 h-100 pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse at center, white, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, white, transparent 75%)',
      }}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke={gridColor}
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
    </svg>
  );
}
