import React from 'react';
import { formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { CreditCardSummary } from '@/types';

interface CreditCardUsageBarProps {
  cards: CreditCardSummary[];
}

function getUtilizationColor(pct: number): string {
  if (pct <= 30) return 'var(--color-income)';
  if (pct <= 50) return 'var(--color-warning)';
  return 'var(--color-expense)';
}

export function CreditCardUsageBar({ cards }: CreditCardUsageBarProps) {
  const { t } = useI18n();

  if (cards.length === 0) {
    return (
      <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', textAlign: 'center', padding: 'var(--spacing-lg)' }}>
        {t('common.noData')}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
        {t('dashboard.cardUsage')}
      </div>
      {cards.map((card) => {
        const pct = Math.min(100, card.utilizationPercent);
        const color = getUtilizationColor(pct);
        return (
          <div key={card.cardId}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--font-size-sm)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: card.cardColor, display: 'inline-block' }} />
                {card.cardName}
              </span>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                {formatCurrency(card.currentSpending)} / {formatCurrency(card.limit)}
              </span>
            </div>
            <div style={{ height: 8, backgroundColor: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${pct}%`,
                  backgroundColor: color,
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color, marginTop: 2 }}>
              {pct.toFixed(0)}% {t('creditCards.usage')}
            </div>
          </div>
        );
      })}
    </div>
  );
}
