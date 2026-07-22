import { describe, it, expect } from 'vitest';
import contentBundle from '../src/content/index.js';

function filterReferences(filters, bookmarkIds = new Set()) {
  let refs = [...contentBundle.references];
  if (filters.subject) refs = refs.filter((r) => r.subjectId === filters.subject);
  if (filters.difficulty) refs = refs.filter((r) => r.difficulty === filters.difficulty);
  if (filters.contentType) refs = refs.filter((r) => r.contentType === filters.contentType);
  if (filters.bookmarked) refs = refs.filter((r) => bookmarkIds.has(r.id));
  if (filters.search) {
    const q = filters.search.toLowerCase();
    refs = refs.filter((r) =>
      [r.name, r.definition, r.syntax, r.category].some((f) => String(f).toLowerCase().includes(q)),
    );
  }
  return refs;
}

describe('library reference filters', () => {
  it('filters by subject id', () => {
    expect(filterReferences({ subject: 'sql' })).toHaveLength(10);
    expect(filterReferences({ subject: 'excel' })).toHaveLength(8);
    expect(filterReferences({ subject: 'power-bi' })).toHaveLength(7);
  });

  it('returns all references when subject filter is empty', () => {
    expect(filterReferences({})).toHaveLength(contentBundle.references.length);
  });
});
