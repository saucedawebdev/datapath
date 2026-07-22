import { storage } from '../storage/storage-service.js';
import { downloadBlob } from '../utilities/helpers.js';
import { BACKUP_VERSION } from '../storage/storage-contract.js';

export async function exportUserData() {
  const backup = await storage.exportBackup();
  const json = JSON.stringify(backup, null, 2);
  const date = new Date().toISOString().slice(0, 10);
  downloadBlob(json, `datapath-backup-${date}.json`, 'application/json');
  return backup;
}

export function validateBackupFile(data) {
  const errors = [];
  if (!data || typeof data !== 'object') errors.push('Invalid JSON structure.');
  if (data.app !== 'DataPath') errors.push('This file does not appear to be a DataPath backup.');
  if (data.version !== BACKUP_VERSION) {
    errors.push(`Unsupported backup version: ${data.version}. Expected ${BACKUP_VERSION}.`);
  }
  if (!data.data || typeof data.data !== 'object') errors.push('Missing data section.');
  return { valid: errors.length === 0, errors };
}

export async function importUserData(file, { merge = false, overwrite = false } = {}) {
  const text = await file.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('The file could not be parsed as JSON.');
  }

  const validation = validateBackupFile(data);
  if (!validation.valid) {
    throw new Error(validation.errors.join(' '));
  }

  if (!overwrite && !merge) {
    const existing = await storage.getAllProgress();
    if (existing.length > 0) {
      throw new Error('OVERWRITE_REQUIRED');
    }
  }

  await storage.importBackup(data, { merge });
  return data;
}

export async function resetSubjectData(subjectId) {
  await storage.resetSubjectProgress(subjectId);
}

export async function resetAllUserData() {
  await storage.resetAllProgress();
  await storage.provider.clearStore('bookmarks');
  await storage.provider.clearStore('notes');
  await storage.provider.clearStore('savedQueries');
  await storage.provider.clearStore('savedCode');
}
