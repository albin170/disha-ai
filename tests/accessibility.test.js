// ============================================================
//  Disha AI — Accessibility & Utility Test Suite (accessibility.test.js)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const { escapeHTML, sanitizeDOM, debounce } = require('../js/utils.js');

test('Accessibility & Security Utils — HTML Escaping', (t) => {
  const unsafe = '<script>alert("xss")</script> & "quotes"';
  const escaped = escapeHTML(unsafe);

  assert.ok(!escaped.includes('<script>'), 'Script brackets escaped');
  assert.ok(escaped.includes('&lt;script&gt;'), 'HTML entities used correctly');
});

test('Accessibility & Security Utils — DOM Sanitization', (t) => {
  const dirty = '<div onclick="alert(1)">Hello <script>alert(2)</script><iframe src="evil.com"></iframe></div>';
  const clean = sanitizeDOM(dirty);

  assert.ok(!clean.includes('<script>'), 'Script tags stripped');
  assert.ok(!clean.includes('<iframe'), 'Iframe tags stripped');
  assert.ok(!clean.includes('onclick'), 'Onclick handler stripped');
});

test('Performance Utils — Debounce Verification', async (t) => {
  let count = 0;
  const debouncedFn = debounce(() => {
    count++;
  }, 50);

  debouncedFn();
  debouncedFn();
  debouncedFn();

  await new Promise((resolve) => setTimeout(resolve, 100));
  assert.strictEqual(count, 1, 'Debounced function executed exactly once for rapid calls');
});
