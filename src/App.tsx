import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from '@/i18n/context';
import { NavigationProvider } from '@/context/NavigationContext';
import { CategoryProvider } from '@/context/CategoryContext';
import { CreditCardProvider } from '@/context/CreditCardContext';
import { FinanceProvider } from '@/context/FinanceContext';
import { AppShell } from '@/components/layout/AppShell';
import { HomePage } from '@/pages/HomePage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { CreditCardsPage } from '@/pages/CreditCardsPage';
import { RecurringPage } from '@/pages/RecurringPage';
import { AnnualPage } from '@/pages/AnnualPage';

export default function App() {
  return (
    <I18nProvider>
      <NavigationProvider>
        <CategoryProvider>
          <CreditCardProvider>
            <FinanceProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<AppShell />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/credit-cards" element={<CreditCardsPage />} />
                    <Route path="/recurring" element={<RecurringPage />} />
                    <Route path="/annual" element={<AnnualPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </FinanceProvider>
          </CreditCardProvider>
        </CategoryProvider>
      </NavigationProvider>
    </I18nProvider>
  );
}
