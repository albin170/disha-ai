// ============================================================
//  Setu AI — Chat Engine (Simulated AI with rich responses)
// ============================================================

const chatArea = document.getElementById('chatMessagesArea');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const modeBadge = document.getElementById('modeBadge');

// Auto-resize textarea
chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
});

// Quick prompts
document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    chatInput.value = btn.dataset.prompt;
    chatInput.dispatchEvent(new Event('input'));
    sendMessage();
  });
});

// Mode switching
document.querySelectorAll('.sidebar-item[data-mode]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const modeLabels = {
      general: 'General', schemes: 'Schemes Finder', interview: 'Interview Prep',
      document: 'Documents', career: 'Career Advice', budgeting: 'Budgeting'
    };
    modeBadge.textContent = modeLabels[item.dataset.mode] || 'General';
    const modePrompts = {
      schemes: "I'd like to find government schemes I qualify for",
      interview: "Give me a job interview practice question",
      document: "Help me understand a document",
      career: "I need career guidance after studies",
      budgeting: "Help me with budgeting and money management",
    };
    if (modePrompts[item.dataset.mode]) {
      chatInput.value = modePrompts[item.dataset.mode];
    }
  });
});

// Send on Enter (Shift+Enter for newline)
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});
sendBtn.addEventListener('click', sendMessage);

/* ---------- Core Chat Functions ---------- */
function appendUserMsg(text) {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg-wrapper user';
  wrapper.innerHTML = `
    <div class="msg-avatar msg-avatar-user">👤</div>
    <div class="msg-bubble msg-bubble-user">${escapeHTML(text).replace(/\n/g,'<br/>')}</div>
  `;
  chatArea.appendChild(wrapper);
  scrollToBottom();
}

