import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePush } from './push-guard.mjs';

const safe = {
  remoteName: 'origin', remoteUrl: 'https://github.com/rakhshethans/rakhshethan-portfolio.git',
  branch: 'development', verified: 'true', workflows: [],
  updates: [{ localRef: 'refs/heads/development', remoteRef: 'refs/heads/development', sha: 'a'.repeat(40) }],
  configuration: { git: { deploymentEnabled: { development: false } } }
};
test('permits only the verified development update', () => assert.doesNotThrow(() => validatePush(safe)));
for (const [name, change] of [
  ['unverified deployment setup', { verified: 'false' }],
  ['wrong repository', { remoteUrl: 'https://github.com/example/other.git' }],
  ['main checkout', { branch: 'main' }],
  ['main destination', { updates: [{ ...safe.updates[0], remoteRef: 'refs/heads/main' }] }],
  ['branch deletion', { updates: [{ ...safe.updates[0], sha: '0'.repeat(40) }] }],
  ['missing deployment guard', { configuration: {} }],
  ['competing enable rule', { configuration: { git: { deploymentEnabled: { development: false, '*': true } } } }],
  ['independent workflow', { workflows: ['.github/workflows/deploy.yml'] }],
  ['empty push', { updates: [] }]
]) test(`blocks ${name}`, () => assert.throws(() => validatePush({ ...safe, ...change })));
