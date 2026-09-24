import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagnetButton({
  children,
  className = '',
  magnetStrength = 0.35,
  onClick,
  ...props
}) {
  const magnetRef = useRef(null);

  useEffect(() => {
    const el = magnetRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * magnetStrength,
        y: y * magnetStrength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [magnetStrength]);

  return (
    <div
      ref={magnetRef}
      className={`magnet-button-wrapper ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
