import React from 'react';
import { CreditCardManager } from '@/components/credit-cards/CreditCardManager';
import { useI18n } from '@/i18n/context';

export function CreditCardsPage() {
  const { t } = useI18n();

  return (
    <div>
      <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--spacing-xl)' }}>
        {t('creditCards.title')}
      </h1>
      <CreditCardManager />
    </div>
  );
}
