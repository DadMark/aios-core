import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/shared/Card';
import { MonthlyTrendChart } from '@/components/charts/MonthlyTrendChart';
import { useFinance } from '@/context/FinanceContext';
import { useNavigation } from '@/context/NavigationContext';
import { formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';

interface MonthData {
  month: string;
  label: string;
  income: number;
  expenses: number;
  balance: number;
}

export function AnnualPage() {
  const { t } = useI18n();
  const { selectedYear } = useNavigation();
  const { getTransactionsForMonth } = useFinance();
  const [monthsData, setMonthsData] = useState<MonthData[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const months: MonthData[] = [];
      for (let m = 1; m <= 12; m++) {
        const monthKey = `${selectedYear}-${String(m).padStart(2, '0')}`;
        const txs = await getTransactionsForMonth(monthKey);
        const income = txs.filter((tx) => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);
        const expenses = txs.filter((tx) => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0);
        months.push({
          month: monthKey,
          label: t(`months.${m}`),
          income,
          expenses,
          balance: income - expenses,
        });
      }
      setMonthsData(months);
    };
    fetchAll();
  }, [selectedYear, getTransactionsForMonth, t]);

  const totals = useMemo(() => {
    const totalIncome = monthsData.reduce((s, m) => s + m.income, 0);
    const totalExpenses = monthsData.reduce((s, m) => s + m.expenses, 0);
    const activeMonths = monthsData.filter((m) => m.income > 0 || m.expenses > 0).length || 1;
    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
      avgMonthly: (totalIncome - totalExpenses) / activeMonths,
    };
  }, [monthsData]);

  const summaryCards = [
    { label: t('annual.totalIncome'), value: totals.income, color: 'var(--color-income)' },
    { label: t('annual.totalExpenses'), value: totals.expenses, color: 'var(--color-expense)' },
    { label: t('annual.netBalance'), value: totals.balance, color: totals.balance >= 0 ? 'var(--color-income)' : 'var(--color-expense)' },
    { label: t('annual.avgMonthly'), value: totals.avgMonthly, color: 'var(--color-accent)' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--spacing-xl)' }}>
        {t('annual.title')} {selectedYear}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: card.color, fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(card.value)}
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-md)' }}>{t('annual.trend')}</div>
        <MonthlyTrendChart data={monthsData} />
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--spacing-sm)' }}>
        {monthsData.map((m) => (
          <Card key={m.month} style={{ padding: 'var(--spacing-md)' }}>
            <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>{m.label}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-income)', fontFamily: 'var(--font-mono)' }}>
              +{formatCurrency(m.income)}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-expense)', fontFamily: 'var(--font-mono)' }}>
              -{formatCurrency(m.expenses)}
            </div>
            <div
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: m.balance >= 0 ? 'var(--color-income)' : 'var(--color-expense)',
                marginTop: 4,
                borderTop: '1px solid var(--color-border)',
                paddingTop: 4,
              }}
            >
              {formatCurrency(m.balance)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
