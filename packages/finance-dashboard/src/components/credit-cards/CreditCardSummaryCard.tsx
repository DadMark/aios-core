import React from 'react';
import { formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { CreditCard } from '@/types';

interface CreditCardSummaryCardProps {
  card: CreditCard;
  spending: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function CreditCardSummaryCard({ card, spending, onEdit, onDelete }: CreditCardSummaryCardProps) {
  const { t } = useI18n();
  const utilization = card.limit > 0 ? (spending / card.limit) * 100 : 0;
  const available = Math.max(0, card.limit - spending);

  const utilizationColor =
    utilization <= 30 ? 'var(--color-income)' :
    utilization <= 50 ? 'var(--color-warning)' :
    'var(--color-expense)';

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--spacing-lg)',
        borderTop: `4px solid ${card.color}`,
        opacity: card.isActive ? 1 : 0.6,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>{card.name}</div>
          {card.lastFourDigits && (
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-mono)' }}>
              •••• {card.lastFourDigits}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={onEdit}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: '1rem' }}
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: '1rem' }}
          >
            🗑️
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
        <div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{t('creditCards.usage')}</div>
          <div style={{ fontWeight: 600, color: utilizationColor, fontFamily: 'var(--font-mono)' }}>{formatCurrency(spending)}</div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{t('creditCards.available')}</div>
          <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{formatCurrency(available)}</div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{t('creditCards.limit')}</div>
          <div style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(card.limit)}</div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{t('creditCards.dueDay')}</div>
          <div>{t('creditCards.dueDay')}: {card.dueDay}</div>
        </div>
      </div>

      <div style={{ height: 6, backgroundColor: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(100, utilization)}%`,
            backgroundColor: utilizationColor,
            borderRadius: 'var(--radius-full)',
          }}
        />
      </div>
      <div style={{ fontSize: 'var(--font-size-xs)', color: utilizationColor, marginTop: 4 }}>
        {utilization.toFixed(0)}%
      </div>
    </div>
  );
}
