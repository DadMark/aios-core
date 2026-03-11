import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { TOOLTIP_STYLE, formatCurrency } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { CategoryBreakdown } from '@/types';

interface CategoryBarChartProps {
  data: CategoryBreakdown[];
}

export function CategoryBarChart({ data }: CategoryBarChartProps) {
  const { t } = useI18n();

  const top = data.slice(0, 8);

  const chartData = top.map((d) => ({
    name: `${d.categoryIcon} ${d.categoryName}`,
    total: d.total,
    color: d.categoryColor,
  }));

  return (
    <div>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
        {t('dashboard.categoryBreakdown')}
      </div>
      {chartData.length === 0 ? (
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', textAlign: 'center', padding: 'var(--spacing-lg)' }}>
          {t('common.noData')}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(120, top.length * 36)}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 60, left: 4, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={140}
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(value: number) => [formatCurrency(value), '']}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="total" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
