// ============================================================
//  Disha AI — Performance & Efficiency Test Suite (performance.test.js)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const { CacheEngine, maskPII } = require('../js/security.js');
const { scanDocumentRisks } = require('../js/legal.js');

test('Efficiency — LRU Cache Performance & Memory Eviction', (t) => {
  const cache = new CacheEngine(2, 5000); // max size 2
  cache.set('key1', 'val1');
  cache.set('key2', 'val2');

  assert.strictEqual(cache.get('key1'), 'val1', 'Key 1 retrieved from cache');

  cache.set('key3', 'val3'); // Should evict key2 (since key1 was recently accessed)
  assert.strictEqual(cache.get('key2'), null, 'Key 2 evicted correctly');
  assert.strictEqual(cache.get('key3'), 'val3', 'Key 3 stored');
});

test('Performance Benchmark — High Speed PII & Document Risk Scanning', (t) => {
  const longText = `RENTAL AGREEMENT
  This is a legal document between Rajesh Kumar (PAN: ABCDE1234F, Aadhaar: 2345 6789 0123) and Amit Sharma.
  1. Deposit: Non-refundable deposit of 1,000,000. In case of early exit, entire deposit shall be forfeited.
  2. Inspection: Landlord may enter the premises at any hour of the day or night without prior notice.
  3. Rent: Landlord reserves the right to increase rent by up to 25% at any time without prior consent.
  4. Non-Compete: Employee shall not work for or engage in any business for 24 months post termination.
  5. Arbitration: All disputes waives right to court trial.`;

  const startTime = performance.now();
  for (let i = 0; i < 50; i++) {
    maskPII(longText);
    scanDocumentRisks(longText);
  }
  const endTime = performance.now();
  const totalDurationMs = endTime - startTime;

  assert.ok(totalDurationMs < 100, `50 document scans completed in ${totalDurationMs.toFixed(2)}ms (sub-2ms average per scan)`);
});
