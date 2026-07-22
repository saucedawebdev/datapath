import { describe, it, expect, beforeEach } from 'vitest';
import { IndexedDBProvider } from '../src/storage/indexeddb-provider.js';
import { STORES, BACKUP_VERSION } from '../src/storage/storage-contract.js';
import 'fake-indexeddb/auto';

describe('IndexedDB storage', () => {
  let provider;

  beforeEach(async () => {
    provider = new IndexedDBProvider();
    await provider.ensureDefaults();
  });

  it('stores and retrieves progress', async () => {
    await provider.put(STORES.PROGRESS, {
      id: 'sql-lesson-select-basics',
      subjectId: 'sql',
      complete: true,
    });
    const record = await provider.get(STORES.PROGRESS, 'sql-lesson-select-basics');
    expect(record.complete).toBe(true);
  });

  it('exports and imports backup', async () => {
    await provider.put(STORES.BOOKMARKS, {
      id: 'bookmark-test',
      itemId: 'test',
      title: 'Test',
    });
    const backup = await provider.exportAll();
    expect(backup.version).toBe(BACKUP_VERSION);
    expect(backup.app).toBe('DataPath');
    expect(backup.data.bookmarks.length).toBe(1);

    await provider.clearStore(STORES.BOOKMARKS);
    expect(await provider.getAll(STORES.BOOKMARKS)).toHaveLength(0);

    await provider.importAll(backup);
    expect(await provider.getAll(STORES.BOOKMARKS)).toHaveLength(1);
  });

  it('rejects unsupported backup version', async () => {
    await expect(provider.importAll({ version: 999, data: {} })).rejects.toThrow(/Unsupported backup version/);
  });
});
