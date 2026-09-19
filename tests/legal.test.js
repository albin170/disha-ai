// ============================================================
//  Setu AI Legal — Core Features Test Suite (legal.test.js)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  SAMPLE_CONTRACTS,
  scanDocumentRisks,
  compareContracts,
  generateLawyerBrief,
  answerDocumentQuestion
} = require('../js/legal.js');

test('Risk & Red Flag Scanner — High Risk Contract Identification', (t) => {
  const standardRentScan = scanDocumentRisks(SAMPLE_CONTRACTS.rent_standard);
  const riskyRentScan = scanDocumentRisks(SAMPLE_CONTRACTS.rent_risky);

  assert.ok(standardRentScan.score > riskyRentScan.score, 'Standard rent agreement should have higher safety score');
  assert.ok(riskyRentScan.flags.length >= 3, 'Risky contract should trigger multiple red flags');
  
  const flagNames = riskyRentScan.flags.map(f => f.name);
  assert.ok(flagNames.includes('Unilateral Modification Right'), 'Detects unilateral rent increase');
  assert.ok(flagNames.includes('Auto-Renewal & Penalty Lock-In'), 'Detects auto-renewal lock-in');
  assert.ok(flagNames.includes('Non-Refundable Deposit / Forfeiture'), 'Detects non-refundable deposit');
});

test('Contract Comparison Engine — Side-by-Side Diff & Risk Shift', (t) => {
  const comparison = compareContracts(SAMPLE_CONTRACTS.rent_standard, SAMPLE_CONTRACTS.rent_risky);

  assert.ok(comparison.keyDiffs.length >= 5, 'Should compare key contract categories');
  assert.ok(comparison.scanA.score > comparison.scanB.score, 'Doc A (Standard) should be safer than Doc B (Risky)');
  assert.ok(comparison.riskComparison.includes('Document B contains significantly higher risks'), 'Accurately highlights risk shift');
});

test('Lawyer Consultation Brief Generator — Structured Output & Checklist', (t) => {
  const brief = generateLawyerBrief(SAMPLE_CONTRACTS.employment_nda, 'Employment & NDA', 'english');

  assert.strictEqual(brief.docType, 'Employment & NDA');
  assert.ok(brief.redFlags.length > 0, 'Includes identified red flags');
  assert.strictEqual(brief.questionsForLawyer.length, 5, 'Generates 5 tailored questions for legal counsel');
  assert.ok(brief.actionChecklist.length >= 3, 'Generates actionable checklist');
});

test('Document Q&A Assistant — Clause Citation and Grounding', (t) => {
  const answer = answerDocumentQuestion('What is the rent penalty for late payment?', SAMPLE_CONTRACTS.rent_standard, 'english');

  assert.ok(answer.includes('₹500 per week'), 'Grounds answer in contract text');
  assert.ok(answer.includes('Answer grounded in your document'), 'Includes grounding header');
});
