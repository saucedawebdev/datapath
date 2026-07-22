/**
 * Minimal HTML sanitizer for user-generated content.
 * Strips script tags and event handlers; allows basic formatting.
 */
const ALLOWED_TAGS = new Set(['b', 'i', 'em', 'strong', 'code', 'br', 'p', 'ul', 'ol', 'li']);

export function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeText(text) {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

export function sanitizeHtml(dirty) {
  if (!dirty) return '';
  const template = document.createElement('template');
  template.innerHTML = dirty;

  function clean(node) {
    const children = [...node.childNodes];
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();
        if (!ALLOWED_TAGS.has(tag)) {
          const fragment = document.createDocumentFragment();
          while (child.firstChild) fragment.appendChild(child.firstChild);
          child.replaceWith(fragment);
          clean(node);
        } else {
          [...child.attributes].forEach((attr) => child.removeAttribute(attr.name));
          clean(child);
        }
      }
    }
  }

  clean(template.content);
  return template.innerHTML;
}

export function setSafeHtml(element, html, { allowBasic = false } = {}) {
  if (allowBasic) {
    element.innerHTML = sanitizeHtml(html);
  } else {
    element.textContent = html ?? '';
  }
}
