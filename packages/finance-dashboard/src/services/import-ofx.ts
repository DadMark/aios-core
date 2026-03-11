import type { Transaction } from '@/types';

interface OFXTransaction {
  date: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
}

function parseOFXDate(dateStr: string): string {
  const clean = dateStr.replace(/\[.*\]/, '').trim();
  if (clean.length >= 8) {
    const year = clean.substring(0, 4);
    const month = clean.substring(4, 6);
    const day = clean.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
}

function extractTag(content: string, tag: string): string {
  const regex = new RegExp(`<${tag}>([^<\\n]+)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

export function parseOFX(content: string): OFXTransaction[] {
  const transactions: OFXTransaction[] = [];

  const stmtTrnRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/gi;
  let match;

  while ((match = stmtTrnRegex.exec(content)) !== null) {
    const block = match[1];

    const dtPosted = extractTag(block, 'DTPOSTED');
    const trnAmt = extractTag(block, 'TRNAMT');
    const memo = extractTag(block, 'MEMO') || extractTag(block, 'NAME');

    if (dtPosted && trnAmt) {
      const amount = parseFloat(trnAmt.replace(',', '.'));

      transactions.push({
        date: parseOFXDate(dtPosted),
        amount: Math.abs(amount),
        description: memo || 'Transação importada',
        type: amount >= 0 ? 'income' : 'expense',
      });
    }
  }

  return transactions;
}

export async function generateImportHash(date: string, amount: number, description: string): Promise<string> {
  const data = `${date}|${amount}|${description}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function ofxToTransactions(content: string): Promise<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[]> {
  const parsed = parseOFX(content);
  const results: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[] = [];

  for (const tx of parsed) {
    const hash = await generateImportHash(tx.date, tx.amount, tx.description);
    results.push({
      date: tx.date,
      description: tx.description,
      amount: tx.amount,
      type: tx.type,
      categoryId: null,
      creditCardId: null,
      isRecurring: false,
      recurringRuleId: null,
      importSource: 'ofx',
      importHash: hash,
      notes: '',
    });
  }

  return results;
}
