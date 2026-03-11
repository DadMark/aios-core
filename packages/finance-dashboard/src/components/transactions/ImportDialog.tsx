import React, { useState } from 'react';
import { FileUpload } from '@/components/shared/FileUpload';
import { Button } from '@/components/shared/Button';
import { Select } from '@/components/shared/Input';
import { useCategories } from '@/context/CategoryContext';
import { useFinance } from '@/context/FinanceContext';
import { ofxToTransactions } from '@/services/import-ofx';
import { csvToTransactions } from '@/services/import-csv';
import { formatCurrency, formatDate } from '@/styles/theme';
import { useI18n } from '@/i18n/context';
import type { Transaction } from '@/types';

type FileType = 'ofx' | 'csv';

interface ImportDialogProps {
  onClose: () => void;
}

type PreviewTransaction = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>;

export function ImportDialog({ onClose }: ImportDialogProps) {
  const { t, locale } = useI18n();
  const { categories } = useCategories();
  const { bulkAddTransactions } = useFinance();

  const [fileType, setFileType] = useState<FileType>('ofx');
  const [preview, setPreview] = useState<PreviewTransaction[]>([]);
  const [categoryAssignments, setCategoryAssignments] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number; skipped: number } | null>(null);
  const [error, setError] = useState('');

  const handleFile = async (content: string) => {
    setError('');
    setPreview([]);
    setResult(null);

    try {
      const txs = fileType === 'ofx'
        ? await ofxToTransactions(content)
        : await csvToTransactions(content);
      setPreview(txs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar arquivo');
    }
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      const withCategories = preview.map((tx, idx) => ({
        ...tx,
        categoryId: categoryAssignments[idx] || null,
      }));
      const imported = await bulkAddTransactions(withCategories);
      setResult({ imported, skipped: preview.length - imported });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na importação');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
        <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>✅</div>
        <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{t('import.success')}</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {result.imported} {t('import.transactionsImported')},&nbsp;
          {result.skipped} {t('import.duplicatesSkipped')}
        </p>
        <Button style={{ marginTop: 'var(--spacing-lg)' }} onClick={onClose}>{t('common.close')}</Button>
      </div>
    );
  }

  return (
    <div>
      <Select
        label={t('import.fileType')}
        value={fileType}
        onChange={(v) => { setFileType(v as FileType); setPreview([]); }}
        options={[
          { value: 'ofx', label: t('import.ofx') },
          { value: 'csv', label: t('import.csv') },
        ]}
      />

      <FileUpload
        accept={fileType === 'ofx' ? '.ofx' : '.csv'}
        label={t('import.selectFile')}
        onFile={handleFile}
      />

      {error && (
        <div style={{ color: 'var(--color-expense)', marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
          {error}
        </div>
      )}

      {preview.length > 0 && (
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
          <div style={{ marginBottom: 'var(--spacing-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            {t('import.preview')}: {preview.length} transações
          </div>
          <div style={{ maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {preview.map((tx, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-sm)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                <span style={{ color: tx.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)', fontWeight: 600, minWidth: 80, fontFamily: 'var(--font-mono)' }}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                </span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tx.description}
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', whiteSpace: 'nowrap' }}>
                  {formatDate(tx.date, locale)}
                </span>
                <select
                  value={categoryAssignments[idx] || ''}
                  onChange={(e) => setCategoryAssignments((prev) => ({ ...prev, [idx]: e.target.value }))}
                  style={{
                    backgroundColor: 'var(--color-bg-input)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    padding: '2px 4px',
                    fontSize: 'var(--font-size-xs)',
                    maxWidth: 120,
                  }}
                >
                  <option value="">{t('import.assignCategory')}</option>
                  {categories
                    .filter((c) => c.type === tx.type || c.type === 'both')
                    .map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                </select>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end', marginTop: 'var(--spacing-lg)' }}>
            <Button variant="secondary" onClick={onClose}>{t('import.cancel')}</Button>
            <Button onClick={handleImport} disabled={loading}>
              {loading ? t('import.importing') : t('import.confirm')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
