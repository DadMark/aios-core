import React from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '@/i18n/context';

const sidebarStyle: React.CSSProperties = {
  width: 'var(--sidebar-width)',
  backgroundColor: 'var(--color-bg-secondary)',
  borderRight: '1px solid var(--color-border)',
  padding: 'var(--spacing-lg) 0',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xs)',
  height: 'calc(100vh - var(--header-height))',
  position: 'sticky',
  top: 'var(--header-height)',
  overflowY: 'auto',
};

const logoStyle: React.CSSProperties = {
  padding: '0 var(--spacing-lg)',
  marginBottom: 'var(--spacing-lg)',
  fontSize: 'var(--font-size-lg)',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
};

const navItemBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-sm)',
  padding: 'var(--spacing-sm) var(--spacing-lg)',
  color: 'var(--color-text-secondary)',
  textDecoration: 'none',
  fontSize: 'var(--font-size-md)',
  transition: 'var(--transition-fast)',
  borderLeft: '3px solid transparent',
};

const navItemActive: React.CSSProperties = {
  color: 'var(--color-accent)',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  borderLeftColor: 'var(--color-accent)',
};

interface NavItem {
  path: string;
  labelKey: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', labelKey: 'nav.home', icon: '📊' },
  { path: '/transactions', labelKey: 'nav.transactions', icon: '💳' },
  { path: '/categories', labelKey: 'nav.categories', icon: '🏷️' },
  { path: '/credit-cards', labelKey: 'nav.creditCards', icon: '💎' },
  { path: '/recurring', labelKey: 'nav.recurring', icon: '🔄' },
  { path: '/annual', labelKey: 'nav.annual', icon: '📅' },
];

export function Sidebar() {
  const { t } = useI18n();

  return (
    <nav style={sidebarStyle}>
      <div style={logoStyle}>
        <span>💰</span>
        <span>{t('app.title')}</span>
      </div>

      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          style={({ isActive }) => ({
            ...navItemBase,
            ...(isActive ? navItemActive : {}),
          })}
        >
          <span>{item.icon}</span>
          <span>{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
