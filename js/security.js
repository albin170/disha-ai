// ============================================================
//  Disha AI — Legal Security, Safety & Privacy Engine (security.js)
// ============================================================

(function (global) {
  'use strict';

  const DishaAI = global.DishaAI || {};
  global.DishaAI = DishaAI;

  class CacheEngine {
    constructor(maxSize = 200, ttlMs = 300000) {
      this.maxSize = maxSize;
      this.ttlMs = ttlMs;
      this.cache = new Map();
    }

    get(key) {
      if (!this.cache.has(key)) return null;
      const item = this.cache.get(key);
      if (Date.now() - item.timestamp > this.ttlMs) {
        this.cache.delete(key);
        return null;
      }
      this.cache.delete(key);
      this.cache.set(key, item);
      return item.value;
    }

    set(key, value) {
      if (this.cache.has(key)) this.cache.delete(key);
      else if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      this.cache.set(key, { value, timestamp: Date.now() });
    }

    clear() {
      this.cache.clear();
    }
  }

  const securityCache = new CacheEngine();

  class TokenBucketRateLimiter {
    constructor(maxTokens = 20, refillRatePerSec = 2) {
      this.maxTokens = maxTokens;
      this.tokens = maxTokens;
      this.refillRatePerSec = refillRatePerSec;
      this.lastRefill = Date.now();
    }

    allowRequest() {
      const now = Date.now();
      const elapsed = (now - this.lastRefill) / 1000;
      this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRatePerSec);
      this.lastRefill = now;

      if (this.tokens >= 1) {
        this.tokens -= 1;
        return true;
      }
      return false;
    }
  }

  const globalRateLimiter = new TokenBucketRateLimiter(20, 2);

  function validateCardLuhn(numberStr) {
    const clean = String(numberStr).replace(/[\s-]/g, '');
    if (!/^\d{13,19}$/.test(clean)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  const PATTERNS = {
    card: /\b(?:\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}|\d{13,19})\b/g,
    pan: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/gi,
    aadhaar: /\b[2-9]{1}[0-9]{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b/g,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    phone: /(?:\+91[\s-]?)?(?:1800[\s-]?[0-9]{3,4}[-\s]?[0-9]{4}|\b[6-9][0-9]{9}\b|\b1800[0-9]{6,7}\b)/g,
    bankAcc: /(?:account|acc|a\/c|acct)[\s.#:]*([0-9]{9,18})\b/gi,
    ifsc: /\b[A-Z]{4}0[A-Z0-9]{6}\b/gi,
    passport: /\b[A-PR-WYa-pr-wy][0-9]{7}\b/g,
    drivingLicense: /\b[A-Z]{2}[-\s]?[0-9]{2}[-\s]?[0-9]{11}\b/gi,
    voterId: /\b[A-Z]{3}[0-9]{7}\b/gi,
    upiId: /\b[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}\b/g
  };

  function maskPII(text) {
    if (!text || typeof text !== 'string') return { sanitized: '', maskedCount: 0, details: [] };

    const cached = securityCache.get(`pii_${text}`);
    if (cached) return cached;

    let sanitized = text;
    let maskedCount = 0;
    const details = [];

    // 1. Credit / Debit Cards
    sanitized = sanitized.replace(PATTERNS.card, (match) => {
      const cleanNum = match.replace(/[\s-]/g, '');
      if (cleanNum.length >= 13 && cleanNum.length <= 19) {
        maskedCount++;
        if (!details.includes('Card Number')) details.push('Card Number');
        return '[CARD_REDACTED]';
      }
      return match;
    });

    // 2. PAN Card
    sanitized = sanitized.replace(PATTERNS.pan, () => {
      maskedCount++;
      if (!details.includes('PAN Card')) details.push('PAN Card');
      return '[PAN_REDACTED]';
    });

    // 3. Aadhaar Number
    sanitized = sanitized.replace(PATTERNS.aadhaar, () => {
      maskedCount++;
      if (!details.includes('Aadhaar Number')) details.push('Aadhaar Number');
      return '[AADHAAR_REDACTED]';
    });

    // 4. IFSC Code
    sanitized = sanitized.replace(PATTERNS.ifsc, () => {
      maskedCount++;
      if (!details.includes('IFSC Code')) details.push('IFSC Code');
      return '[IFSC_REDACTED]';
    });

    // 5. Passport Number
    sanitized = sanitized.replace(PATTERNS.passport, () => {
      maskedCount++;
      if (!details.includes('Passport Number')) details.push('Passport Number');
      return '[PASSPORT_REDACTED]';
    });

    // 6. Driving License
    sanitized = sanitized.replace(PATTERNS.drivingLicense, () => {
      maskedCount++;
      if (!details.includes('Driving License')) details.push('Driving License');
      return '[DL_REDACTED]';
    });

    // 7. Voter ID
    sanitized = sanitized.replace(PATTERNS.voterId, () => {
      maskedCount++;
      if (!details.includes('Voter ID')) details.push('Voter ID');
      return '[VOTER_ID_REDACTED]';
    });

    // 8. Email Addresses
    sanitized = sanitized.replace(PATTERNS.email, () => {
      maskedCount++;
      if (!details.includes('Email Address')) details.push('Email Address');
      return '[EMAIL_REDACTED]';
    });

    // 9. Phone Numbers
    sanitized = sanitized.replace(PATTERNS.phone, () => {
      maskedCount++;
      if (!details.includes('Phone Number')) details.push('Phone Number');
      return '[PHONE_REDACTED]';
    });

    // 10. Bank Account Numbers
    sanitized = sanitized.replace(PATTERNS.bankAcc, (match, p1) => {
      maskedCount++;
      if (!details.includes('Bank Account Number')) details.push('Bank Account Number');
      return match.replace(p1, '[ACCOUNT_REDACTED]');
    });

    // 11. UPI ID
    const upiSuffixes = /@(okaxis|icici|okicici|ybl|paytm|upi|sbi|oksbi|okhdfcbank|axl|ibl|barodampay|postbank|gpay)/i;
    sanitized = sanitized.replace(PATTERNS.upiId, (match) => {
      if (match.includes('[EMAIL_REDACTED]')) return match;
      if (upiSuffixes.test(match)) {
        maskedCount++;
        if (!details.includes('UPI ID')) details.push('UPI ID');
        return '[UPI_REDACTED]';
      }
      return match;
    });

    const result = { sanitized, maskedCount, details };
    securityCache.set(`pii_${text}`, result);
    return result;
  }

  function sanitizeInput(input) {
    if (!input || typeof input !== 'string') return { cleanText: '', containsInjection: false };

    const cached = securityCache.get(`san_${input}`);
    if (cached) return cached;

    let clean = input;

    clean = clean.replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '[SCRIPT_REMOVED]');
    clean = clean.replace(/<iframe\b[^<]*>([\s\S]*?)<\/iframe>/gi, '');
    clean = clean.replace(/<style\b[^<]*>([\s\S]*?)<\/style>/gi, '');

    const injectionPatterns = [
      /ignore\s+(?:all\s+)?previous\s+instructions/gi,
      /system\s*:\s*you\s+are\s+now/gi,
      /override\s+(?:the\s+)?prompt/gi,
      /act\s+as\s+(?:an?\s+)?unrestricted/gi,
      /disregard\s+(?:all\s+)?prior\s+guidelines/gi,
      /\[system\s+instruction\]/gi,
      /<\|im_start\|>/gi,
      /\[INST\]/gi
    ];

    let containsInjection = false;
    injectionPatterns.forEach((pattern) => {
      if (pattern.test(clean)) {
        containsInjection = true;
        clean = clean.replace(pattern, '[SECURITY_BLOCKED_PROMPT_INJECTION]');
      }
    });

    const result = { cleanText: clean, containsInjection };
    securityCache.set(`san_${input}`, result);
    return result;
  }

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

  DishaAI.Security = {
    CacheEngine,
    TokenBucketRateLimiter,
    globalRateLimiter,
    validateCardLuhn,
    maskPII,
    sanitizeInput,
    getLegalDisclaimer
  };

  global.maskPII = maskPII;
  global.sanitizeInput = sanitizeInput;
  global.getLegalDisclaimer = getLegalDisclaimer;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      CacheEngine,
      TokenBucketRateLimiter,
      globalRateLimiter,
      validateCardLuhn,
      maskPII,
      sanitizeInput,
      getLegalDisclaimer
    };
  }
})(typeof window !== 'undefined' ? window : global);
