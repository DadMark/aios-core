import React from 'react';
import { getHealthColor, getHealthLabel } from '@/styles/theme';
import { useI18n } from '@/i18n/context';

interface HealthThermometerProps {
  score: number;
}

export function HealthThermometer({ score }: HealthThermometerProps) {
  const { t } = useI18n();
  const color = getHealthColor(score);
  const label = getHealthLabel(score, t);
  const clampedScore = Math.max(0, Math.min(100, score));

  // SVG arc parameters
  const cx = 80;
  const cy = 75;
  const r = 60;
  const startAngle = 180;
  const endAngle = 0;
  const totalDeg = 180;
  const scoreDeg = (clampedScore / 100) * totalDeg;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcStart = {
    x: cx + r * Math.cos(toRad(startAngle)),
    y: cy + r * Math.sin(toRad(startAngle)),
  };
  const arcEndFull = {
    x: cx + r * Math.cos(toRad(endAngle)),
    y: cy + r * Math.sin(toRad(endAngle)),
  };
  const scoreAngle = 180 - scoreDeg;
  const arcEndScore = {
    x: cx + r * Math.cos(toRad(scoreAngle)),
    y: cy + r * Math.sin(toRad(scoreAngle)),
  };

  const bgArc = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcEndFull.x} ${arcEndFull.y}`;
  const scoreArc =
    clampedScore > 0
      ? `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${clampedScore > 50 ? 1 : 0} 1 ${arcEndScore.x} ${arcEndScore.y}`
      : '';

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="160" height="90" viewBox="0 0 160 90">
        <path d={bgArc} fill="none" stroke="var(--color-bg-tertiary)" strokeWidth="12" strokeLinecap="round" />
        {scoreArc && (
          <path d={scoreArc} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" />
        )}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--color-text-primary)">
          {clampedScore}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fill="var(--color-text-secondary)">
          / 100
        </text>
      </svg>
      <div style={{ color, fontWeight: 600, fontSize: 'var(--font-size-sm)', marginTop: 4 }}>
        {label}
      </div>
      <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)', marginTop: 2 }}>
        {t('dashboard.healthScore')}
      </div>
    </div>
  );
}
