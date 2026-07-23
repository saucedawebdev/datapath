export const STORES = {
  PROGRESS: 'progress',
  BOOKMARKS: 'bookmarks',
  NOTES: 'notes',
  QUIZ_ATTEMPTS: 'quizAttempts',
  PRACTICE_RESULTS: 'practiceResults',
  SAVED_QUERIES: 'savedQueries',
  SAVED_CODE: 'savedCode',
  PROJECT_PROGRESS: 'projectProgress',
  ACTIVITY: 'activity',
  PREFERENCES: 'preferences',
};

export const BACKUP_VERSION = 1;

export const READINESS_WEIGHTS = {
  lessonCompletion: 0.25,
  quizPerformance: 0.25,
  challengePerformance: 0.20,
  projectCompletion: 0.20,
  recentReview: 0.10,
};

/**
 * StorageProvider interface — implement for IndexedDB or future cloud backend.
 * @typedef {Object} StorageProvider
 * @property {function(string, string): Promise<*>} get
 * @property {function(string, string, *): Promise<void>} put
 * @property {function(string, string): Promise<void>} delete
 * @property {function(string): Promise<Array>} getAll
 * @property {function(string): Promise<void>} clearStore
 * @property {function(): Promise<object>} exportAll
 * @property {function(object): Promise<void>} importAll
 */

export function createDefaultPreferences() {
  return {
    id: 'user',
    displayName: 'Learner',
    theme: 'system',
    fontSize: 'default',
    reducedMotion: false,
    learningGoal: 'job-ready',
    dailyTargetMinutes: 30,
    onboardingCompleted: false,
    updatedAt: new Date().toISOString(),
  };
}

export function createEmptyBackup() {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    app: 'DataPath',
    data: {},
  };
}
