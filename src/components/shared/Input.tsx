import React from 'react';

interface InputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date' | 'email';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: string;
  style?: React.CSSProperties;
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--spacing-xs)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  backgroundColor: 'var(--color-bg-input)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--color-text-primary)',
  fontSize: 'var(--font-size-md)',
  outline: 'none',
  transition: 'var(--transition-fast)',
};

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  disabled,
  min,
  max,
  step,
  style,
}: InputProps) {
  return (
    <div style={{ marginBottom: 'var(--spacing-md)', ...style }}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        style={inputStyle}
        onFocus={(e) => { e.target.style.borderColor = 'var(--color-border-focus)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
      />
    </div>
  );
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  style?: React.CSSProperties;
}

export function Select({ label, value, onChange, options, placeholder, required, style }: SelectProps) {
  return (
    <div style={{ marginBottom: 'var(--spacing-md)', ...style }}>
      {label && <label style={labelStyle}>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
