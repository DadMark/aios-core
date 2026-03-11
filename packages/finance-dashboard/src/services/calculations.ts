import type { Transaction, RecurringRule, MonthSummary, CategoryBreakdown, DailySpending, CreditCardSummary, Category, CreditCard } from '@/types';

export function calculateMonthSummary(
  transactions: Transaction[],
  carryForward: number,
  month: string
): MonthSummary {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

  return {
    month,
    totalIncome,
    totalExpenses,
    balance,
    carryForward,
    savingsRate: Math.max(0, savingsRate),
    healthScore: 0, // calculated separately
  };
}

export function calculateCarryForward(
  allTransactions: Transaction[],
  targetMonth: string
): number {
  const [targetYear, targetMonthNum] = targetMonth.split('-').map(Number);

  let carry = 0;
  // Sum all months before target
  for (const tx of allTransactions) {
    const [txYear, txMonth] = tx.date.split('-').map(Number);
    if (txYear < targetYear || (txYear === targetYear && txMonth < targetMonthNum)) {
      if (tx.type === 'income') {
        carry += Math.abs(tx.amount);
      } else {
        carry -= Math.abs(tx.amount);
      }
    }
  }
  return carry;
}

export function calculateHealthScore(
  summary: MonthSummary,
  previousMonthExpenses: number,
  creditCards: CreditCard[],
  cardSpending: Map<string, number>,
  recurringTotal: number
): number {
  // Savings rate (40%)
  const savingsScore = Math.min(40, (summary.savingsRate / 100) * 80);

  // Expense control vs previous month (25%)
  let controlScore = 12.5; // default if no previous
  if (previousMonthExpenses > 0) {
    const ratio = summary.totalExpenses / previousMonthExpenses;
    if (ratio <= 0.9) controlScore = 25;
    else if (ratio <= 1.0) controlScore = 20;
    else if (ratio <= 1.1) controlScore = 15;
    else if (ratio <= 1.2) controlScore = 10;
    else controlScore = 5;
  }

  // Credit utilization (20%)
  let utilizationScore = 20;
  if (creditCards.length > 0) {
    const avgUtilization = creditCards.reduce((sum, card) => {
      const spending = cardSpending.get(card.id) || 0;
      return sum + (card.limit > 0 ? spending / card.limit : 0);
    }, 0) / creditCards.length;

    if (avgUtilization <= 0.3) utilizationScore = 20;
    else if (avgUtilization <= 0.5) utilizationScore = 15;
    else if (avgUtilization <= 0.7) utilizationScore = 10;
    else utilizationScore = 5;
  }

  // Recurring coverage (15%)
  let coverageScore = 15;
  if (recurringTotal > 0 && summary.totalIncome > 0) {
    const coverage = summary.totalIncome / recurringTotal;
    if (coverage >= 2) coverageScore = 15;
    else if (coverage >= 1.5) coverageScore = 12;
    else if (coverage >= 1) coverageScore = 8;
    else coverageScore = 3;
  }

  return Math.round(savingsScore + controlScore + utilizationScore + coverageScore);
}

export function calculateCategoryBreakdown(
  transactions: Transaction[],
  categories: Category[]
): CategoryBreakdown[] {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const byCategory = new Map<string, { total: number; count: number }>();
  for (const tx of expenses) {
    const catId = tx.categoryId || 'uncategorized';
    const existing = byCategory.get(catId) || { total: 0, count: 0 };
    existing.total += Math.abs(tx.amount);
    existing.count += 1;
    byCategory.set(catId, existing);
  }

  const breakdown: CategoryBreakdown[] = [];
  for (const [catId, data] of byCategory) {
    const cat = categories.find((c) => c.id === catId);
    breakdown.push({
      categoryId: catId,
      categoryName: cat?.name || 'Sem Categoria',
      categoryColor: cat?.color || '#64748b',
      categoryIcon: cat?.icon || '📦',
      total: data.total,
      percentage: totalExpenses > 0 ? (data.total / totalExpenses) * 100 : 0,
      transactionCount: data.count,
    });
  }

  return breakdown.sort((a, b) => b.total - a.total);
}

export function calculateDailySpending(transactions: Transaction[]): DailySpending[] {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const byDay = new Map<number, { total: number; count: number; date: string }>();

  for (const tx of expenses) {
    const day = parseInt(tx.date.split('-')[2], 10);
    const existing = byDay.get(day) || { total: 0, count: 0, date: tx.date };
    existing.total += Math.abs(tx.amount);
    existing.count += 1;
    byDay.set(day, existing);
  }

  const daysInMonth = transactions.length > 0
    ? new Date(parseInt(transactions[0].date.split('-')[0]), parseInt(transactions[0].date.split('-')[1]), 0).getDate()
    : 31;

  const result: DailySpending[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const data = byDay.get(day);
    result.push({
      day,
      date: data?.date || '',
      total: data?.total || 0,
      transactionCount: data?.count || 0,
    });
  }

  return result;
}

export function calculateCreditCardSummaries(
  transactions: Transaction[],
  creditCards: CreditCard[]
): CreditCardSummary[] {
  const spendingByCard = new Map<string, number>();
  for (const tx of transactions) {
    if (tx.creditCardId && tx.type === 'expense') {
      const current = spendingByCard.get(tx.creditCardId) || 0;
      spendingByCard.set(tx.creditCardId, current + Math.abs(tx.amount));
    }
  }

  return creditCards
    .filter((c) => c.isActive)
    .map((card) => {
      const spending = spendingByCard.get(card.id) || 0;
      return {
        cardId: card.id,
        cardName: card.name,
        cardColor: card.color,
        currentSpending: spending,
        limit: card.limit,
        utilizationPercent: card.limit > 0 ? (spending / card.limit) * 100 : 0,
        dueDay: card.dueDay,
      };
    });
}

export function getTransactionsForMonth(allTransactions: Transaction[], monthKey: string): Transaction[] {
  return allTransactions.filter((t) => t.date.startsWith(monthKey));
}
