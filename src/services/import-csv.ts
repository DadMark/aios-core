import Papa from 'papaparse';
import type { Transaction } from '@/types';
import { generateImportHash } from '@/services/import-ofx';

interface CSVRow {
  [key: string]: string;
}

function findColumn(headers: string[], candidates: string[]): string | null {
  const normalized = headers.map((h) => h.toLowerCase().trim());
  for (const candidate of candidates) {
    const idx = normalized.indexOf(candidate.toLowerCase());
    if (idx !== -1) return headers[idx];
  }
  return null;
}

function parseDate(value: string): string {
  // Try DD/MM/YYYY (Brazilian format)
  const brMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (brMatch) {
    return `${brMatch[3]}-${brMatch[2].padStart(2, '0')}-${brMatch[1].padStart(2, '0')}`;
  }

  // Try YYYY-MM-DD
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return value;

  // Try MM/DD/YYYY
  const usMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    return `${usMatch[3]}-${usMatch[1].padStart(2, '0')}-${usMatch[2].padStart(2, '0')}`;
  }

  return new Date().toISOString().split('T')[0];
}

function parseAmount(value: string): number {
  // Handle Brazilian format: 1.234,56
  let cleaned = value.replace(/[R$\s]/g, '');
  if (cleaned.includes(',') && cleaned.includes('.')) {
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.');
  }
  return parseFloat(cleaned) || 0;
}

export async function csvToTransactions(content: string): Promise<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(content, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        try {
          const headers = result.meta.fields || [];
          const dateCol = findColumn(headers, ['data', 'date', 'dt', 'Data', 'DATE']);
          const descCol = findColumn(headers, ['descricao', 'descrição', 'description', 'memo', 'Descrição', 'Descricao', 'DESCRICAO']);
          const amountCol = findColumn(headers, ['valor', 'amount', 'value', 'Valor', 'VALOR']);

          if (!dateCol || !amountCol) {
            reject(new Error('CSV must have date and amount columns'));
            return;
          }

          const transactions: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[] = [];

          for (const row of result.data) {
            const dateVal = row[dateCol];
            const amountVal = row[amountCol];
            const descVal = descCol ? row[descCol] : '';

            if (!dateVal || !amountVal) continue;

            const amount = parseAmount(amountVal);
            const date = parseDate(dateVal);
            const description = descVal || 'Transação importada';
            const hash = await generateImportHash(date, Math.abs(amount), description);

            transactions.push({
              date,
              description,
              amount: Math.abs(amount),
              type: amount >= 0 ? 'income' : 'expense',
              categoryId: null,
              creditCardId: null,
              isRecurring: false,
              recurringRuleId: null,
              importSource: 'csv',
              importHash: hash,
              notes: '',
            });
          }

          resolve(transactions);
        } catch (err) {
          reject(err);
        }
      },
      error: (err: Error) => reject(err),
    });
  });
}
