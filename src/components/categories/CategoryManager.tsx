import React, { useState } from 'react';
import { useCategories } from '@/context/CategoryContext';
import { CategoryForm } from '@/components/categories/CategoryForm';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { EmptyState } from '@/components/shared/EmptyState';
import { useI18n } from '@/i18n/context';
import type { Category } from '@/types';

export function CategoryManager() {
  const { t } = useI18n();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const handleAdd = async (data: Omit<Category, 'id' | 'createdAt'>) => {
    await addCategory(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Omit<Category, 'id' | 'createdAt'>) => {
    if (!editing) return;
    await updateCategory(editing.id, data);
    setEditing(null);
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(t('categories.deleteConfirm'))) return;
    await deleteCategory(cat.id);
  };

  const typeLabel: Record<string, string> = {
    income: t('categories.income'),
    expense: t('categories.expense'),
    both: t('categories.both'),
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
        <Button onClick={() => setShowForm(true)}>+ {t('categories.add')}</Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon="🏷️"
          title={t('categories.noCategories')}
          actionLabel={t('categories.add')}
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--spacing-md)' }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: `${cat.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                {cat.icon}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  {typeLabel[cat.type]}
                </div>
              </div>
              <div
                style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: cat.color, flexShrink: 0 }}
              />
              <div style={{ display: 'flex', gap: 4 }}>
                <Button size="sm" variant="ghost" onClick={() => setEditing(cat)}>✏️</Button>
                {!cat.isDefault && (
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(cat)}>🗑️</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={t('categories.add')}>
        <CategoryForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      </Modal>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={t('categories.edit')}>
        {editing && (
          <CategoryForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>
    </div>
  );
}
