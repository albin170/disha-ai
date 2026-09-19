// ============================================================
//  Setu AI — Interview Prep Engine
// ============================================================

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
  },
  sales: {
    easy: [
      { q: "Why do you want a career in sales?", tip: "Show genuine motivation — not just money. Mention: love of meeting people, problem-solving, performance-driven culture.", hindi: "आप sales में करियर क्यों बनाना चाहते हैं?" },
      { q: "How do you handle rejection?", tip: "Every 'no' brings you closer to a 'yes'. Show resilience, learning from feedback, and persistence with positivity.", hindi: "आप rejection को कैसे handle करते हैं?" },
      { q: "Sell me this pen.", tip: "Identify the need first: 'Do you write often?' Then position the pen as the solution. Features follow benefits.", hindi: "मुझे यह पेन बेचिए।" },
    ],
    medium: [
      { q: "How do you prioritise your leads and manage your sales pipeline?", tip: "Mention a CRM if you use one. Explain: lead scoring, hot/warm/cold categorisation, follow-up cadence.", hindi: "आप अपने leads को कैसे prioritise करते हैं?" },
      { q: "Describe your biggest sales win and how you achieved it.", tip: "Use numbers: deal size, time taken, competition involved. Show the strategy, not just the result.", hindi: "अपनी सबसे बड़ी sales win के बारे में बताइए।" },
    ],
    hard: [
      { q: "A large client is threatening to cancel. How do you retain them?", tip: "Listen first — understand root cause. Don't discount immediately. Offer value: dedicated support, roadmap preview, executive escalation.", hindi: "एक बड़ा client cancel करने की धमकी दे रहा है। आप उसे कैसे retain करेंगे?" },
    ]
  },
  banking: {
    easy: [
      { q: "What is the difference between a savings account and a current account?", tip: "Savings: interest-bearing, for individuals, withdrawal limits. Current: no interest, for businesses, high transaction volume.", hindi: "Savings account और current account में क्या अंतर है?" },
      { q: "What is KYC and why is it important?", tip: "Know Your Customer — verifies identity to prevent fraud, money laundering. Mandated by RBI. Mention Aadhaar-based KYC.", hindi: "KYC क्या है और यह क्यों ज़रूरी है?" },
      { q: "What is the repo rate and how does it affect common people?", tip: "Repo rate = rate at which RBI lends to banks. Higher repo rate → higher EMIs → less borrowing → controls inflation.", hindi: "Repo rate क्या है और यह आम लोगों पर कैसे असर करता है?" },
    ],
    medium: [
      { q: "How would you handle a customer who is frustrated about a delayed transaction?", tip: "Empathise first. Don't be defensive. Acknowledge the issue, explain the reason, give a timeline, follow up.", hindi: "एक frustrated customer को कैसे handle करेंगे जिसका transaction delay हो गया है?" },
      { q: "What is the difference between NEFT, RTGS and IMPS?", tip: "NEFT: batched, any amount. RTGS: real-time, min ₹2L. IMPS: instant, 24x7, any amount. RBI governs all.", hindi: "NEFT, RTGS और IMPS में क्या अंतर है?" },
    ],
    hard: [
      { q: "How would you assess the creditworthiness of an MSME applying for a business loan?", tip: "Cover: CIBIL score, cash flow statements, GST returns, industry risk, collateral, promoter background, banking behaviour.", hindi: "Business loan के लिए apply करने वाले MSME की creditworthiness कैसे assess करेंगे?" },
    ]
  },
  fresher: {
    easy: [
      { q: "Tell me about your final year project.", tip: "Structure: Problem → Your role → Technology used → Results/learnings. Quantify impact if possible.", hindi: "अपने final year project के बारे में बताइए।" },
      { q: "Why did you choose your field of study?", tip: "Be genuine. Connect your interest to a real problem you want to solve. Interviewers love passion.", hindi: "आपने अपनी field of study क्यों चुनी?" },
      { q: "What skills have you developed outside the classroom?", tip: "Mention: online courses (Coursera, SWAYAM), internships, freelance projects, competitions, open-source contributions.", hindi: "आपने classroom के बाहर कौन से skills develop किए हैं?" },
      { q: "How do you plan to contribute to this organisation as a fresher?", tip: "Show eagerness to learn, adaptability, and fresh perspective. Mention a specific area where you can add immediate value.", hindi: "आप एक fresher के रूप में इस organisation में कैसे contribute करने की योजना बनाते हैं?" },
    ],
    medium: [
      { q: "Describe a challenging situation during college and how you overcame it.", tip: "Could be academic, financial, or extracurricular. Show resilience, problem-solving and a growth mindset.", hindi: "College के दौरान किसी चुनौतीपूर्ण स्थिति के बारे में बताइए और आपने उसे कैसे overcome किया।" },
      { q: "How do you stay updated with industry trends?", tip: "Mention: LinkedIn, newsletters, podcasts, YouTube channels, GitHub, community meetups. Shows curiosity.", hindi: "आप industry trends से कैसे updated रहते हैं?" },
    ],
    hard: [
      { q: "You have no work experience. Why should we take a risk on you?", tip: "Turn the weakness into strength: fresh perspective, no bad habits to unlearn, eager to prove yourself, recent academic knowledge.", hindi: "आपके पास कोई work experience नहीं है। हम आप पर risk क्यों लें?" },
    ]
  }
};

