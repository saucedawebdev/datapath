/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import 'fake-indexeddb/auto';
import { renderLibrary } from '../src/features/library/library-view.js';

describe('library view filtering', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.location.hash = '#/library';
  });

  it('renders all references initially', async () => {
    const view = await renderLibrary({});
    document.body.appendChild(view);
    expect(document.querySelectorAll('#library-results .card').length).toBe(46);
    expect(document.querySelector('#library-count')?.textContent).toContain('46');
  });

  it('filters references when subject select changes', async () => {
    const view = await renderLibrary({});
    document.body.appendChild(view);

    const select = document.querySelector('#filter-subject');
    select.value = 'sql';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    await vi.waitFor(() => {
      expect(window.location.hash).toBe('#/library?subject=sql');
    });

    document.body.innerHTML = '';
    const filteredView = await renderLibrary({ subject: 'sql' });
    document.body.appendChild(filteredView);

    expect(document.querySelectorAll('#library-results .card').length).toBe(10);
    expect(document.querySelector('#library-count')?.textContent).toContain('10 of 10');
  });
});
