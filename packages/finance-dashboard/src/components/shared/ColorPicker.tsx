import React from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
  '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#ec4899', '#f43f5e', '#64748b', '#0ea5e9',
];

const containerStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-md)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--spacing-xs)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  fontWeight: 500,
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-sm)',
};

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={gridStyle}>
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-full)',
              backgroundColor: color,
              border: value === color ? '3px solid var(--color-text-primary)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
