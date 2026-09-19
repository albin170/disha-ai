// ============================================================
//  Disha AI — Interview Prep Engine (interview.js)
// ============================================================

(function (global) {
  'use strict';

  const DishaAI = global.DishaAI || {};
  global.DishaAI = DishaAI;

  /* ---- Question Bank ---- */
  const QUESTIONS = {
    hr: {
      easy: [
        { q: "Tell me about yourself.", tip: "Structure: Present → Past → Future. Keep it 90 seconds. Mention your hometown briefly — it builds rapport in Indian interviews.", hindi: "अपने बारे में बताइए।" },
        { q: "Why do you want to work here?", tip: "Research the company. Mention 1-2 specific things — their product, mission, or growth story.", hindi: "आप यहाँ काम क्यों करना चाहते हैं?" },
        { q: "What are your hobbies and interests?", tip: "Pick hobbies that show a useful trait — reading (curious), cricket (team player), cooking (patience). Avoid purely passive hobbies.", hindi: "आपके शौक और रुचियाँ क्या हैं?" },
        { q: "Where do you see yourself in 5 years?", tip: "Align your growth with the company. Show ambition balanced with loyalty — interviewers want commitment.", hindi: "5 साल बाद आप खुद को कहाँ देखते हैं?" },
        { q: "Why are you leaving your current job?", tip: "Never speak negatively about your current employer. Focus on growth, learning, or new challenges.", hindi: "आप अपनी वर्तमान नौकरी क्यों छोड़ रहे हैं?" },
      ],
      medium: [
        { q: "Tell me about a time you handled a difficult coworker.", tip: "Use the STAR method: Situation → Task → Action → Result. Show empathy and communication skills.", hindi: "एक ऐसे समय के बारे में बताइए जब आपने किसी मुश्किल सहकर्मी के साथ काम किया।" },
        { q: "What is your biggest weakness?", tip: "Pick a real weakness you've actively improved. Show self-awareness, not a fake strength disguised as weakness.", hindi: "आपकी सबसे बड़ी कमजोरी क्या है?" },
        { q: "Describe a time you failed and what you learned.", tip: "Be honest. Interviewers respect self-awareness. Focus 30% on the failure, 70% on what you learned.", hindi: "एक ऐसे समय के बारे में बताइए जब आप असफल हुए और आपने क्या सीखा।" },
        { q: "How do you handle pressure and tight deadlines?", tip: "Give a real example. Mention time-boxing, prioritisation, and how you communicated with your team.", hindi: "आप दबाव और tight deadlines को कैसे handle करते हैं?" },
      ],
      hard: [
        { q: "Why should we hire you over other candidates?", tip: "This is your 30-second pitch. Connect your top 3 skills directly to the job. Be specific, not generic.", hindi: "हम आपको दूसरे उम्मीदवारों की जगह क्यों चुनें?" },
        { q: "Describe a time you led a team through a crisis.", tip: "Show leadership, calm under pressure, and decisive action. Quantify the result if possible.", hindi: "एक ऐसे समय के बारे में बताइए जब आपने किसी संकट में टीम का नेतृत्व किया।" },
        { q: "What would your biggest critic say about you?", tip: "This is a subtle weakness question. Be honest but frame it as an area of ongoing growth.", hindi: "आपके सबसे बड़े आलोचक आपके बारे में क्या कहेंगे?" },
      ]
    },
    it: {
      easy: [
        { q: "What is the difference between a process and a thread?", tip: "A process has its own memory space; threads share memory within a process. Keep it simple and clear.", hindi: "Process और thread में क्या अंतर है?" },
        { q: "Explain what REST API means.", tip: "Focus on: Stateless, HTTP methods (GET/POST/PUT/DELETE), JSON/XML responses. Give a real example.", hindi: "REST API क्या होता है?" },
        { q: "What is version control and why is it important?", tip: "Mention Git specifically. Explain: tracking changes, collaboration, rollback. Shows practical knowledge.", hindi: "Version control क्या है और यह क्यों ज़रूरी है?" },
        { q: "What is Object-Oriented Programming? Name its four pillars.", tip: "Encapsulation, Inheritance, Polymorphism, Abstraction. Give a real-world analogy for one.", hindi: "Object-Oriented Programming क्या है? इसके चार स्तम्भ बताइए।" },
      ],
      medium: [
        { q: "What is the difference between SQL and NoSQL databases? When would you use each?", tip: "SQL: structured, ACID. NoSQL: flexible, scalable. Use NoSQL for unstructured data at scale (like MongoDB).", hindi: "SQL और NoSQL databases में क्या अंतर है?" },
        { q: "Explain how HTTPS works.", tip: "TLS handshake → server certificate → symmetric key exchange → encrypted communication. Keep it layered.", hindi: "HTTPS कैसे काम करता है?" },
        { q: "What is a deadlock and how do you prevent it?", tip: "Two threads waiting for each other's resource. Prevention: lock ordering, timeout, deadlock detection.", hindi: "Deadlock क्या है और इसे कैसे रोकें?" },
      ],
      hard: [
        { q: "Design a URL shortener like bit.ly. Walk me through your architecture.", tip: "Cover: hash function for short codes, DB schema, redirect logic, caching with Redis, scalability.", hindi: "bit.ly जैसा URL shortener कैसे design करेंगे?" },
        { q: "How would you debug a production issue where users report the app is slow?", tip: "Structured approach: logs → monitoring (APM) → profiling → DB queries → network → caching. Show systematic thinking.", hindi: "Production में app slow होने की problem को कैसे debug करेंगे?" },
      ]
    },
    govt: {
      easy: [
        { q: "Why do you want to join government service?", tip: "Be sincere. Mention job security, pension, public impact, and service to the nation. Avoid only mentioning salary.", hindi: "आप सरकारी सेवा में क्यों आना चाहते हैं?" },
        { q: "What do you know about our department/ministry?", tip: "Research the specific department — recent schemes launched, their mandate, current minister, key achievements.", hindi: "आप हमारे विभाग/मंत्रालय के बारे में क्या जानते हैं?" },
        { q: "What qualities make a good civil servant?", tip: "Integrity, impartiality, empathy, accountability, and communication. Give examples of each in practice.", hindi: "एक अच्छे सिविल सेवक में कौन से गुण होने चाहिए?" },
      ],
      medium: [
        { q: "How would you handle a situation where a senior officer asks you to do something unethical?", tip: "Show knowledge of conduct rules. Mention: seek written orders, escalate properly, whistleblower protections.", hindi: "यदि कोई वरिष्ठ अधिकारी आपसे कुछ अनैतिक करने को कहे तो आप क्या करेंगे?" },
        { q: "What are the current major challenges facing India?", tip: "Pick 2-3: unemployment, climate change, digital divide, healthcare access. Show awareness and suggest policy ideas.", hindi: "वर्तमान में भारत के सामने प्रमुख चुनौतियाँ क्या हैं?" },
      ],
      hard: [
        { q: "If you were posted to a remote district with poor infrastructure, how would you improve service delivery?", tip: "Show practical thinking: technology (CSC, DigiLocker), community mobilisation, priority mapping, inter-department coordination.", hindi: "यदि आपको खराब बुनियादी ढांचे वाले दूरस्थ जिले में तैनात किया जाए तो आप सेवा वितरण कैसे सुधारेंगे?" },
      ]
    }
  };

  /* ---- Feedback Templates ---- */
  const FEEDBACK_GOOD = [
    "You clearly structured your answer and stayed relevant to the question.",
    "Good use of a personal example — it made your answer memorable.",
    "Your answer showed self-awareness and honesty, which interviewers value highly.",
    "You demonstrated knowledge of the role and aligned your strengths well."
  ];

  const FEEDBACK_IMPROVE = [
    "Add a specific number or metric to make your answer more credible (e.g., 'I increased sales by 30%').",
    "Try the STAR method: Situation → Task → Action → Result for stronger storytelling.",
    "Your answer could benefit from a stronger closing line that ties back to why you're the right fit."
  ];

  const STRONGER_VERSIONS = [
    "\"In my last role/project, I [specific action] which resulted in [measurable outcome]. This taught me [key lesson], which I'd bring directly to this role.\"",
    "\"I've always been drawn to [field/role] because [genuine reason]. One experience that solidified this was when [story], and the outcome was [result].\""
  ];

  function buildFeedback(text) {
    if (!text || typeof text !== 'string') {
      return { contentScore: 0, clarityScore: 0, confidenceScore: 0, structureScore: 0, overall: 0 };
    }
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const lengthScore = Math.min(100, Math.round(30 + (words / 120) * 50));
    const contentScore = Math.min(100, lengthScore + 10);
    const clarityScore = Math.min(100, Math.round(65 + Math.min(25, words / 4)));
    const confidenceScore = Math.min(100, Math.round(60 + Math.min(30, words / 3)));
    const structureScore = Math.min(100, Math.round(60 + Math.min(25, words / 5)));
    const overall = Math.round((contentScore + clarityScore + confidenceScore + structureScore) / 4);

    return { contentScore, clarityScore, confidenceScore, structureScore, overall };
  }

  // Attach to Namespace
  DishaAI.Interview = {
    QUESTIONS,
    FEEDBACK_GOOD,
    FEEDBACK_IMPROVE,
    STRONGER_VERSIONS,
    buildFeedback
  };

  global.QUESTIONS = QUESTIONS;
  global.buildFeedback = buildFeedback;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      QUESTIONS,
      FEEDBACK_GOOD,
      FEEDBACK_IMPROVE,
      STRONGER_VERSIONS,
      buildFeedback
    };
  }
})(typeof window !== 'undefined' ? window : global);
