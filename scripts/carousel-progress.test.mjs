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
const { createProjectEntryGate } = scope;

test('arrival holds all momentum events regardless of total scroll distance', () => {
  const gate = createProjectEntryGate();
  gate.enter(100);
  for (let time = 116; time <= 2000; time += 16) assert.equal(gate.holdWheel(time), true);
  assert.equal(gate.phase, 'waiting');
});
test('a pause alone never advances the carousel', () => {
  const gate = createProjectEntryGate();
  gate.enter(100);
  assert.equal(gate.phase, 'waiting');
  assert.equal(gate.holdWheel(5000), false);
  assert.equal(gate.phase, 'active');
});
test('a fresh gesture releases immediately after the quiet gap, with no distance buffer', () => {
  const gate = createProjectEntryGate();
  gate.enter(100);
  assert.equal(gate.holdWheel(200), true);
  assert.equal(gate.holdWheel(439), true);
  assert.equal(gate.holdWheel(679), false);
  assert.equal(gate.holdWheel(695), false);
});
test('explicit keyboard, arrow and reverse input can bypass the hold', () => {
  const gate = createProjectEntryGate();
  gate.enter(100);
  gate.release();
  assert.equal(gate.holdWheel(110), false);
  assert.equal(gate.phase, 'active');
});
test('returning above the section rearms its next entry', () => {
  const gate = createProjectEntryGate();
  gate.release();
  gate.reset();
  assert.equal(gate.phase, 'ready');
  gate.enter(1000);
  assert.equal(gate.holdWheel(1020), true);
});
