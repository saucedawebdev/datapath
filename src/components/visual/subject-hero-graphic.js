const GRAPHICS = {
  sql: `<svg class="subject-hero-graphic" viewBox="0 0 200 100" aria-hidden="true"><circle cx="40" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="100" cy="30" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="160" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="52" y1="50" x2="88" y2="30" stroke="currentColor" stroke-width="1"/><line x1="112" y1="30" x2="148" y2="50" stroke="currentColor" stroke-width="1"/></svg>`,
  excel: `<svg class="subject-hero-graphic" viewBox="0 0 200 100" aria-hidden="true"><rect x="30" y="20" width="140" height="60" fill="none" stroke="currentColor" stroke-width="1"/><line x1="30" y1="40" x2="170" y2="40" stroke="currentColor" stroke-width="0.75" opacity="0.7"/><line x1="30" y1="60" x2="170" y2="60" stroke="currentColor" stroke-width="0.75" opacity="0.7"/><line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="0.75" opacity="0.7"/><rect x="82" y="42" width="36" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  tableau: `<svg class="subject-hero-graphic" viewBox="0 0 200 100" aria-hidden="true"><line x1="40" y1="75" x2="160" y2="75" stroke="currentColor" stroke-width="1"/><line x1="40" y1="75" x2="40" y2="25" stroke="currentColor" stroke-width="1"/><rect x="55" y="45" width="18" height="30" fill="currentColor" opacity="0.5"/><rect x="85" y="35" width="18" height="40" fill="currentColor" opacity="0.5"/><rect x="115" y="50" width="18" height="25" fill="currentColor" opacity="0.5"/></svg>`,
  'power-bi': `<svg class="subject-hero-graphic" viewBox="0 0 200 100" aria-hidden="true"><rect x="35" y="30" width="45" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="1"/><rect x="90" y="30" width="45" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="57" y1="65" x2="120" y2="65" stroke="currentColor" stroke-width="1"/><line x1="120" y1="65" x2="155" y2="40" stroke="currentColor" stroke-width="1"/></svg>`,
  python: `<svg class="subject-hero-graphic" viewBox="0 0 200 100" aria-hidden="true"><line x1="40" y1="35" x2="150" y2="35" stroke="currentColor" stroke-width="1"/><line x1="40" y1="50" x2="120" y2="50" stroke="currentColor" stroke-width="1"/><line x1="40" y1="65" x2="100" y2="65" stroke="currentColor" stroke-width="1"/><circle cx="155" cy="55" r="4" fill="currentColor"/></svg>`,
  statistics: `<svg class="subject-hero-graphic" viewBox="0 0 200 100" aria-hidden="true"><circle cx="50" cy="60" r="3" fill="currentColor"/><circle cx="75" cy="45" r="3" fill="currentColor"/><circle cx="100" cy="55" r="3" fill="currentColor"/><circle cx="125" cy="35" r="3" fill="currentColor"/><path d="M40 70 Q80 20 150 40" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
};

export function createSubjectHeroGraphic(subjectId) {
  const el = document.createElement('div');
  el.className = `subject-hero-graphic-wrap subject-${subjectId}`;
  el.innerHTML = GRAPHICS[subjectId] || '';
  return el;
}

export function getSubjectHeroGraphicHtml(subjectId) {
  return GRAPHICS[subjectId] || '';
}
