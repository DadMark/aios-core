import { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { useNavigation } from '@/context/NavigationContext';
import { calculateMonthSummary } from '@/services/calculations';
import type { MonthSummary } from '@/types';

export function useMonthSummary(carryForward: number): MonthSummary {
  const { transactions } = useFinance();
  const { getMonthKey } = useNavigation();

  return useMemo(() => {
    const monthKey = getMonthKey();
    return calculateMonthSummary(transactions, carryForward, monthKey);
  }, [transactions, carryForward, getMonthKey]);
}
