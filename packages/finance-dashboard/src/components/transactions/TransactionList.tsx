import React from 'react';
import { CategoryTag } from '@/components/categories/CategoryTag';
import { Button } from '@/components/shared/Button';
import { useCategories } from '@/context/CategoryContext';
import { useCreditCards } from '@/context/CreditCardContext';
import { formatCurrency, formatDate } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  const { t, locale } = useI18n();
  const { getCategoryById } = useCategories();
  const { getCreditCardById } = useCreditCards();

  if (transactions.length === 0) {
    return (
      <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        {t('transactions.noTransactions')}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {transactions.map((tx) => {
        const category = getCategoryById(tx.categoryId || '');
        const card = tx.creditCardId ? getCreditCardById(tx.creditCardId) : undefined;
        const isIncome = tx.type === 'income';

        return (
          <div
            key={tx.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              transition: 'var(--transition-fast)',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: isIncome ? 'var(--color-income)' : 'var(--color-expense)',
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {tx.description}
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center', marginTop: 2, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  {formatDate(tx.date, locale)}
                </span>
                <CategoryTag category={category} />
                {card && (
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    💳 {card.name}
                  </span>
                )}
                {tx.importSource !== 'manual' && (
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    [{tx.importSource.toUpperCase()}]
                  </span>
                )}
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: isIncome ? 'var(--color-income)' : 'var(--color-expense)',
                whiteSpace: 'nowrap',
              }}
            >
              {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
            </div>

            <div style={{ display: 'flex', gap: 4 }}>
              <Button size="sm" variant="ghost" onClick={() => onEdit(tx)}>✏️</Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(tx)}>🗑️</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
