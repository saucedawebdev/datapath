import { openDB } from 'idb';
import { STORES, BACKUP_VERSION, createDefaultPreferences } from './storage-contract.js';

const DB_NAME = 'datapath-db';
const DB_VERSION = 1;

const STORE_DEFINITIONS = Object.values(STORES);

let dbPromise = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        for (const storeName of STORE_DEFINITIONS) {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: 'id' });
            if (storeName === STORES.PROGRESS) store.createIndex('subjectId', 'subjectId');
            if (storeName === STORES.ACTIVITY) store.createIndex('timestamp', 'timestamp');
            if (storeName === STORES.BOOKMARKS) store.createIndex('itemId', 'itemId');
          }
        }
      },
    });
  }
  return dbPromise;
}

export class IndexedDBProvider {
  async get(store, id) {
    const db = await getDb();
    return db.get(store, id);
  }

  async put(store, value) {
    const db = await getDb();
    await db.put(store, { ...value, updatedAt: new Date().toISOString() });
  }

  async delete(store, id) {
    const db = await getDb();
    await db.delete(store, id);
  }

  async getAll(store) {
    const db = await getDb();
    return db.getAll(store);
  }

  async getByIndex(store, indexName, query) {
    const db = await getDb();
    return db.getAllFromIndex(store, indexName, query);
  }

  async clearStore(store) {
    const db = await getDb();
    await db.clear(store);
  }

  async exportAll() {
    const data = {};
    for (const store of STORE_DEFINITIONS) {
      data[store] = await this.getAll(store);
    }
    return {
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      app: 'DataPath',
      data,
    };
  }

  async importAll(backup, { merge = false } = {}) {
    if (!backup || backup.version !== BACKUP_VERSION) {
      throw new Error(`Unsupported backup version. Expected ${BACKUP_VERSION}.`);
    }
    if (!backup.data || typeof backup.data !== 'object') {
      throw new Error('Invalid backup: missing data object.');
    }

    for (const store of STORE_DEFINITIONS) {
      const records = backup.data[store];
      if (!Array.isArray(records)) continue;
      if (!merge) await this.clearStore(store);
      for (const record of records) {
        if (record && record.id != null) await this.put(store, record);
      }
    }
  }

  async ensureDefaults() {
    const prefs = await this.get(STORES.PREFERENCES, 'user');
    if (!prefs) {
      await this.put(STORES.PREFERENCES, createDefaultPreferences());
    }
  }
}

export async function resetDatabase() {
  dbPromise = null;
  const databases = indexedDB.databases ? await indexedDB.databases() : [{ name: DB_NAME }];
  for (const { name } of databases) {
    if (name === DB_NAME) indexedDB.deleteDatabase(name);
  }
}
