import { db } from '@/db/database';
import type { Category } from '@/types';

const DEFAULT_CATEGORIES: Omit<Category, 'createdAt'>[] = [
  { id: 'cat-salary', name: 'Salário', color: '#22c55e', icon: '💰', type: 'income', isDefault: true },
  { id: 'cat-freelance', name: 'Freelance', color: '#06b6d4', icon: '💻', type: 'income', isDefault: true },
  { id: 'cat-investments', name: 'Investimentos', color: '#8b5cf6', icon: '📈', type: 'income', isDefault: true },
  { id: 'cat-other-income', name: 'Outros (Receita)', color: '#64748b', icon: '💵', type: 'income', isDefault: true },
  { id: 'cat-food', name: 'Alimentação', color: '#f97316', icon: '🍔', type: 'expense', isDefault: true },
  { id: 'cat-transport', name: 'Transporte', color: '#3b82f6', icon: '🚗', type: 'expense', isDefault: true },
  { id: 'cat-housing', name: 'Moradia', color: '#ef4444', icon: '🏠', type: 'expense', isDefault: true },
  { id: 'cat-health', name: 'Saúde', color: '#10b981', icon: '🏥', type: 'expense', isDefault: true },
  { id: 'cat-education', name: 'Educação', color: '#6366f1', icon: '📚', type: 'expense', isDefault: true },
  { id: 'cat-entertainment', name: 'Lazer', color: '#ec4899', icon: '🎮', type: 'expense', isDefault: true },
  { id: 'cat-shopping', name: 'Compras', color: '#f59e0b', icon: '🛍️', type: 'expense', isDefault: true },
  { id: 'cat-subscriptions', name: 'Assinaturas', color: '#8b5cf6', icon: '📱', type: 'expense', isDefault: true },
  { id: 'cat-utilities', name: 'Contas (Luz/Água/Internet)', color: '#0ea5e9', icon: '⚡', type: 'expense', isDefault: true },
  { id: 'cat-savings', name: 'Poupança/Reserva', color: '#14b8a6', icon: '🏦', type: 'expense', isDefault: true },
  { id: 'cat-other-expense', name: 'Outros (Despesa)', color: '#94a3b8', icon: '📦', type: 'expense', isDefault: true },
];

export async function seedDatabase(): Promise<void> {
  const count = await db.categories.count();
  if (count === 0) {
    const now = new Date().toISOString();
    const categories: Category[] = DEFAULT_CATEGORIES.map((cat) => ({
      ...cat,
      createdAt: now,
    }));
    await db.categories.bulkAdd(categories);
  }

  const settingsCount = await db.settings.count();
  if (settingsCount === 0) {
    await db.settings.put({ key: 'locale', value: 'pt-BR' });
  }
}
