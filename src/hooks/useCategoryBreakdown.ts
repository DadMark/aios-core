import { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { useCategories } from '@/context/CategoryContext';
import { calculateCategoryBreakdown } from '@/services/calculations';
import type { CategoryBreakdown } from '@/types';

export function useCategoryBreakdown(): CategoryBreakdown[] {
  const { transactions } = useFinance();
  const { categories } = useCategories();

  return useMemo(() => {
    return calculateCategoryBreakdown(transactions, categories);
  }, [transactions, categories]);
}
