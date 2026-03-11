import React from 'react';
import { Outlet } from 'react-router-dom';
import { MonthNavigator } from '@/components/layout/MonthNavigator';
import { Sidebar } from '@/components/layout/Sidebar';

const shellStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const bodyStyle: React.CSSProperties = {
  display: 'flex',
  flex: 1,
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: 'var(--spacing-lg)',
  maxWidth: '1200px',
  width: '100%',
  overflowY: 'auto',
};

export function AppShell() {
  return (
    <div style={shellStyle}>
      <MonthNavigator />
      <div style={bodyStyle}>
        <Sidebar />
        <main style={mainStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
