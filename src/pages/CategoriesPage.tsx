import React from 'react';
import { CategoryManager } from '@/components/categories/CategoryManager';
import { useI18n } from '@/i18n/context';

export function CategoriesPage() {
  const { t } = useI18n();

  return (
    <div>
      <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--spacing-xl)' }}>
        {t('categories.title')}
      </h1>
      <CategoryManager />
    </div>
  );
}
