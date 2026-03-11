import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { db } from '@/db/database';
import { useNavigation } from '@/context/NavigationContext';
import type { Transaction, RecurringRule } from '@/types';

interface FinanceContextValue {
  transactions: Transaction[];
  recurringRules: RecurringRule[];
  loading: boolean;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addRecurringRule: (rule: Omit<RecurringRule, 'id'>) => Promise<void>;
  updateRecurringRule: (id: string, updates: Partial<RecurringRule>) => Promise<void>;
  deleteRecurringRule: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
  getTransactionsForMonth: (yearMonth: string) => Promise<Transaction[]>;
  bulkAddTransactions: (txs: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[]) => Promise<number>;
}

const FinanceContext = createContext<FinanceContextValue | null>(null);

interface FinanceProviderProps {
  children: React.ReactNode;
}

export function FinanceProvider({ children }: FinanceProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recurringRules, setRecurringRules] = useState<RecurringRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { getMonthKey } = useNavigation();

  const refreshData = useCallback(async () => {
    const monthKey = getMonthKey();
    const startDate = `${monthKey}-01`;
    const endDate = `${monthKey}-31`;

    const [txs, rules] = await Promise.all([
      db.transactions.where('date').between(startDate, endDate, true, true).toArray(),
      db.recurringRules.toArray(),
    ]);

    txs.sort((a, b) => b.date.localeCompare(a.date));
    setTransactions(txs);
    setRecurringRules(rules);
    setLoading(false);
  }, [getMonthKey]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addTransaction = useCallback(async (tx: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTx: Transaction = {
      ...tx,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.transactions.add(newTx);
    await refreshData();
  }, [refreshData]);

  const updateTransaction = useCallback(async (id: string, updates: Partial<Transaction>) => {
    await db.transactions.update(id, { ...updates, updatedAt: new Date().toISOString() });
    await refreshData();
  }, [refreshData]);

  const deleteTransaction = useCallback(async (id: string) => {
    await db.transactions.delete(id);
    await refreshData();
  }, [refreshData]);

  const addRecurringRule = useCallback(async (rule: Omit<RecurringRule, 'id'>) => {
    const newRule: RecurringRule = {
      ...rule,
      id: crypto.randomUUID(),
    };
    await db.recurringRules.add(newRule);
    await refreshData();
  }, [refreshData]);

  const updateRecurringRule = useCallback(async (id: string, updates: Partial<RecurringRule>) => {
    await db.recurringRules.update(id, updates);
    await refreshData();
  }, [refreshData]);

  const deleteRecurringRule = useCallback(async (id: string) => {
    await db.recurringRules.delete(id);
    await refreshData();
  }, [refreshData]);

  const getTransactionsForMonth = useCallback(async (yearMonth: string): Promise<Transaction[]> => {
    const startDate = `${yearMonth}-01`;
    const endDate = `${yearMonth}-31`;
    return db.transactions.where('date').between(startDate, endDate, true, true).toArray();
  }, []);

  const bulkAddTransactions = useCallback(async (txs: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<number> => {
    const now = new Date().toISOString();
    let imported = 0;

    for (const tx of txs) {
      if (tx.importHash) {
        const existing = await db.transactions.where('importHash').equals(tx.importHash).first();
        if (existing) continue;
      }
      const newTx: Transaction = {
        ...tx,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      await db.transactions.add(newTx);
      imported++;
    }

    await refreshData();
    return imported;
  }, [refreshData]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        recurringRules,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addRecurringRule,
        updateRecurringRule,
        deleteRecurringRule,
        refreshData,
        getTransactionsForMonth,
        bulkAddTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance(): FinanceContextValue {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}
