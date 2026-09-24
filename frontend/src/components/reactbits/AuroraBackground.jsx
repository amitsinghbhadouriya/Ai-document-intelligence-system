import React from 'react';

export default function AuroraBackground({ children, className = '', showRadialGradient = true }) {
  return (
    <div className={`position-relative w-100 overflow-hidden ${className}`}>
      <div className="aurora-bg-container">
        <div className="aurora-layer aurora-layer-1" />
        <div className="aurora-layer aurora-layer-2" />
        <div className="aurora-layer aurora-layer-3" />
        {showRadialGradient && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 20%, rgba(7, 10, 18, 0.85) 90%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <div className="position-relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
