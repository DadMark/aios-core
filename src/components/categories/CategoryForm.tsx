import React, { useState } from 'react';
import { Input, Select } from '@/components/shared/Input';
import { ColorPicker } from '@/components/shared/ColorPicker';
import { Button } from '@/components/shared/Button';
import { useI18n } from '@/i18n/context';
import type { Category } from '@/types';

interface CategoryFormProps {
  initial?: Partial<Category>;
  onSubmit: (data: Omit<Category, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const ICONS = ['🍔', '🚗', '🏠', '🏥', '📚', '🎮', '🛍️', '📱', '⚡', '🏦', '💰', '💻', '📈', '💵', '📦', '✈️', '🎬', '🐾', '💄', '🎁'];

export function CategoryForm({ initial, onSubmit, onCancel }: CategoryFormProps) {
  const { t } = useI18n();
  const [name, setName] = useState(initial?.name || '');
  const [color, setColor] = useState(initial?.color || '#3b82f6');
  const [icon, setIcon] = useState(initial?.icon || '📦');
  const [type, setType] = useState<'income' | 'expense' | 'both'>(initial?.type || 'expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), color, icon, type, isDefault: initial?.isDefault ?? false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={t('categories.name')}
        value={name}
        onChange={setName}
        required
        placeholder="Ex: Alimentação"
      />

      <Select
        label={t('categories.type')}
        value={type}
        onChange={(v) => setType(v as 'income' | 'expense' | 'both')}
        options={[
          { value: 'expense', label: t('categories.expense') },
          { value: 'income', label: t('categories.income') },
          { value: 'both', label: t('categories.both') },
        ]}
      />

      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          {t('categories.icon')}
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {ICONS.map((ic) => (
            <button
              key={ic}
              type="button"
              onClick={() => setIcon(ic)}
              style={{
                fontSize: '1.25rem',
                padding: 6,
                border: ic === icon ? '2px solid var(--color-accent)' : '2px solid transparent',
                borderRadius: 'var(--radius-md)',
                backgroundColor: ic === icon ? 'rgba(59,130,246,0.1)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {ic}
            </button>
          ))}
        </div>
      </div>

      <ColorPicker label={t('categories.color')} value={color} onChange={setColor} />

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end', marginTop: 'var(--spacing-lg)' }}>
        <Button variant="secondary" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="submit">{t('common.save')}</Button>
      </div>
    </form>
  );
}
