import React from 'react';

export default function GlowBadge({
  children,
  variant = 'indigo', // 'indigo', 'emerald', 'cyan'
  icon,
  className = '',
  pulse = true,
  ...props
}) {
  let badgeClass = 'glow-badge';
  if (variant === 'emerald') badgeClass = 'glow-badge glow-badge-emerald';
  if (variant === 'cyan') badgeClass = 'glow-badge glow-badge-cyan';

  return (
    <span className={`${badgeClass} ${className}`} {...props}>
      {pulse && (
        <span
          className={`pulse-dot ${
            variant === 'emerald' ? 'success' : variant === 'cyan' ? 'cyan' : 'indigo'
          }`}
          style={{ width: '7px', height: '7px', marginRight: '2px' }}
        />
      )}
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
