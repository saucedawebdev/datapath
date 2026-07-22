import { describe, it, expect } from 'vitest';
import { resolveInitSqlJs } from '../src/services/sql-engine.js';

describe('resolveInitSqlJs', () => {
  it('resolves direct function export', () => {
    const fn = () => {};
    expect(resolveInitSqlJs(fn)).toBe(fn);
  });

  it('resolves default export', () => {
    const fn = () => {};
    expect(resolveInitSqlJs({ default: fn })).toBe(fn);
  });

  it('resolves nested default export', () => {
    const fn = () => {};
    expect(resolveInitSqlJs({ default: { default: fn } })).toBe(fn);
  });

  it('resolves Module export', () => {
    const fn = () => {};
    expect(resolveInitSqlJs({ Module: fn })).toBe(fn);
  });

  it('throws when init missing', () => {
    expect(() => resolveInitSqlJs({})).toThrow(/Failed to load sql.js/);
  });
});
