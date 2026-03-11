import React, { useState, useMemo } from 'react';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { ImportDialog } from '@/components/transactions/ImportDialog';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Input';
import { useFinance } from '@/context/FinanceContext';
import { useCategories } from '@/context/CategoryContext';
import { useCreditCards } from '@/context/CreditCardContext';
import { useI18n } from '@/i18n/context';
import type { Transaction } from '@/types';

export function TransactionsPage() {
  const { t } = useI18n();
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance();
  const { categories } = useCategories();
  const { creditCards } = useCreditCards();

  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCard, setFilterCard] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      if (filterType && tx.type !== filterType) return false;
      if (filterCategory && tx.categoryId !== filterCategory) return false;
      if (filterCard && tx.creditCardId !== filterCard) return false;
      return true;
    });
  }, [transactions, filterType, filterCategory, filterCard]);

  const handleAdd = async (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    await addTransaction(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editing) return;
    await updateTransaction(editing.id, data);
    setEditing(null);
  };

  const handleDelete = async (tx: Transaction) => {
    if (!confirm(t('transactions.deleteConfirm'))) return;
    await deleteTransaction(tx.id);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>{t('transactions.title')}</h1>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <Button variant="secondary" onClick={() => setShowImport(true)}>📥 {t('transactions.import')}</Button>
          <Button onClick={() => setShowForm(true)}>+ {t('transactions.add')}</Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 160px' }}>
          <Select
            value={filterType}
            onChange={setFilterType}
            placeholder={t('transactions.all')}
            options={[
              { value: 'income', label: t('transactions.income') },
              { value: 'expense', label: t('transactions.expense') },
            ]}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <Select
            value={filterCategory}
            onChange={setFilterCategory}
            placeholder={t('categories.title')}
            options={categories.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
          />
        </div>
        {creditCards.length > 0 && (
          <div style={{ flex: '1 1 200px' }}>
            <Select
              value={filterCard}
              onChange={setFilterCard}
              placeholder={t('transactions.creditCard')}
              options={creditCards.map((c) => ({ value: c.id, label: c.name }))}
            />
          </div>
        )}
      </div>

      <TransactionList
        transactions={filtered}
        onEdit={(tx) => setEditing(tx)}
        onDelete={handleDelete}
      />

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={t('transactions.add')}>
        <TransactionForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      </Modal>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={t('transactions.edit')}>
        {editing && (
          <TransactionForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <Modal isOpen={showImport} onClose={() => setShowImport(false)} title={t('import.title')} width="640px">
        <ImportDialog onClose={() => setShowImport(false)} />
      </Modal>
    </div>
  );
}
