import React, { useState } from 'react';
import { useCreditCards } from '@/context/CreditCardContext';
import { useFinance } from '@/context/FinanceContext';
import { CreditCardForm } from '@/components/credit-cards/CreditCardForm';
import { CreditCardSummaryCard } from '@/components/credit-cards/CreditCardSummaryCard';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { EmptyState } from '@/components/shared/EmptyState';
import { useI18n } from '@/i18n/context';
import type { CreditCard } from '@/types';

export function CreditCardManager() {
  const { t } = useI18n();
  const { creditCards, addCreditCard, updateCreditCard, deleteCreditCard } = useCreditCards();
  const { transactions } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CreditCard | null>(null);

  const getSpending = (cardId: string) =>
    transactions
      .filter((tx) => tx.creditCardId === cardId && tx.type === 'expense')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const handleAdd = async (data: Omit<CreditCard, 'id' | 'createdAt'>) => {
    await addCreditCard(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Omit<CreditCard, 'id' | 'createdAt'>) => {
    if (!editing) return;
    await updateCreditCard(editing.id, data);
    setEditing(null);
  };

  const handleDelete = async (card: CreditCard) => {
    if (!confirm(t('creditCards.deleteConfirm'))) return;
    await deleteCreditCard(card.id);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
        <Button onClick={() => setShowForm(true)}>+ {t('creditCards.add')}</Button>
      </div>

      {creditCards.length === 0 ? (
        <EmptyState
          icon="💎"
          title={t('creditCards.noCards')}
          actionLabel={t('creditCards.add')}
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {creditCards.map((card) => (
            <CreditCardSummaryCard
              key={card.id}
              card={card}
              spending={getSpending(card.id)}
              onEdit={() => setEditing(card)}
              onDelete={() => handleDelete(card)}
            />
          ))}
        </div>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={t('creditCards.add')}>
        <CreditCardForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      </Modal>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={t('creditCards.edit')}>
        {editing && (
          <CreditCardForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>
    </div>
  );
}
