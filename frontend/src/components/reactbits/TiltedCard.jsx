import React, { useRef, useState } from 'react';

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  showGlare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);

    if (showGlare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      cardRef.current.style.setProperty('--glare-x', `${glareX}%`);
      cardRef.current.style.setProperty('--glare-y', `${glareY}%`);
    }
  };

  const handleMouseLeave = () => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
  };

  return (
    <div className={`tilted-card-wrapper ${className}`}>
      <div
        ref={cardRef}
        className="tilted-card position-relative h-100"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transform,
          cursor: onClick ? 'pointer' : 'default',
        }}
        {...props}
      >
        {children}
        {showGlare && <div className="tilted-card-glare" />}
      </div>
    </div>
  );
}
