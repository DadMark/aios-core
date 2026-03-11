import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import ptBR from '@/i18n/pt-BR.json';
import en from '@/i18n/en.json';
import { db } from '@/db/database';

type Locale = 'pt-BR' | 'en';

type TranslationMap = Record<string, unknown>;

const locales: Record<Locale, TranslationMap> = {
  'pt-BR': ptBR,
  'en': en,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: TranslationMap, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR');

  useEffect(() => {
    db.settings.get('locale').then((setting) => {
      if (setting && (setting.value === 'pt-BR' || setting.value === 'en')) {
        setLocaleState(setting.value);
      }
    });
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    db.settings.put({ key: 'locale', value: newLocale });
    document.documentElement.lang = newLocale === 'pt-BR' ? 'pt-BR' : 'en';
  }, []);

  const t = useCallback((key: string): string => {
    return getNestedValue(locales[locale], key);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
