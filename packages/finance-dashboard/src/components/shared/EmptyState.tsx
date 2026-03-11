import React from 'react';
import { Button } from '@/components/shared/Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--spacing-2xl)',
  textAlign: 'center',
};

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div style={containerStyle}>
      {icon && <span style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>{icon}</span>}
      <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)', maxWidth: 400 }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
