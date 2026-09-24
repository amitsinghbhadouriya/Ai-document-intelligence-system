import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CountUp({
  to = 0,
  from = 0,
  duration = 1.8,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  separator = ',',
}) {
  const numberRef = useRef(null);

  useEffect(() => {
    const obj = { val: from };
    const el = numberRef.current;
    if (!el) return;

    gsap.to(obj, {
      val: to,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        let formatted = obj.val.toFixed(decimals);
        if (separator) {
          const parts = formatted.split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
          formatted = parts.join('.');
        }
        el.textContent = `${prefix}${formatted}${suffix}`;
      },
    });

    return () => {
      gsap.killTweensOf(obj);
    };
  }, [to, from, duration, decimals, suffix, prefix, separator]);

  return (
    <span ref={numberRef} className={className}>
      {prefix}{from.toFixed(decimals)}{suffix}
    </span>
  );
}
