import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TOOLTIP_STYLE, formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';

interface MonthData {
  month: string;
  label: string;
  income: number;
  expenses: number;
}

interface MonthlyTrendChartProps {
  data: MonthData[];
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  const { t } = useI18n();

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="label"
          tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) => `R$${(v / 1000).toFixed(0)}k`}
          width={48}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(value: number) => [formatCurrency(value), '']}
          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
        />
        <Legend
          wrapperStyle={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}
        />
        <Bar dataKey="income" name={t('dashboard.income')} fill="var(--color-income)" radius={[3, 3, 0, 0]} maxBarSize={24} />
        <Bar dataKey="expenses" name={t('dashboard.expenses')} fill="var(--color-expense)" radius={[3, 3, 0, 0]} maxBarSize={24} />
      </BarChart>
    </ResponsiveContainer>
  );
}
