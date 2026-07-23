import { IndexedDBProvider } from './indexeddb-provider.js';
import { STORES, createDefaultPreferences } from './storage-contract.js';

const PREFS_KEY = 'datapath-prefs';

class StorageService {
  constructor(provider = new IndexedDBProvider()) {
    this.provider = provider;
  }

  async init() {
    await this.provider.ensureDefaults();
    const dbPrefs = await this.provider.get(STORES.PREFERENCES, 'user');
    this.syncPrefsToLocalStorage(dbPrefs || createDefaultPreferences());
  }

  syncPrefsToLocalStorage(prefs) {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({
        theme: prefs.theme,
        fontSize: prefs.fontSize,
        reducedMotion: prefs.reducedMotion,
      }));
    } catch { /* quota or private mode */ }
  }

  getInstantPrefs() {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    } catch {
      return {};
    }
  }

  async getPreferences() {
    return (await this.provider.get(STORES.PREFERENCES, 'user')) || createDefaultPreferences();
  }

  async updatePreferences(updates) {
    const current = await this.getPreferences();
    const updated = { ...current, ...updates, id: 'user', updatedAt: new Date().toISOString() };
    await this.provider.put(STORES.PREFERENCES, updated);
    this.syncPrefsToLocalStorage(updated);
    return updated;
  }

  async getProgress(lessonId) {
    return this.provider.get(STORES.PROGRESS, lessonId);
  }

  async getAllProgress() {
    return this.provider.getAll(STORES.PROGRESS);
  }

  async setLessonComplete(lessonId, subjectId, moduleId, complete = true) {
    await this.provider.put(STORES.PROGRESS, {
      id: lessonId,
      subjectId,
      moduleId,
      type: 'lesson',
      complete,
      completedAt: complete ? new Date().toISOString() : null,
    });
    await this.logActivity({ type: 'lesson-complete', itemId: lessonId, subjectId });
  }

  async toggleBookmark(itemId, itemType, subjectId, title) {
    const id = `bookmark-${itemId}`;
    const existing = await this.provider.get(STORES.BOOKMARKS, id);
    if (existing) {
      await this.provider.delete(STORES.BOOKMARKS, id);
      return false;
    }
    await this.provider.put(STORES.BOOKMARKS, {
      id,
      itemId,
      itemType,
      subjectId,
      title,
      createdAt: new Date().toISOString(),
    });
    await this.logActivity({ type: 'bookmark-add', itemId, subjectId });
    return true;
  }

  async isBookmarked(itemId) {
    return !!(await this.provider.get(STORES.BOOKMARKS, `bookmark-${itemId}`));
  }

  async getBookmarks() {
    return this.provider.getAll(STORES.BOOKMARKS);
  }

  async saveNote(itemId, content) {
    await this.provider.put(STORES.NOTES, {
      id: `note-${itemId}`,
      itemId,
      content,
      updatedAt: new Date().toISOString(),
    });
  }

  async getNote(itemId) {
    const note = await this.provider.get(STORES.NOTES, `note-${itemId}`);
    return note?.content || '';
  }

  async saveQuizAttempt(quizId, subjectId, score, total) {
    const id = `quiz-${quizId}-${Date.now()}`;
    await this.provider.put(STORES.QUIZ_ATTEMPTS, {
      id,
      quizId,
      subjectId,
      score,
      total,
      percentage: total > 0 ? score / total : 0,
      attemptedAt: new Date().toISOString(),
    });
    await this.logActivity({ type: 'quiz-attempt', itemId: quizId, subjectId });
    return id;
  }

  async getQuizAttempts(quizId) {
    const all = await this.provider.getAll(STORES.QUIZ_ATTEMPTS);
    return quizId ? all.filter((a) => a.quizId === quizId) : all;
  }

  async getPracticeResults(exerciseId) {
    const all = await this.provider.getAll(STORES.PRACTICE_RESULTS);
    return exerciseId ? all.filter((r) => r.exerciseId === exerciseId) : all;
  }

  async getCompletedExerciseIds() {
    const all = await this.getPracticeResults();
    return new Set(all.filter((r) => r.correct).map((r) => r.exerciseId));
  }

  async isExerciseComplete(exerciseId) {
    const all = await this.getPracticeResults(exerciseId);
    return all.some((r) => r.correct);
  }

  async getBestPracticeResult(exerciseId) {
    const results = await this.getPracticeResults(exerciseId);
    const correct = results.filter((r) => r.correct);
    if (!correct.length) return null;
    return correct.sort((a, b) => (a.attempts || 99) - (b.attempts || 99))[0];
  }

  async savePracticeResult(exerciseId, subjectId, { correct, hintsUsed, attempts, lessonId, practiceType }) {
    const id = `practice-${exerciseId}-${Date.now()}`;
    await this.provider.put(STORES.PRACTICE_RESULTS, {
      id,
      exerciseId,
      subjectId,
      lessonId,
      practiceType,
      correct,
      hintsUsed: hintsUsed || 0,
      attempts: attempts || 1,
      completedAt: new Date().toISOString(),
    });
    await this.logActivity({ type: 'practice-complete', itemId: exerciseId, subjectId });
    return id;
  }

  async saveQuery(name, sql, datasetId) {
    const id = `query-${Date.now()}`;
    await this.provider.put(STORES.SAVED_QUERIES, {
      id,
      name,
      sql,
      datasetId,
      savedAt: new Date().toISOString(),
    });
    return id;
  }

  async getSavedQueries() {
    return this.provider.getAll(STORES.SAVED_QUERIES);
  }

  async logActivity({ type, itemId, subjectId, metadata = {} }) {
    await this.provider.put(STORES.ACTIVITY, {
      id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      itemId,
      subjectId,
      metadata,
      timestamp: new Date().toISOString(),
    });
  }

  async logLessonView(lessonId, subjectId) {
    await this.logActivity({ type: 'lesson-view', itemId: lessonId, subjectId });
  }

  async getProjectProgress(projectId) {
    return this.provider.get(STORES.PROJECT_PROGRESS, projectId);
  }

  async getAllProjectProgress() {
    return this.provider.getAll(STORES.PROJECT_PROGRESS);
  }

  async setProjectProgress(projectId, { complete = false, inProgress = true } = {}) {
    await this.provider.put(STORES.PROJECT_PROGRESS, {
      id: projectId,
      complete,
      inProgress: complete ? false : inProgress,
      updatedAt: new Date().toISOString(),
    });
  }

  async getRecentActivity(limit = 20) {
    const all = await this.provider.getAll(STORES.ACTIVITY);
    return all.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, limit);
  }

  async exportBackup() {
    return this.provider.exportAll();
  }

  async importBackup(backup, options) {
    return this.provider.importAll(backup, options);
  }

  async resetSubjectProgress(subjectId) {
    const progress = await this.getAllProgress();
    for (const p of progress) {
      if (p.subjectId === subjectId) await this.provider.delete(STORES.PROGRESS, p.id);
    }
  }

  async resetAllProgress() {
    await this.provider.clearStore(STORES.PROGRESS);
    await this.provider.clearStore(STORES.QUIZ_ATTEMPTS);
    await this.provider.clearStore(STORES.PRACTICE_RESULTS);
    await this.provider.clearStore(STORES.PROJECT_PROGRESS);
    await this.provider.clearStore(STORES.ACTIVITY);
  }
}

export const storage = new StorageService();
