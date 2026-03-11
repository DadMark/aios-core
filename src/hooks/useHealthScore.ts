import { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { useCreditCards } from '@/context/CreditCardContext';
import { calculateHealthScore, calculateCreditCardSummaries } from '@/services/calculations';
import type { MonthSummary } from '@/types';

export function useHealthScore(summary: MonthSummary, previousMonthExpenses: number): number {
  const { transactions, recurringRules } = useFinance();
  const { creditCards } = useCreditCards();

  return useMemo(() => {
    const cardSpending = new Map<string, number>();
    for (const tx of transactions) {
      if (tx.creditCardId && tx.type === 'expense') {
        const cur = cardSpending.get(tx.creditCardId) || 0;
        cardSpending.set(tx.creditCardId, cur + Math.abs(tx.amount));
      }
    }

    const recurringTotal = recurringRules
      .filter((r) => r.isActive && r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    return calculateHealthScore(summary, previousMonthExpenses, creditCards, cardSpending, recurringTotal);
  }, [summary, previousMonthExpenses, transactions, creditCards, recurringRules]);
}
