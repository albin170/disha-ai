// ============================================================
//  Setu AI — Main JS (Landing Page + Navbar)
// ============================================================

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '68px';
    navLinks.style.left = '0'; navLinks.style.right = '0';
    navLinks.style.background = 'rgba(7,8,15,0.97)';
    navLinks.style.padding = '1rem';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
    navLinks.style.zIndex = '99';
  });
}

/* ---------- Hero Chat Preview Animation ---------- */
const heroMessages = document.getElementById('heroMessages');
const DEMO_CONVERSATION = [
  { type: 'ai', text: 'Namaste! 🙏 Main Setu hoon. Tell me — what do you need help with today?', delay: 800 },
  { type: 'user', text: 'Mujhe koi scholarship milegi? I just got 72% in 12th.', delay: 1800 },
  { type: 'ai', text: '✅ Yes! Based on 12th marks & family income, you may qualify for:\n\n🎓 National Means-cum-Merit Scholarship (NMMS)\n🎓 State Merit Scholarship\n\nShall I find the exact one for your state?', delay: 3200 },
  { type: 'user', text: 'Rajasthan — please help!', delay: 5000 },
  { type: 'ai', text: '🌟 Found 3 scholarships for you in Rajasthan. Tap "Explore Schemes" to apply!', delay: 6500 },
];

function createMsgEl(type, text) {
  const el = document.createElement('div');
  el.className = `chat-msg chat-msg-${type}`;
  el.style.whiteSpace = 'pre-line';
  el.textContent = text;
  return el;
}

function createTypingEl() {
  const el = document.createElement('div');
  el.className = 'chat-msg-typing';
  el.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  return el;
}

let msgQueue = [...DEMO_CONVERSATION];
let msgIndex = 0;

function animateNextMsg() {
  if (!heroMessages || msgIndex >= DEMO_CONVERSATION.length) {
    // Restart after pause
    if (heroMessages) {
      setTimeout(() => {
        heroMessages.innerHTML = '';
        msgIndex = 0;
        setTimeout(animateNextMsg, 1200);
      }, 5000);
    }
    return;
  }
  const msg = DEMO_CONVERSATION[msgIndex];
  const delay = msgIndex === 0 ? msg.delay : msg.delay - DEMO_CONVERSATION[msgIndex - 1].delay;

  setTimeout(() => {
    if (msg.type === 'ai') {
      // Show typing indicator first
      const typing = createTypingEl();
      heroMessages.appendChild(typing);
      heroMessages.scrollTop = heroMessages.scrollHeight;

      setTimeout(() => {
        typing.remove();
        const el = createMsgEl('ai', msg.text);
        heroMessages.appendChild(el);
        setTimeout(() => el.classList.add('show'), 30);
        heroMessages.scrollTop = heroMessages.scrollHeight;
        msgIndex++;
        animateNextMsg();
      }, 900);
    } else {
      const el = createMsgEl('user', msg.text);
      heroMessages.appendChild(el);
      setTimeout(() => el.classList.add('show'), 30);
      heroMessages.scrollTop = heroMessages.scrollHeight;
      msgIndex++;
      animateNextMsg();
    }
  }, delay);
}

if (heroMessages) {
  setTimeout(animateNextMsg, 500);
}

/* ---------- Scroll reveal animation ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .story-card, .step, .scheme-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
