import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { useCategories } from '@/context/CategoryContext';
import { useCreditCards } from '@/context/CreditCardContext';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { Input, Select } from '@/components/shared/Input';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { RecurringRule } from '@/types';

interface RuleFormData {
  description: string;
  amount: string;
  type: 'income' | 'expense';
  categoryId: string;
  creditCardId: string;
  dayOfMonth: string;
  startDate: string;
  totalInstallments: string;
  currentInstallment: string;
}

const emptyForm = (): RuleFormData => ({
  description: '',
  amount: '',
  type: 'expense',
  categoryId: '',
  creditCardId: '',
  dayOfMonth: '1',
  startDate: new Date().toISOString().split('T')[0],
  totalInstallments: '',
  currentInstallment: '',
});

export function RecurringPage() {
  const { t } = useI18n();
  const { recurringRules, addRecurringRule, updateRecurringRule, deleteRecurringRule } = useFinance();
  const { categories } = useCategories();
  const { creditCards } = useCreditCards();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<RecurringRule | null>(null);
  const [form, setForm] = useState<RuleFormData>(emptyForm());

  const openAdd = () => {
    setForm(emptyForm());
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (rule: RecurringRule) => {
    setForm({
      description: rule.description,
      amount: String(rule.amount),
      type: rule.type,
      categoryId: rule.categoryId || '',
      creditCardId: rule.creditCardId || '',
      dayOfMonth: String(rule.dayOfMonth),
      startDate: rule.startDate,
      totalInstallments: String(rule.totalInstallments || ''),
      currentInstallment: String(rule.currentInstallment || ''),
    });
    setEditing(rule);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Omit<RecurringRule, 'id'> = {
      description: form.description.trim(),
      amount: parseFloat(form.amount) || 0,
      type: form.type,
      categoryId: form.categoryId || null,
      creditCardId: form.creditCardId || null,
      frequency: 'monthly',
      dayOfMonth: parseInt(form.dayOfMonth, 10) || 1,
      startDate: form.startDate,
      endDate: null,
      totalInstallments: form.totalInstallments ? parseInt(form.totalInstallments, 10) : null,
      currentInstallment: form.currentInstallment ? parseInt(form.currentInstallment, 10) : null,
      isActive: true,
    };

    if (editing) {
      await updateRecurringRule(editing.id, data);
    } else {
      await addRecurringRule(data);
    }
    setShowForm(false);
  };

  const handleDelete = async (rule: RecurringRule) => {
    if (!confirm(t('recurring.deleteConfirm'))) return;
    await deleteRecurringRule(rule.id);
  };

  const filteredCategories = categories.filter((c) => c.type === form.type || c.type === 'both');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>{t('recurring.title')}</h1>
        <Button onClick={openAdd}>+ {t('recurring.add')}</Button>
      </div>

      {recurringRules.length === 0 ? (
        <EmptyState
          icon="🔄"
          title={t('recurring.noRules')}
          actionLabel={t('recurring.add')}
          onAction={openAdd}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {recurringRules.map((rule) => {
            const isInstallment = rule.totalInstallments !== null;
            const label = isInstallment
              ? `${rule.description} (${rule.currentInstallment || 1}/${rule.totalInstallments})`
              : rule.description;

            return (
              <div
                key={rule.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  opacity: rule.isActive ? 1 : 0.5,
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{isInstallment ? '📋' : '🔄'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    {t('recurring.dayOfMonth')}: {rule.dayOfMonth} · {rule.isActive ? t('recurring.active') : t('recurring.inactive')}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: rule.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)',
                  }}
                >
                  {rule.type === 'income' ? '+' : '-'}{formatCurrency(rule.amount)}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(rule)}>✏️</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(rule)}>🗑️</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editing ? t('recurring.edit') : t('recurring.add')}
      >
        <form onSubmit={handleSubmit}>
          <Select
            label={t('recurring.type')}
            value={form.type}
            onChange={(v) => setForm((f) => ({ ...f, type: v as 'income' | 'expense', categoryId: '' }))}
            options={[
              { value: 'expense', label: t('transactions.expense') },
              { value: 'income', label: t('transactions.income') },
            ]}
          />
          <Input
            label={t('recurring.description')}
            value={form.description}
            onChange={(v) => setForm((f) => ({ ...f, description: v }))}
            required
          />
          <Input
            label={t('recurring.amount')}
            value={form.amount}
            onChange={(v) => setForm((f) => ({ ...f, amount: v }))}
            type="number"
            min={0}
            step="0.01"
            required
          />
          <Input
            label={t('recurring.dayOfMonth')}
            value={form.dayOfMonth}
            onChange={(v) => setForm((f) => ({ ...f, dayOfMonth: v }))}
            type="number"
            min={1}
            max={31}
          />
          <Input
            label={t('recurring.startDate')}
            value={form.startDate}
            onChange={(v) => setForm((f) => ({ ...f, startDate: v }))}
            type="date"
          />
          <Select
            label={t('recurring.category')}
            value={form.categoryId}
            onChange={(v) => setForm((f) => ({ ...f, categoryId: v }))}
            placeholder="Sem categoria"
            options={filteredCategories.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
          />
          {form.type === 'expense' && creditCards.length > 0 && (
            <Select
              label={t('recurring.creditCard')}
              value={form.creditCardId}
              onChange={(v) => setForm((f) => ({ ...f, creditCardId: v }))}
              placeholder="Dinheiro/Débito"
              options={creditCards.filter((c) => c.isActive).map((c) => ({ value: c.id, label: c.name }))}
            />
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
            <Input
              label={t('recurring.totalInstallments')}
              value={form.totalInstallments}
              onChange={(v) => setForm((f) => ({ ...f, totalInstallments: v }))}
              type="number"
              min={0}
              placeholder="Vazio = fixa"
            />
            <Input
              label={t('recurring.currentInstallment')}
              value={form.currentInstallment}
              onChange={(v) => setForm((f) => ({ ...f, currentInstallment: v }))}
              type="number"
              min={1}
              placeholder="1"
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end', marginTop: 'var(--spacing-lg)' }}>
            <Button variant="secondary" onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
            <Button type="submit">{t('common.save')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
