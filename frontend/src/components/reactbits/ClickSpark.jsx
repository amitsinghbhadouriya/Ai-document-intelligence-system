import React, { useEffect, useRef } from 'react';

export default function ClickSpark({
  sparkColor = 'rgba(99, 102, 241, 0.8)',
  sparkSize = 12,
  sparkCount = 8,
  duration = 400,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 3 + 1.5;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          startTime: now,
          color: sparkColor,
        });
      }
    };

    window.addEventListener('click', handleClick);

    const loop = (currentTime) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = currentTime - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const alpha = 1 - progress;
        const currentSize = sparkSize * (1 - progress);

        spark.x += spark.vx;
        spark.y += spark.vy;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = spark.color.replace(/[\d\.]+\)$/g, `${alpha})`);
        ctx.fill();

        return true;
      });

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrame);
    };
  }, [sparkColor, sparkSize, sparkCount, duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}
