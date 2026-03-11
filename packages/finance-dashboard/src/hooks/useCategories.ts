import { useCategories as useCategoriesCtx } from '@/context/CategoryContext';

export function useCategories() {
  return useCategoriesCtx();
}
