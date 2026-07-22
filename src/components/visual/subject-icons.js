const ICONS = {
  sql: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>',
  excel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="4" y1="16" x2="20" y2="16"/><line x1="10" y1="4" x2="10" y2="20"/><path d="M13 13h4"/></svg>',
  tableau: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><line x1="5" y1="19" x2="19" y2="19"/><line x1="5" y1="19" x2="5" y2="5"/><rect x="8" y="11" width="3" height="8"/><rect x="13" y="8" width="3" height="11"/><rect x="18" y="13" width="3" height="6"/></svg>',
  'power-bi': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="5" width="8" height="6" rx="1"/><rect x="13" y="5" width="8" height="6" rx="1"/><rect x="8" y="14" width="8" height="6" rx="1"/></svg>',
  python: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M8 4h8l2 4v4H6V8z"/><path d="M16 20H8l-2-4v-4h14v4z"/><circle cx="10" cy="7" r="1" fill="currentColor"/><circle cx="14" cy="17" r="1" fill="currentColor"/></svg>',
  statistics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="6" cy="16" r="1.5" fill="currentColor"/><circle cx="11" cy="11" r="1.5" fill="currentColor"/><circle cx="16" cy="14" r="1.5" fill="currentColor"/><path d="M4 18 Q11 8 20 12"/></svg>',
};

export function getSubjectIcon(subjectId) {
  return ICONS[subjectId] || ICONS.sql;
}

export function createSubjectIconEl(subjectId, className = 'subject-icon') {
  const span = document.createElement('span');
  span.className = `${className} subject-icon--${subjectId}`;
  span.innerHTML = getSubjectIcon(subjectId);
  return span;
}
