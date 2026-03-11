import React, { useState, useEffect } from 'react';
import { Card } from '@/components/shared/Card';
import { HealthThermometer } from '@/components/charts/HealthThermometer';
import { DailySpendingChart } from '@/components/charts/DailySpendingChart';
import { CategoryBarChart } from '@/components/charts/CategoryBarChart';
import { CreditCardUsageBar } from '@/components/charts/CreditCardUsageBar';
import { useFinance } from '@/context/FinanceContext';
import { useCreditCards } from '@/context/CreditCardContext';
import { useNavigation } from '@/context/NavigationContext';
import { useDailySpending } from '@/hooks/useDailySpending';
import { useCategoryBreakdown } from '@/hooks/useCategoryBreakdown';
import { db } from '@/db/database';
import {
  calculateMonthSummary,
  calculateCarryForward,
  calculateHealthScore,
  calculateCreditCardSummaries,
} from '@/services/calculations';
import { formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { MonthSummary } from '@/types';

export function HomePage() {
  const { t } = useI18n();
  const { transactions, recurringRules } = useFinance();
  const { creditCards } = useCreditCards();
  const { getMonthKey, selectedYear, selectedMonth } = useNavigation();

  const dailySpending = useDailySpending();
  const categoryBreakdown = useCategoryBreakdown();

  const [carryForward, setCarryForward] = useState(0);
  const [previousMonthExpenses, setPreviousMonthExpenses] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      const monthKey = getMonthKey();
      const allTxs = await db.transactions.toArray();
      const cf = calculateCarryForward(allTxs, monthKey);
      setCarryForward(cf);

      const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
      const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;
      const prevKey = `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
      const prevTxs = allTxs.filter((tx) => tx.date.startsWith(prevKey));
      const prevExpenses = prevTxs
        .filter((tx) => tx.type === 'expense')
        .reduce((s, tx) => s + tx.amount, 0);
      setPreviousMonthExpenses(prevExpenses);
    };
    fetchHistory();
  }, [getMonthKey, selectedMonth, selectedYear]);

  const monthKey = getMonthKey();
  const summary: MonthSummary = calculateMonthSummary(transactions, carryForward, monthKey);

  const cardSpending = new Map<string, number>();
  for (const tx of transactions) {
    if (tx.creditCardId && tx.type === 'expense') {
      const cur = cardSpending.get(tx.creditCardId) || 0;
      cardSpending.set(tx.creditCardId, cur + tx.amount);
    }
  }

  const recurringTotal = recurringRules
    .filter((r) => r.isActive && r.type === 'expense')
    .reduce((s, r) => s + r.amount, 0);

  const healthScore = calculateHealthScore(summary, previousMonthExpenses, creditCards, cardSpending, recurringTotal);
  const cardSummaries = calculateCreditCardSummaries(transactions, creditCards);

  const summaryCards = [
    {
      label: t('dashboard.income'),
      value: summary.totalIncome,
      color: 'var(--color-income)',
      bg: 'var(--color-income-bg)',
      icon: '📈',
    },
    {
      label: t('dashboard.expenses'),
      value: summary.totalExpenses,
      color: 'var(--color-expense)',
      bg: 'var(--color-expense-bg)',
      icon: '📉',
    },
    {
      label: t('dashboard.balance'),
      value: summary.balance + carryForward,
      color: summary.balance + carryForward >= 0 ? 'var(--color-income)' : 'var(--color-expense)',
      bg: 'var(--color-bg-tertiary)',
      icon: '💰',
    },
    {
      label: t('dashboard.savings'),
      value: Math.max(0, summary.balance),
      color: 'var(--color-savings)',
      bg: 'var(--color-savings-bg)',
      icon: '🏦',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--spacing-md)' }}>
        {summaryCards.map((card) => (
          <Card key={card.label} style={{ backgroundColor: card.bg, borderColor: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                  {card.label}
                </div>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: card.color, fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(card.value)}
                </div>
              </div>
              <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--spacing-lg)' }}>
        <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HealthThermometer score={healthScore} />
        </Card>
        <Card>
          <CreditCardUsageBar cards={cardSummaries} />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
        <Card>
          <CategoryBarChart data={categoryBreakdown} />
        </Card>
        <Card>
          <DailySpendingChart data={dailySpending} />
        </Card>
      </div>

      {carryForward !== 0 && (
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textAlign: 'right' }}>
          {t('dashboard.carryForward')}: {formatCurrency(carryForward)}
        </div>
      )}
    </div>
  );
}
