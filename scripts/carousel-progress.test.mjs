import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Execute the real classic browser script with no mounted page components.
const scope = {
  URLSearchParams,
  window: { location: { search: '' }, matchMedia: () => ({ matches: false }) },
  document: { querySelector: () => null, querySelectorAll: () => [] }
};
vm.createContext(scope);
vm.runInContext(readFileSync(new URL('../design.js', import.meta.url), 'utf8'), scope);
const { projectScrollOffset, projectPageOffset } = scope;

test('the first project remains stationary before and throughout the lead-in', () => {
  for (const pageOffset of [-100, 0, 60, 251, 252]) {
    assert.equal(projectScrollOffset(pageOffset, 252, 730), 0);
  }
});
test('continued scroll maps directly to horizontal movement after the lead-in', () => {
  assert.equal(projectScrollOffset(253, 252, 730), 1);
  assert.equal(projectScrollOffset(452, 252, 730), 200);
  assert.equal(projectScrollOffset(982, 252, 730), 730);
  assert.equal(projectScrollOffset(1200, 252, 730), 730);
});
test('navigation skips the lead-in for later cards and Home restores the start', () => {
  assert.equal(projectPageOffset(0, 252), 0);
  assert.equal(projectPageOffset(730, 252), 982);
  for (const horizontal of [1, 200, 730]) {
    assert.equal(projectScrollOffset(projectPageOffset(horizontal, 252), 252, 730), horizontal);
  }
});
