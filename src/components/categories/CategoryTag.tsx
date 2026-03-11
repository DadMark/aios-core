import React from 'react';
import type { Category } from '@/types';

interface CategoryTagProps {
  category: Category | undefined;
  size?: 'sm' | 'md';
}

export function CategoryTag({ category, size = 'sm' }: CategoryTagProps) {
  if (!category) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: size === 'sm' ? '2px 8px' : '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-bg-tertiary)',
          color: 'var(--color-text-muted)',
          fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
        }}
      >
        📦 Sem categoria
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: size === 'sm' ? '2px 8px' : '4px 10px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: `${category.color}22`,
        color: category.color,
        fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
        fontWeight: 500,
        border: `1px solid ${category.color}44`,
      }}
    >
      {category.icon} {category.name}
    </span>
  );
}
