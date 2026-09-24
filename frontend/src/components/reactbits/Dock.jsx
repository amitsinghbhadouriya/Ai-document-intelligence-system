import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Dock({ items = [], className = '' }) {
  const location = useLocation();
  const dockRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!dockRef.current) return;
    const itemsEl = dockRef.current.querySelectorAll('.dock-item');
    const mouseX = e.clientX;

    itemsEl.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);
      const maxDistance = 120;

      if (distance < maxDistance) {
        const scale = 1 + (1 - distance / maxDistance) * 0.35;
        item.style.transform = `scale(${scale}) translateY(-${(scale - 1) * 12}px)`;
      } else {
        item.style.transform = 'scale(1) translateY(0px)';
      }
    });
  };

  const handleMouseLeave = () => {
    if (!dockRef.current) return;
    const itemsEl = dockRef.current.querySelectorAll('.dock-item');
    itemsEl.forEach((item) => {
      item.style.transform = 'scale(1) translateY(0px)';
    });
  };

  return (
    <div className={`dock-wrapper ${className}`}>
      <nav
        ref={dockRef}
        className="dock-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`dock-item ${isActive ? 'active' : ''}`}
              aria-label={item.label}
            >
              {item.icon}
              <span className="dock-tooltip">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
