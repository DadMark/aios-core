import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { db } from '@/db/database';
import type { Category } from '@/types';

interface CategoryContextValue {
  categories: Category[];
  loading: boolean;
  addCategory: (cat: Omit<Category, 'id' | 'createdAt'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCategoryById: (id: string) => Category | undefined;
  refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

interface CategoryProviderProps {
  children: React.ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCategories = useCallback(async () => {
    const cats = await db.categories.orderBy('name').toArray();
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  const addCategory = useCallback(async (cat: Omit<Category, 'id' | 'createdAt'>) => {
    const newCat: Category = {
      ...cat,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await db.categories.add(newCat);
    await refreshCategories();
  }, [refreshCategories]);

  const updateCategory = useCallback(async (id: string, updates: Partial<Category>) => {
    await db.categories.update(id, updates);
    await refreshCategories();
  }, [refreshCategories]);

  const deleteCategory = useCallback(async (id: string) => {
    await db.categories.delete(id);
    await refreshCategories();
  }, [refreshCategories]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find((c) => c.id === id);
  }, [categories]);

  return (
    <CategoryContext.Provider
      value={{ categories, loading, addCategory, updateCategory, deleteCategory, getCategoryById, refreshCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories(): CategoryContextValue {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoryProvider');
  }
  return context;
}
