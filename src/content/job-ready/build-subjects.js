import { slugify, moduleId, lessonId, CONTENT_STATUS } from '../curriculum/build-curriculum.js';
import {
  JOB_READY_CURRICULUM,
  LEGACY_SQL_IDS,
  LEGACY_SQL_MODULE_IDS,
} from './curriculum-manifest.js';

/**
 * Build Job Ready subjects — every lesson is complete and available.
 */
export function buildJobReadySubjects() {
  return JOB_READY_CURRICULUM.map((subject) => {
    const idOverrides = subject.id === 'sql' ? LEGACY_SQL_IDS : {};
    const moduleIdOverrides = subject.id === 'sql' ? LEGACY_SQL_MODULE_IDS : {};
    const usedLessonIds = new Set();

    return {
      id: subject.id,
      name: subject.name,
      order: subject.order,
      description: subject.description,
      icon: subject.id,
      color: `var(--subject-${subject.id})`,
      modules: subject.modules.map((mod, modIndex) => ({
        id: moduleIdOverrides[mod.name] || moduleId(subject.id, mod.name),
        subjectId: subject.id,
        name: mod.name,
        order: modIndex + 1,
        description: `${mod.name} — Northstar Commerce analytics skills for junior data analysts.`,
        lessons: mod.lessons.map(({ title }) => {
          let lid = idOverrides[title] || lessonId(subject.id, title);
          if (usedLessonIds.has(lid) && !idOverrides[title]) {
            lid = `${subject.id}-lesson-${slugify(mod.name)}-${slugify(title)}`;
          }
          usedLessonIds.add(lid);
          return {
            id: lid,
            title,
            difficulty: modIndex === subject.modules.length - 1 && mod.name.includes('Project')
              ? 'advanced'
              : modIndex < 1 ? 'beginner' : modIndex < subject.modules.length - 1 ? 'intermediate' : 'advanced',
            estimatedMinutes: mod.name.includes('Project') ? 45 : 18,
            contentStatus: CONTENT_STATUS.COMPLETE,
          };
        }),
      })),
    };
  });
}

export const jobReadySubjects = buildJobReadySubjects();
