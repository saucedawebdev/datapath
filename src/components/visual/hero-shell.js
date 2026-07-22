import { createNetworkBackground } from './network-background.js';
import { createSubjectHeroGraphic } from './subject-hero-graphic.js';

export function createHeroShell({ className = '', subjectId = null, children = [] } = {}) {
  const section = document.createElement('section');
  section.className = `hero-shell glass-panel analytics-grid-bg ${className}`.trim();

  section.appendChild(createNetworkBackground());
  if (subjectId) section.appendChild(createSubjectHeroGraphic(subjectId));

  const content = document.createElement('div');
  content.className = 'hero-shell__content';
  for (const child of children) {
    if (child) content.appendChild(child);
  }
  section.appendChild(content);
  return section;
}

export function wrapHeroContent(element) {
  const inner = document.createElement('div');
  inner.className = 'hero-shell__content';
  inner.appendChild(element);
  return inner;
}
