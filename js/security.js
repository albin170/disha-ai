// ============================================================
//  Setu AI — Legal Security, Safety & Privacy Engine (security.js)
// ============================================================

/**
 * PII Redaction Engine
 * Detects and anonymizes sensitive Personally Identifiable Information (PII)
 * before legal document processing or transmission to AI endpoints.
 */
function maskPII(text) {
  if (!text || typeof text !== 'string') return { sanitized: '', maskedCount: 0, details: [] };

  let sanitized = text;
  let maskedCount = 0;
  const details = [];

  // 1. Credit / Debit Card Numbers (16 digits in 4 groups or continuous 13-19 digits)
  const cardRegex = /\b(?:\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}|\d{13,19})\b/g;
  sanitized = sanitized.replace(cardRegex, (match) => {
    const cleanNum = match.replace(/[\s-]/g, '');
    // verify length between 13 and 19
    if (cleanNum.length >= 13 && cleanNum.length <= 19 && /^\d+$/.test(cleanNum)) {
      // Avoid masking plain 10-digit phone or simple numbers unless 13-19 digits
      maskedCount++;
      if (!details.includes('Card Number')) details.push('Card Number');
      return '[CARD_REDACTED]';
    }
    return match;
  });

  // 2. PAN Card Number (Indian Tax ID: 5 letters, 4 digits, 1 letter)
  const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g;
  sanitized = sanitized.replace(panRegex, (match) => {
    maskedCount++;
    if (!details.includes('PAN Card')) details.push('PAN Card');
    return '[PAN_REDACTED]';
  });

  // 3. Aadhaar Card Number (12 digits, often formatted in 4-digit groups)
  const aadhaarRegex = /\b[2-9]{1}[0-9]{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b/g;
  sanitized = sanitized.replace(aadhaarRegex, (match) => {
    maskedCount++;
    if (!details.includes('Aadhaar Number')) details.push('Aadhaar Number');
    return '[AADHAAR_REDACTED]';
  });

  // 4. Email Addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  sanitized = sanitized.replace(emailRegex, (match) => {
    maskedCount++;
    if (!details.includes('Email Address')) details.push('Email Address');
    return '[EMAIL_REDACTED]';
  });

  // 5. Phone Numbers (Indian 10-digit, toll-free 1800, +91)
  const phoneRegex = /(?:\+91[\s-]?)?(?:1800[\s-]?[0-9]{3}[\s-]?[0-9]{4}|\b[6-9][0-9]{9}\b)/g;
  sanitized = sanitized.replace(phoneRegex, (match) => {
    maskedCount++;
    if (!details.includes('Phone Number')) details.push('Phone Number');
    return '[PHONE_REDACTED]';
  });

  // 6. Bank Account Numbers (9 to 18 digits with keyword context)
  const bankAccRegex = /(?:account|acc|a\/c|acct)[\s.#:]*([0-9]{9,18})\b/gi;
  sanitized = sanitized.replace(bankAccRegex, (match, p1) => {
    maskedCount++;
    if (!details.includes('Bank Account Number')) details.push('Bank Account Number');
    return match.replace(p1, '[ACCOUNT_REDACTED]');
  });

  return { sanitized, maskedCount, details };
}

/**
 * Anti-Prompt-Injection & Adversarial Threat Sanitizer
 * Neutralizes system prompt overrides, hidden instructions, and code injection attempts embedded in documents.
 */
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return '';

  let clean = input;

  // Remove potential HTML/script injection tags
  clean = clean.replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '[SCRIPT_REMOVED]');
  clean = clean.replace(/<iframe\b[^<]*>([\s\S]*?)<\/iframe>/gi, '');

  // Detect and neutralize System Prompt Injection vectors
  const injectionPatterns = [
    /ignore\s+(?:all\s+)?previous\s+instructions/gi,
    /system\s*:\s*you\s+are\s+now/gi,
    /override\s+(?:the\s+)?prompt/gi,
    /act\s+as\s+(?:an?\s+)?unrestricted/gi,
    /disregard\s+(?:all\s+)?prior\s+guidelines/gi,
    /\[system\s+instruction\]/gi
  ];

  let containsInjection = false;
  injectionPatterns.forEach(pattern => {
    if (pattern.test(clean)) {
      containsInjection = true;
      clean = clean.replace(pattern, '[SECURITY_BLOCKED_PROMPT_INJECTION]');
    }
  });

  return { cleanText: clean, containsInjection };
}

/**
 * Mandatory Legal Disclaimer Generator & Safety Verifier
 */
function getLegalDisclaimer(lang = 'english') {
  if (lang === 'hindi') {
    return {
      title: '⚠️ महत्वपूर्ण अस्वीकरण (Legal Disclaimer)',
      short: 'यह AI-जनरेटेड सहायता केवल सूचनात्मक और शैक्षणिक उद्देश्यों के लिए है। यह पेशेवर कानूनी सलाह नहीं है।',
      full: 'Setu AI कानूनी जानकारी को समझने में मदद करता है लेकिन यह कोई कानून फर्म या अधिकृत वकील नहीं है। महत्वपूर्ण या विवादित कानूनी मामलों के लिए हमेशा अपने स्थानीय जिला कानूनी सेवा प्राधिकरण (DLSA) या किसी योग्य अधिवक्ता से परामर्श करें।',
      emergencyContacts: [
        { name: 'राष्ट्रीय कानूनी सेवा प्राधिकरण (NALSA)', phone: '15100' },
        { name: 'बीमा लोकपाल (IRDAI Helpline)', phone: '155255' },
        { name: 'राष्ट्रीय उपभोक्ता हेल्पलाइन', phone: '1915' }
      ]
    };
  }

  return {
    title: '⚠️ Legal Disclaimer & Information Notice',
    short: 'This AI-generated output is for educational & informational assistance only and does not constitute formal legal advice.',
    full: 'Setu AI helps users break down, compare, and navigate legal documents in plain language, but is not a licensed attorney or law firm. No attorney-client relationship is created. For binding legal advice or court representation, please consult a qualified legal professional or local Legal Aid office.',
    emergencyContacts: [
      { name: 'National Legal Services Authority (NALSA)', phone: '15100' },
      { name: 'Insurance Ombudsman (IRDAI Helpline)', phone: '155255' },
      { name: 'National Consumer Helpline', phone: '1915' }
    ]
  };
}

// Support Node.js CommonJS exports for test suites
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    maskPII,
    sanitizeInput,
    getLegalDisclaimer
  };
}
