// ============================================================
//  Disha AI — Document Analysis Test Suite (document.test.js)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const { detectDocType, extractKeyInfo, generateSimpleSummary, EXAMPLES } = require('../js/document.js');

test('Document Classification — Type Detection', (t) => {
  const kycNotice = EXAMPLES[0].text;
  const taxNotice = EXAMPLES[1].text;
  const rentAgreement = EXAMPLES[2].text;

  assert.strictEqual(detectDocType(kycNotice), 'bank', 'Classified as bank document');
  assert.strictEqual(detectDocType(taxNotice), 'legal', 'Classified as legal document');
  assert.strictEqual(detectDocType(rentAgreement), 'rent', 'Classified as rental document');
});

test('Document Info Extraction — Amounts & Deadlines', (t) => {
  const sample = "You must pay ₹50,000 within 30 days of this notice. Contact 18001234567.";
  const extracted = extractKeyInfo(sample);

  assert.ok(extracted.amounts.includes('₹50,000'), 'Extracted amount correctly');
  assert.ok(extracted.deadlines.some(d => d.includes('30 days')), 'Extracted deadline correctly');
  assert.ok(extracted.contacts.length > 0, 'Extracted contact number correctly');
});

test('Document Summary Generator — Bilingual Output', (t) => {
  const sample = EXAMPLES[0].text;
  const summaryEn = generateSimpleSummary(sample, 'bank', 'english');
  const summaryHi = generateSimpleSummary(sample, 'bank', 'hindi');

  assert.ok(summaryEn.content.summary.includes('bank'), 'English summary generated');
  assert.ok(summaryHi.content.summary.includes('नोटिस'), 'Hindi summary generated');
  assert.strictEqual(summaryEn.meta.type, 'Bank / Financial Document');
});
