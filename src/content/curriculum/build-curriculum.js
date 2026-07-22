/**
 * Curriculum structure helpers — generates stable IDs and lesson refs.
 */

export const CONTENT_STATUS = {
  COMPLETE: 'complete',
  IN_PROGRESS: 'in_progress',
  PLANNED: 'planned',
};

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function lessonId(subjectId, title) {
  return `${subjectId}-lesson-${slugify(title)}`;
}

export function moduleId(subjectId, name) {
  return `${subjectId}-module-${slugify(name)}`;
}

/**
 * Build a subject from module lesson title lists.
 * @param {object} config
 * @param {string} config.id
 * @param {string} config.name
 * @param {number} config.order
 * @param {string} config.description
 * @param {Array<{name: string, description?: string, difficulty?: string, lessons: string[]}>} config.modules
 * @param {Record<string, string>} [config.idOverrides] - title → existing lesson id
 * @param {Record<string, string>} [config.moduleIdOverrides] - module name → existing module id
 * @param {Record<string, string>} [config.statusOverrides] - lesson id → contentStatus
 */
export function buildSubject({
  id,
  name,
  order,
  description,
  modules,
  idOverrides = {},
  moduleIdOverrides = {},
  statusOverrides = {},
}) {
  const defaultDifficulty = (modIndex) => {
    if (modIndex < 2) return 'beginner';
    if (modIndex < modules.length - 2) return 'intermediate';
    return 'advanced';
  };

  const usedLessonIds = new Set();

  return {
    id,
    name,
    order,
    description,
    icon: id,
    color: `var(--subject-${id})`,
    modules: modules.map((mod, modIndex) => ({
      id: moduleIdOverrides[mod.name] || moduleId(id, mod.name),
      subjectId: id,
      name: mod.name,
      order: modIndex + 1,
      description: mod.description || `${mod.name} — part of the ${name} learning path.`,
      lessons: mod.lessons.map((title) => {
        let lid = idOverrides[title] || lessonId(id, title);
        if (usedLessonIds.has(lid) && !idOverrides[title]) {
          lid = `${id}-lesson-${slugify(mod.name)}-${slugify(title)}`;
        }
        if (usedLessonIds.has(lid)) {
          throw new Error(`Duplicate lesson id: ${lid} (${title} in ${mod.name})`);
        }
        usedLessonIds.add(lid);
        const contentStatus = statusOverrides[lid] || CONTENT_STATUS.PLANNED;
        return {
          id: lid,
          title,
          difficulty: mod.difficulty || defaultDifficulty(modIndex),
          estimatedMinutes: 15,
          contentStatus,
        };
      }),
    })),
  };
}

export function getCurriculumStats(subject, completedLessonIds = new Set()) {
  let total = 0;
  let available = 0;
  let completed = 0;

  for (const mod of subject.modules) {
    for (const lesson of mod.lessons) {
      total++;
      if (isLessonAvailable(lesson)) {
        available++;
        if (completedLessonIds.has(lesson.id)) completed++;
      }
    }
  }

  return { total, available, completed, planned: total - available };
}

export function findLessonRefById(lessonId, subjects) {
  for (const subject of subjects) {
    for (const mod of subject.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { ...lesson, subjectId: subject.id, moduleId: mod.id, moduleName: mod.name };
      }
    }
  }
  return null;
}

export function findLessonRef(subjectId, lessonId, subjects) {
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return null;
  for (const mod of subject.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { ...lesson, subjectId, moduleId: mod.id, moduleName: mod.name };
  }
  return null;
}

export function isLessonAvailable(lessonRef) {
  return lessonRef?.contentStatus === CONTENT_STATUS.COMPLETE
    || lessonRef?.contentStatus === CONTENT_STATUS.IN_PROGRESS;
}

export function formatLessonCounts({ completed, available, total }) {
  const planned = total - available;
  return `${completed} completed · ${available} available · ${planned} planned`;
}
