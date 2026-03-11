import React, { useState } from 'react';
import { Input } from '@/components/shared/Input';
import { ColorPicker } from '@/components/shared/ColorPicker';
import { Button } from '@/components/shared/Button';
import { useI18n } from '@/i18n/context';
import type { CreditCard } from '@/types';

interface CreditCardFormProps {
  initial?: Partial<CreditCard>;
  onSubmit: (data: Omit<CreditCard, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function CreditCardForm({ initial, onSubmit, onCancel }: CreditCardFormProps) {
  const { t } = useI18n();
  const [name, setName] = useState(initial?.name || '');
  const [lastFourDigits, setLastFourDigits] = useState(initial?.lastFourDigits || '');
  const [limit, setLimit] = useState(String(initial?.limit || ''));
  const [color, setColor] = useState(initial?.color || '#3b82f6');
  const [dueDay, setDueDay] = useState(String(initial?.dueDay || '10'));
  const [closingDay, setClosingDay] = useState(String(initial?.closingDay || '3'));
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      lastFourDigits: lastFourDigits.trim(),
      limit: parseFloat(limit) || 0,
      color,
      dueDay: parseInt(dueDay, 10) || 10,
      closingDay: parseInt(closingDay, 10) || 3,
      isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label={t('creditCards.name')} value={name} onChange={setName} required placeholder="Ex: Nubank" />
      <Input label={t('creditCards.lastFour')} value={lastFourDigits} onChange={setLastFourDigits} placeholder="1234" />
      <Input label={t('creditCards.limit')} value={limit} onChange={setLimit} type="number" min={0} step="0.01" placeholder="0.00" />
      <Input label={t('creditCards.dueDay')} value={dueDay} onChange={setDueDay} type="number" min={1} max={31} />
      <Input label={t('creditCards.closingDay')} value={closingDay} onChange={setClosingDay} type="number" min={1} max={31} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          style={{ width: 16, height: 16, cursor: 'pointer' }}
        />
        <label htmlFor="isActive" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
          {t('creditCards.active')}
        </label>
      </div>

      <ColorPicker label={t('creditCards.color')} value={color} onChange={setColor} />

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end', marginTop: 'var(--spacing-lg)' }}>
        <Button variant="secondary" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="submit">{t('common.save')}</Button>
      </div>
    </form>
  );
}
