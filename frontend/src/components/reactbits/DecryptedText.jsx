import React, { useState, useEffect, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?/';

export default function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 10,
  revealDelay = 40,
  className = '',
  animateOnHover = true,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimatingRef = useRef(false);

  const startScramble = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      iteration += 1 / (maxIterations / text.length);

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, speed);
  };

  useEffect(() => {
    startScramble();
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOnHover) {
      setIsHovered(true);
      startScramble();
    }
  };

  return (
    <span
      className={`decrypted-text ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {displayText.split('').map((char, idx) => (
        <span
          key={idx}
          className={
            char === text[idx]
              ? 'decrypted-char-revealed'
              : 'decrypted-char-scrambled'
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}
