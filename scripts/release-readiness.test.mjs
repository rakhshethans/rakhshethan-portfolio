import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('../design.js', import.meta.url), 'utf8');
const origin = 'https://rakhshethan-portfolio.vercel.app/';

test('public metadata has no local-preview title, label or noindex directive', () => {
  assert.match(html, /<title>Rakhshethan Subenthiran \| Software Engineering Portfolio<\/title>/);
  assert.match(html, /<meta name="robots" content="index, follow">/);
  assert.doesNotMatch(html, /Local preview|Local portfolio preview|Not published|noindex/i);
});
test('canonical and social URLs target the existing production domain', () => {
  assert.ok(html.includes(`<link rel="canonical" href="${origin}">`));
  assert.ok(html.includes(`<meta property="og:url" content="${origin}">`));
  assert.ok(html.includes(`<meta property="og:image" content="${origin}assets/og.png">`));
});
for (const search of ['', '?layout=stacked']) {
  test(`chosen layout initializes at ${search || 'the root URL without query parameters'}`, () => {
    const scope = {
      window: { location: { search }, matchMedia: () => ({ matches: false }) },
      document: { documentElement: { dataset: {} }, querySelector: () => null, querySelectorAll: () => [] }
    };
    vm.createContext(scope);
    vm.runInContext(script, scope);
    assert.equal(scope.document.documentElement.dataset.projectLayout, 'stacked');
  });
}
test('development branch deployments remain disabled', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(config.git.deploymentEnabled.development, false);
});