function appendTyping() {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg-wrapper';
  wrapper.id = 'typingIndicator';
  wrapper.innerHTML = `
    <div class="msg-avatar msg-avatar-ai">◈</div>
    <div class="chat-msg-typing">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatArea.appendChild(wrapper);
  scrollToBottom();
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function appendAIMsg(html) {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg-wrapper';
  wrapper.innerHTML = `
    <div class="msg-avatar msg-avatar-ai">◈</div>
    <div class="msg-bubble msg-bubble-ai">${html}</div>
  `;
  chatArea.appendChild(wrapper);
  scrollToBottom();
}

function scrollToBottom() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ---------- AI Response Engine ---------- */
const RESPONSES = {
  schemes: {
    keywords: ['scheme', 'sarkari', 'yojana', 'government', 'loan', 'mudra', 'scholarship', 'eligible', 'benefit', 'pm kisan', 'subsidy'],
    respond: () => `
      <strong>🏛️ Government Schemes Finder</strong><br/><br/>
      Let me find the right schemes for you! A few quick questions:<br/><br/>
      <strong>1. What's your age group?</strong><br/>
      Please type: <em>student</em>, <em>youth (18-35)</em>, or <em>adult (35+)</em><br/><br/>
      <strong>2. What's your category?</strong><br/>
      <em>General / OBC / SC / ST</em><br/><br/>
      <strong>3. Your state?</strong><br/><br/>
      Based on your answers, I'll find scholarships, loans, farming subsidies, and more — from over 50 real government schemes. 🎯
    `
  },
  interview: {
    keywords: ['interview', 'job', 'hr', 'question', 'answer', 'practice', 'mock', 'naukri', 'resume', 'cv', 'prepare', 'selection'],
    respond: (text) => {
      const questions = [
        { q: "Tell me about yourself.", tip: "Structure: Present → Past → Future. Keep it 90 seconds. In India, mention your hometown briefly." },
        { q: "What is your biggest weakness?", tip: "Pick a real weakness you've actively worked to improve. Show self-awareness." },
        { q: "Why do you want to work here?", tip: "Research the company. Mention 1-2 specific things about their work culture or projects." },
        { q: "Where do you see yourself in 5 years?", tip: "Align your growth with the company's direction. Show ambition + loyalty." },
        { q: "Why should we hire you?", tip: "This is your 30-second pitch. Connect your top 3 skills directly to the job role." },
      ];
      const q = questions[Math.floor(Math.random() * questions.length)];
      return `
        <strong>🎯 Interview Practice — HR Round</strong><br/><br/>
        <div style="background:rgba(91,94,244,0.1);border:1px solid rgba(91,94,244,0.25);border-radius:12px;padding:14px;margin:8px 0;">
          <div style="font-size:0.72rem;letter-spacing:2px;color:var(--indigo-light);margin-bottom:6px;">QUESTION</div>
          <strong style="font-size:1rem;">"${q.q}"</strong>
        </div>
        <br/>✏️ <em>Type your answer below and I'll give you instant feedback!</em><br/><br/>
        💡 <strong>Tip:</strong> ${q.tip}
      `;
    }
  },
  document: {
    keywords: ['document', 'form', 'notice', 'letter', 'bank', 'legal', 'samjhao', 'explain', 'kya matlab', 'paste'],
    respond: () => `
      <strong>📄 Document Helper</strong><br/><br/>
      Paste any text from a document below and I'll:<br/><br/>
      ✅ Explain it in <strong>simple Hindi or English</strong><br/>
      ✅ Tell you <strong>what action you need to take</strong><br/>
      ✅ Highlight any <strong>deadlines or amounts</strong><br/>
      ✅ Tell you <strong>which office to visit</strong> if needed<br/><br/>
      Go ahead — paste the text from your document! 👇<br/><br/>
      <em style="font-size:0.82rem;color:var(--text-muted);">Works with: Bank notices, court letters, government forms, insurance documents, rent agreements, and more.</em>
    `
  },
  career: {
    keywords: ['career', 'after 12th', '12th ke baad', 'course', 'engineering', 'medical', 'arts', 'commerce', 'skill', 'future', 'study'],
    respond: () => `
      <strong>🚀 Career Guidance</strong><br/><br/>
      India has more options than ever — let me help you navigate! Tell me:<br/><br/>
      📚 <strong>Your current education level?</strong> (10th / 12th / Graduate)<br/>
      🧠 <strong>Your subject stream?</strong> (Science / Commerce / Arts / Diploma)<br/>
      ❤️ <strong>What do you enjoy doing?</strong> (Tech / Creative / People / Business)<br/>
      💰 <strong>Income goal?</strong> (Government job / Startup / Freelance / Corporate)<br/><br/>
      Based on this, I'll suggest <strong>specific career paths, free courses</strong> (SWAYAM, Coursera, etc.), and <strong>competitive exams</strong> relevant to you! 🎯
    `
  },
  budgeting: {
    keywords: ['budget', 'money', 'save', 'paisa', 'expense', 'loan', 'emi', 'invest', 'bank', 'savings', 'salary'],
    respond: () => `
      <strong>💰 Smart Budgeting — India Edition</strong><br/><br/>
      Here's the <strong>50-30-20 rule adapted for India:</strong><br/><br/>
      📦 <strong>50% — Needs</strong>: Rent, food, transport, EMIs<br/>
      🎉 <strong>30% — Wants</strong>: Entertainment, eating out, shopping<br/>
      🏦 <strong>20% — Savings & Investments</strong>: SIP, PPF, Emergency Fund<br/><br/>
      <strong>Free tools that actually work:</strong><br/>
      • <em>Walnut</em> — auto-tracks SMS spends<br/>
      • <em>ET Money</em> — SIP and mutual funds<br/>
      • <em>EPFO Portal</em> — check your PF balance<br/><br/>
      Tell me your monthly income and I'll make a <strong>personalised budget plan</strong> for you! 💪
    `
  },
  greeting: {
    keywords: ['hello', 'hi', 'namaste', 'hii', 'hey', 'namaskar', 'jai hind'],
    respond: () => `
      Namaste! 🙏 Great to see you here.<br/><br/>
      I'm <strong>Setu</strong> — your AI guide built specifically for India. I speak Hindi, English, and Hinglish.<br/><br/>
      What's on your mind today?<br/>
      🏛️ Find a government scheme?<br/>
      🎯 Practice for a job interview?<br/>
      📄 Understand a confusing document?<br/>
      🚀 Get career guidance?<br/><br/>
      Just tell me! 😊
    `
  }
};

// Detect scheme answers and provide results
const SCHEME_DATA = [
  { name: 'PM Scholarship Scheme', category: 'Education', desc: 'Scholarship for children of ex-servicemen and Coast Guard personnel. Up to ₹3000/month.', eligible: 'Students with 12th pass and 60%+' },
  { name: 'National Means-cum-Merit Scholarship', category: 'Education', desc: 'Up to ₹12,000/year for Class 9-12 students from economically weaker sections.', eligible: 'Class 8 students, family income < ₹3.5L' },
  { name: 'PM Mudra Loan', category: 'Business', desc: 'Collateral-free loans up to ₹10 lakh for small businesses and self-employment.', eligible: 'Any Indian with a business plan' },
  { name: 'Startup India Seed Fund', category: 'Business', desc: 'Up to ₹20 lakh for early-stage startups with innovative ideas.', eligible: 'DPIIT recognized startups < 2 years' },
  { name: 'PM Kisan Samman Nidhi', category: 'Agriculture', desc: '₹6,000/year directly to farmers for agricultural needs in 3 installments.', eligible: 'Small/marginal farmers with land records' },
  { name: 'Ayushman Bharat — PMJAY', category: 'Health', desc: 'Free health insurance up to ₹5 lakh per family per year. Covers 1500+ treatments.', eligible: 'Economically weaker sections (SECC list)' },
];

function generateSchemeCards() {
  return SCHEME_DATA.slice(0, 3).map(s => `
    <div class="msg-scheme-card">
      <div class="scheme-card-tag">${s.category}</div>
      <div class="scheme-card-title">${s.name}</div>
      <div class="scheme-card-desc">${s.desc}</div>
      <div style="font-size:0.78rem;color:var(--text-muted);margin-top:6px;">✅ ${s.eligible}</div>
    </div>
  `).join('');
}

function getAIResponse(userText) {
  const lower = userText.toLowerCase();

  // Check for pasted document text (long text)
  if (userText.length > 200) {
    return new Promise(resolve => setTimeout(() => resolve(`
      <strong>📄 Document Analysis Complete</strong><br/><br/>
      Here's what this document says in simple language:<br/><br/>
      <strong>📌 Main Purpose:</strong> This appears to be an official communication requiring your attention.<br/><br/>
      <strong>📅 Key Details:</strong><br/>
      • The document refers to an important administrative or financial matter<br/>
      • Please read any highlighted amounts or dates carefully<br/><br/>
      <strong>✅ What you need to do:</strong>
      <div class="action-highlight" style="margin-top:8px;">
        → Visit the relevant office or portal mentioned in the document<br/>
        → Carry: Aadhaar Card + the original document + one recent photo<br/>
        → If it's a bank notice: Call the bank helpline first (numbers are usually on the back of your card)
      </div>
      <br/>💬 <em>Want me to explain any specific part? Paste just that section!</em>
    `), 2200));
  }

  // Check for follow-up scheme answers
  if ((lower.includes('student') || lower.includes('youth') || lower.includes('general') || lower.includes('obc') || lower.includes('rajasthan') || lower.includes('maharashtra') || lower.includes('mp') || lower.includes('up') || lower.includes('bihar')) && lower.length < 60) {
    return new Promise(resolve => setTimeout(() => resolve(`
      <strong>🎉 Found ${Math.floor(Math.random() * 3) + 2} schemes for you!</strong><br/><br/>
      Based on your profile, here are the best matches:<br/><br/>
      ${generateSchemeCards()}
      <br/>Want me to explain how to apply for any of these? Just ask! 🙌
    `), 2000));
  }

  // Check for interview answer (long text response after interview question)
  if (userText.length > 50 && userText.length < 500 && (lower.includes('i am') || lower.includes('main') || lower.includes('mera') || lower.includes('myself') || lower.includes('weakness') || lower.includes('strength'))) {
    const scores = { content: Math.floor(Math.random() * 20) + 70, confidence: Math.floor(Math.random() * 20) + 65, structure: Math.floor(Math.random() * 20) + 68 };
    const avg = Math.round((scores.content + scores.confidence + scores.structure) / 3);
    return new Promise(resolve => setTimeout(() => resolve(`
      <strong>✅ Answer Feedback</strong><br/><br/>
      <div style="display:flex;gap:1rem;margin-bottom:0.75rem;flex-wrap:wrap;">
        <div>Content <strong>${scores.content}%</strong></div>
        <div>Confidence <strong>${scores.confidence}%</strong></div>
        <div>Structure <strong>${scores.structure}%</strong></div>
      </div>
      <div class="score-bar"><div class="score-fill" style="width:${avg}%"></div></div>
      <strong>Overall: ${avg}/100</strong><br/><br/>
      <strong>💪 What worked well:</strong> You clearly communicated your background and showed relevant experience.<br/><br/>
      <strong>💡 Improve by:</strong> Adding a specific achievement with a number (e.g., "I increased sales by 30%"). Numbers make answers memorable!<br/><br/>
      <strong>🔁 Better version tip:</strong> Start with your current role → give 1 key achievement → connect to why this job excites you.<br/><br/>
      Ready for the next question? 🎯
    `), 2500));
  }

  // Match response categories
  for (const [key, config] of Object.entries(RESPONSES)) {
    if (config.keywords.some(kw => lower.includes(kw))) {
      const responseText = config.respond(userText);
      const delay = lower.length > 30 ? 2000 : 1500;
      return new Promise(resolve => setTimeout(() => resolve(responseText), delay));
    }
  }

  // Default fallback
  return new Promise(resolve => setTimeout(() => resolve(`
    Main samajh gaya! 🙏 Let me help you with that.<br/><br/>
    I work best with questions about:<br/>
    🏛️ <strong>Government schemes & benefits</strong><br/>
    🎯 <strong>Job interview practice</strong><br/>
    📄 <strong>Understanding documents</strong><br/>
    🚀 <strong>Career & education guidance</strong><br/>
    💰 <strong>Budgeting & financial tips</strong><br/><br/>
    Could you share more details? The more you tell me, the better I can help! 😊
  `), 1800));
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  chatInput.style.height = 'auto';
  sendBtn.disabled = true;

  appendUserMsg(text);
  appendTyping();

  try {
    const aiReply = await getAIResponse(text);
    removeTyping();
    appendAIMsg(aiReply);
    // Animate score bars
    document.querySelectorAll('.score-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = w; }, 100);
    });
  } catch (e) {
    removeTyping();
    appendAIMsg('Kuch gadbad ho gayi 😅 Please try again!');
  }

  sendBtn.disabled = false;
  chatInput.focus();
}

/* ---------- Voice input (Web Speech API) ---------- */
const voiceBtn = document.getElementById('voiceBtn');
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.lang = 'hi-IN';
  recognition.interimResults = false;
  recognition.onresult = (e) => {
    chatInput.value = e.results[0][0].transcript;
    voiceBtn.textContent = '🎙️';
    voiceBtn.style.color = '';
  };
  recognition.onend = () => { voiceBtn.textContent = '🎙️'; voiceBtn.style.color = ''; };
  voiceBtn.addEventListener('click', () => {
    voiceBtn.textContent = '🔴';
    voiceBtn.style.color = 'var(--rose)';
    recognition.start();
  });
} else {
  voiceBtn.title = 'Voice input not supported in this browser';
  voiceBtn.style.opacity = '0.4';
}
