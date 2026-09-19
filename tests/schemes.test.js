// ============================================================
//  Disha AI — Government Schemes Test Suite (schemes.test.js)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const { ALL_SCHEMES, filterSchemes } = require('../js/schemes.js');

test('Schemes Registry — Data Integrity', (t) => {
  assert.ok(ALL_SCHEMES.length >= 15, 'Registry contains at least 15 schemes');
  ALL_SCHEMES.forEach(scheme => {
    assert.ok(scheme.id, 'Scheme has ID');
    assert.ok(scheme.name, 'Scheme has name');
    assert.ok(scheme.category, 'Scheme has category');
    assert.ok(Array.isArray(scheme.who), 'Scheme target persona list is an array');
  });
});

test('Schemes Quiz Engine — Persona & Income Matcher', (t) => {
  const studentAnswers = { who: 'student', income: 'low', category: 'Education' };
  const matched = filterSchemes(studentAnswers);

  assert.ok(matched.length > 0, 'Matching schemes found for student profile');
  assert.ok(matched.some(s => s.name.includes('Scholarship')), 'Found scholarship scheme');
});
