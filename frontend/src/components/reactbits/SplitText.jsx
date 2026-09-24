import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function SplitText({
  text = '',
  className = '',
  delay = 0.05,
  duration = 0.6,
  stagger = 0.03,
  by = 'chars', // 'chars' or 'words'
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('.split-token');
    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: 20,
        rotateX: -40,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out',
      }
    );

    return () => {
      gsap.killTweensOf(targets);
    };
  }, [text, delay, duration, stagger, by]);

  if (by === 'words') {
    const words = text.split(' ');
    return (
      <span ref={containerRef} className={`d-inline-block ${className}`} {...props}>
        {words.map((word, i) => (
          <span
            key={i}
            className="split-token d-inline-block"
            style={{ marginRight: i < words.length - 1 ? '0.35em' : '0' }}
          >
            {word}
          </span>
        ))}
      </span>
    );
  }

  // Default by chars
  const chars = text.split('');
  return (
    <span ref={containerRef} className={`d-inline-block ${className}`} {...props}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="split-token d-inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
