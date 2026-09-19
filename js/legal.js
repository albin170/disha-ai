// ============================================================
//  Disha AI — GenAI Legal Assistance & Analysis Engine (legal.js)
// ============================================================

(function (global) {
  'use strict';

  const DishaAI = global.DishaAI || {};
  global.DishaAI = DishaAI;

  /* ---- Predefined Sample Legal Documents for Testing & Quick Loading ---- */
  const SAMPLE_CONTRACTS = {
    rent_standard: `RENTAL AGREEMENT (Standard Residential)
This Agreement is made on 1st March 2026 between Landlord (Rajesh Kumar) and Tenant (Amit Sharma).
1. Premises: Flat 302, Green Valley Apartments, New Delhi.
2. Term: 11 months commencing from March 1, 2026.
3. Rent: Tenant agrees to pay a monthly rent of ₹25,000 on or before the 5th of each month. Late payments attract a penalty of ₹500 per week.
4. Security Deposit: Tenant pays ₹50,000 as refundable security deposit.
5. Maintenance: Minor repairs up to ₹1,000 borne by tenant; major repairs by landlord.
6. Notice Period: Either party may terminate with 1 month prior written notice.
7. Subletting: Tenant shall not sublet or assign the premises without landlord's written consent.`,

    rent_risky: `RENTAL AGREEMENT (High Risk Terms)
This Agreement is made on 1st March 2026 between Landlord (Apex Properties) and Tenant (Amit Sharma).
1. Premises: Flat 302, Green Valley Apartments, New Delhi.
2. Term: 11 months, automatically renewing for 3 years unless tenant gives 90 days advance written notice before renewal date.
3. Rent: Rent is ₹25,000/month. Landlord reserves the right to increase rent by up to 25% at any time without prior consent.
4. Security Deposit: Non-refundable deposit of ₹1,000,000. In case of early exit before 11 months, the entire deposit shall be forfeited.
5. Lock-in Period: 11-month lock-in period. Tenant paying early exit must pay rent for all remaining months.
6. Inspection: Landlord may enter the premises at any hour of the day or night without prior notice.
7. Legal Disputes: All disputes are subject to binding individual arbitration in Mumbai; tenant waives right to approach Rent Control Court or court trial.`,

    employment_nda: `EMPLOYMENT & NON-DISCLOSURE AGREEMENT
1. Scope of Work: Employee agrees to perform duties as Senior Software Engineer.
2. Intellectual Property: All inventions, code, designs created during employment or within 2 years after leaving belong exclusively to Company.
3. Non-Compete: Employee shall not work for, consult with, or start any business in the technology sector anywhere in India for 24 months post-employment.
4. Termination: Company may terminate employment immediately without notice or severance pay for any reason. Employee must give 90 days notice.
5. Confidentiality: Confidential information must not be disclosed indefinitely. Breach results in liquidated damages of ₹10,000,000.`,

    freelance_contract: `FREELANCER SERVICE AGREEMENT
1. Deliverables: Designer shall deliver mobile UI wireframes by April 15, 2026.
2. Compensation: Total fee ₹80,000. 50% upfront, 50% upon final delivery.
3. Revisions: Includes up to 3 rounds of design revisions. Additional revisions billed at ₹2,000/hour.
4. Ownership: Ownership of final assets transfers to Client upon receipt of 100% payment.
5. Late Payment: Client agrees to pay interest of 1.5% per month on overdue invoices.`
  };

  /* ---- Common Legal Jargon Dictionary ---- */
  const LEGAL_JARGON = {
    'indemnify': 'Agreements to pay for losses, damages, or legal costs incurred by another party.',
    'indemnity': 'A promise to pay for damages or financial losses caused to the other party.',
    'force majeure': 'Unforeseeable events (like natural disasters or wars) that free parties from contractual obligations.',
    'sublet': 'Renting out property to a third party when you are already a tenant.',
    'severability': 'A clause stating that if one part of the contract is illegal, the rest of the contract remains valid.',
    'jurisdiction': 'The specific court or geographic location that has legal authority to settle disputes.',
    'arbitration': 'Solving disputes outside of court with an independent arbitrator whose decision is binding.',
    'liquidated damages': 'A predetermined amount of money agreed upon in advance that must be paid if a contract is breached.',
    'lock-in period': 'A fixed time frame during which neither party can terminate the contract without severe financial penalties.',
    'non-compete': 'A restriction preventing an employee/contractor from working with competitors or starting a competing business.',
    'non-disclosure': 'A legal commitment to keep proprietary or business information confidential.',
    'forfeiture': 'Loss of money, deposit, or property as a penalty for failing to meet contractual terms.'
  };

  /* ---- Risk & Red Flag Scanner Engine ---- */
  const RED_FLAG_RULES = [
    {
      id: 'unilateral_change',
      name: 'Unilateral Modification Right',
      severity: 'high',
      regex: /(?:reserves?\s+the\s+right\s+to\s+(?:change|modify|increase|alter)|at\s+any\s+time\s+without\s+prior\s+(?:notice|consent))/i,
      desc: 'The issuer allows themselves to change terms, prices, or conditions at any time without asking for your approval.',
      advice: 'Request a requirement for written mutual consent or at least 30-60 days advance notice with right to terminate without penalty.'
    },
    {
      id: 'auto_renewal_trap',
      name: 'Auto-Renewal & Penalty Lock-In',
      severity: 'high',
      regex: /(?:automatically\s+renew(?:ing|s)?|auto-renew|unless\s+notice\s+is\s+given\s+\d+\s+days\s+before)/i,
      desc: 'Contract renews automatically unless you provide notice far in advance, risking unwanted fees or long lock-ins.',
      advice: 'Set calendar reminders well before the cancellation deadline, or request an explicit opt-in renewal clause.'
    },
    {
      id: 'overbroad_noncompete',
      name: 'Broad Non-Compete Clause',
      severity: 'critical',
      regex: /(?:shall\s+not\s+work\s+for|not\s+engage\s+in\s+any\s+business|non-compete|for\s+\d+\s+months\s+post)/i,
      desc: 'Restricts your ability to work, freelance, or start a business in your field after leaving.',
      advice: 'In India (Sec 27 Indian Contract Act), post-employment non-compete covenants are generally void; negotiate limiting its duration, geographic scope, or specific direct competitors.'
    },
    {
      id: 'deposit_forfeiture',
      name: 'Non-Refundable Deposit / Forfeiture',
      severity: 'high',
      regex: /(?:non-refundable|entire\s+deposit\s+shall\s+be\s+forfeited|forfeit\s+all\s+sums)/i,
      desc: 'You risk losing your security deposit or payments even if the exit is reasonable or justified.',
      advice: 'Ensure deposits are refundable minus itemized documented damage beyond normal wear and tear.'
    },
    {
      id: 'no_notice_entry',
      name: 'Entry Without Notice',
      severity: 'medium',
      regex: /(?:enter\s+the\s+premises\s+at\s+any\s+hour|without\s+prior\s+notice|at\s+all\s+times\s+without\s+permission)/i,
      desc: 'Allows the landlord or authority to enter your space without mandatory prior notice, violating your privacy.',
      advice: 'Insist on a mandatory 24-48 hours advance written notice for inspections during reasonable daytime hours.'
    },
    {
      id: 'arbitration_waiver',
      name: 'Binding Arbitration & Court Waiver',
      severity: 'medium',
      regex: /(?:binding\s+(?:individual\s+)?arbitration|waives?\s+(?:the\s+)?right\s+to\s+a\s+(?:court|jury|trial)|class\s+action\s+waiver)/i,
      desc: 'Forces you into private arbitration and waives your right to approach regular courts or joint legal actions.',
      advice: 'Check the location of arbitration; out-of-city arbitration can make pursuing legitimate grievances cost-prohibitive.'
    },
    {
      id: 'immediate_termination',
      name: 'Asymmetric / Immediate Termination',
      severity: 'high',
      regex: /(?:terminate\s+(?:immediately|without\s+notice)|without\s+severance|at\s+will\s+without\s+cause)/i,
      desc: 'One party can end the agreement instantly while you are bound by long notice periods.',
      advice: 'Negotiate equal notice periods (e.g. 30 days) for both parties.'
    },
    {
      id: 'unlimited_liability',
      name: 'Harsh Indemnity / Unlimited Liability',
      severity: 'critical',
      regex: /(?:indemnify\s+and\s+hold\s+harmless|liquidated\s+damages\s+of\s+₹|unlimited\s+liability)/i,
      desc: 'Makes you financially responsible for massive damages, legal bills, or third-party claims.',
      advice: 'Ask to cap liability at the total fees paid/received under the contract, and exclude indirect or consequential damages.'
    }
  ];

  /**
   * Perform a full Red Flag & Risk Scan on a document
   */
  function scanDocumentRisks(text) {
    if (!text || typeof text !== 'string') {
      return { score: 100, level: 'Low Risk', color: 'var(--emerald)', flagCount: 0, flags: [] };
    }

    const flags = [];
    let scoreDeduction = 0;

    RED_FLAG_RULES.forEach((rule) => {
      if (rule.regex.test(text)) {
        let weight = 15;
        if (rule.severity === 'critical') weight = 30;
        if (rule.severity === 'high') weight = 20;
        if (rule.severity === 'medium') weight = 10;

        scoreDeduction += weight;
        flags.push({
          id: rule.id,
          name: rule.name,
          severity: rule.severity,
          desc: rule.desc,
          advice: rule.advice
        });
      }
    });

    const baseScore = Math.max(0, 100 - scoreDeduction);
    let level = 'Low Risk';
    let color = 'var(--emerald)';

    if (baseScore < 50) {
      level = 'Critical Red Flags';
      color = 'var(--rose)';
    } else if (baseScore < 75) {
      level = 'High Risk';
      color = 'var(--saffron)';
    } else if (baseScore < 90) {
      level = 'Medium Risk';
      color = 'var(--indigo-light)';
    }

    return {
      score: baseScore,
      level,
      color,
      flagCount: flags.length,
      flags
    };
  }

  /**
   * Compare Two Contracts Side-by-Side (Diff & Risk Shift Engine)
   */
  function compareContracts(docA, docB) {
    if (!docA || !docB) {
      return { error: 'Please provide text for both Document A and Document B to compare.' };
    }

    const scanA = scanDocumentRisks(docA);
    const scanB = scanDocumentRisks(docB);

    const extractTerm = (text, keywordRegex) => {
      const lines = text.split(/\n+/);
      for (const l of lines) {
        if (keywordRegex.test(l)) return l.trim();
      }
      return null;
    };

    const categories = [
      { key: 'Rent / Price', regex: /rent|fee|compensation|price|amount/i },
      { key: 'Duration / Term', regex: /term|duration|months|period|commencing/i },
      { key: 'Security Deposit', regex: /deposit|refundable|security/i },
      { key: 'Notice Period', regex: /notice|terminate|termination/i },
      { key: 'Lock-in & Renewal', regex: /lock-in|renew|renewal|auto-renew/i },
      { key: 'Disputes & Entry', regex: /dispute|arbitration|jurisdiction|enter|inspection/i }
    ];

    const keyDiffs = [];
    categories.forEach((cat) => {
      const valA = extractTerm(docA, cat.regex) || 'Not specifically stated in Doc A';
      const valB = extractTerm(docB, cat.regex) || 'Not specifically stated in Doc B';

      const isDifferent = valA.toLowerCase() !== valB.toLowerCase();
      keyDiffs.push({
        category: cat.key,
        docA: valA,
        docB: valB,
        isDifferent
      });
    });

    let riskComparison = 'Both contracts have a similar risk profile.';
    if (scanA.score > scanB.score + 10) {
      riskComparison = 'Document B contains significantly higher risks and harsher terms than Document A.';
    } else if (scanB.score > scanA.score + 10) {
      riskComparison = 'Document A contains higher risks than Document B. Document B is more favorable.';
    }

    return {
      scanA,
      scanB,
      riskComparison,
      keyDiffs
    };
  }

  /**
   * Generate Structured Lawyer Brief & Action Checklist
   */
  function generateLawyerBrief(docText, docType = 'Contract', lang = 'english') {
    const riskScan = scanDocumentRisks(docText);
    const isHindi = lang === 'hindi';

    const foundJargon = [];
    Object.keys(LEGAL_JARGON).forEach((term) => {
      if (new RegExp(`\\b${term}\\b`, 'i').test(docText)) {
        foundJargon.push({ term, definition: LEGAL_JARGON[term] });
      }
    });

    const brief = {
      title: isHindi ? '📋 अधिवक्ता परामर्श ब्रीफ (Lawyer Brief)' : '📋 Legal Consultation Brief',
      date: new Date().toLocaleDateString(),
      docType,
      riskScore: `${riskScan.score}/100 (${riskScan.level})`,
      executiveSummary: isHindi
        ? `यह दस्तावेज़ ${docType} प्रकार का है। सेतु AI विश्लेषण के अनुसार, इसका जोखिम स्तर ${riskScan.level} (${riskScan.score}/100) है।`
        : `This ${docType} has been analyzed by Setu AI. Overall safety score is rated ${riskScan.score}/100 (${riskScan.level}).`,

      redFlags: riskScan.flags.map((f) => ({
        issue: f.name,
        severity: f.severity.toUpperCase(),
        detail: f.desc,
        recommendation: f.advice
      })),

      actionChecklist: isHindi
        ? [
            'हस्ताक्षर करने या सहमत होने से पहले सभी हाइलाइट किए गए लाल झंडों (Red Flags) की समीक्षा करें।',
            'यदि मकान मालिक/नियोक्ता/कंपनी का दावा मौखिक है, तो उसे लिखित रूप में जोड़ने का अनुरोध करें।',
            'महत्वपूर्ण तिथियां (जैसे नोटिस की अवधि, जमा वापसी की समय सीमा) अपने कैलेंडर में नोट करें।',
            'नीचे दिए गए 5 प्रश्नों को अपने वकील या कानूनी सहायता अधिकारी से पूछें।'
          ]
        : [
            'Review all highlighted red flags before signing or committing to any financial payments.',
            'Request written amendments for any verbal assurances given by the counterparty.',
            'Mark key notice deadlines and renewal cutoff dates on your calendar.',
            'Take this generated brief and present the 5 tailored questions to your legal professional.'
          ],

      questionsForLawyer: isHindi
        ? [
            `1. इस अनुबंध में ${riskScan.flags.length > 0 ? riskScan.flags[0].name : 'खंडों'} की वैधता और मेरे अधिकारों पर इसका क्या प्रभाव पड़ेगा?`,
            '2. क्या कोई छिपी हुई देनदारियां (hidden liabilities) हैं जो भविष्य में मुझ पर वित्तीय बोझ डाल सकती हैं?',
            '3. यदि विवाद होता है, तो मध्यस्थता (Arbitration) या क्षेत्राधिकार (Jurisdiction) का क्या खर्च और प्रक्रिया होगी?',
            '4. अनुबंध में कौन सी विशिष्ट संशोधन शब्दावली (amendment clause) जोड़ी जानी चाहिए?',
            '5. क्या यह अनुबंध भारतीय अनुबंध अधिनियम (Indian Contract Act) या स्थानीय कानूनों का अनुपालन करता है?'
          ]
        : [
            `1. How does the identified '${riskScan.flags.length > 0 ? riskScan.flags[0].name : 'clause'}' impact my legal rights and enforcement options?`,
            '2. Are there any hidden liabilities or automatic financial commitments that I should negotiate out?',
            '3. In the event of a dispute, is the dispute resolution clause fair and accessible in my jurisdiction?',
            '4. What specific revision wording should I send to the counterparty to protect my interest?',
            '5. Does this document comply fully with applicable local, rental, or employment statutes?'
          ],

      jargonGlossary: foundJargon
    };

    return brief;
  }

  /**
   * Answer Specific User Questions Grounded in Provided Legal Document
   */
  function answerDocumentQuestion(question, docText, lang = 'english') {
    if (!question || !docText) {
      return 'Please provide both the document text and your question.';
    }

    const qLower = question.toLowerCase();
    const isHindi = lang === 'hindi';

    const lines = docText.split(/\n+/);
    const relevantLines = [];

    lines.forEach((line) => {
      if (line.length > 5) {
        const words = qLower.split(/\s+/).filter((w) => w.length > 3);
        const matchCount = words.filter((w) => line.toLowerCase().includes(w)).length;
        if (matchCount >= 1) {
          relevantLines.push(line.trim());
        }
      }
    });

    if (relevantLines.length > 0) {
      const snippets = relevantLines.slice(0, 3).map((l) => `> "${l}"`).join('<br/>');
      return isHindi
        ? `<strong>दस्तावेज़ के संदर्भ से उत्तर:</strong><br/>${snippets}<br/><br/><strong>व्याख्या:</strong> आपके प्रश्न के अनुसार, दस्तावेज़ के उपर्युक्त खंड में यह उल्लेख है। अधिक स्पष्टता के लिए वकील से पुष्टि करें।`
        : `<strong>Answer grounded in your document:</strong><br/>${snippets}<br/><br/><strong>Plain Language Note:</strong> Based on the clauses cited above from your text, this directly answers your question. Always verify specific terms with a legal professional.`;
    }

    return isHindi
      ? `दस्तावेज़ में आपके प्रश्न का सीधा उत्तर नहीं मिला। कृपया अपने वकील से इस बारे में स्पष्टीकरण मांगें।`
      : `No specific clause in the provided document directly addresses this question. We recommend asking the issuing party or your legal advisor to clarify this in writing.`;
  }

  // Attach Legal Engine to Namespace
  DishaAI.Legal = {
    SAMPLE_CONTRACTS,
    LEGAL_JARGON,
    RED_FLAG_RULES,
    scanDocumentRisks,
    compareContracts,
    generateLawyerBrief,
    answerDocumentQuestion
  };

  // Browser Global Fallbacks
  global.SAMPLE_CONTRACTS = SAMPLE_CONTRACTS;
  global.LEGAL_JARGON = LEGAL_JARGON;
  global.RED_FLAG_RULES = RED_FLAG_RULES;
  global.scanDocumentRisks = scanDocumentRisks;
  global.compareContracts = compareContracts;
  global.generateLawyerBrief = generateLawyerBrief;
  global.answerDocumentQuestion = answerDocumentQuestion;

  // CommonJS Support
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      SAMPLE_CONTRACTS,
      LEGAL_JARGON,
      RED_FLAG_RULES,
      scanDocumentRisks,
      compareContracts,
      generateLawyerBrief,
      answerDocumentQuestion
    };
  }
})(typeof window !== 'undefined' ? window : global);
