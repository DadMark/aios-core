import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-bg-card)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-border)',
  padding: 'var(--spacing-lg)',
  transition: 'var(--transition-normal)',
};

export function Card({ children, className, style, onClick }: CardProps) {
  return (
    <div
      className={className}
      style={{ ...cardStyle, cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
