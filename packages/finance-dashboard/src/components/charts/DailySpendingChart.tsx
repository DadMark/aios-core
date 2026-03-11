import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TOOLTIP_STYLE, formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { DailySpending } from '@/types';

interface DailySpendingChartProps {
  data: DailySpending[];
}

export function DailySpendingChart({ data }: DailySpendingChartProps) {
  const { t } = useI18n();

  const chartData = data.map((d) => ({
    day: d.day,
    total: d.total,
  }));

  return (
    <div>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
        {t('dashboard.dailySpending')}
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="day"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number) => [formatCurrency(value), '']}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Bar dataKey="total" fill="var(--color-accent)" radius={[3, 3, 0, 0]} maxBarSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
