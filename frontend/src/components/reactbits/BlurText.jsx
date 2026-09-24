import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function BlurText({
  text = '',
  className = '',
  delay = 0.1,
  duration = 0.8,
  stagger = 0.05,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.blur-word');
    gsap.fromTo(
      words,
      {
        opacity: 0,
        filter: 'blur(10px)',
        y: 15,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power2.out',
      }
    );

    return () => {
      gsap.killTweensOf(words);
    };
  }, [text, delay, duration, stagger]);

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`d-inline-block ${className}`} {...props}>
      {words.map((word, i) => (
        <span
          key={i}
          className="blur-word d-inline-block"
          style={{ marginRight: i < words.length - 1 ? '0.35em' : '0' }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