/* ---- Feedback Templates ---- */
const FEEDBACK_GOOD = [
  "You clearly structured your answer and stayed relevant to the question.",
  "Good use of a personal example — it made your answer memorable.",
  "Your answer showed self-awareness and honesty, which interviewers value highly.",
  "You demonstrated knowledge of the role and aligned your strengths well.",
  "Strong opening line that grabbed attention immediately.",
  "You kept the answer concise without losing depth — a rare skill.",
];
const FEEDBACK_IMPROVE = [
  "Add a specific number or metric to make your answer more credible (e.g., 'I increased sales by 30%').",
  "Try the STAR method: Situation → Task → Action → Result for stronger storytelling.",
  "Your answer could benefit from a stronger closing line that ties back to why you're the right fit.",
  "Avoid filler phrases like 'I think' or 'basically' — they weaken your authority.",
  "Back your claim with one real example — abstract statements are less convincing.",
  "Start with the conclusion, then explain — interviewers appreciate directness.",
];
const STRONGER_VERSIONS = [
  "\"In my last role/project, I [specific action] which resulted in [measurable outcome]. This taught me [key lesson], which I'd bring directly to this role.\"",
  "\"I've always been drawn to [field/role] because [genuine reason]. One experience that solidified this was when [story], and the outcome was [result].\"",
  "\"When faced with [challenge], I first [action 1], then [action 2]. The result was [outcome]. Looking back, I'd also [one improvement].\"",
  "\"My approach to [topic] is [clear stance]. For example, at [college/internship], I [concrete action] and it led to [result].\"",
];

/* ---- State ---- */
let currentTrack = 'hr';
let currentDiff = 'easy';
let currentQIndex = 0;
let questionPool = [];
let sessionAnswered = 0;
let sessionScores = [];
let streak = 0;
let hindiMode = false;

/* ---- DOM refs ---- */
const qText = document.getElementById('qText');
const qTip = document.getElementById('qTip');
const qNumber = document.getElementById('qNumber');
const answerBox = document.getElementById('answerBox');
const feedbackCard = document.getElementById('feedbackCard');
const voiceIndicator = document.getElementById('voiceIndicator');

function getPool() {
  const bank = QUESTIONS[currentTrack]?.[currentDiff] || QUESTIONS.hr.easy;
  return [...bank].sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  if (!questionPool.length) questionPool = getPool();
  if (currentQIndex >= questionPool.length) {
    currentQIndex = 0;
    questionPool = getPool();
  }
  const q = questionPool[currentQIndex];
  qText.textContent = hindiMode ? q.hindi : q.q;
  qTip.innerHTML = `💡 <strong>Tip:</strong> ${q.tip}`;
  qNumber.textContent = `Question ${sessionAnswered + 1} · Track: ${currentTrack.toUpperCase()} · ${currentDiff.charAt(0).toUpperCase() + currentDiff.slice(1)}`;
  feedbackCard.classList.remove('show');
  answerBox.value = '';
  answerBox.style.height = 'auto';
}

function buildFeedback(text) {
  const len = text.trim().length;
  const words = text.trim().split(/\s+/).length;

  // Score based on answer length + content signals
  const lengthScore = Math.min(100, Math.round(30 + (words / 120) * 50));
  const contentScore = Math.min(100, lengthScore + (Math.random() * 14 - 4 | 0));
  const clarityScore = Math.min(100, Math.round(60 + Math.random() * 28));
  const confidenceScore = Math.min(100, Math.round(58 + Math.random() * 30));
  const structureScore = Math.min(100, Math.round(55 + Math.random() * 32));
  const overall = Math.round((contentScore + clarityScore + confidenceScore + structureScore) / 4);

  return { contentScore, clarityScore, confidenceScore, structureScore, overall };
}

