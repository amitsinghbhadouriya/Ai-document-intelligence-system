import React from 'react';

export default function ShinyText({
  text = '',
  className = '',
  speed = 4,
  disabled = false,
  ...props
}) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        animationDuration: `${speed}s`,
        animationPlayState: disabled ? 'paused' : 'running',
      }}
      {...props}
    >
      {text}
    </span>
  );
}
