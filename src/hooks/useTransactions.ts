import { useFinance } from '@/context/FinanceContext';

export function useTransactions() {
  return useFinance();
}
