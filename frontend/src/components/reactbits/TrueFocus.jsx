import React, { useRef, useState } from 'react';

export default function TrueFocus({
  sentence = 'AI Document Intelligence Grounded RAG Platform',
  className = '',
  borderColor = '#6366f1',
  glowColor = 'rgba(99, 102, 241, 0.4)',
}) {
  const words = sentence.split(' ');
  const [focusRect, setFocusRect] = useState(null);
  const containerRef = useRef(null);

  const handleWordEnter = (e) => {
    if (!containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const wordRect = e.currentTarget.getBoundingClientRect();

    setFocusRect({
      left: wordRect.left - parentRect.left - 4,
      top: wordRect.top - parentRect.top - 2,
      width: wordRect.width + 8,
      height: wordRect.height + 4,
    });
  };

  const handleWordLeave = () => {
    // keep or clear
  };

  return (
    <div
      ref={containerRef}
      className={`true-focus-wrapper d-inline-flex flex-wrap gap-2 position-relative align-items-center ${className}`}
      onMouseLeave={handleWordLeave}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="position-relative px-1 py-0.5 cursor-pointer user-select-none"
          onMouseEnter={handleWordEnter}
          style={{ transition: 'color 0.2s ease' }}
        >
          {word}
        </span>
      ))}
      {focusRect && (
        <div
          className="true-focus-border"
          style={{
            left: `${focusRect.left}px`,
            top: `${focusRect.top}px`,
            width: `${focusRect.width}px`,
            height: `${focusRect.height}px`,
            borderColor: borderColor,
            boxShadow: `0 0 16px ${glowColor}`,
          }}
        />
      )}
    </div>
  );
}
