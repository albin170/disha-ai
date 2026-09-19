// ============================================================
//  Disha AI — AI Interview Prep Test Suite (interview.test.js)
// ============================================================

const test = require('node:test');
const assert = require('node:assert/strict');
const { QUESTIONS, buildFeedback } = require('../js/interview.js');

test('Interview Questions — Structure and Availability', (t) => {
  assert.ok(QUESTIONS.hr, 'HR track available');
  assert.ok(QUESTIONS.it, 'IT track available');
  assert.ok(QUESTIONS.govt, 'Government track available');

  assert.ok(QUESTIONS.hr.easy.length > 0, 'HR easy questions populated');
  assert.ok(QUESTIONS.hr.easy[0].q, 'Question string present');
  assert.ok(QUESTIONS.hr.easy[0].tip, 'Tip string present');
});

test('Interview Evaluation Engine — Answer Feedback Scoring', (t) => {
  const shortAnswer = "I am a good candidate.";
  const detailedAnswer = "In my previous internship at Apex Technologies, I led a team of 4 developers to build an automated invoice processing portal using Node.js. We reduced processing time by 45% and handled 10,000 requests per month.";

  const scoreShort = buildFeedback(shortAnswer);
  const scoreDetailed = buildFeedback(detailedAnswer);

  assert.ok(scoreDetailed.overall > scoreShort.overall, 'Detailed answer receives higher overall score');
  assert.ok(scoreDetailed.contentScore > scoreShort.contentScore, 'Content score reflects word count and detail');
  assert.ok(scoreDetailed.structureScore >= 60, 'Structure score is well balanced');
});
