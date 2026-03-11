import Dexie, { type Table } from 'dexie';
import type { Transaction, Category, CreditCard, RecurringRule, AppSettings } from '@/types';

export class FinanceDatabase extends Dexie {
  transactions!: Table<Transaction, string>;
  categories!: Table<Category, string>;
  creditCards!: Table<CreditCard, string>;
  recurringRules!: Table<RecurringRule, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super('FinanceDashboard');

    this.version(1).stores({
      transactions: 'id, date, type, categoryId, creditCardId, recurringRuleId, importHash, [date+type]',
      categories: 'id, name, type',
      creditCards: 'id, name, isActive',
      recurringRules: 'id, type, isActive',
      settings: 'key',
    });
  }
}

export const db = new FinanceDatabase();
