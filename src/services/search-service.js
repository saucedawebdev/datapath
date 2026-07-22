import { escapeHtml } from '../utilities/sanitize.js';
import { buildPracticeRoute } from './practice-service.js';

const SEARCHABLE_FIELDS = {
  lesson: ['title', 'plainEnglish', 'whyItMatters', 'tags', 'stakeholderQuestion', 'syntax', 'walkthrough'],
  reference: ['name', 'definition', 'syntax', 'whatItDoes', 'category'],
  project: ['title', 'businessContext', 'stakeholderRequest'],
  exercise: ['title', 'instructions', 'skillTags'],
};

function tokenize(query) {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

function matchesTokens(text, tokens) {
  if (!text) return false;
  const lower = String(text).toLowerCase();
  return tokens.every((t) => lower.includes(t));
}

function highlightMatch(text, tokens) {
  if (!text || !tokens.length) return escapeHtml(text);
  let result = escapeHtml(String(text));
  for (const token of tokens) {
    const re = new RegExp(`(${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  }
  return result;
}

export function searchContent(query, contentBundle, progressMap = {}, bookmarkSet = new Set()) {
  if (!query || query.trim().length < 2) return [];

  const tokens = tokenize(query.trim());
  const results = [];

  function addResult(type, item, subjectId, contextField) {
    const fields = SEARCHABLE_FIELDS[type] || ['title', 'name'];
    const matched = fields.some((f) => {
      const val = item[f];
      if (Array.isArray(val)) return val.some((v) => matchesTokens(v, tokens));
      return matchesTokens(val, tokens);
    });
    if (!matched) return;

    const title = item.title || item.name;
    const context = item[contextField] || item.plainEnglish || item.definition || '';
    results.push({
      type,
      id: item.id,
      subjectId: subjectId || item.subjectId,
      title,
      context: highlightMatch(context.slice(0, 160), tokens),
      difficulty: item.difficulty,
      complete: !!progressMap[item.id]?.complete,
      bookmarked: bookmarkSet.has(item.id),
      href: type === 'lesson' ? `#/lesson/${item.id}`
        : type === 'reference' ? `#/library?ref=${item.id}`
        : type === 'project' ? `#/projects/${item.id}`
        : buildPracticeRoute(item),
    });
  }

  for (const lesson of contentBundle.lessons || []) {
    addResult('lesson', lesson, lesson.subjectId, 'plainEnglish');
  }
  for (const ref of contentBundle.references || []) {
    addResult('reference', ref, ref.subjectId, 'definition');
  }
  for (const project of contentBundle.projects || []) {
    addResult('project', project, project.subjectIds?.[0], 'businessContext');
  }
  for (const exercise of contentBundle.exercises || []) {
    addResult('exercise', exercise, exercise.subjectId, 'instructions');
  }

  return results.sort((a, b) => {
    const aExact = a.title?.toLowerCase().includes(tokens.join(' ')) ? 1 : 0;
    const bExact = b.title?.toLowerCase().includes(tokens.join(' ')) ? 1 : 0;
    return bExact - aExact;
  });
}

export { highlightMatch, tokenize };
