// ============================================================
//  Disha AI — Core Utility & Helper Library (utils.js)
// ============================================================

(function (global) {
  'use strict';

  // Initialize DishaAI global namespace
  const DishaAI = global.DishaAI || {};
  global.DishaAI = DishaAI;

  /**
   * Custom Error Classes
   */
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
    }
  }

  class SecurityError extends Error {
    constructor(message) {
      super(message);
      this.name = 'SecurityError';
    }
  }

  class LegalEngineError extends Error {
    constructor(message) {
      super(message);
      this.name = 'LegalEngineError';
    }
  }

  /**
   * HTML Sanitization & Escaping
   */
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sanitizeDOM(html) {
    if (typeof html !== 'string') return '';
    return html
      .replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '')
      .replace(/<iframe\b[^<]*>([\s\S]*?)<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '')
      .replace(/javascript:/gi, 'blocked:');
  }

  /**
   * Performance Utilities: Debounce & Throttle
   */
  function debounce(fn, delay = 250) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function throttle(fn, limit = 100) {
    let inThrottle = false;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Screen Reader Announcement Helper (Accessibility)
   */
  function announce(message, priority = 'polite') {
    if (typeof document === 'undefined') return;
    let liveRegion = document.getElementById('srLiveRegion');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'srLiveRegion';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveRegion);
    }
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 50);
  }

  /**
   * Safe DOM Element Creation
   */
  function createElement(tag, attributes = {}, children = []) {
    if (typeof document === 'undefined') return null;
    const el = document.createElement(tag);
    Object.keys(attributes).forEach((attr) => {
      if (attr.startsWith('on') && typeof attributes[attr] === 'function') {
        el.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
      } else if (attr === 'className') {
        el.className = attributes[attr];
      } else if (attr === 'textContent') {
        el.textContent = attributes[attr];
      } else if (attr === 'innerHTML') {
        el.innerHTML = sanitizeDOM(attributes[attr]);
      } else {
        el.setAttribute(attr, attributes[attr]);
      }
    });

    children.forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    });

    return el;
  }

  // Attach Utils to Namespace
  DishaAI.Utils = {
    ValidationError,
    SecurityError,
    LegalEngineError,
    escapeHTML,
    sanitizeDOM,
    debounce,
    throttle,
    announce,
    createElement
  };

  // Node CommonJS Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DishaAI.Utils;
  }
})(typeof window !== 'undefined' ? window : global);
