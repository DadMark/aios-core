import { db } from '@/db/database';

export async function exportData(): Promise<string> {
  const [transactions, categories, creditCards, recurringRules, settings] = await Promise.all([
    db.transactions.toArray(),
    db.categories.toArray(),
    db.creditCards.toArray(),
    db.recurringRules.toArray(),
    db.settings.toArray(),
  ]);

  const backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: { transactions, categories, creditCards, recurringRules, settings },
  };

  return JSON.stringify(backup, null, 2);
}

export async function importData(jsonString: string): Promise<void> {
  const backup = JSON.parse(jsonString);

  if (!backup.version || !backup.data) {
    throw new Error('Invalid backup file format');
  }

  await db.transaction('rw', [db.transactions, db.categories, db.creditCards, db.recurringRules, db.settings], async () => {
    await db.transactions.clear();
    await db.categories.clear();
    await db.creditCards.clear();
    await db.recurringRules.clear();
    await db.settings.clear();

    if (backup.data.transactions?.length) await db.transactions.bulkAdd(backup.data.transactions);
    if (backup.data.categories?.length) await db.categories.bulkAdd(backup.data.categories);
    if (backup.data.creditCards?.length) await db.creditCards.bulkAdd(backup.data.creditCards);
    if (backup.data.recurringRules?.length) await db.recurringRules.bulkAdd(backup.data.recurringRules);
    if (backup.data.settings?.length) await db.settings.bulkAdd(backup.data.settings);
  });
}

export function downloadBackup(jsonString: string): void {
  const date = new Date().toISOString().split('T')[0];
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finance-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
