import React from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useI18n } from '@/i18n/context';
import { LanguageToggle } from '@/components/shared/LanguageToggle';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-md)',
  padding: 'var(--spacing-md) var(--spacing-lg)',
  backgroundColor: 'var(--color-bg-secondary)',
  borderBottom: '1px solid var(--color-border)',
  height: 'var(--header-height)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
};

const yearControlStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
};

const yearButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-lg)',
  padding: '4px 8px',
  borderRadius: 'var(--radius-sm)',
  transition: 'var(--transition-fast)',
};

const yearLabelStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  minWidth: 50,
  textAlign: 'center',
};

const monthsContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2px',
  flex: 1,
  justifyContent: 'center',
};

const monthButtonBase: React.CSSProperties = {
  padding: '6px 12px',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 500,
  transition: 'var(--transition-fast)',
};

export function MonthNavigator() {
  const { selectedYear, selectedMonth, setSelectedYear, setSelectedMonth } = useNavigation();
  const { t } = useI18n();

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div style={containerStyle}>
      <div style={yearControlStyle}>
        <button style={yearButtonStyle} onClick={() => setSelectedYear(selectedYear - 1)}>
          &lsaquo;
        </button>
        <span style={yearLabelStyle}>{selectedYear}</span>
        <button style={yearButtonStyle} onClick={() => setSelectedYear(selectedYear + 1)}>
          &rsaquo;
        </button>
      </div>

      <div style={monthsContainerStyle}>
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            style={{
              ...monthButtonBase,
              backgroundColor: month === selectedMonth ? 'var(--color-accent)' : 'transparent',
              color: month === selectedMonth ? '#fff' : 'var(--color-text-secondary)',
            }}
          >
            {t(`months.${month}`)}
          </button>
        ))}
      </div>

      <LanguageToggle />
    </div>
  );
}
