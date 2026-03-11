import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { db } from '@/db/database';
import type { CreditCard } from '@/types';

interface CreditCardContextValue {
  creditCards: CreditCard[];
  loading: boolean;
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt'>) => Promise<void>;
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => Promise<void>;
  deleteCreditCard: (id: string) => Promise<void>;
  getCreditCardById: (id: string) => CreditCard | undefined;
  refreshCreditCards: () => Promise<void>;
}

const CreditCardContext = createContext<CreditCardContextValue | null>(null);

interface CreditCardProviderProps {
  children: React.ReactNode;
}

export function CreditCardProvider({ children }: CreditCardProviderProps) {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCreditCards = useCallback(async () => {
    const cards = await db.creditCards.orderBy('name').toArray();
    setCreditCards(cards);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshCreditCards();
  }, [refreshCreditCards]);

  const addCreditCard = useCallback(async (card: Omit<CreditCard, 'id' | 'createdAt'>) => {
    const newCard: CreditCard = {
      ...card,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await db.creditCards.add(newCard);
    await refreshCreditCards();
  }, [refreshCreditCards]);

  const updateCreditCard = useCallback(async (id: string, updates: Partial<CreditCard>) => {
    await db.creditCards.update(id, updates);
    await refreshCreditCards();
  }, [refreshCreditCards]);

  const deleteCreditCard = useCallback(async (id: string) => {
    await db.creditCards.delete(id);
    await refreshCreditCards();
  }, [refreshCreditCards]);

  const getCreditCardById = useCallback((id: string) => {
    return creditCards.find((c) => c.id === id);
  }, [creditCards]);

  return (
    <CreditCardContext.Provider
      value={{ creditCards, loading, addCreditCard, updateCreditCard, deleteCreditCard, getCreditCardById, refreshCreditCards }}
    >
      {children}
    </CreditCardContext.Provider>
  );
}

export function useCreditCards(): CreditCardContextValue {
  const context = useContext(CreditCardContext);
  if (!context) {
    throw new Error('useCreditCards must be used within CreditCardProvider');
  }
  return context;
}
