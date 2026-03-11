import React from 'react';
import { useI18n } from '@/i18n/context';

const toggleStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  backgroundColor: 'var(--color-bg-tertiary)',
  borderRadius: 'var(--radius-full)',
  padding: '2px',
};

const optionStyle: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: 'var(--radius-full)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 600,
  transition: 'var(--transition-fast)',
};

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div style={toggleStyle}>
      <button
        onClick={() => setLocale('pt-BR')}
        style={{
          ...optionStyle,
          backgroundColor: locale === 'pt-BR' ? 'var(--color-accent)' : 'transparent',
          color: locale === 'pt-BR' ? '#fff' : 'var(--color-text-muted)',
        }}
      >
        PT
      </button>
      <button
        onClick={() => setLocale('en')}
        style={{
          ...optionStyle,
          backgroundColor: locale === 'en' ? 'var(--color-accent)' : 'transparent',
          color: locale === 'en' ? '#fff' : 'var(--color-text-muted)',
        }}
      >
        EN
      </button>
    </div>
  );
}
