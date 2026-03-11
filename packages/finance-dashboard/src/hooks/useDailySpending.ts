import { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { calculateDailySpending } from '@/services/calculations';
import type { DailySpending } from '@/types';

export function useDailySpending(): DailySpending[] {
  const { transactions } = useFinance();

  return useMemo(() => {
    return calculateDailySpending(transactions);
  }, [transactions]);
}