function showFeedback(scores) {
  const { contentScore, clarityScore, confidenceScore, structureScore, overall } = scores;

  document.getElementById('scoreContent').textContent = contentScore + '%';
  document.getElementById('scoreClarity').textContent = clarityScore + '%';
  document.getElementById('scoreConfidence').textContent = confidenceScore + '%';
  document.getElementById('scoreStructure').textContent = structureScore + '%';

  const badge = document.getElementById('overallBadge');
  badge.textContent = `Score: ${overall}%`;
  badge.style.background = overall >= 80 ? 'rgba(0,214,160,0.12)' : overall >= 60 ? 'rgba(255,171,74,0.12)' : 'rgba(255,78,122,0.12)';
  badge.style.color = overall >= 80 ? 'var(--emerald)' : overall >= 60 ? 'var(--saffron-light)' : 'var(--rose)';
  badge.style.borderColor = overall >= 80 ? 'rgba(0,214,160,0.25)' : overall >= 60 ? 'rgba(255,171,74,0.25)' : 'rgba(255,78,122,0.25)';

  document.getElementById('barPct').textContent = overall + '%';

  // Bars animate after render
  requestAnimationFrame(() => {
    document.getElementById('overallBar').style.width = overall + '%';
  });

  document.getElementById('fbGood').textContent = FEEDBACK_GOOD[Math.floor(Math.random() * FEEDBACK_GOOD.length)];
  document.getElementById('fbImprove').textContent = FEEDBACK_IMPROVE[Math.floor(Math.random() * FEEDBACK_IMPROVE.length)];
  document.getElementById('fbBetter').textContent = STRONGER_VERSIONS[Math.floor(Math.random() * STRONGER_VERSIONS.length)];

  feedbackCard.classList.add('show');
  feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Update session stats
  sessionAnswered++;
  sessionScores.push(overall);
  if (overall >= 80) streak++;
  else streak = 0;

  updateStats();
}

function updateStats() {
  document.getElementById('statAnswered').textContent = sessionAnswered;
  const avg = sessionScores.length ? Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length) : '—';
  document.getElementById('statAvgScore').textContent = sessionScores.length ? avg + '%' : '—';
  document.getElementById('statStreak').textContent = streak + '🔥';
  const pct = Math.min(100, Math.round((sessionAnswered / 10) * 100));
  document.getElementById('sessionBar').style.width = pct + '%';
}

function nextQuestion() {
  currentQIndex++;
  feedbackCard.classList.remove('show');
  answerBox.value = '';
  loadQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- Event Listeners ---- */

// Track buttons
document.querySelectorAll('.track-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTrack = btn.dataset.track;
    currentQIndex = 0;
    questionPool = getPool();
    loadQuestion();
  });
});

// Difficulty tabs
document.querySelectorAll('.pill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pill-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentDiff = tab.dataset.diff;
    currentQIndex = 0;
    questionPool = getPool();
    loadQuestion();
  });
});

// Skip
document.getElementById('nextQBtn').addEventListener('click', nextQuestion);
document.getElementById('nextAfterFeedbackBtn').addEventListener('click', nextQuestion);

// Retry
document.getElementById('retryBtn').addEventListener('click', () => {
  feedbackCard.classList.remove('show');
  answerBox.value = '';
  answerBox.focus();
});

// Hindi toggle
document.getElementById('hindiToggleBtn').addEventListener('click', () => {
  hindiMode = !hindiMode;
  document.getElementById('hindiToggleBtn').textContent = hindiMode ? '🇬🇧 English Version' : '🇮🇳 Hindi Version';
  const q = questionPool[currentQIndex];
  qText.textContent = hindiMode ? q.hindi : q.q;
});

// Clear
document.getElementById('clearAnswerBtn').addEventListener('click', () => {
  answerBox.value = '';
  answerBox.focus();
});

// Submit
document.getElementById('submitAnswerBtn').addEventListener('click', () => {
  const text = answerBox.value.trim();
  if (!text) {
    answerBox.style.borderColor = 'var(--rose)';
    answerBox.placeholder = '⚠️ Please type your answer before submitting!';
    setTimeout(() => {
      answerBox.style.borderColor = '';
      answerBox.placeholder = 'Type your answer here…';
    }, 2000);
    return;
  }
  const btn = document.getElementById('submitAnswerBtn');
  btn.textContent = 'Analysing…';
  btn.disabled = true;

  // Simulate AI processing delay
  setTimeout(() => {
    const scores = buildFeedback(text);
    showFeedback(scores);
    btn.textContent = 'Get AI Feedback';
    btn.disabled = false;
  }, 1400);
});

// Auto-resize textarea
answerBox.addEventListener('input', () => {
  answerBox.style.height = 'auto';
  answerBox.style.height = Math.min(answerBox.scrollHeight, 300) + 'px';
});

/* ---- Voice Input ---- */
let recognition;
let isRecording = false;
const voiceBtn = document.getElementById('voiceAnswerBtn');

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = 'hi-IN';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (e) => {
    let transcript = '';
    for (let i = 0; i < e.results.length; i++) {
      transcript += e.results[i][0].transcript;
    }
    answerBox.value = transcript;
  };

  recognition.onend = () => {
    isRecording = false;
    voiceBtn.textContent = '🎙️ Voice Answer';
    voiceIndicator.classList.remove('show');
  };

  voiceBtn.addEventListener('click', () => {
    if (!isRecording) {
      recognition.start();
      isRecording = true;
      voiceBtn.textContent = '⏹️ Stop Recording';
      voiceIndicator.classList.add('show');
    } else {
      recognition.stop();
    }
  });
} else {
  voiceBtn.style.opacity = '0.4';
  voiceBtn.title = 'Voice not supported in this browser. Try Chrome.';
}

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ---- Init ---- */
questionPool = getPool();
loadQuestion();
