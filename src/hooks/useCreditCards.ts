import { useCreditCards as useCreditCardsCtx } from '@/context/CreditCardContext';

export function useCreditCards() {
  return useCreditCardsCtx();
}
