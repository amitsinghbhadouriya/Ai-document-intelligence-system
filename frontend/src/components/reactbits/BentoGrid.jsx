import React from 'react';

export function BentoGrid({ children, className = '' }) {
  return (
    <div className={`bento-grid ${className}`}>
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  colSpan = 12, // 1 to 12
  mdColSpan = 6,
  lgColSpan = 4,
  className = '',
  gradient = 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(6, 182, 212, 0.2))',
  onClick,
  style = {},
  ...props
}) {
  const colClass = `col-12 col-md-${mdColSpan} col-lg-${lgColSpan}`;

  return (
    <div
      className={`bento-card ${className}`}
      onClick={onClick}
      style={{
        gridColumn: `span ${colSpan}`,
        ...style,
      }}
      {...props}
    >
      <div
        className="bento-card-bg-gradient"
        style={{ background: gradient }}
      />
      {children}
    </div>
  );
}

export default BentoGrid;
