import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-sm)',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'var(--transition-fast)',
  whiteSpace: 'nowrap',
};

const variants: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
  },
  secondary: {
    backgroundColor: 'var(--color-bg-tertiary)',
    color: 'var(--color-text-primary)',
  },
  danger: {
    backgroundColor: 'var(--color-expense)',
    color: '#fff',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
  },
};

const sizes: Record<string, React.CSSProperties> = {
  sm: { padding: '0.375rem 0.75rem', fontSize: 'var(--font-size-sm)' },
  md: { padding: '0.5rem 1rem', fontSize: 'var(--font-size-md)' },
  lg: { padding: '0.75rem 1.5rem', fontSize: 'var(--font-size-lg)' },
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  style,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
