export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string | null;
  creditCardId: string | null;
  isRecurring: boolean;
  recurringRuleId: string | null;
  importSource: 'manual' | 'ofx' | 'csv';
  importHash: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense' | 'both';
  isDefault: boolean;
  createdAt: string;
}

export interface CreditCard {
  id: string;
  name: string;
  lastFourDigits: string;
  limit: number;
  color: string;
  dueDay: number;
  closingDay: number;
  isActive: boolean;
  createdAt: string;
}

export interface RecurringRule {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string | null;
  creditCardId: string | null;
  frequency: 'monthly';
  dayOfMonth: number;
  startDate: string;
  endDate: string | null;
  totalInstallments: number | null;
  currentInstallment: number | null;
  isActive: boolean;
}

export interface MonthSummary {
  month: string;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  carryForward: number;
  savingsRate: number;
  healthScore: number;
}

export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  total: number;
  percentage: number;
  transactionCount: number;
}

export interface DailySpending {
  day: number;
  date: string;
  total: number;
  transactionCount: number;
}

export interface CreditCardSummary {
  cardId: string;
  cardName: string;
  cardColor: string;
  currentSpending: number;
  limit: number;
  utilizationPercent: number;
  dueDay: number;
}

export interface AppSettings {
  key: string;
  value: string;
}
