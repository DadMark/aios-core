import React, { useState } from 'react';
import { Input, Select } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { useCategories } from '@/context/CategoryContext';
import { useCreditCards } from '@/context/CreditCardContext';
import { useI18n } from '@/i18n/context';
import type { Transaction } from '@/types';

interface TransactionFormProps {
  initial?: Partial<Transaction>;
  onSubmit: (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function TransactionForm({ initial, onSubmit, onCancel }: TransactionFormProps) {
  const { t } = useI18n();
  const { categories } = useCategories();
  const { creditCards } = useCreditCards();

  const today = new Date().toISOString().split('T')[0];
  const [description, setDescription] = useState(initial?.description || '');
  const [amount, setAmount] = useState(String(initial?.amount || ''));
  const [date, setDate] = useState(initial?.date || today);
  const [type, setType] = useState<'income' | 'expense'>(initial?.type || 'expense');
  const [categoryId, setCategoryId] = useState(initial?.categoryId || '');
  const [creditCardId, setCreditCardId] = useState(initial?.creditCardId || '');
  const [notes, setNotes] = useState(initial?.notes || '');

  const filteredCategories = categories.filter(
    (c) => c.type === type || c.type === 'both'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    onSubmit({
      description: description.trim(),
      amount: Math.abs(parseFloat(amount)),
      date,
      type,
      categoryId: categoryId || null,
      creditCardId: creditCardId || null,
      isRecurring: false,
      recurringRuleId: null,
      importSource: 'manual',
      importHash: null,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label={t('transactions.type')}
        value={type}
        onChange={(v) => {
          setType(v as 'income' | 'expense');
          setCategoryId('');
        }}
        options={[
          { value: 'expense', label: t('transactions.expense') },
          { value: 'income', label: t('transactions.income') },
        ]}
      />

      <Input label={t('transactions.description')} value={description} onChange={setDescription} required placeholder="Ex: Mercado" />
      <Input label={t('transactions.amount')} value={amount} onChange={setAmount} type="number" min={0} step="0.01" required placeholder="0.00" />
      <Input label={t('transactions.date')} value={date} onChange={setDate} type="date" required />

      <Select
        label={t('transactions.category')}
        value={categoryId}
        onChange={setCategoryId}
        placeholder={t('transactions.all')}
        options={filteredCategories.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
      />

      {type === 'expense' && creditCards.length > 0 && (
        <Select
          label={t('transactions.creditCard')}
          value={creditCardId}
          onChange={setCreditCardId}
          placeholder="Dinheiro/Débito"
          options={creditCards.filter((c) => c.isActive).map((c) => ({ value: c.id, label: `${c.name} ••••${c.lastFourDigits}` }))}
        />
      )}

      <Input label={t('transactions.notes')} value={notes} onChange={setNotes} placeholder="Opcional" />

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end', marginTop: 'var(--spacing-lg)' }}>
        <Button variant="secondary" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="submit">{t('common.save')}</Button>
      </div>
    </form>
  );
}
